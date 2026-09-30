import { randomBytes } from "crypto";
import { prisma, SubscriberStatus } from "@samvad/database";
import {
  NewsletterSubscriptionInput,
  AdminSubscriberFilterInput,
} from "@samvad/validation";
import {
  NewsletterJobPayload,
  SubscribeResult,
  UnsubscribeResult,
  SubscriberStats,
} from "./types";
import { jobQueue } from "./job-queue";
import { enforceNewsletterRateLimit, hashClientIp } from "./rate-limiter";

export interface NewsletterSubscriberRecord {
  id: string;
  email: string;
  status: SubscriberStatus;
  source: string;
  consentGiven: boolean;
  consentedAt: Date;
  unsubscribeToken: string;
  unsubscribedAt: Date | null;
  unsubscribeReason: string | null;
  ipHash: string | null;
  userAgent: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory fallback store for offline development and test environments
export const inMemorySubscribers: Map<string, NewsletterSubscriberRecord> = new Map();

/**
 * Checks whether an active PostgreSQL connection is configured
 */
export function isDbAvailable(): boolean {
  return Boolean(
    process.env.DATABASE_URL &&
      !process.env.DATABASE_URL.includes("mock") &&
      process.env.NODE_ENV !== "test"
  );
}

/**
 * Masks an email for privacy (e.g. john.doe@enterprise.com -> j***e@enterprise.com)
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***@***";
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

/**
 * Generates a secure, cryptographic unsubscribe token
 */
export function generateUnsubscribeToken(): string {
  return `unsub_${randomBytes(24).toString("hex")}`;
}

export class NewsletterService {
  /**
   * Subscribe an email address to SAMVAD Dispatches.
   * Handles validation, bot protection, duplicate detection, and asynchronous job enqueueing.
   */
  async subscribe(
    input: NewsletterSubscriptionInput,
    meta: { ip: string; userAgent?: string }
  ): Promise<SubscribeResult> {
    const { email, consent, source, honeypot, clientTimestamp } = input;

    // 1. Spam & Bot Protection: Honeypot check
    if (honeypot && honeypot.length > 0) {
      throw new Error("Automated submission detected");
    }

    // 2. Spam & Bot Protection: Minimum submission time check (1.5 seconds)
    if (clientTimestamp && Date.now() - clientTimestamp < 1500) {
      throw new Error("Submission was too rapid. Automated bot suspected.");
    }

    // 3. Rate Limiting Check
    const rateCheck = await enforceNewsletterRateLimit(meta.ip, "subscribe");
    if (!rateCheck.allowed) {
      throw new Error(
        `Rate limit exceeded. Too many requests. Please wait ${rateCheck.resetSeconds} seconds.`
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const ipHash = hashClientIp(meta.ip);
    const now = new Date();

    // 4. Check for Existing Subscriber (Database first, in-memory fallback)
    let existing: NewsletterSubscriberRecord | null = null;

    if (isDbAvailable()) {
      try {
        existing = (await prisma.newsletterSubscriber.findUnique({
          where: { email: normalizedEmail },
        })) as NewsletterSubscriberRecord | null;
      } catch {
        existing = inMemorySubscribers.get(normalizedEmail) || null;
      }
    } else {
      existing = inMemorySubscribers.get(normalizedEmail) || null;
    }

    // 5. Duplicate Handling
    if (existing) {
      // Case A: Already actively subscribed -> Idempotent friendly success, NO extra email job
      if (existing.status === "SUBSCRIBED") {
        return {
          success: true,
          message:
            "This email address is already subscribed to SAMVAD Executive Dispatches. Your preferences are active.",
          subscriberId: existing.id,
          email: existing.email,
          isExisting: true,
          status: "SUBSCRIBED",
        };
      }

      // Case B: Previously unsubscribed -> Reactivate and schedule reactivation email
      const updatedFields = {
        status: "SUBSCRIBED" as SubscriberStatus,
        consentGiven: true,
        consentedAt: now,
        unsubscribedAt: null,
        unsubscribeReason: null,
        ipHash,
        userAgent: meta.userAgent || null,
        updatedAt: now,
      };

      if (isDbAvailable()) {
        try {
          await prisma.newsletterSubscriber.update({
            where: { id: existing.id },
            data: updatedFields,
          });
        } catch {
          Object.assign(existing, updatedFields);
          inMemorySubscribers.set(normalizedEmail, existing);
        }
      } else {
        Object.assign(existing, updatedFields);
        inMemorySubscribers.set(normalizedEmail, existing);
      }

      // Enqueue Reactivation Email Job to Background Worker
      const jobPayload: NewsletterJobPayload = {
        subscriberId: existing.id,
        email: existing.email,
        unsubscribeToken: existing.unsubscribeToken,
        source: existing.source,
      };
      const job = await jobQueue.enqueue("REACTIVATION_EMAIL", jobPayload);

      return {
        success: true,
        message:
          "Your subscription to SAMVAD Executive Dispatches has been successfully reactivated.",
        subscriberId: existing.id,
        email: existing.email,
        isExisting: true,
        status: "SUBSCRIBED",
        enqueuedJobId: job.id,
      };
    }

    // 6. Create New Subscriber
    const newId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const unsubscribeToken = generateUnsubscribeToken();

    const newRecord: NewsletterSubscriberRecord = {
      id: newId,
      email: normalizedEmail,
      status: "SUBSCRIBED",
      source: source || "WEBSITE_FOOTER",
      consentGiven: consent,
      consentedAt: now,
      unsubscribeToken,
      unsubscribedAt: null,
      unsubscribeReason: null,
      ipHash,
      userAgent: meta.userAgent || null,
      createdAt: now,
      updatedAt: now,
    };

    if (isDbAvailable()) {
      try {
        await prisma.newsletterSubscriber.create({
          data: {
            id: newId,
            email: normalizedEmail,
            status: "SUBSCRIBED",
            source: source || "WEBSITE_FOOTER",
            consentGiven: consent,
            consentedAt: now,
            unsubscribeToken,
            ipHash,
            userAgent: meta.userAgent || null,
          },
        });
      } catch {
        inMemorySubscribers.set(normalizedEmail, newRecord);
      }
    } else {
      inMemorySubscribers.set(normalizedEmail, newRecord);
    }

    // 7. Enqueue Welcome Email Job to Background Worker (DO NOT send email synchronously)
    const jobPayload: NewsletterJobPayload = {
      subscriberId: newId,
      email: normalizedEmail,
      unsubscribeToken,
      source,
    };
    const job = await jobQueue.enqueue("WELCOME_EMAIL", jobPayload);

    return {
      success: true,
      message:
        "Thank you for subscribing to SAMVAD Executive Intelligence. Your briefing schedule has been initiated.",
      subscriberId: newId,
      email: normalizedEmail,
      isExisting: false,
      status: "SUBSCRIBED",
      enqueuedJobId: job.id,
    };
  }

  /**
   * Unsubscribe via secure cryptographic token.
   * Idempotent: If already unsubscribed, returns safe status without error.
   */
  async unsubscribe(token: string, reason?: string | null): Promise<UnsubscribeResult> {
    if (!token || token.trim() === "") {
      throw new Error("A valid unsubscribe token is required.");
    }

    const cleanToken = token.trim();
    let subscriber: NewsletterSubscriberRecord | null = null;

    if (isDbAvailable()) {
      try {
        subscriber = (await prisma.newsletterSubscriber.findUnique({
          where: { unsubscribeToken: cleanToken },
        })) as NewsletterSubscriberRecord | null;
      } catch {
        for (const rec of inMemorySubscribers.values()) {
          if (rec.unsubscribeToken === cleanToken) {
            subscriber = rec;
            break;
          }
        }
      }
    } else {
      for (const rec of inMemorySubscribers.values()) {
        if (rec.unsubscribeToken === cleanToken) {
          subscriber = rec;
          break;
        }
      }
    }

    if (!subscriber) {
      throw new Error("Invalid or expired unsubscribe token.");
    }

    const now = new Date();

    // Idempotent Check: Already Unsubscribed
    if (subscriber.status === "UNSUBSCRIBED") {
      return {
        success: true,
        message: "This email address is already unsubscribed from SAMVAD Executive Dispatches.",
        emailMasked: maskEmail(subscriber.email),
        unsubscribedAt: subscriber.unsubscribedAt ? subscriber.unsubscribedAt.toISOString() : now.toISOString(),
        isAlreadyUnsubscribed: true,
      };
    }

    // Transition to UNSUBSCRIBED
    const updateData = {
      status: "UNSUBSCRIBED" as SubscriberStatus,
      unsubscribedAt: now,
      unsubscribeReason: reason || "USER_DIRECT_ACTION",
      updatedAt: now,
    };

    if (isDbAvailable()) {
      try {
        await prisma.newsletterSubscriber.update({
          where: { id: subscriber.id },
          data: updateData,
        });
      } catch {
        Object.assign(subscriber, updateData);
        inMemorySubscribers.set(subscriber.email, subscriber);
      }
    } else {
      Object.assign(subscriber, updateData);
      inMemorySubscribers.set(subscriber.email, subscriber);
    }

    return {
      success: true,
      message: "You have been successfully unsubscribed from SAMVAD Executive Dispatches.",
      emailMasked: maskEmail(subscriber.email),
      unsubscribedAt: now.toISOString(),
      isAlreadyUnsubscribed: false,
    };
  }

  /**
   * Looks up subscriber details by unsubscribe token (for the unsubscribe confirmation view).
   */
  async getSubscriberByToken(token: string): Promise<{
    emailMasked: string;
    status: SubscriberStatus;
    consentedAt: string;
  } | null> {
    let subscriber: NewsletterSubscriberRecord | null = null;

    if (isDbAvailable()) {
      try {
        subscriber = (await prisma.newsletterSubscriber.findUnique({
          where: { unsubscribeToken: token },
        })) as NewsletterSubscriberRecord | null;
      } catch {
        for (const rec of inMemorySubscribers.values()) {
          if (rec.unsubscribeToken === token) {
            subscriber = rec;
            break;
          }
        }
      }
    } else {
      for (const rec of inMemorySubscribers.values()) {
        if (rec.unsubscribeToken === token) {
          subscriber = rec;
          break;
        }
      }
    }

    if (!subscriber) return null;

    return {
      emailMasked: maskEmail(subscriber.email),
      status: subscriber.status,
      consentedAt: subscriber.consentedAt.toISOString(),
    };
  }

  /**
   * Admin Management: List subscribers with filtering, search, pagination, and analytics.
   */
  async listSubscribers(filter: AdminSubscriberFilterInput): Promise<{
    subscribers: NewsletterSubscriberRecord[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    stats: SubscriberStats;
  }> {
    const { status, search, page, limit } = filter;
    let allRecords: NewsletterSubscriberRecord[] = [];

    if (isDbAvailable()) {
      try {
        const dbList = await prisma.newsletterSubscriber.findMany({
          orderBy: { createdAt: "desc" },
        });
        allRecords = dbList as NewsletterSubscriberRecord[];
      } catch {
        allRecords = Array.from(inMemorySubscribers.values());
      }
    } else {
      allRecords = Array.from(inMemorySubscribers.values());
    }

    // Compute aggregate metrics
    const totalSubscribers = allRecords.length;
    const activeSubscribers = allRecords.filter((s) => s.status === "SUBSCRIBED").length;
    const unsubscribedSubscribers = allRecords.filter((s) => s.status === "UNSUBSCRIBED").length;
    const churnRatePercent =
      totalSubscribers > 0
        ? parseFloat(((unsubscribedSubscribers / totalSubscribers) * 100).toFixed(1))
        : 0;

    const stats: SubscriberStats = {
      totalSubscribers,
      activeSubscribers,
      unsubscribedSubscribers,
      churnRatePercent,
    };

    // Apply Filters
    let filtered = allRecords;

    if (status && status !== "ALL") {
      filtered = filtered.filter((s) => s.status === status);
    }

    if (search && search.trim() !== "") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter((s) => s.email.toLowerCase().includes(q));
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const offset = (page - 1) * limit;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      subscribers: paginated,
      total,
      page,
      limit,
      totalPages,
      stats,
    };
  }

  /**
   * Clears in-memory subscribers (for test suites).
   */
  clearMemoryStore(): void {
    inMemorySubscribers.clear();
  }
}

// Global Singleton Service Instance
export const newsletterService = new NewsletterService();

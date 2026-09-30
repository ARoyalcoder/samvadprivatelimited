import { describe, it, expect, beforeEach } from "vitest";
import {
  newsletterSubscriptionSchema,
  newsletterUnsubscribeSchema,
  adminSubscriberFilterSchema,
} from "@samvad/validation";
import {
  newsletterService,
  generateUnsubscribeToken,
  maskEmail,
} from "../../apps/web/lib/newsletter/newsletter-service";
import { jobQueue } from "../../apps/web/lib/newsletter/job-queue";
import {
  newsletterWorker,
  inMemoryDeliveryLogs,
} from "../../apps/web/lib/newsletter/worker";
import {
  enforceNewsletterRateLimit,
  resetNewsletterRateLimits,
} from "../../apps/web/lib/newsletter/rate-limiter";

describe("Newsletter Subscription & Background Worker Architecture", () => {
  beforeEach(() => {
    newsletterService.clearMemoryStore();
    jobQueue.clear();
    inMemoryDeliveryLogs.length = 0;
    resetNewsletterRateLimits();
  });

  describe("1. Validation & Bot Protection Schemas", () => {
    it("should accept valid executive emails with explicit consent", () => {
      const parsed = newsletterSubscriptionSchema.safeParse({
        email: "counsel@defense-sovereign.gov",
        consent: true,
        source: "FOOTER_PRIMARY",
      });

      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.email).toBe("counsel@defense-sovereign.gov");
        expect(parsed.data.consent).toBe(true);
      }
    });

    it("should normalize email addresses to lowercase", () => {
      const parsed = newsletterSubscriptionSchema.safeParse({
        email: "DIRECTOR.ADVISORY@ENTERPRISE.COM",
        consent: true,
      });

      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.email).toBe("director.advisory@enterprise.com");
      }
    });

    it("should reject subscriptions without explicit consent", () => {
      const parsed = newsletterSubscriptionSchema.safeParse({
        email: "counsel@enterprise.com",
        consent: false,
      });

      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        expect(errors.consent).toBeDefined();
      }
    });

    it("should block disposable and temporary email domains", () => {
      const disposable = [
        "bot@mailinator.com",
        "temp@10minutemail.com",
        "hacker@tempmail.com",
        "fake@trashmail.com",
      ];

      for (const email of disposable) {
        const parsed = newsletterSubscriptionSchema.safeParse({
          email,
          consent: true,
        });
        expect(parsed.success).toBe(false);
      }
    });

    it("should reject submissions with filled honeypot fields", () => {
      const parsed = newsletterSubscriptionSchema.safeParse({
        email: "valid@enterprise.com",
        consent: true,
        honeypot: "http://spam-link.com",
      });

      expect(parsed.success).toBe(false);
    });

    it("should validate unsubscribe tokens correctly", () => {
      const valid = newsletterUnsubscribeSchema.safeParse({
        token: "unsub_a1b2c3d4e5f6g7h8i9j0",
        reason: "NOT_RELEVANT",
      });
      expect(valid.success).toBe(true);

      const invalid = newsletterUnsubscribeSchema.safeParse({
        token: "short",
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe("2. Duplicate Handling & State Transitions", () => {
    it("should create new subscriber and enqueue background welcome job", async () => {
      const result = await newsletterService.subscribe(
        {
          email: "principal@sovereign-holdings.ch",
          consent: true,
          source: "HOMEPAGE",
        },
        { ip: "192.168.1.10" }
      );

      expect(result.success).toBe(true);
      expect(result.isExisting).toBe(false);
      expect(result.status).toBe("SUBSCRIBED");
      expect(result.enqueuedJobId).toBeDefined();

      // Ensure job was enqueued in background queue
      expect(jobQueue.getQueueLength()).toBe(1);
      const job = jobQueue.getJob(result.enqueuedJobId!);
      expect(job).toBeDefined();
      expect(job?.type).toBe("WELCOME_EMAIL");
      expect(job?.payload.email).toBe("principal@sovereign-holdings.ch");
      expect(job?.status).toBe("QUEUED");
    });

    it("should handle duplicate active subscribers idempotently without duplicate email jobs", async () => {
      // 1. Initial subscription
      const first = await newsletterService.subscribe(
        {
          email: "managing.director@global-bank.com",
          consent: true,
        },
        { ip: "192.168.1.11" }
      );
      expect(first.isExisting).toBe(false);
      expect(jobQueue.getQueueLength()).toBe(1);

      // Drain queue to simulate background worker
      await newsletterWorker.drainQueue();
      expect(jobQueue.getQueueLength()).toBe(0);

      // 2. Second subscription with identical email
      const second = await newsletterService.subscribe(
        {
          email: "managing.director@global-bank.com",
          consent: true,
        },
        { ip: "192.168.1.11" }
      );

      expect(second.success).toBe(true);
      expect(second.isExisting).toBe(true);
      expect(second.status).toBe("SUBSCRIBED");
      expect(second.message).toContain("already subscribed");

      // Verify no extra email job was created for active subscriber duplicate
      expect(jobQueue.getQueueLength()).toBe(0);
    });

    it("should reactivate previously unsubscribed user and enqueue reactivation job", async () => {
      // 1. Subscribe
      const sub = await newsletterService.subscribe(
        {
          email: "officer@defense-conglomerate.com",
          consent: true,
        },
        { ip: "192.168.1.12" }
      );

      const subscriberRecord = (await newsletterService.listSubscribers({
        status: "ALL",
        search: "officer@defense-conglomerate.com",
        page: 1,
        limit: 10,
      })).subscribers[0];

      // 2. Unsubscribe
      await newsletterService.unsubscribe(subscriberRecord.unsubscribeToken, "TOO_FREQUENT");
      jobQueue.clear();

      // 3. Re-subscribe
      const resub = await newsletterService.subscribe(
        {
          email: "officer@defense-conglomerate.com",
          consent: true,
        },
        { ip: "192.168.1.12" }
      );

      expect(resub.success).toBe(true);
      expect(resub.isExisting).toBe(true);
      expect(resub.status).toBe("SUBSCRIBED");
      expect(resub.message).toContain("reactivated");

      // Verify a reactivation background job was enqueued
      expect(jobQueue.getQueueLength()).toBe(1);
      const job = jobQueue.getJob(resub.enqueuedJobId!);
      expect(job?.type).toBe("REACTIVATION_EMAIL");
    });
  });

  describe("3. Background Job & Worker Execution", () => {
    it("should process queued jobs asynchronously without blocking HTTP caller", async () => {
      // Enqueue 3 separate jobs
      await jobQueue.enqueue("WELCOME_EMAIL", {
        subscriberId: "sub_1",
        email: "lead1@enterprise.com",
        unsubscribeToken: "token_1",
      });
      await jobQueue.enqueue("WELCOME_EMAIL", {
        subscriberId: "sub_2",
        email: "lead2@enterprise.com",
        unsubscribeToken: "token_2",
      });
      await jobQueue.enqueue("REACTIVATION_EMAIL", {
        subscriberId: "sub_3",
        email: "lead3@enterprise.com",
        unsubscribeToken: "token_3",
      });

      expect(jobQueue.getQueueLength()).toBe(3);
      expect(inMemoryDeliveryLogs.length).toBe(0);

      // Drain queue with worker
      const summary = await newsletterWorker.drainQueue();
      expect(summary.processed).toBe(3);
      expect(summary.succeeded).toBe(3);
      expect(summary.failed).toBe(0);

      expect(jobQueue.getQueueLength()).toBe(0);
      expect(inMemoryDeliveryLogs.length).toBe(3);

      const firstDelivery = inMemoryDeliveryLogs[0];
      expect(firstDelivery.to).toBe("lead1@enterprise.com");
      expect(firstDelivery.unsubscribeUrl).toContain("/unsubscribe?token=token_1");
    });

    it("should retry failed jobs up to maxAttempts", async () => {
      const job = await jobQueue.enqueue(
        "WELCOME_EMAIL",
        {
          subscriberId: "sub_err",
          email: "err@domain.com",
          unsubscribeToken: "token_err",
        },
        2 // maxAttempts
      );

      // Dequeue first time
      const dequeued1 = await jobQueue.dequeue();
      expect(dequeued1?.id).toBe(job.id);
      expect(dequeued1?.attempts).toBe(1);

      // Mark failed attempt 1 -> should re-enqueue
      const willRetry = await jobQueue.markFailed(job.id, "Network timeout");
      expect(willRetry).toBe(true);
      expect(jobQueue.getQueueLength()).toBe(1);

      // Dequeue second time
      const dequeued2 = await jobQueue.dequeue();
      expect(dequeued2?.id).toBe(job.id);
      expect(dequeued2?.attempts).toBe(2);

      // Mark failed attempt 2 -> reached maxAttempts, should permanently fail
      const willRetry2 = await jobQueue.markFailed(job.id, "Permanent reject");
      expect(willRetry2).toBe(false);
      expect(jobQueue.getQueueLength()).toBe(0);
      expect(job.status).toBe("FAILED");
    });
  });

  describe("4. Unsubscribe Architecture & RFC 8058 Support", () => {
    it("should unsubscribe subscriber by valid token and record timestamp and reason", async () => {
      const sub = await newsletterService.subscribe(
        {
          email: "executive@advisory-board.org",
          consent: true,
        },
        { ip: "192.168.1.15" }
      );

      const records = (await newsletterService.listSubscribers({
        status: "ALL",
        search: "executive@advisory-board.org",
        page: 1,
        limit: 10,
      })).subscribers;

      const token = records[0].unsubscribeToken;
      expect(token).toBeDefined();

      const unsubResult = await newsletterService.unsubscribe(token, "TOO_FREQUENT");
      expect(unsubResult.success).toBe(true);
      expect(unsubResult.isAlreadyUnsubscribed).toBe(false);
      expect(unsubResult.unsubscribedAt).toBeDefined();

      // Verify status in directory
      const updated = (await newsletterService.listSubscribers({
        status: "ALL",
        search: "executive@advisory-board.org",
        page: 1,
        limit: 10,
      })).subscribers[0];
      expect(updated.status).toBe("UNSUBSCRIBED");
      expect(updated.unsubscribeReason).toBe("TOO_FREQUENT");
    });

    it("should handle duplicate unsubscribe requests idempotently", async () => {
      const sub = await newsletterService.subscribe(
        {
          email: "director@energy-grid.gov",
          consent: true,
        },
        { ip: "192.168.1.16" }
      );

      const token = (await newsletterService.listSubscribers({
        status: "ALL",
        search: "director@energy-grid.gov",
        page: 1,
        limit: 10,
      })).subscribers[0].unsubscribeToken;

      // First unsubscribe
      await newsletterService.unsubscribe(token);

      // Second unsubscribe
      const secondUnsub = await newsletterService.unsubscribe(token);
      expect(secondUnsub.success).toBe(true);
      expect(secondUnsub.isAlreadyUnsubscribed).toBe(true);
      expect(secondUnsub.message).toContain("already unsubscribed");
    });

    it("should mask email addresses on unsubscribe lookup for privacy", async () => {
      expect(maskEmail("john.doe@enterprise.com")).toBe("j***e@enterprise.com");
      expect(maskEmail("alex@gov.org")).toBe("a***x@gov.org");
      expect(maskEmail("ab@c.com")).toBe("a***@c.com");
    });

    it("should reject invalid unsubscribe token", async () => {
      await expect(
        newsletterService.unsubscribe("unsub_nonexistent_fake_token_12345")
      ).rejects.toThrow("Invalid or expired unsubscribe token");
    });
  });

  describe("5. Rate Limiting & Bot Protection", () => {
    it("should reject rapid bot submissions under 1500ms", async () => {
      await expect(
        newsletterService.subscribe(
          {
            email: "bot@fast-crawl.com",
            consent: true,
            clientTimestamp: Date.now() - 300, // 300ms ago -> bot
          },
          { ip: "192.168.1.99" }
        )
      ).rejects.toThrow("Submission was too rapid");
    });

    it("should throttle after 5 requests from the same IP address", async () => {
      const testIp = "10.20.30.40";

      // 5 allowed hits
      for (let i = 0; i < 5; i++) {
        const check = await enforceNewsletterRateLimit(testIp, "subscribe", 5, 600);
        expect(check.allowed).toBe(true);
      }

      // 6th hit must be blocked
      const blockedCheck = await enforceNewsletterRateLimit(testIp, "subscribe", 5, 600);
      expect(blockedCheck.allowed).toBe(false);
      expect(blockedCheck.remaining).toBe(0);
      expect(blockedCheck.resetSeconds).toBeGreaterThan(0);
    });
  });

  describe("6. Admin Directory & Metric Analytics", () => {
    it("should accurately compute subscriber counts and churn rate", async () => {
      // Create 3 active and 1 unsubscribed
      await newsletterService.subscribe(
        { email: "user1@firm.com", consent: true },
        { ip: "1.1.1.1" }
      );
      await newsletterService.subscribe(
        { email: "user2@firm.com", consent: true },
        { ip: "1.1.1.2" }
      );
      await newsletterService.subscribe(
        { email: "user3@firm.com", consent: true },
        { ip: "1.1.1.3" }
      );

      const sub4 = await newsletterService.subscribe(
        { email: "user4@firm.com", consent: true },
        { ip: "1.1.1.4" }
      );

      const token4 = (await newsletterService.listSubscribers({
        status: "ALL",
        search: "user4@firm.com",
        page: 1,
        limit: 10,
      })).subscribers[0].unsubscribeToken;

      await newsletterService.unsubscribe(token4);

      const { stats } = await newsletterService.listSubscribers({
        status: "ALL",
        page: 1,
        limit: 10,
      });

      expect(stats.totalSubscribers).toBe(4);
      expect(stats.activeSubscribers).toBe(3);
      expect(stats.unsubscribedSubscribers).toBe(1);
      expect(stats.churnRatePercent).toBe(25);
    });
  });
});

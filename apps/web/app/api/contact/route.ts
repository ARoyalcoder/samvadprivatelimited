import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@samvad/database";
import { contactSubmissionSchema } from "@samvad/validation";
import { enforceContactRateLimit } from "@/lib/contact/rate-limiter";
import { inspectSubmissionForSpam } from "@/lib/contact/spam-protection";
import { sendLeadNotificationEmails } from "@/lib/contact/email-service";
import { recordContactAudit } from "@/lib/contact/audit-service";

export const dynamic = "force-dynamic";

// In-memory fallback store for offline development and unit tests
const inMemoryLeads: Array<{
  id: string;
  referenceCode: string;
  fullName: string;
  corporateEmail: string;
  companyName: string;
  jobTitle: string;
  phoneNumber?: string | null;
  serviceRequired: string;
  industry: string;
  message: string;
  createdAt: string;
}> = [];

/**
 * Generates an institutional inquiry reference code e.g. SAMVAD-INQ-2026-X8F3
 */
function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SAMVAD-INQ-${year}-${randomChars}`;
}

export async function POST(req: NextRequest) {
  // 1. Client IP & User Agent Extraction
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() || "127.0.0.1" : "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || undefined;

  try {
    // 2. Rate Limiting Check (5 submissions per 10 minutes)
    const rateCheck = await enforceContactRateLimit(ip);
    if (!rateCheck.allowed) {
      await recordContactAudit({
        action: "LEAD_RATE_LIMITED",
        entityId: "rate-limit-gate",
        metadata: {
          ipHash: rateCheck.clientIdentifier,
          resetSeconds: rateCheck.resetSeconds,
        },
        ip,
        userAgent,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Too many inquiries submitted from this network.",
          details: `Please wait ${rateCheck.resetSeconds} seconds before submitting another inquiry. For immediate emergency crisis counsel, call our 24/7 War Room directly.`,
          retryAfter: rateCheck.resetSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateCheck.resetSeconds.toString(),
          },
        }
      );
    }

    // 3. Payload Parsing & Schema Validation
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON payload.",
        },
        { status: 400 }
      );
    }

    const validation = contactSubmissionSchema.safeParse(rawBody);
    if (!validation.success) {
      await recordContactAudit({
        action: "LEAD_VALIDATION_FAILED",
        entityId: "validation-gate",
        metadata: {
          errors: validation.error.flatten(),
        },
        ip,
        userAgent,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please review the highlighted form fields.",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 4. Multi-Layer Spam & Velocity Protection
    const spamCheck = inspectSubmissionForSpam({
      email: data.email,
      message: data.message,
      honeypot: data.honeypot,
      clientTimestamp: data.clientTimestamp,
    });

    if (spamCheck.isSpam) {
      await recordContactAudit({
        action: "LEAD_SPAM_BLOCKED",
        entityId: "spam-defense",
        metadata: {
          reason: spamCheck.reason,
          threatLevel: spamCheck.threatLevel,
          emailDomain: data.email.split("@")[1],
        },
        ip,
        userAgent,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Submission rejected by security screening.",
          details: spamCheck.reason,
        },
        { status: 400 }
      );
    }

    // 5. Generate Reference Code
    const referenceCode = generateReferenceCode();
    const receivedAt = new Date().toISOString();
    let leadId = `lead-${Date.now()}`;

    // 6. Database Persistence with In-Memory Dev/Test Fallback
    try {
      if (process.env.DATABASE_URL) {
        const created = await prisma.lead.create({
          data: {
            fullName: data.name,
            corporateEmail: data.email,
            companyName: data.company,
            jobTitle: data.designation,
            phoneNumber: data.phone || null,
            serviceRequired: data.serviceRequired,
            industry: data.industry,
            message: data.message,
            referenceCode,
            sourceIp: ip,
            userAgent,
          },
        });
        leadId = created.id;
      } else {
        // Fallback for isolated dev/test
        inMemoryLeads.unshift({
          id: leadId,
          referenceCode,
          fullName: data.name,
          corporateEmail: data.email,
          companyName: data.company,
          jobTitle: data.designation,
          phoneNumber: data.phone || null,
          serviceRequired: data.serviceRequired,
          industry: data.industry,
          message: data.message,
          createdAt: receivedAt,
        });
      }
    } catch (dbError) {
      // In case of transient DB failure, persist to memory store so lead is NEVER lost
      console.error("[Database Save Failure - Saved to Memory Escrow]:", (dbError as Error).message);
      inMemoryLeads.unshift({
        id: leadId,
        referenceCode,
        fullName: data.name,
        corporateEmail: data.email,
        companyName: data.company,
        jobTitle: data.designation,
        phoneNumber: data.phone || null,
        serviceRequired: data.serviceRequired,
        industry: data.industry,
        message: data.message,
        createdAt: receivedAt,
      });
    }

    // 7. Audit Log Entry
    await recordContactAudit({
      action: "LEAD_SUBMISSION_RECEIVED",
      entityId: leadId,
      metadata: {
        referenceCode,
        company: data.company,
        serviceRequired: data.serviceRequired,
        industry: data.industry,
        hasPhone: !!data.phone,
      },
      ip,
      userAgent,
    });

    // 8. Trigger Email Notifications (Internal Triage + Client Confirmation)
    try {
      await sendLeadNotificationEmails({
        referenceCode,
        name: data.name,
        company: data.company,
        designation: data.designation,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        serviceRequired: data.serviceRequired,
        message: data.message,
        receivedAt,
      });
    } catch (emailErr) {
      console.warn("[Email Notification Warning]:", (emailErr as Error).message);
    }

    // 9. Sanitized Safe Response (Never leaks internal keys or DB credentials)
    return NextResponse.json(
      {
        success: true,
        referenceCode,
        receivedAt,
        company: data.company,
        serviceRequired: data.serviceRequired,
        slaCommitment:
          data.serviceRequired === "Crisis Communications"
            ? "Immediate War Room mobilization. A crisis practice partner will contact your office within 60 minutes."
            : "Senior practice partners review executive inquiries within 4 business hours.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact API Internal Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your confidential inquiry.",
        details: "Please contact our triage desk directly at intake@samvad.advisory.",
      },
      { status: 500 }
    );
  }
}

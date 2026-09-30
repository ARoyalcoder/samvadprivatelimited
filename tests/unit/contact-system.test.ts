import { describe, it, expect, beforeEach } from "vitest";
import {
  contactSubmissionSchema,
  contactServiceEnum,
  contactIndustryEnum,
  ContactService,
  ContactIndustry,
} from "@samvad/validation";
import {
  enforceContactRateLimit,
  hashClientIp,
  resetMemoryRateLimiter,
} from "../../apps/web/lib/contact/rate-limiter";
import { inspectSubmissionForSpam } from "../../apps/web/lib/contact/spam-protection";
import {
  sendLeadNotificationEmails,
  getDispatchedEmails,
  clearDispatchedEmails,
} from "../../apps/web/lib/contact/email-service";
import {
  recordContactAudit,
  getContactAuditTrail,
  clearContactAuditTrail,
} from "../../apps/web/lib/contact/audit-service";

describe("SAMVAD Contact & Lead-Generation Architecture", () => {
  beforeEach(() => {
    resetMemoryRateLimiter();
    clearDispatchedEmails();
    clearContactAuditTrail();
  });

  describe("1. Form Schema & Validation (contactSubmissionSchema)", () => {
    const validBaseSubmission = {
      name: "Devendra Singhania",
      company: "Bharat Sovereign Logistics Consortium",
      designation: "Chief Executive Officer & Managing Director",
      email: "d.singhania@bharatlogistics.in",
      phone: "+91 98110 99887",
      industry: "Infrastructure" as ContactIndustry,
      serviceRequired: "Strategic Communications" as ContactService,
      message:
        "We require multi-stakeholder strategic communication counsel for a forthcoming national logistics corridor expansion involving bilateral sovereign investment.",
      honeypot: "",
      clientTimestamp: Date.now() - 5000,
    };

    it("should accept valid submissions across all 7 requested service specializations", () => {
      const services = contactServiceEnum.options;
      expect(services).toEqual([
        "PR",
        "Strategic Communications",
        "Reputation Management",
        "Digital Communications",
        "Crisis Communications",
        "Advisory",
        "Other",
      ]);

      services.forEach((service) => {
        const payload = { ...validBaseSubmission, serviceRequired: service };
        const result = contactSubmissionSchema.safeParse(payload);
        expect(result.success).toBe(true);
      });
    });

    it("should accept valid submissions across all target industry sectors", () => {
      const industries = contactIndustryEnum.options;
      expect(industries.length).toBeGreaterThanOrEqual(8);

      industries.forEach((industry) => {
        const payload = { ...validBaseSubmission, industry };
        const result = contactSubmissionSchema.safeParse(payload);
        expect(result.success).toBe(true);
      });
    });

    it("should reject submissions with missing or too-short required fields", () => {
      // Missing name
      const noName = contactSubmissionSchema.safeParse({
        ...validBaseSubmission,
        name: "",
      });
      expect(noName.success).toBe(false);

      // Missing company
      const noCompany = contactSubmissionSchema.safeParse({
        ...validBaseSubmission,
        company: " ",
      });
      expect(noCompany.success).toBe(false);

      // Missing designation
      const noDesig = contactSubmissionSchema.safeParse({
        ...validBaseSubmission,
        designation: "A",
      });
      expect(noDesig.success).toBe(false);

      // Message too short (< 15 chars)
      const shortMsg = contactSubmissionSchema.safeParse({
        ...validBaseSubmission,
        message: "Need help",
      });
      expect(shortMsg.success).toBe(false);
    });

    it("should reject disposable or temporary burner email domains", () => {
      const disposableEmails = [
        "executive@tempmail.com",
        "counsel@mailinator.com",
        "chair@10minutemail.com",
        "partner@throwawaymail.com",
        "director@guerrillamail.com",
      ];

      disposableEmails.forEach((email) => {
        const result = contactSubmissionSchema.safeParse({
          ...validBaseSubmission,
          email,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.flatten().fieldErrors.email?.[0]).toContain(
            "Disposable or temporary email"
          );
        }
      });
    });

    it("should validate phone number format when provided", () => {
      // Invalid phone
      const invalidPhone = contactSubmissionSchema.safeParse({
        ...validBaseSubmission,
        phone: "abc12",
      });
      expect(invalidPhone.success).toBe(false);

      // Valid phone
      const validPhone = contactSubmissionSchema.safeParse({
        ...validBaseSubmission,
        phone: "+44 20 7946 0900",
      });
      expect(validPhone.success).toBe(true);

      // Empty phone is allowed (optional field)
      const emptyPhone = contactSubmissionSchema.safeParse({
        ...validBaseSubmission,
        phone: "",
      });
      expect(emptyPhone.success).toBe(true);
    });
  });

  describe("2. Multi-Layer Spam & Velocity Defense", () => {
    it("should trap and reject automated bot submissions via the honeypot field", () => {
      const spamCheck = inspectSubmissionForSpam({
        email: "bot@legitimate-looking.com",
        message: "Legitimate-sounding message scope for strategic communication advisory.",
        honeypot: "http://bot-automated-spammer.com",
        clientTimestamp: Date.now() - 10000,
      });

      expect(spamCheck.isSpam).toBe(true);
      expect(spamCheck.threatLevel).toBe("HIGH");
      expect(spamCheck.reason).toContain("Honeypot trap triggered");
    });

    it("should detect and reject automated submissions that occur too quickly (< 2000ms)", () => {
      // Form submitted in 450ms (typical of automated headless curl or puppeteer bots)
      const spamCheck = inspectSubmissionForSpam({
        email: "fastbot@company.com",
        message: "Legitimate-sounding message scope for strategic communication advisory.",
        honeypot: "",
        clientTimestamp: Date.now() - 450,
      });

      expect(spamCheck.isSpam).toBe(true);
      expect(spamCheck.threatLevel).toBe("HIGH");
      expect(spamCheck.reason).toContain("Submission velocity");
    });

    it("should reject spam keyword overload and excessive link stuffing", () => {
      const spamCheck = inspectSubmissionForSpam({
        email: "spammer@corporate.com",
        message:
          "Buy crypto pump now http://link1.com http://link2.com http://link3.com http://link4.com http://link5.com casino ranking!",
        honeypot: "",
        clientTimestamp: Date.now() - 15000,
      });

      expect(spamCheck.isSpam).toBe(true);
      expect(spamCheck.threatLevel).toBe("HIGH");
    });

    it("should accept valid human submissions with proper elapsed time and clean content", () => {
      const humanCheck = inspectSubmissionForSpam({
        email: "executive@tata.com",
        message:
          "We are preparing an institutional green hydrogen bond offering and require narrative positioning for institutional allocators.",
        honeypot: "",
        clientTimestamp: Date.now() - 12000, // 12 seconds
      });

      expect(humanCheck.isSpam).toBe(false);
      expect(humanCheck.threatLevel).toBe("NONE");
    });
  });

  describe("3. Sliding-Window Rate Limiting & Anonymized Hashing", () => {
    it("should generate a consistent 16-character SHA-256 hash for client IPs", () => {
      const hash1 = hashClientIp("192.168.1.100");
      const hash2 = hashClientIp("192.168.1.100");
      const hashDifferent = hashClientIp("192.168.1.101");

      expect(hash1.length).toBe(16);
      expect(hash1).toBe(hash2);
      expect(hash1).not.toBe(hashDifferent);
    });

    it("should permit up to 5 inquiries in the window and throttle the 6th", async () => {
      const testIp = "203.0.113.45";

      // 5 submissions should all be allowed
      for (let i = 1; i <= 5; i++) {
        const result = await enforceContactRateLimit(testIp, 5, 600);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(5 - i);
      }

      // 6th submission must be rejected
      const blockedResult = await enforceContactRateLimit(testIp, 5, 600);
      expect(blockedResult.allowed).toBe(false);
      expect(blockedResult.remaining).toBe(0);
      expect(blockedResult.resetSeconds).toBeGreaterThan(0);
    });
  });

  describe("4. Email Notification Service & Client Receipts", () => {
    it("should dispatch internal triage alert and client receipt acknowledgment", async () => {
      const payload = {
        referenceCode: "SAMVAD-INQ-2026-TEST",
        name: "Aaditya Birla",
        company: "Aditya Capital Corp",
        designation: "Chairman",
        email: "a.birla@adityacapital.com",
        phone: "+91 22 6600 0000",
        industry: "Financial Services",
        serviceRequired: "Crisis Communications",
        message: "Urgent advisory required for an unscheduled regulatory audit.",
        receivedAt: new Date().toISOString(),
      };

      const dispatchResult = await sendLeadNotificationEmails(payload);
      expect(dispatchResult.success).toBe(true);
      expect(dispatchResult.internalDispatchId).toBeTruthy();
      expect(dispatchResult.clientDispatchId).toBeTruthy();

      const history = getDispatchedEmails();
      expect(history.length).toBe(2);

      // Check Internal Alert
      const internalAlert = history.find((h) => h.type === "INTERNAL_TRIAGE");
      expect(internalAlert).toBeDefined();
      expect(internalAlert?.subject).toContain("Aditya Capital Corp");
      expect(internalAlert?.subject).toContain("Crisis Communications");
      expect(internalAlert?.referenceCode).toBe("SAMVAD-INQ-2026-TEST");

      // Check Client Receipt
      const clientReceipt = history.find((h) => h.type === "CLIENT_CONFIRMATION");
      expect(clientReceipt).toBeDefined();
      expect(clientReceipt?.recipient).toBe("a.birla@adityacapital.com");
      expect(clientReceipt?.referenceCode).toBe("SAMVAD-INQ-2026-TEST");
    });
  });

  describe("5. Audit Logging Service & Security Trail", () => {
    it("should record immutable audit logs with hashed IP and metadata", async () => {
      const auditEntry = await recordContactAudit({
        action: "LEAD_SUBMISSION_RECEIVED",
        entityId: "lead-test-01",
        metadata: {
          referenceCode: "SAMVAD-INQ-2026-X99",
          company: "National Grid Corp",
          serviceRequired: "PR",
        },
        ip: "10.0.0.50",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      });

      expect(auditEntry.id).toBeTruthy();
      expect(auditEntry.action).toBe("LEAD_SUBMISSION_RECEIVED");
      expect(auditEntry.ipHash.length).toBe(16);
      expect(auditEntry.metadata.company).toBe("National Grid Corp");

      const trail = getContactAuditTrail();
      expect(trail.length).toBe(1);
      expect(trail[0]?.id).toBe(auditEntry.id);
    });

    it("should log security events when rate limits or spam defenses trigger", async () => {
      await recordContactAudit({
        action: "LEAD_RATE_LIMITED",
        entityId: "rate-limit-gate",
        metadata: { resetSeconds: 300 },
        ip: "192.0.2.1",
      });

      await recordContactAudit({
        action: "LEAD_SPAM_BLOCKED",
        entityId: "spam-defense",
        metadata: { reason: "Honeypot triggered" },
        ip: "192.0.2.2",
      });

      const trail = getContactAuditTrail();
      expect(trail.length).toBe(2);
      expect(trail.some((e) => e.action === "LEAD_RATE_LIMITED")).toBe(true);
      expect(trail.some((e) => e.action === "LEAD_SPAM_BLOCKED")).toBe(true);
    });
  });
});

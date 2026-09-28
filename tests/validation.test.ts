import { describe, it, expect } from "vitest";
import { leadSubmissionSchema, serverEnvSchema } from "@samvad/validation";

describe("Enterprise Lead Submission Validation", () => {
  it("should successfully validate a well-formed executive inquiry", () => {
    const validPayload = {
      fullName: "Ambassador K. Nair",
      corporateEmail: "k.nair@sovereigncapital.org",
      companyName: "Sovereign Strategic Holdings",
      jobTitle: "Senior Strategic Advisor",
      phoneNumber: "+91 98765 43210",
      serviceInterest: "PERCEPTION_INTELLIGENCE",
      industry: "DEFENSE_AEROSPACE",
      estimatedBudgetRange: "250K_500K",
      message:
        "Requesting a discrete briefing on multi-jurisdictional defense perception modeling ahead of Q4 parliament hearings.",
    };

    const result = leadSubmissionSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("should reject disposable / temporary email addresses", () => {
    const disposablePayload = {
      fullName: "John Doe",
      corporateEmail: "scam@tempmail.com",
      companyName: "Fake Org",
      serviceInterest: "CRISIS_REPUTATION",
      industry: "FINTECH_BFSI",
      message: "Short inquiry message here for testing purposes.",
    };

    const result = leadSubmissionSchema.safeParse(disposablePayload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0]?.message).toContain("Temporary or disposable");
    }
  });

  it("should reject inquiry if message is too brief", () => {
    const briefPayload = {
      fullName: "Jane Doe",
      corporateEmail: "jane@enterprise.com",
      companyName: "Valid Enterprise",
      serviceInterest: "STRATEGIC_COMMUNICATIONS",
      industry: "HEALTHCARE_PHARMA",
      message: "Hi there",
    };

    const result = leadSubmissionSchema.safeParse(briefPayload);
    expect(result.success).toBe(false);
  });
});

describe("Environment Schema Validation", () => {
  it("should validate complete server environment configuration", () => {
    const validEnv = {
      NODE_ENV: "production",
      PORT: 3000,
      DATABASE_URL: "postgresql://user:pass@localhost:5432/db",
      REDIS_URL: "redis://localhost:6379",
      ADMIN_API_KEY: "super_secure_key_with_at_least_16_characters",
      CORS_ALLOWED_ORIGINS: "https://samvadadvisory.com",
      RATE_LIMIT_MAX_REQUESTS: 100,
      RATE_LIMIT_WINDOW_SECONDS: 60,
      LOG_LEVEL: "info",
    };

    const result = serverEnvSchema.safeParse(validEnv);
    expect(result.success).toBe(true);
  });

  it("should reject weak or short ADMIN_API_KEY", () => {
    const weakEnv = {
      NODE_ENV: "production",
      PORT: 3000,
      DATABASE_URL: "postgresql://user:pass@localhost:5432/db",
      REDIS_URL: "redis://localhost:6379",
      ADMIN_API_KEY: "short",
    };

    const result = serverEnvSchema.safeParse(weakEnv);
    expect(result.success).toBe(false);
  });
});

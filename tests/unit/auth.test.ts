import { describe, it, expect } from "vitest";
import {
  hashPassword,
  verifyPassword,
  signSessionToken,
  verifySessionToken,
  hasPermission,
  verifyApiKey,
} from "@samvad/auth";

describe("Enterprise Authentication & RBAC Engine", () => {
  it("should securely hash and verify passwords using PBKDF2 with unique salts", () => {
    const rawPassword = "ExecutiveSecurePassphrase2026!";
    const hashed = hashPassword(rawPassword);

    expect(hashed).toContain(":");
    expect(verifyPassword(rawPassword, hashed)).toBe(true);
    expect(verifyPassword("WrongPassword123", hashed)).toBe(false);
  });

  it("should generate and verify tamper-proof session tokens", () => {
    const secret = "test_enterprise_secret_key_with_sufficient_entropy_64b";
    const payload = {
      userId: "user_advisory_001",
      email: "partner@samvadadvisory.com",
      role: "SUPER_ADMIN" as const,
    };

    const token = signSessionToken(payload, secret, 3600);
    const verified = verifySessionToken(token, secret);

    expect(verified).not.toBeNull();
    expect(verified?.userId).toBe(payload.userId);
    expect(verified?.email).toBe(payload.email);
    expect(verified?.role).toBe(payload.role);
  });

  it("should reject tampered or corrupted session tokens", () => {
    const secret = "test_enterprise_secret_key_with_sufficient_entropy_64b";
    const payload = {
      userId: "user_advisory_001",
      email: "partner@samvadadvisory.com",
      role: "ANALYST" as const,
    };

    const token = signSessionToken(payload, secret, 3600);
    const tampered = token.slice(0, -1) + (token.endsWith("a") ? "b" : "a");
    const verified = verifySessionToken(tampered, secret);

    expect(verified).toBeNull();
  });

  it("should accurately enforce role-based permissions", () => {
    expect(hasPermission("SUPER_ADMIN", "system:config")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "leads:export")).toBe(true);
    expect(hasPermission("ANALYST", "system:config")).toBe(false);
    expect(hasPermission("ANALYST", "leads:read")).toBe(true);
    expect(hasPermission("EDITOR", "content:publish")).toBe(true);
    expect(hasPermission("EDITOR", "leads:read")).toBe(false);
  });

  it("should perform constant-time comparison for API keys", () => {
    const realKey = "samvad_live_api_key_secure_entropy_991823";
    expect(verifyApiKey(realKey, realKey)).toBe(true);
    expect(verifyApiKey("wrong_key", realKey)).toBe(false);
  });
});

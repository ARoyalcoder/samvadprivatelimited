import { describe, it, expect, beforeEach } from "vitest";
import {
  hashPassword,
  verifyPassword,
  isAccountLocked,
  MAX_FAILED_LOGIN_ATTEMPTS,
  ACCOUNT_LOCKOUT_DURATION_MS,
  generateMfaSecret,
  generateTotpToken,
  verifyTotpToken,
  generateBackupCodes,
  verifyBackupCode,
  signMfaChallengeToken,
  verifyMfaChallengeToken,
  signSessionToken,
  verifySessionToken,
  createSessionCookieHeader,
  createClearSessionCookieHeader,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  getPermissionsForRole,
  authenticateSession,
  authorizeRole,
  authorizePermission,
  authorizeAllPermissions,
  authorizeAnyPermission,
  base32Encode,
  base32Decode,
  AuthRole,
  Permission,
} from "@samvad/auth";
import { adminAuthService } from "../../apps/admin/lib/auth/auth-service";

describe("SAMVAD Advisory - Secure Admin Authentication & RBAC Architecture", () => {
  const TEST_SECRET = "super_secure_enterprise_advisory_secret_key_samvad_2026_rbac_guard";

  beforeEach(() => {
    adminAuthService.resetInMemoryStore();
  });

  /* -------------------------------------------------------------------------- */
  /* 1. Cryptographic Password Hashing (PBKDF2 SHA-512, 100k rounds)           */
  /* -------------------------------------------------------------------------- */
  describe("1. Password Security & PBKDF2 Hashing", () => {
    it("should never store plaintext passwords and use unique salts", () => {
      const plaintext = "ExecutiveConfidentialPassphrase#2026";
      const hash1 = hashPassword(plaintext);
      const hash2 = hashPassword(plaintext);

      // Salts must differ
      expect(hash1).not.toBe(hash2);
      expect(hash1).not.toBe(plaintext);
      expect(hash1).toContain(":");

      const [salt1, rawHash1] = hash1.split(":");
      const [salt2, rawHash2] = hash2.split(":");

      expect(salt1).toHaveLength(32); // 16 bytes hex
      expect(rawHash1).toHaveLength(128); // 64 bytes hex (SHA-512)
      expect(salt1).not.toBe(salt2);
    });

    it("should verify passwords in constant time and reject invalid attempts", () => {
      const password = "AdvisoryPartnerPassword2026!";
      const stored = hashPassword(password);

      expect(verifyPassword(password, stored)).toBe(true);
      expect(verifyPassword("WrongPassword123", stored)).toBe(false);
      expect(verifyPassword("", stored)).toBe(false);
      expect(verifyPassword(password, "")).toBe(false);
      expect(verifyPassword(password, "malformed_hash_without_salt")).toBe(false);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 2. Role-Based Access Control (RBAC) & Granular Permissions                 */
  /* -------------------------------------------------------------------------- */
  describe("2. RBAC Matrix & Granular Permission Validation", () => {
    it("should grant SUPER_ADMIN unrestricted governance and system management", () => {
      const role: AuthRole = "SUPER_ADMIN";
      expect(hasPermission(role, "system:manage")).toBe(true);
      expect(hasPermission(role, "users:manage")).toBe(true);
      expect(hasPermission(role, "audit:read")).toBe(true);
      expect(hasPermission(role, "leads:export")).toBe(true);
      expect(hasPermission(role, "content:publish")).toBe(true);
      expect(hasPermission(role, "subscribers:manage")).toBe(true);

      expect(
        hasAllPermissions(role, [
          "system:manage",
          "users:manage",
          "audit:read",
          "leads:export",
          "content:publish",
        ])
      ).toBe(true);
    });

    it("should grant CONTENT_ADMIN broad content governance without platform/system config", () => {
      const role: AuthRole = "CONTENT_ADMIN";
      expect(hasPermission(role, "content:create")).toBe(true);
      expect(hasPermission(role, "content:publish")).toBe(true);
      expect(hasPermission(role, "content:delete")).toBe(true);
      expect(hasPermission(role, "media:upload")).toBe(true);
      expect(hasPermission(role, "subscribers:manage")).toBe(true);
      expect(hasPermission(role, "leads:read")).toBe(true);

      // Must NOT have platform system configuration or user management
      expect(hasPermission(role, "system:manage")).toBe(false);
      expect(hasPermission(role, "users:manage")).toBe(false);
      expect(hasPermission(role, "leads:export")).toBe(false);
    });

    it("should grant EDITOR editorial draft and publication rights, but block lead export and deletion", () => {
      const role: AuthRole = "EDITOR";
      expect(hasPermission(role, "content:create")).toBe(true);
      expect(hasPermission(role, "content:publish")).toBe(true);
      expect(hasPermission(role, "media:upload")).toBe(true);
      expect(hasPermission(role, "leads:read")).toBe(false);

      // Must NOT have content deletion or lead export or user management
      expect(hasPermission(role, "content:delete")).toBe(false);
      expect(hasPermission(role, "leads:export")).toBe(false);
      expect(hasPermission(role, "users:manage")).toBe(false);
      expect(hasPermission(role, "system:manage")).toBe(false);
    });

    it("should restrict AUTHOR to drafting and editing without publish or deletion authority", () => {
      const role: AuthRole = "AUTHOR";
      expect(hasPermission(role, "content:create")).toBe(true);
      expect(hasPermission(role, "content:draft")).toBe(true);
      expect(hasPermission(role, "content:edit")).toBe(true);
      expect(hasPermission(role, "media:upload")).toBe(true);

      // Must NOT have publishing authority
      expect(hasPermission(role, "content:publish")).toBe(false);
      expect(hasPermission(role, "content:delete")).toBe(false);
      expect(hasPermission(role, "leads:read")).toBe(false);
      expect(hasPermission(role, "subscribers:manage")).toBe(false);
      expect(hasPermission(role, "system:manage")).toBe(false);
    });

    it("should grant ANALYST read-only intelligence and export capabilities", () => {
      const role: AuthRole = "ANALYST";
      expect(hasPermission(role, "leads:read")).toBe(true);
      expect(hasPermission(role, "leads:export")).toBe(true);
      expect(hasPermission(role, "subscribers:read")).toBe(true);
      expect(hasPermission(role, "subscribers:export")).toBe(true);
      expect(hasPermission(role, "audit:read")).toBe(true);

      // Must NOT have content publishing, deletion, or user management
      expect(hasPermission(role, "content:publish")).toBe(false);
      expect(hasPermission(role, "content:delete")).toBe(false);
      expect(hasPermission(role, "system:manage")).toBe(false);
      expect(hasPermission(role, "users:manage")).toBe(false);
    });

    it("should properly evaluate hasAnyPermission and getPermissionsForRole", () => {
      const authorPermissions = getPermissionsForRole("AUTHOR");
      expect(authorPermissions).toContain("content:create");
      expect(authorPermissions).not.toContain("content:publish");

      expect(hasAnyPermission("AUTHOR", ["content:publish", "content:edit"])).toBe(true);
      expect(hasAnyPermission("AUTHOR", ["system:manage", "users:manage"])).toBe(false);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 3. Account Lockout Policy & Defense Mechanics                             */
  /* -------------------------------------------------------------------------- */
  describe("3. Account Lockout Policy (5 Attempts, 15 Minutes)", () => {
    it("should not lock account with fewer than 5 failed attempts", () => {
      const status = isAccountLocked(4, null);
      expect(status.isLocked).toBe(false);
      expect(status.remainingMinutes).toBe(0);
      expect(status.lockedUntil).toBeNull();
    });

    it("should trigger lock on 5 failed attempts with 15 minutes lockout duration", () => {
      const now = Date.now();
      const status = isAccountLocked(MAX_FAILED_LOGIN_ATTEMPTS, null, now);

      expect(status.isLocked).toBe(true);
      expect(status.remainingMinutes).toBe(15);
      expect(status.lockedUntil?.getTime()).toBeGreaterThan(now);
      expect(status.lockedUntil?.getTime()).toBeLessThanOrEqual(
        now + ACCOUNT_LOCKOUT_DURATION_MS + 1000
      );
    });

    it("should maintain lock if lockedUntil is still in the future", () => {
      const now = Date.now();
      const futureLock = new Date(now + 10 * 60 * 1000); // 10 mins remaining
      const status = isAccountLocked(2, futureLock, now);

      expect(status.isLocked).toBe(true);
      expect(status.remainingMinutes).toBe(10);
    });

    it("should automatically unlock once lockout duration expires", () => {
      const now = Date.now();
      const expiredLock = new Date(now - 1000); // expired 1s ago
      const status = isAccountLocked(2, expiredLock, now);

      expect(status.isLocked).toBe(false);
      expect(status.remainingMinutes).toBe(0);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 4. MFA-Ready Architecture (RFC 6238 TOTP & Emergency Backup Codes)        */
  /* -------------------------------------------------------------------------- */
  describe("4. Multi-Factor Authentication (TOTP & Emergency Backup Codes)", () => {
    it("should encode and decode RFC 4648 Base32 strings accurately", () => {
      const originalBuffer = Buffer.from("EnterpriseSecurity2026");
      const base32 = base32Encode(originalBuffer);
      const decoded = base32Decode(base32);

      expect(decoded.toString("utf-8")).toBe("EnterpriseSecurity2026");
    });

    it("should generate and verify RFC 6238 TOTP 6-digit tokens with window tolerance", () => {
      const secret = generateMfaSecret();
      expect(secret).toBeTruthy();
      expect(typeof secret).toBe("string");

      const now = Date.now();
      const validToken = generateTotpToken(secret, now);
      expect(validToken).toMatch(/^\d{6}$/);

      // Verify current step
      expect(verifyTotpToken(validToken, secret, 1, now)).toBe(true);

      // Verify token generated 30s ago (within +/- 1 window tolerance)
      const pastToken = generateTotpToken(secret, now - 30000);
      expect(verifyTotpToken(pastToken, secret, 1, now)).toBe(true);

      // Reject token outside window tolerance (+/- 3 steps = 90s away)
      const distantToken = generateTotpToken(secret, now - 90000);
      expect(verifyTotpToken(distantToken, secret, 1, now)).toBe(false);

      // Reject invalid token
      expect(verifyTotpToken("999999", secret, 1, now)).toBe(false);
    });

    it("should generate single-use emergency backup codes and consume them exactly once", () => {
      const { plaintextCodes, hashedCodes } = generateBackupCodes(10);

      expect(plaintextCodes).toHaveLength(10);
      expect(hashedCodes).toHaveLength(10);
      expect(plaintextCodes[0]).toMatch(/^[A-F0-9]{4}-[A-F0-9]{4}$/);

      const codeToUse = plaintextCodes[0]!;

      // 1. First verification: must succeed and reduce remaining codes count
      const result1 = verifyBackupCode(codeToUse, hashedCodes);
      expect(result1.valid).toBe(true);
      expect(result1.remainingHashedCodes).toHaveLength(9);

      // 2. Second verification with consumed list: must fail (cannot be re-used)
      const result2 = verifyBackupCode(codeToUse, result1.remainingHashedCodes);
      expect(result2.valid).toBe(false);
      expect(result2.remainingHashedCodes).toHaveLength(9);

      // 3. Reject invalid backup code
      const invalidResult = verifyBackupCode("INVALID-CODE", hashedCodes);
      expect(invalidResult.valid).toBe(false);
    });

    it("should sign and verify temporary MFA challenge tokens", () => {
      const challengeToken = signMfaChallengeToken(
        {
          userId: "usr_super_admin_01",
          email: "admin@samvadadvisory.com",
          role: "SUPER_ADMIN",
        },
        TEST_SECRET,
        300
      );

      const verified = verifyMfaChallengeToken(challengeToken, TEST_SECRET);
      expect(verified).not.toBeNull();
      expect(verified?.userId).toBe("usr_super_admin_01");
      expect(verified?.email).toBe("admin@samvadadvisory.com");
      expect(verified?.role).toBe("SUPER_ADMIN");

      // Reject tampered challenge token
      const tampered = challengeToken + "bad";
      expect(verifyMfaChallengeToken(tampered, TEST_SECRET)).toBeNull();
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 5. Secure Session Management & Cookies                                     */
  /* -------------------------------------------------------------------------- */
  describe("5. Session Signing, Expiration & Cookie Headers", () => {
    it("should generate and verify tamper-proof HMAC-SHA256 session tokens", () => {
      const payload = {
        userId: "usr_partner_99",
        email: "partner@samvadadvisory.com",
        role: "CONTENT_ADMIN" as const,
      };

      const token = signSessionToken(payload, TEST_SECRET, 3600);
      const verified = verifySessionToken(token, TEST_SECRET);

      expect(verified).not.toBeNull();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.email).toBe(payload.email);
      expect(verified?.role).toBe(payload.role);
    });

    it("should reject expired session tokens", () => {
      const payload = {
        userId: "usr_partner_99",
        email: "partner@samvadadvisory.com",
        role: "ANALYST" as const,
      };

      // Expired -10 seconds ago
      const expiredToken = signSessionToken(payload, TEST_SECRET, -10);
      const verified = verifySessionToken(expiredToken, TEST_SECRET);

      expect(verified).toBeNull();
    });

    it("should reject tampered session tokens", () => {
      const payload = {
        userId: "usr_partner_99",
        email: "partner@samvadadvisory.com",
        role: "EDITOR" as const,
      };

      const token = signSessionToken(payload, TEST_SECRET, 3600);
      const [data, sig] = token.split(".");
      const tamperedToken = `${data}.${sig}a`;

      expect(verifySessionToken(tamperedToken, TEST_SECRET)).toBeNull();
    });

    it("should construct secure Set-Cookie headers with HttpOnly, Secure, and SameSite=Strict", () => {
      const cookieHeader = createSessionCookieHeader("sample_token_xyz");
      expect(cookieHeader).toContain("samvad_admin_session=sample_token_xyz");
      expect(cookieHeader).toContain("HttpOnly");
      expect(cookieHeader).toContain("Secure");
      expect(cookieHeader).toContain("SameSite=Strict");
      expect(cookieHeader).toContain("Path=/");
      expect(cookieHeader).toContain("Max-Age=86400");

      const clearHeader = createClearSessionCookieHeader();
      expect(clearHeader).toContain("samvad_admin_session=");
      expect(clearHeader).toContain("Max-Age=0");
      expect(clearHeader).toContain("Expires=Thu, 01 Jan 1970");
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 6. Reusable Authorization Helpers                                         */
  /* -------------------------------------------------------------------------- */
  describe("6. Reusable Authorization Helpers", () => {
    it("should authenticate valid session tokens and reject unauthenticated requests", () => {
      const validToken = signSessionToken(
        {
          userId: "usr_analyst_01",
          email: "analyst@samvadadvisory.com",
          role: "ANALYST",
        },
        TEST_SECRET
      );

      const authSuccess = authenticateSession(validToken, TEST_SECRET);
      expect(authSuccess.authenticated).toBe(true);
      expect(authSuccess.user?.email).toBe("analyst@samvadadvisory.com");

      const authMissing = authenticateSession(null, TEST_SECRET);
      expect(authMissing.authenticated).toBe(false);
      expect(authMissing.error).toBe("NO_SESSION_TOKEN");

      const authInvalid = authenticateSession("invalid_corrupted_token", TEST_SECRET);
      expect(authInvalid.authenticated).toBe(false);
      expect(authInvalid.error).toBe("INVALID_OR_EXPIRED_SESSION");
    });

    it("should check role authorization", () => {
      expect(authorizeRole("SUPER_ADMIN", ["SUPER_ADMIN", "CONTENT_ADMIN"])).toBe(true);
      expect(authorizeRole("ANALYST", ["SUPER_ADMIN", "CONTENT_ADMIN"])).toBe(false);
    });

    it("should check permission authorization", () => {
      expect(authorizePermission("SUPER_ADMIN", "system:manage")).toBe(true);
      expect(authorizePermission("EDITOR", "content:publish")).toBe(true);
      expect(authorizePermission("AUTHOR", "content:publish")).toBe(false);
      expect(
        authorizeAllPermissions("CONTENT_ADMIN", ["content:create", "content:publish"])
      ).toBe(true);
      expect(
        authorizeAnyPermission("AUTHOR", ["content:publish", "content:create"])
      ).toBe(true);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 7. End-to-End Admin Auth Service Workflows                                 */
  /* -------------------------------------------------------------------------- */
  describe("7. End-to-End Admin Auth Service Workflows & Audit Logging", () => {
    it("should authenticate valid admin credentials and record LOGIN_SUCCESS in audit log", async () => {
      const result = await adminAuthService.login({
        email: "admin@samvadadvisory.com",
        password: "AdminSecurePassphrase2026!",
        ip: "10.0.0.1",
      });

      expect(result.success).toBe(true);
      expect(result.mfaRequired).toBe(false);
      expect(result.sessionToken).toBeTruthy();
      expect(result.user?.role).toBe("SUPER_ADMIN");
      expect(result.user?.permissions).toContain("system:manage");

      // Verify audit trail entry
      const auditLogs = await adminAuthService.getAuditLogs(5);
      const loginLog = auditLogs.find((l) => l.action === "LOGIN_SUCCESS");
      expect(loginLog).toBeTruthy();
      expect(loginLog?.userId).toBe("usr_super_admin_01");
      expect(loginLog?.ipAddress).toBe("10.0.0.1");
    });

    it("should increment failed attempts and lock account after 5 consecutive failures", async () => {
      const email = "analyst@samvadadvisory.com";

      // Attempts 1 to 4: Failures with remaining attempts
      for (let i = 1; i <= 4; i++) {
        const attempt = await adminAuthService.login({
          email,
          password: "WrongPassword!",
          ip: "10.0.0.5",
        });
        expect(attempt.success).toBe(false);
        expect(attempt.locked).toBeFalsy();
        expect(attempt.remainingAttempts).toBe(5 - i);
      }

      // 5th attempt: Triggers account lockout
      const fifthAttempt = await adminAuthService.login({
        email,
        password: "WrongPassword!",
        ip: "10.0.0.5",
      });

      expect(fifthAttempt.success).toBe(false);
      expect(fifthAttempt.locked).toBe(true);
      expect(fifthAttempt.remainingMinutes).toBe(15);

      // Verify audit logs recorded ACCOUNT_LOCKED
      const auditLogs = await adminAuthService.getAuditLogs(10);
      const lockLog = auditLogs.find((l) => l.action === "ACCOUNT_LOCKED");
      expect(lockLog).toBeTruthy();

      // Subsequent attempt even with correct password is blocked while locked
      const blockedAttempt = await adminAuthService.login({
        email,
        password: "AdminSecurePassphrase2026!",
        ip: "10.0.0.5",
      });
      expect(blockedAttempt.success).toBe(false);
      expect(blockedAttempt.locked).toBe(true);
    });

    it("should handle MFA challenge and verification for MFA-enabled accounts", async () => {
      const secret = generateMfaSecret();
      const { plaintextCodes, hashedCodes } = generateBackupCodes(5);

      // Provision user with MFA enabled
      const user = await adminAuthService.findUserByEmail("content@samvadadvisory.com");
      expect(user).toBeTruthy();
      user!.mfaEnabled = true;
      user!.mfaSecret = secret;
      user!.mfaBackupCodes = hashedCodes;
      await adminAuthService.saveUser(user!);

      // 1. Initial Login: Expect MFA Challenge
      const loginResult = await adminAuthService.login({
        email: "content@samvadadvisory.com",
        password: "AdminSecurePassphrase2026!",
        ip: "192.168.1.100",
      });

      expect(loginResult.success).toBe(true);
      expect(loginResult.mfaRequired).toBe(true);
      expect(loginResult.challengeToken).toBeTruthy();

      const challengeToken = loginResult.challengeToken!;

      // 2. MFA Verification with Invalid Code: Expect failure
      const failedMfa = await adminAuthService.verifyMfa({
        challengeToken,
        code: "000000",
        ip: "192.168.1.100",
      });
      expect(failedMfa.success).toBe(false);
      expect(failedMfa.error).toContain("Invalid 6-digit");

      // 3. MFA Verification with Valid TOTP Code: Expect success
      const validTotp = generateTotpToken(secret);
      const successMfa = await adminAuthService.verifyMfa({
        challengeToken,
        code: validTotp,
        ip: "192.168.1.100",
      });

      expect(successMfa.success).toBe(true);
      expect(successMfa.sessionToken).toBeTruthy();
      expect(successMfa.user?.role).toBe("CONTENT_ADMIN");

      // 4. Emergency Backup Code Verification
      const backupResult = await adminAuthService.verifyMfa({
        challengeToken,
        code: plaintextCodes[0]!,
        isBackupCode: true,
        ip: "192.168.1.100",
      });

      expect(backupResult.success).toBe(true);
      expect(backupResult.sessionToken).toBeTruthy();
    });

    it("should handle logout and record audit trail", async () => {
      const login = await adminAuthService.login({
        email: "editor@samvadadvisory.com",
        password: "AdminSecurePassphrase2026!",
      });

      expect(login.sessionToken).toBeTruthy();

      const logoutResult = await adminAuthService.logout(
        login.sessionToken,
        "10.0.0.9",
        "Vitest-Agent"
      );
      expect(logoutResult.success).toBe(true);

      const logs = await adminAuthService.getAuditLogs(5);
      const logoutLog = logs.find((l) => l.action === "LOGOUT");
      expect(logoutLog).toBeTruthy();
      expect(logoutLog?.userId).toBe("usr_editor_03");
    });
  });
});

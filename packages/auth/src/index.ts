import {
  createHash,
  createHmac,
  pbkdf2,
  pbkdf2Sync,
  randomBytes,
  timingSafeEqual,
} from "crypto";
import { promisify } from "util";

const pbkdf2Async = promisify(pbkdf2);

export type AuthRole =
  | "SUPER_ADMIN"
  | "CONTENT_ADMIN"
  | "EDITOR"
  | "AUTHOR"
  | "ANALYST"
  | "COMMUNICATIONS_DIRECTOR"
  | "SENIOR_ADVISOR";

export type Permission =
  | "system:manage"
  | "system:config"
  | "users:manage"
  | "audit:read"
  | "leads:read"
  | "leads:write"
  | "leads:export"
  | "content:create"
  | "content:draft"
  | "content:edit"
  | "content:publish"
  | "content:delete"
  | "media:upload"
  | "media:delete"
  | "subscribers:read"
  | "subscribers:manage"
  | "subscribers:export";

export const ROLE_PERMISSIONS: Record<AuthRole, Permission[]> = {
  SUPER_ADMIN: [
    "system:manage",
    "system:config",
    "users:manage",
    "audit:read",
    "leads:read",
    "leads:write",
    "leads:export",
    "content:create",
    "content:draft",
    "content:edit",
    "content:publish",
    "content:delete",
    "media:upload",
    "media:delete",
    "subscribers:read",
    "subscribers:manage",
    "subscribers:export",
  ],
  CONTENT_ADMIN: [
    "leads:read",
    "leads:write",
    "content:create",
    "content:draft",
    "content:edit",
    "content:publish",
    "content:delete",
    "media:upload",
    "media:delete",
    "subscribers:read",
    "subscribers:manage",
    "subscribers:export",
    "audit:read",
  ],
  EDITOR: [
    "content:create",
    "content:draft",
    "content:edit",
    "content:publish",
    "media:upload",
    "subscribers:read",
  ],
  AUTHOR: [
    "content:create",
    "content:draft",
    "content:edit",
    "media:upload",
  ],
  ANALYST: [
    "leads:read",
    "leads:export",
    "subscribers:read",
    "subscribers:export",
    "audit:read",
    "content:draft",
  ],
  // Backward compatibility aliases
  COMMUNICATIONS_DIRECTOR: [
    "leads:read",
    "leads:write",
    "leads:export",
    "content:create",
    "content:draft",
    "content:publish",
    "audit:read",
    "media:upload",
    "subscribers:read",
    "subscribers:export",
  ],
  SENIOR_ADVISOR: [
    "leads:read",
    "leads:write",
    "content:draft",
    "content:publish",
  ],
};

export function hasPermission(role: AuthRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function hasAllPermissions(
  role: AuthRole,
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((p) => hasPermission(role, p));
}

export function hasAnyPermission(
  role: AuthRole,
  candidatePermissions: Permission[]
): boolean {
  return candidatePermissions.some((p) => hasPermission(role, p));
}

export function getPermissionsForRole(role: AuthRole): Permission[] {
  return [...(ROLE_PERMISSIONS[role] || [])];
}

/* ==========================================================================
   PASSWORD HASHING & VERIFICATION (PBKDF2 SHA-512, 100,000 Rounds)
   ========================================================================== */

/**
 * Hash password with cryptographically secure PBKDF2 (100,000 rounds, SHA-512)
 * Returns formatted "salt:hash" string.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Constant-time verification of password against stored "salt:hash".
 */
export function verifyPassword(password: string, stored: string): boolean {
  if (!password || !stored) {
    return false;
  }
  const parts = stored.split(":");
  if (parts.length !== 2) {
    return false;
  }
  const [salt, originalHash] = parts;
  if (!salt || !originalHash) {
    return false;
  }
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  const hashBuf = Buffer.from(hash, "utf-8");
  const originalBuf = Buffer.from(originalHash, "utf-8");

  if (hashBuf.length !== originalBuf.length) {
    return false;
  }
  return timingSafeEqual(hashBuf, originalBuf);
}

/**
 * Non-blocking asynchronous PBKDF2 verification running on libuv worker pool.
 * Prevents main event loop starvation during concurrent administrative logins.
 */
export async function verifyPasswordAsync(password: string, stored: string): Promise<boolean> {
  if (!password || !stored) {
    return false;
  }
  const parts = stored.split(":");
  if (parts.length !== 2) {
    return false;
  }
  const [salt, originalHash] = parts;
  if (!salt || !originalHash) {
    return false;
  }
  const hashBuffer = (await pbkdf2Async(password, salt, 100000, 64, "sha512")) as Buffer;
  const hash = hashBuffer.toString("hex");
  const hashBuf = Buffer.from(hash, "utf-8");
  const originalBuf = Buffer.from(originalHash, "utf-8");

  if (hashBuf.length !== originalBuf.length) {
    return false;
  }
  return timingSafeEqual(hashBuf, originalBuf);
}

/**
 * Non-blocking asynchronous PBKDF2 password hashing.
 */
export async function hashPasswordAsync(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hashBuffer = (await pbkdf2Async(password, salt, 100000, 64, "sha512")) as Buffer;
  return `${salt}:${hashBuffer.toString("hex")}`;
}

/* ==========================================================================
   ACCOUNT LOCKOUT POLICY (5 Attempts, 15 Minutes Duration)
   ========================================================================== */

export const MAX_FAILED_LOGIN_ATTEMPTS = 5;
export const ACCOUNT_LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export interface AccountLockStatus {
  isLocked: boolean;
  remainingMinutes: number;
  lockedUntil: Date | null;
}

/**
 * Inspect account lockout state based on failed attempts and lockedUntil timestamp.
 */
export function isAccountLocked(
  failedAttempts: number,
  lockedUntil: Date | string | null | undefined,
  nowMs: number = Date.now()
): AccountLockStatus {
  if (lockedUntil) {
    const lockTime = new Date(lockedUntil).getTime();
    if (lockTime > nowMs) {
      const remainingMinutes = Math.max(1, Math.ceil((lockTime - nowMs) / 60000));
      return {
        isLocked: true,
        remainingMinutes,
        lockedUntil: new Date(lockTime),
      };
    }
  }

  if (failedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
    const unlockTime = new Date(nowMs + ACCOUNT_LOCKOUT_DURATION_MS);
    return {
      isLocked: true,
      remainingMinutes: 15,
      lockedUntil: unlockTime,
    };
  }

  return {
    isLocked: false,
    remainingMinutes: 0,
    lockedUntil: null,
  };
}

/* ==========================================================================
   MFA ENGINE (RFC 6238 TOTP & Single-Use Backup Codes)
   ========================================================================== */

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/**
 * Encode buffer into RFC 4648 Base32 string (without padding for clean authenticator URI compatibility)
 */
export function base32Encode(buffer: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = "";

  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    if (byte === undefined) continue;
    value = (value << 8) | byte;
    bits += 8;

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

/**
 * Decode RFC 4648 Base32 string to Buffer
 */
export function base32Decode(base32Str: string): Buffer {
  const cleaned = base32Str.toUpperCase().replace(/[\s=-]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned.charAt(i);
    const index = BASE32_ALPHABET.indexOf(char);
    if (index === -1) {
      continue;
    }
    value = (value << 5) | index;
    bits += 5;

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

/**
 * Generate a random Base32 secret for MFA TOTP onboarding
 */
export function generateMfaSecret(byteLength = 20): string {
  const randomBytesBuffer = randomBytes(byteLength);
  return base32Encode(randomBytesBuffer);
}

/**
 * Generate TOTP token for given Base32 secret (RFC 6238 standard: 30s step, 6 digits)
 */
export function generateTotpToken(
  secret: string,
  timestampMs: number = Date.now(),
  stepSeconds = 30,
  digits = 6
): string {
  const key = base32Decode(secret);
  const counter = Math.floor(timestampMs / 1000 / stepSeconds);

  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(counter));

  const hmac = createHmac("sha1", key).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1]! & 0x0f;

  const binaryCode =
    ((hmac[offset]! & 0x7f) << 24) |
    ((hmac[offset + 1]! & 0xff) << 16) |
    ((hmac[offset + 2]! & 0xff) << 8) |
    (hmac[offset + 3]! & 0xff);

  const otp = binaryCode % Math.pow(10, digits);
  return otp.toString().padStart(digits, "0");
}

/**
 * Verify TOTP token with +/- window tolerance (default 1 step = +/- 30s)
 */
export function verifyTotpToken(
  token: string,
  secret: string,
  windowSteps = 1,
  timestampMs: number = Date.now()
): boolean {
  if (!token || !secret) {
    return false;
  }
  const cleanToken = token.trim();
  if (cleanToken.length !== 6) {
    return false;
  }

  const stepSeconds = 30;
  for (let i = -windowSteps; i <= windowSteps; i++) {
    const checkTime = timestampMs + i * stepSeconds * 1000;
    const generated = generateTotpToken(secret, checkTime, stepSeconds, 6);
    if (
      timingSafeEqual(
        Buffer.from(cleanToken, "utf-8"),
        Buffer.from(generated, "utf-8")
      )
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Generate cryptographically secure single-use emergency backup codes.
 * Returns plaintext codes for display to admin once, and SHA-256 hashed codes for storage.
 */
export function generateBackupCodes(count = 10): {
  plaintextCodes: string[];
  hashedCodes: string[];
} {
  const plaintextCodes: string[] = [];
  const hashedCodes: string[] = [];

  for (let i = 0; i < count; i++) {
    const raw = randomBytes(4).toString("hex").toUpperCase();
    const formatted = `${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
    plaintextCodes.push(formatted);

    const hash = createHash("sha256").update(formatted).digest("hex");
    hashedCodes.push(hash);
  }

  return { plaintextCodes, hashedCodes };
}

/**
 * Verify a single-use backup code against stored hashes.
 * If valid, consumes the code and returns the remaining hashed codes list.
 */
export function verifyBackupCode(
  inputCode: string,
  storedHashedCodes: string[]
): { valid: boolean; remainingHashedCodes: string[] } {
  if (!inputCode || !Array.isArray(storedHashedCodes) || storedHashedCodes.length === 0) {
    return { valid: false, remainingHashedCodes: storedHashedCodes || [] };
  }

  const cleanCode = inputCode.trim().toUpperCase();
  const inputHash = createHash("sha256").update(cleanCode).digest("hex");

  const matchIndex = storedHashedCodes.findIndex((hash) => {
    if (hash.length !== inputHash.length) return false;
    return timingSafeEqual(Buffer.from(hash, "utf-8"), Buffer.from(inputHash, "utf-8"));
  });

  if (matchIndex === -1) {
    return { valid: false, remainingHashedCodes: storedHashedCodes };
  }

  const remaining = [...storedHashedCodes];
  remaining.splice(matchIndex, 1);
  return { valid: true, remainingHashedCodes: remaining };
}

/* ==========================================================================
   MFA CHALLENGE TOKEN (Temporary 5-minute token during 2FA prompt)
   ========================================================================== */

export interface MfaChallengePayload {
  userId: string;
  email: string;
  role: AuthRole;
  purpose: "MFA_CHALLENGE";
  iat: number;
  exp: number;
}

export function signMfaChallengeToken(
  payload: { userId: string; email: string; role: AuthRole },
  secret: string,
  expiresInSeconds = 300 // 5 minutes
): string {
  const now = Math.floor(Date.now() / 1000);
  const data: MfaChallengePayload = {
    ...payload,
    purpose: "MFA_CHALLENGE",
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encoded = Buffer.from(JSON.stringify(data)).toString("base64url");
  const sig = createHmac("sha256", secret).update(`mfa:${encoded}`).digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifyMfaChallengeToken(
  token: string,
  secret: string
): { userId: string; email: string; role: AuthRole } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encoded, providedSig] = parts;
  if (!encoded || !providedSig) return null;

  const expectedSig = createHmac("sha256", secret).update(`mfa:${encoded}`).digest("base64url");
  if (expectedSig.length !== providedSig.length) return null;

  if (
    !timingSafeEqual(
      Buffer.from(expectedSig, "utf-8"),
      Buffer.from(providedSig, "utf-8")
    )
  ) {
    return null;
  }

  try {
    const json = Buffer.from(encoded, "base64url").toString("utf-8");
    const parsed = JSON.parse(json) as MfaChallengePayload;
    const now = Math.floor(Date.now() / 1000);

    if (parsed.purpose !== "MFA_CHALLENGE" || parsed.exp < now) {
      return null;
    }

    return {
      userId: parsed.userId,
      email: parsed.email,
      role: parsed.role,
    };
  } catch {
    return null;
  }
}

/* ==========================================================================
   SESSION TOKENS & COOKIES
   ========================================================================== */

export const SESSION_COOKIE_NAME = "samvad_admin_session";
export const SESSION_MAX_AGE_SECONDS = 86400; // 24 hours

export interface SessionPayload {
  userId: string;
  email: string;
  name?: string;
  role: AuthRole;
  iat: number;
  exp: number;
}

/**
 * Sign session payload to create tamper-proof HMAC-SHA256 token.
 */
export function signSessionToken(
  payload: Omit<SessionPayload, "iat" | "exp">,
  secret: string,
  expiresInSeconds = SESSION_MAX_AGE_SECONDS
): string {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: SessionPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

/**
 * Verify session token and return parsed payload. Returns null if invalid or expired.
 */
export function verifySessionToken(token: string, secret: string): SessionPayload | null {
  if (!token || !secret) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, providedSignature] = parts;
  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");

  if (expectedSignature.length !== providedSignature.length) {
    return null;
  }

  const isValid = timingSafeEqual(
    Buffer.from(expectedSignature, "utf-8"),
    Buffer.from(providedSignature, "utf-8")
  );

  if (!isValid) {
    return null;
  }

  try {
    const jsonStr = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const payload = JSON.parse(jsonStr) as SessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Create Set-Cookie header string for enterprise admin session
 */
export function createSessionCookieHeader(
  token: string,
  maxAgeSeconds = SESSION_MAX_AGE_SECONDS
): string {
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; Secure; SameSite=Strict`;
}

/**
 * Create Set-Cookie header string to clear enterprise admin session
 */
export function createClearSessionCookieHeader(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/* ==========================================================================
   REUSABLE AUTHORIZATION HELPERS
   ========================================================================== */

export interface AuthInspectionResult {
  authenticated: boolean;
  user?: SessionPayload;
  error?: string;
}

/**
 * Reusable session authentication inspector.
 */
export function authenticateSession(
  token: string | null | undefined,
  secret: string
): AuthInspectionResult {
  if (!token) {
    return { authenticated: false, error: "NO_SESSION_TOKEN" };
  }

  const payload = verifySessionToken(token, secret);
  if (!payload) {
    return { authenticated: false, error: "INVALID_OR_EXPIRED_SESSION" };
  }

  return { authenticated: true, user: payload };
}

/**
 * Check if a user role belongs to a permitted role list.
 */
export function authorizeRole(userRole: AuthRole, allowedRoles: AuthRole[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Check if a user role has a specific permission.
 */
export function authorizePermission(userRole: AuthRole, permission: Permission): boolean {
  return hasPermission(userRole, permission);
}

/**
 * Check if a user role has all required permissions.
 */
export function authorizeAllPermissions(
  userRole: AuthRole,
  requiredPermissions: Permission[]
): boolean {
  return hasAllPermissions(userRole, requiredPermissions);
}

/**
 * Check if a user role has any of the candidate permissions.
 */
export function authorizeAnyPermission(
  userRole: AuthRole,
  candidatePermissions: Permission[]
): boolean {
  return hasAnyPermission(userRole, candidatePermissions);
}

/**
 * Constant-time API Key verification
 */
export function verifyApiKey(providedKey: string, expectedKey: string): boolean {
  if (!providedKey || !expectedKey) {
    return false;
  }
  const providedBuffer = Buffer.from(providedKey, "utf-8");
  const expectedBuffer = Buffer.from(expectedKey, "utf-8");

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export { generateBackupCodes as generateMfaBackupCodes };

export * from "./security";

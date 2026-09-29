import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

export type AuthRole =
  "SUPER_ADMIN" | "COMMUNICATIONS_DIRECTOR" | "SENIOR_ADVISOR" | "EDITOR" | "ANALYST";

export type Permission =
  | "leads:read"
  | "leads:write"
  | "leads:export"
  | "content:draft"
  | "content:publish"
  | "audit:read"
  | "system:config";

export const ROLE_PERMISSIONS: Record<AuthRole, Permission[]> = {
  SUPER_ADMIN: [
    "leads:read",
    "leads:write",
    "leads:export",
    "content:draft",
    "content:publish",
    "audit:read",
    "system:config",
  ],
  COMMUNICATIONS_DIRECTOR: [
    "leads:read",
    "leads:write",
    "leads:export",
    "content:draft",
    "content:publish",
    "audit:read",
  ],
  SENIOR_ADVISOR: ["leads:read", "leads:write", "content:draft", "content:publish"],
  EDITOR: ["content:draft", "content:publish"],
  ANALYST: ["leads:read", "content:draft"],
};

export function hasPermission(role: AuthRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function hasAllPermissions(role: AuthRole, requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every((p) => hasPermission(role, p));
}

export interface SessionPayload {
  userId: string;
  email: string;
  role: AuthRole;
  iat: number;
  exp: number;
}

/**
 * Hash password with PBKDF2 (100,000 rounds, SHA-512)
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored salt:hash
 */
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, originalHash] = stored.split(":");
  if (!salt || !originalHash) {
    return false;
  }
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return timingSafeEqual(Buffer.from(hash, "utf-8"), Buffer.from(originalHash, "utf-8"));
}

/**
 * Sign session payload to create tamper-proof token
 */
export function signSessionToken(
  payload: Omit<SessionPayload, "iat" | "exp">,
  secret: string,
  expiresInSeconds = 86400
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
 * Verify session token and return parsed payload
 */
export function verifySessionToken(token: string, secret: string): SessionPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, providedSignature] = parts;
  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");

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

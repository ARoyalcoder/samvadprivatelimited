/**
 * @samvad/auth/edge
 * 
 * Edge-runtime and browser-compatible security and auth utilities.
 * Pure Web APIs only (zero Node.js built-ins like `crypto` or `util`).
 * Safe for use in Next.js Middleware, Edge API Routes, and Cloudflare Workers.
 */

/* ==========================================================================
   1. TYPES
   ========================================================================== */

export type AuthRole =
  | "SUPER_ADMIN"
  | "CONTENT_ADMIN"
  | "EDITOR"
  | "AUTHOR"
  | "ANALYST"
  | "COMMUNICATIONS_DIRECTOR"
  | "SENIOR_ADVISOR";

export interface SessionPayload {
  userId: string;
  email: string;
  name?: string;
  role: AuthRole;
  iat: number;
  exp: number;
}

export const SESSION_COOKIE_NAME = "samvad_admin_session";
export const SESSION_MAX_AGE_SECONDS = 86400; // 24 hours

/* ==========================================================================
   2. CONTENT SECURITY POLICY & PRODUCTION HEADERS
   ========================================================================== */

export interface SecurityHeadersOptions {
  isDev?: boolean;
  cspNonce?: string;
  reportOnly?: boolean;
  isAdmin?: boolean;
  allowedConnectHosts?: string[];
  allowedImageHosts?: string[];
}

export function buildContentSecurityPolicy(options: SecurityHeadersOptions = {}): string {
  const {
    isDev = false,
    cspNonce,
    allowedConnectHosts = [],
    allowedImageHosts = [],
  } = options;

  const connectHosts = [
    "'self'",
    "https://*",
    "wss://*",
    ...allowedConnectHosts,
  ];

  const imageHosts = [
    "'self'",
    "data:",
    "blob:",
    "https://images.unsplash.com",
    "https://cdn.samvadadvisory.com",
    ...allowedImageHosts,
  ];

  const scriptDirectives = [
    "'self'",
    "'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "'wasm-unsafe-eval'",
    "https://cdn.jsdelivr.net",
  ];

  if (cspNonce) {
    scriptDirectives.push(`'nonce-${cspNonce}'`);
  }

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": scriptDirectives,
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "img-src": imageHosts,
    "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
    "connect-src": connectHosts,
    "media-src": ["'self'", "blob:", "https://*"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "block-all-mixed-content": [],
    "upgrade-insecure-requests": [],
  };

  return Object.entries(directives)
    .map(([key, values]) => {
      if (values.length === 0) return key;
      return `${key} ${values.join(" ")}`;
    })
    .join("; ");
}

export function getProductionSecurityHeaders(
  options: SecurityHeadersOptions = {}
): Record<string, string> {
  const csp = buildContentSecurityPolicy(options);
  const cspHeaderName = options.reportOnly
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";

  const headers: Record<string, string> = {
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), display-capture=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "X-Permitted-Cross-Domain-Policies": "none",
    "X-DNS-Prefetch-Control": "on",
    [cspHeaderName]: csp,
  };

  if (options.isAdmin) {
    headers["X-Robots-Tag"] = "noindex, nofollow, noarchive, nosnippet";
  }

  return headers;
}

/* ==========================================================================
   3. CORS POLICY ENFORCEMENT
   ========================================================================== */

export interface CorsConfig {
  allowedOrigins: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  allowCredentials?: boolean;
  maxAge?: number;
}

const DEFAULT_CORS_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
const DEFAULT_CORS_HEADERS = [
  "Content-Type",
  "Authorization",
  "X-Requested-With",
  "X-CSRF-Token",
  "Accept",
  "Origin",
];

export const DEFAULT_ALLOWED_ORIGINS = [
  "https://samvadadvisory.com",
  "https://admin.samvadadvisory.com",
  "https://preview.samvadadvisory.com",
  "*.samvadadvisory.com",
];

export function isOriginAllowed(
  origin: string | null | undefined,
  allowedOrigins: string[] = DEFAULT_ALLOWED_ORIGINS
): boolean {
  if (!origin) return false;
  const normalized = origin.trim().toLowerCase();

  return allowedOrigins.some((allowed) => {
    const normAllowed = allowed.trim().toLowerCase();
    if (normAllowed === "*") return true;
    if (normAllowed === normalized) return true;

    if (normAllowed.startsWith("*.")) {
      const rootDomain = normAllowed.slice(2);
      try {
        const parsed = new URL(normalized);
        return parsed.hostname.endsWith(`.${rootDomain}`) || parsed.hostname === rootDomain;
      } catch {
        return false;
      }
    }
    return false;
  });
}

export function getCorsHeaders(
  requestOrigin: string | null | undefined,
  config: Partial<CorsConfig> = {}
): Record<string, string> {
  const {
    allowedOrigins = DEFAULT_ALLOWED_ORIGINS,
    allowedMethods = DEFAULT_CORS_METHODS,
    allowedHeaders = DEFAULT_CORS_HEADERS,
    exposedHeaders = ["Content-Length", "X-CSRF-Token"],
    allowCredentials = true,
    maxAge = 86400,
  } = config;

  const allowed = isOriginAllowed(requestOrigin, allowedOrigins);
  if (!allowed || !requestOrigin) {
    return {};
  }

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": requestOrigin,
    "Access-Control-Allow-Methods": allowedMethods.join(", "),
    "Access-Control-Allow-Headers": allowedHeaders.join(", "),
    "Access-Control-Expose-Headers": exposedHeaders.join(", "),
    "Access-Control-Max-Age": maxAge.toString(),
    Vary: "Origin",
  };

  if (allowCredentials) {
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  return headers;
}

/* ==========================================================================
   4. ORIGIN & REFERER VERIFICATION (CSRF DEFENSE)
   ========================================================================== */

export function verifyOriginOrReferer(
  originOrReq: string | null | undefined | { headers: { get: (name: string) => string | null } },
  referer?: string | null | undefined,
  expectedHost?: string
): boolean {
  if (typeof originOrReq === "object" && originOrReq !== null && "headers" in originOrReq) {
    const origin = originOrReq.headers.get("origin");
    const refererVal = originOrReq.headers.get("referer");
    const host = originOrReq.headers.get("host") || "samvadadvisory.com";
    return verifyOriginOrReferer(origin, refererVal, host);
  }

  const origin = typeof originOrReq === "string" ? originOrReq : undefined;
  const cleanExpected = (expectedHost || "").trim().toLowerCase();
  if (!cleanExpected) return false;

  if (origin) {
    try {
      const parsedOrigin = new URL(origin);
      if (parsedOrigin.host.toLowerCase() === cleanExpected) return true;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const parsedReferer = new URL(referer);
      if (parsedReferer.host.toLowerCase() === cleanExpected) return true;
    } catch {
      return false;
    }
  }

  return false;
}

/* ==========================================================================
   5. WEB-CRYPTO SESSION VERIFICATION (EDGE COMPATIBLE)
   ========================================================================== */

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i] ?? 0);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return atob(base64);
}

/**
 * Constant-time string equality check to prevent timing attacks.
 */
function timingSafeEqualEdge(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Edge-compatible session token verification using Web Crypto API.
 * Validates HMAC-SHA256 signatures generated by Node.js crypto or Web Crypto.
 */
export async function verifySessionTokenEdge(
  token: string,
  secret: string
): Promise<SessionPayload | null> {
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

  try {
    const encoder = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const sigBuffer = await globalThis.crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(encodedPayload)
    );

    const expectedSignature = arrayBufferToBase64Url(sigBuffer);

    if (!timingSafeEqualEdge(expectedSignature, providedSignature)) {
      return null;
    }

    const jsonStr = base64UrlDecode(encodedPayload);
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

// Alias for convenience
export const verifySessionToken = verifySessionTokenEdge;

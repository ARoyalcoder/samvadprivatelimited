import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "crypto";

/* ==========================================================================
   1. PRODUCTION SECURITY HEADERS & CONTENT SECURITY POLICY (CSP)
   ========================================================================== */

export interface SecurityHeadersOptions {
  isDev?: boolean;
  cspNonce?: string;
  reportOnly?: boolean;
  isAdmin?: boolean;
  allowedConnectHosts?: string[];
  allowedImageHosts?: string[];
}

/**
 * Construct strict Content Security Policy (CSP) directive string
 */
export function buildContentSecurityPolicy(options: SecurityHeadersOptions = {}): string {
  const {
    isDev = false,
    cspNonce,
    allowedConnectHosts = [],
    allowedImageHosts = [],
  } = options;

  // Base connect domains
  const connectHosts = [
    "'self'",
    "https://*",
    "wss://*",
    ...allowedConnectHosts,
  ];

  // Base image domains
  const imageHosts = [
    "'self'",
    "data:",
    "blob:",
    "https://images.unsplash.com",
    "https://cdn.samvadadvisory.com",
    ...allowedImageHosts,
  ];

  // In development, Next.js requires 'unsafe-eval' for hot reloading
  const scriptDirectives = [
    "'self'",
    "'unsafe-inline'", // For Next.js inline bootstrap
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

/**
 * Complete suite of production-grade HTTP security headers
 */
export function getProductionSecurityHeaders(
  options: SecurityHeadersOptions = {}
): Record<string, string> {
  const csp = buildContentSecurityPolicy(options);
  const cspHeaderName = options.reportOnly
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";

  const headers: Record<string, string> = {
    // 1. Enforce HTTPS strictly across domains and subdomains
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",

    // 2. Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",

    // 3. Prevent Clickjacking
    "X-Frame-Options": "DENY",

    // 4. Strict referrer policy (no URL query leakage to third parties)
    "Referrer-Policy": "strict-origin-when-cross-origin",

    // 5. Restrict dangerous browser features and sensors
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), display-capture=()",

    // 6. Cross-Origin isolation
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",

    // 7. Prevent Flash/PDF cross-domain leaks
    "X-Permitted-Cross-Domain-Policies": "none",

    // 8. DNS prefetch control
    "X-DNS-Prefetch-Control": "on",

    // 9. Content Security Policy
    [cspHeaderName]: csp,
  };

  if (options.isAdmin) {
    // Search engines must never index administrative surfaces
    headers["X-Robots-Tag"] = "noindex, nofollow, noarchive, nosnippet";
  }

  return headers;
}

/* ==========================================================================
   2. CORS POLICY ENFORCEMENT
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

/**
 * Check if origin is permitted under strict CORS rules
 */
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

    // Wildcard subdomain matching (e.g. *.samvadadvisory.com)
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

/**
 * Generate compliant CORS headers for preflight and standard requests
 */
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
    maxAge = 86400, // 24 hours
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
   3. CSRF PROTECTION & ORIGIN VERIFICATION
   ========================================================================== */

const CSRF_TOKEN_VALIDITY_SECONDS = 3600; // 1 hour

/**
 * Generate cryptographically signed anti-CSRF token
 */
export function generateCsrfToken(secret: string, sessionId: string = "anon"): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = randomBytes(16).toString("hex");
  const message = `${sessionId}:${timestamp}:${nonce}`;
  const hmac = createHmac("sha256", secret).update(message).digest("hex");
  return `${Buffer.from(message).toString("base64url")}.${hmac}`;
}

/**
 * Verify anti-CSRF token with constant-time equality and expiration check
 */
export function verifyCsrfToken(
  token: string | null | undefined,
  secret: string,
  expectedSessionId: string = "anon",
  maxAgeSeconds: number = CSRF_TOKEN_VALIDITY_SECONDS
): boolean {
  if (!token || !secret) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedMessage, providedHmac] = parts;
  if (!encodedMessage || !providedHmac) return false;

  const expectedHmac = createHmac("sha256", secret)
    .update(Buffer.from(encodedMessage, "base64url").toString("utf-8"))
    .digest("hex");

  if (expectedHmac.length !== providedHmac.length) return false;

  const hmacValid = timingSafeEqual(
    Buffer.from(expectedHmac, "utf-8"),
    Buffer.from(providedHmac, "utf-8")
  );

  if (!hmacValid) return false;

  try {
    const rawMessage = Buffer.from(encodedMessage, "base64url").toString("utf-8");
    const [sessionId, tsStr] = rawMessage.split(":");
    if (sessionId !== expectedSessionId) return false;

    const timestamp = parseInt(tsStr || "0", 10);
    const now = Math.floor(Date.now() / 1000);

    if (now - timestamp > maxAgeSeconds || timestamp > now + 60) {
      return false; // Expired or future timestamp
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Verify request Origin or Referer matches expected host (Defense-in-depth against CSRF)
 */
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
   4. OUTPUT ENCODING & XSS DEFENSE
   ========================================================================== */

/**
 * Strictly encode HTML entities to neutralize Cross-Site Scripting (XSS)
 */
export function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validate and sanitize URL scheme to prevent javascript: or data: URIs
 */
export function sanitizeUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();

  // Block control characters and null bytes
  if (/[\x00-\x1F\x7F]/.test(trimmed)) return null;

  // Relative URLs starting with single slash (not protocol-relative //)
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const protocol = parsed.protocol.toLowerCase();

    // Permitted safe schemes
    if (protocol === "http:" || protocol === "https:" || protocol === "mailto:" || protocol === "tel:") {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Strip dangerous executable HTML elements and event handlers from markdown text
 */
export function sanitizeMarkdownHtml(input: string): string {
  if (!input) return "";

  // Strip script, iframe, object, embed, form tags
  let cleaned = input.replace(/<\/?(script|iframe|object|embed|form|meta|link|style)[^>]*>/gi, "");

  // Strip inline JavaScript event handlers (e.g. onload, onerror, onclick)
  cleaned = cleaned.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // Strip javascript: pseudoprotocol
  cleaned = cleaned.replace(/javascript\s*:/gi, "about:blank#blocked:");

  return cleaned;
}

/* ==========================================================================
   5. MAGIC-BYTE BINARY MIME VALIDATION & FILE UPLOAD HARDENING
   ========================================================================== */

export interface MagicByteResult {
  mime: string | null;
  extension: string | null;
  isExecutable: boolean;
}

const DANGEROUS_EXTENSIONS = new Set([
  "exe", "dll", "so", "bin", "bat", "cmd", "sh", "bash", "ps1", "vbs",
  "php", "php3", "php4", "php5", "phtml", "jsp", "asp", "aspx", "cgi",
  "pl", "py", "rb", "js", "mjs", "jar", "war", "ear", "scr", "pif"
]);

/**
 * Inspect file header magic bytes (signatures) to identify true binary MIME type
 */
export function detectMagicMimeType(buffer: Buffer | Uint8Array): MagicByteResult {
  if (!buffer || buffer.length < 4) {
    return { mime: null, extension: null, isExecutable: false };
  }

  const b0 = buffer[0];
  const b1 = buffer[1];
  const b2 = buffer[2];
  const b3 = buffer[3];

  // 1. JPEG: FF D8 FF
  if (b0 === 0xff && b1 === 0xd8 && b2 === 0xff) {
    return { mime: "image/jpeg", extension: "jpg", isExecutable: false };
  }

  // 2. PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    b0 === 0x89 &&
    b1 === 0x50 &&
    b2 === 0x4e &&
    b3 === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mime: "image/png", extension: "png", isExecutable: false };
  }

  // 3. GIF: 47 49 46 38 ('GIF8')
  if (b0 === 0x47 && b1 === 0x49 && b2 === 0x46 && b3 === 0x38) {
    return { mime: "image/gif", extension: "gif", isExecutable: false };
  }

  // 4. WEBP: 'RIFF' .... 'WEBP'
  if (
    buffer.length >= 12 &&
    b0 === 0x52 &&
    b1 === 0x49 &&
    b2 === 0x46 &&
    b3 === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { mime: "image/webp", extension: "webp", isExecutable: false };
  }

  // 5. PDF: 25 50 44 46 ('%PDF')
  if (b0 === 0x25 && b1 === 0x50 && b2 === 0x44 && b3 === 0x46) {
    return { mime: "application/pdf", extension: "pdf", isExecutable: false };
  }

  // 6. MP4: 'ftyp' at offset 4
  if (
    buffer.length >= 12 &&
    buffer[4] === 0x66 &&
    buffer[5] === 0x74 &&
    buffer[6] === 0x79 &&
    buffer[7] === 0x70
  ) {
    return { mime: "video/mp4", extension: "mp4", isExecutable: false };
  }

  // 7. WEBM: 1A 45 DF A3 (EBML ID)
  if (b0 === 0x1a && b1 === 0x45 && b2 === 0xdf && b3 === 0xa3) {
    return { mime: "video/webm", extension: "webm", isExecutable: false };
  }

  // 8. ZIP: 50 4B 03 04 ('PK..')
  if (b0 === 0x50 && b1 === 0x4b && (b2 === 0x03 || b2 === 0x05) && (b3 === 0x04 || b3 === 0x06)) {
    return { mime: "application/zip", extension: "zip", isExecutable: false };
  }

  // 9. Detect Windows PE Executable (MZ header): 4D 5A
  if (b0 === 0x4d && b1 === 0x5a) {
    return { mime: "application/x-dosexec", extension: "exe", isExecutable: true };
  }

  // 10. Detect Linux ELF Executable: 7F 45 4C 46 (0x7F 'ELF')
  if (b0 === 0x7f && b1 === 0x45 && b2 === 0x4c && b3 === 0x46) {
    return { mime: "application/x-executable", extension: "bin", isExecutable: true };
  }

  // 11. Detect Shell Script / Shebang: 23 21 ('#!')
  if (b0 === 0x23 && b1 === 0x21) {
    return { mime: "text/x-shellscript", extension: "sh", isExecutable: true };
  }

  return { mime: null, extension: null, isExecutable: false };
}

/**
 * Sanitize untrusted filename to prevent path traversal and arbitrary code execution
 */
export function sanitizeFilename(rawFilename: string): string {
  if (!rawFilename) return "asset_upload";

  // 1. Extract basename to prevent path traversal (../../etc/passwd -> passwd)
  const basename = rawFilename.split(/[/\\]/).filter(Boolean).pop() || "asset_upload";

  // 2. Strip dangerous characters
  let clean = basename.replace(/[?%*:|"<>]/g, "_");

  // 3. Strip directory traversal tokens and multiple dots
  clean = clean.replace(/\.\.+/g, ".");

  // 4. Strip null bytes and non-printable control chars
  clean = clean.replace(/[\x00-\x1F\x7F]/g, "");

  // 5. Trim leading/trailing dots and spaces
  clean = clean.replace(/^[.\s]+|[.\s]+$/g, "");

  if (!clean) clean = "asset_upload";
  return clean;
}

/**
 * End-to-end file upload validator checking extension, size, declared MIME and binary magic bytes
 */
export function validateFileUploadSecurity(file: {
  filename: string;
  sizeBytes?: number;
  declaredMime?: string;
  declaredMimeType?: string;
  buffer?: Buffer | Uint8Array;
  maxSizeBytes?: number;
}): {
  valid: boolean;
  isValid: boolean;
  error?: string;
  errorCode?: string;
  sanitizedFilename: string;
  detectedMime?: string;
} {
  const sanitized = sanitizeFilename(file.filename);
  const ext = sanitized.split(".").pop()?.toLowerCase() || "";
  const declared = (file.declaredMime || file.declaredMimeType || "").toLowerCase();
  const size = file.sizeBytes !== undefined ? file.sizeBytes : file.buffer ? file.buffer.length : 0;

  // 1. Check dangerous extension
  if (DANGEROUS_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      isValid: false,
      errorCode: "UNSAFE_FILE_TYPE",
      error: `Executable and dangerous file extensions (.${ext}) are strictly prohibited.`,
      sanitizedFilename: sanitized,
    };
  }

  // 2. Enforce file size limit
  const maxLimit = file.maxSizeBytes || 250 * 1024 * 1024; // 250MB default ceiling
  if (size > maxLimit || size <= 0) {
    return {
      valid: false,
      isValid: false,
      errorCode: "FILE_TOO_LARGE",
      error: `File size exceeds the permitted limit of ${Math.round(maxLimit / (1024 * 1024))}MB.`,
      sanitizedFilename: sanitized,
    };
  }

  // 3. Inspect binary magic bytes if buffer is available
  if (file.buffer && file.buffer.length > 0) {
    const magic = detectMagicMimeType(file.buffer);

    // Check script injection disguised inside buffer (e.g. PHP tags in image)
    const headerSnippet = Buffer.from(file.buffer).subarray(0, 512).toString("utf-8");
    if (/<\?(php|=)|<script[\s>]/i.test(headerSnippet)) {
      return {
        valid: false,
        isValid: false,
        errorCode: "UNSAFE_FILE_TYPE",
        error: "Script tags detected within file payload.",
        sanitizedFilename: sanitized,
      };
    }

    if (magic.isExecutable) {
      return {
        valid: false,
        isValid: false,
        errorCode: "MIME_MISMATCH",
        error: "Binary inspection rejected the file as an executable payload.",
        sanitizedFilename: sanitized,
      };
    }

    if (magic.mime && declared && magic.mime !== declared) {
      // Allow minor container variations like image/jpeg vs image/jpg
      const detected = magic.mime.toLowerCase();
      const isJpegEquiv = (declared === "image/jpeg" || declared === "image/jpg") && detected === "image/jpeg";
      if (!isJpegEquiv) {
        return {
          valid: false,
          isValid: false,
          errorCode: "MIME_MISMATCH",
          error: `MIME type mismatch detected: declared "${declared}" but binary signature is "${magic.mime}".`,
          sanitizedFilename: sanitized,
          detectedMime: magic.mime,
        };
      }
    }

    return {
      valid: true,
      isValid: true,
      sanitizedFilename: sanitized,
      detectedMime: magic.mime || declared,
    };
  }

  return { valid: true, isValid: true, sanitizedFilename: sanitized };
}

/* ==========================================================================
   6. SERVER-SIDE REQUEST FORGERY (SSRF) DEFENSE
   ========================================================================== */

/**
 * Test whether an IPv4 or IPv6 address is in a private, loopback, or cloud-metadata network
 */
export function isPrivateIp(ip: string): boolean {
  if (!ip) return false;
  const trimmed = ip.trim().toLowerCase();

  // Localhost & IPv6 Loopback & Link-local
  if (
    trimmed === "localhost" ||
    trimmed === "::1" ||
    trimmed === "::" ||
    trimmed.startsWith("fe80:") ||
    trimmed.startsWith("fc00:")
  ) {
    return true;
  }

  // IPv4 regex parsing
  const ipv4Match = trimmed.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!ipv4Match) return false;

  const octets = ipv4Match.slice(1).map(Number);
  if (octets.some((o) => isNaN(o) || o < 0 || o > 255)) return true; // Malformed -> reject

  const [o1, o2] = octets as [number, number, number, number];

  // 127.0.0.0/8 (Loopback)
  if (o1 === 127) return true;

  // 10.0.0.0/8 (Private RFC 1918)
  if (o1 === 10) return true;

  // 172.16.0.0/12 (Private RFC 1918: 172.16.x.x - 172.31.x.x)
  if (o1 === 172 && o2 >= 16 && o2 <= 31) return true;

  // 192.168.0.0/16 (Private RFC 1918)
  if (o1 === 192 && o2 === 168) return true;

  // 169.254.0.0/16 (Link-Local & AWS/GCP/Azure Metadata: 169.254.169.254)
  if (o1 === 169 && o2 === 254) return true;

  // 0.0.0.0/8 (Broadcast/Current network)
  if (o1 === 0) return true;

  return false;
}

/**
 * Validate outbound URL to prevent SSRF against cloud metadata or internal network services
 */
export function isSafeOutboundUrl(
  urlStr: string,
  options: { allowPrivateIps?: boolean } = {}
): { isSafe: boolean; reason?: string; parsedUrl?: URL } {
  if (!urlStr) {
    return { isSafe: false, reason: "URL cannot be empty." };
  }

  let parsed: URL;
  try {
    parsed = new URL(urlStr);
  } catch {
    return { isSafe: false, reason: "Malformed URL format." };
  }

  const protocol = parsed.protocol.toLowerCase();
  if (protocol !== "http:" && protocol !== "https:") {
    return { isSafe: false, reason: `Protocol "${protocol}" is prohibited. Only HTTP(S) permitted.` };
  }

  const hostname = parsed.hostname.toLowerCase();

  // 1. Direct blocklist of well-known internal hostnames
  const blockedHosts = [
    "localhost",
    "metadata.google.internal",
    "instance-data",
    "169.254.169.254",
  ];

  if (blockedHosts.includes(hostname)) {
    return { isSafe: false, reason: `Host "${hostname}" is restricted internal or cloud infrastructure.` };
  }

  // 2. Check IP address ranges
  if (!options.allowPrivateIps && isPrivateIp(hostname)) {
    return { isSafe: false, reason: `IP address "${hostname}" resolves to a restricted private or loopback range.` };
  }

  return { isSafe: true, parsedUrl: parsed };
}

/* ==========================================================================
   7. SECRETS MANAGEMENT & ENTROPY AUDITING
   ========================================================================== */

/**
 * Audit application secrets for minimum entropy and prohibit default development keys
 */
export function validateSecretsEntropy(
  secrets: string | Record<string, string | undefined>
): { secure: boolean; warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];

  const secretsRecord: Record<string, string | undefined> =
    typeof secrets === "string" ? { SECRET_KEY: secrets } : secrets;

  const INSECURE_DEFAULTS = [
    "password",
    "secret",
    "change_me",
    "changeme",
    "default_secret",
    "12345678",
    "admin",
  ];

  for (const [key, val] of Object.entries(secretsRecord)) {
    if (!val) {
      errors.push(`Secret "${key}" is not set in environment.`);
      continue;
    }

    const lower = val.toLowerCase();
    if (INSECURE_DEFAULTS.some((d) => lower.includes(d))) {
      errors.push(`Secret "${key}" contains common default pattern and must be rotated for production.`);
    }

    if (val.length < 32) {
      errors.push(`Secret "${key}" has length ${val.length}; minimum 32 characters required.`);
    }
  }

  return {
    secure: errors.length === 0,
    warnings,
    errors,
  };
}

/* ==========================================================================
   8. SENSITIVE DATA MASKING & SAFE ERROR RESPONSES
   ========================================================================== */

/**
 * Mask email address for audit logs or public views (e.g. dev***@samvad.com)
 */
export function maskSensitiveEmail(email: string): string {
  if (!email || !email.includes("@")) return "***@***";
  const [local, domain] = email.split("@") as [string, string];
  if (local.length <= 2) {
    return `${local[0]}***@${domain}`;
  }
  return `${local.slice(0, 2)}***@${domain}`;
}

/**
 * Mask phone number for audit logs (e.g. +91 98****1234)
 */
export function maskSensitivePhone(phone: string): string {
  if (!phone) return "***";
  const clean = phone.trim();
  if (clean.length < 6) return "***";
  return `${clean.slice(0, 3)}****${clean.slice(-4)}`;
}

/**
 * Sanitize error response to eliminate stack traces and internal database schemas
 */
export function sanitizeErrorResponse(
  error: unknown,
  isProduction: boolean = process.env.NODE_ENV === "production"
): { code: string; message: string } {
  if (!isProduction && error instanceof Error) {
    return {
      code: "INTERNAL_ERROR",
      message: error.message,
    };
  }

  // Production: Always return safe, generic error message
  return {
    code: "REQUEST_PROCESSING_ERROR",
    message: "An internal security or operational error occurred. The incident has been recorded.",
  };
}

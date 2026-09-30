import { createHash } from "crypto";
import { checkRateLimit } from "@samvad/redis";

// In-memory sliding window map for test environments or Redis fallbacks
const inMemoryHits = new Map<string, number[]>();

/**
 * Anonymizes the client IP address using SHA-256 with a salt
 * to ensure GDPR / CCPA privacy compliance.
 */
export function hashClientIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT || "samvad-newsletter-privacy-salt-2026";
  return createHash("sha256")
    .update(`${salt}:${ip}`)
    .digest("hex")
    .substring(0, 16);
}

export interface NewsletterRateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
  clientIdentifier: string;
}

/**
 * Enforces rate limiting on newsletter actions (subscriptions and unsubscribes).
 * Default: 5 requests per 10-minute window per IP.
 */
export async function enforceNewsletterRateLimit(
  ip: string,
  action: "subscribe" | "unsubscribe" = "subscribe",
  limit = 5,
  windowSeconds = 600
): Promise<NewsletterRateLimitResult> {
  const clientHash = hashClientIp(ip);
  const identifier = `newsletter:${action}:${clientHash}`;

  // 1. Check Redis if available
  try {
    const redisResult = await checkRateLimit(identifier, limit, windowSeconds);
    if (!redisResult.allowed) {
      return {
        allowed: false,
        limit: redisResult.limit,
        remaining: redisResult.remaining,
        resetSeconds: redisResult.resetSeconds,
        clientIdentifier: clientHash,
      };
    }
  } catch {
    // Graceful fallback to memory tracking
  }

  // 2. In-memory sliding window tracking
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const timestamps = inMemoryHits.get(identifier) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    const oldestHit = validTimestamps[0] ?? now;
    const resetSeconds = Math.max(1, Math.ceil((oldestHit + windowMs - now) / 1000));
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetSeconds,
      clientIdentifier: clientHash,
    };
  }

  validTimestamps.push(now);
  inMemoryHits.set(identifier, validTimestamps);

  return {
    allowed: true,
    limit,
    remaining: limit - validTimestamps.length,
    resetSeconds: windowSeconds,
    clientIdentifier: clientHash,
  };
}

/**
 * Reset memory hits (for test cleanup).
 */
export function resetNewsletterRateLimits(): void {
  inMemoryHits.clear();
}

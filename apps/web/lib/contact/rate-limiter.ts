import crypto from "crypto";
import { checkRateLimit as redisCheckRateLimit } from "@samvad/redis";

export interface ContactRateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
  clientIdentifier: string;
}

/**
 * In-memory sliding window tracker for local dev/test or when Redis is offline.
 */
interface InfluxRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, InfluxRecord>();

/**
 * Compute an anonymized SHA-256 hash of the client IP for privacy compliance.
 */
export function hashClientIp(ip: string): string {
  return crypto.createHash("sha256").update(ip + "_samvad_salt").digest("hex").slice(0, 16);
}

/**
 * Enforces rate limiting on contact submissions.
 * Default policy: 5 submissions per 10 minutes (600s) per IP address.
 */
export async function enforceContactRateLimit(
  ip: string,
  maxRequests = 5,
  windowSeconds = 600
): Promise<ContactRateLimitResult> {
  const anonymizedIp = hashClientIp(ip);
  const identifier = `contact-lead:${anonymizedIp}`;

  // 1. Try Redis first
  try {
    const redisResult = await redisCheckRateLimit(identifier, maxRequests, windowSeconds);
    // If Redis explicitly rejected
    if (!redisResult.allowed) {
      return {
        allowed: false,
        limit: redisResult.limit,
        remaining: redisResult.remaining,
        resetSeconds: redisResult.resetSeconds,
        clientIdentifier: anonymizedIp,
      };
    }
  } catch {
    // Graceful fallback to memory store below
  }

  // 2. In-memory sliding window fallback
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const cutoff = now - windowMs;

  let record = memoryStore.get(anonymizedIp);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(anonymizedIp, record);
  }

  // Clean old timestamps
  record.timestamps = record.timestamps.filter((ts) => ts > cutoff);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0] || now;
    const resetSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      resetSeconds,
      clientIdentifier: anonymizedIp,
    };
  }

  record.timestamps.push(now);
  const remaining = maxRequests - record.timestamps.length;

  return {
    allowed: true,
    limit: maxRequests,
    remaining,
    resetSeconds: windowSeconds,
    clientIdentifier: anonymizedIp,
  };
}

/**
 * Reset memory rate limits (useful in tests)
 */
export function resetMemoryRateLimiter(): void {
  memoryStore.clear();
}

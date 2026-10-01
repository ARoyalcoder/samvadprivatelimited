import { redis } from "./client";

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Sliding window counter rate limiter backed by Redis.
 * If Redis is unavailable, safely allows traffic while logging a warning.
 */
export async function checkRateLimit(
  identifier: string,
  limit = 20,
  windowSeconds = 60
): Promise<RateLimitResult> {
  const key = `ratelimit:${identifier}`;

  try {
    // Pipeline atomic increment + expire
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.ttl(key);
    const results = await pipeline.exec();

    if (!results) {
      return { allowed: true, limit, remaining: limit - 1, resetSeconds: windowSeconds };
    }

    const [incrErr, currentCount] = results[0] as [Error | null, number];
    const [ttlErr, ttl] = results[1] as [Error | null, number];

    if (incrErr || ttlErr) {
      throw incrErr || ttlErr;
    }

    // Set TTL if first request in this window
    if (ttl === -1) {
      await redis.expire(key, windowSeconds);
    }

    const resetSeconds = ttl > 0 ? ttl : windowSeconds;
    const remaining = Math.max(0, limit - currentCount);

    return {
      allowed: currentCount <= limit,
      limit,
      remaining,
      resetSeconds,
    };
  } catch (error) {
    console.warn(
      `[RateLimit Warning] Fallback allowed for "${identifier}":`,
      (error as Error).message
    );
    return {
      allowed: true,
      limit,
      remaining: limit,
      resetSeconds: windowSeconds,
    };
  }
}

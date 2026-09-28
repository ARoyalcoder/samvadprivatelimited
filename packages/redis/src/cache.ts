import { redis } from "./client.js";

/**
 * Cache-aside helper with graceful fallback if Redis is unavailable
 */
export async function getOrSetCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 300
): Promise<T> {
  try {
    if (redis.status === "ready" || redis.status === "connecting") {
      const cached = await redis.get(key);
      if (cached) {
        return JSON.parse(cached) as T;
      }
    }
  } catch (error) {
    console.warn(`[Cache Warning] Failed to read key "${key}":`, (error as Error).message);
  }

  // Fetch live value
  const value = await fetcher();

  try {
    if (redis.status === "ready" || redis.status === "connecting") {
      await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
    }
  } catch (error) {
    console.warn(`[Cache Warning] Failed to write key "${key}":`, (error as Error).message);
  }

  return value;
}

/**
 * Invalidate keys matching a pattern
 */
export async function invalidateCachePattern(pattern: string): Promise<void> {
  try {
    if (redis.status === "ready" || redis.status === "connecting") {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    }
  } catch (error) {
    console.warn(
      `[Cache Warning] Failed to invalidate pattern "${pattern}":`,
      (error as Error).message
    );
  }
}

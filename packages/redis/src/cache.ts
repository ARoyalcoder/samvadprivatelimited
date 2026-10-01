import { redis } from "./client";

/**
 * Cache Telemetry Metrics
 */
export interface CacheMetrics {
  l1Hits: number;
  l2Hits: number;
  misses: number;
  totalRequests: number;
  hitRatio: number;
  singleflightSaves: number;
  inMemoryEntries: number;
}

// Internal in-memory L1 cache entry structure
interface L1CacheEntry<T> {
  value: T;
  expiresAt: number;
}

// In-memory L1 LRU/Map storage (fastest tier, sub-millisecond)
const L1_MAX_ITEMS = 5000;
const l1Cache = new Map<string, L1CacheEntry<unknown>>();

// In-flight Singleflight promises to prevent dogpiling / cache stampedes
const inFlightRequests = new Map<string, Promise<unknown>>();

// Telemetry counters
let l1Hits = 0;
let l2Hits = 0;
let misses = 0;
let singleflightSaves = 0;

/**
 * Helper to evict expired or oldest items if L1 exceeds maximum capacity
 */
function pruneL1IfNeeded() {
  const now = Date.now();
  if (l1Cache.size > L1_MAX_ITEMS) {
    // Delete expired items first
    for (const [k, v] of l1Cache.entries()) {
      if (v.expiresAt <= now) {
        l1Cache.delete(k);
      }
    }
  }
  // If still oversized, remove oldest 20%
  if (l1Cache.size > L1_MAX_ITEMS) {
    const keysToDelete = Array.from(l1Cache.keys()).slice(0, Math.floor(L1_MAX_ITEMS * 0.2));
    for (const k of keysToDelete) {
      l1Cache.delete(k);
    }
  }
}

/**
 * High-performance Two-Tier Cache-Aside helper with Singleflight deduplication.
 * L1: In-process memory (0.01ms latency)
 * L2: Redis cluster/instance (0.5-2ms latency)
 * Stampede protection: Deduplicates concurrent requests for the same key.
 */
export async function getOrSetCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 300,
  l1TtlSeconds = 60
): Promise<T> {
  const now = Date.now();

  // --- Tier 1: In-Process L1 Memory Cache ---
  const l1Entry = l1Cache.get(key) as L1CacheEntry<T> | undefined;
  if (l1Entry && l1Entry.expiresAt > now) {
    l1Hits++;
    return l1Entry.value;
  }

  // --- Stampede Prevention: In-flight singleflight coalescence ---
  const existingFlight = inFlightRequests.get(key);
  if (existingFlight) {
    singleflightSaves++;
    return (await existingFlight) as T;
  }

  // Coalesce this fetch
  const fetchPromise = (async () => {
    try {
      // --- Tier 2: Redis L2 Cache ---
      if (redis.status === "ready" || redis.status === "connecting") {
        try {
          const cached = await redis.get(key);
          if (cached !== null) {
            const parsed = JSON.parse(cached) as T;
            l2Hits++;
            // Populate L1 cache for subsequent local calls
            pruneL1IfNeeded();
            l1Cache.set(key, {
              value: parsed,
              expiresAt: Date.now() + l1TtlSeconds * 1000,
            });
            return parsed;
          }
        } catch (redisErr) {
          // Gracefully fallback to fetcher if Redis errors
          if (process.env.NODE_ENV !== "test") {
            console.warn(`[L2 Cache Warning] Read error on key "${key}":`, (redisErr as Error).message);
          }
        }
      }

      // Cache Miss: execute fetcher
      misses++;
      const liveValue = await fetcher();

      // Store in L1
      pruneL1IfNeeded();
      l1Cache.set(key, {
        value: liveValue,
        expiresAt: Date.now() + l1TtlSeconds * 1000,
      });

      // Store in L2 Redis
      try {
        if (redis.status === "ready" || redis.status === "connecting") {
          await redis.set(key, JSON.stringify(liveValue), "EX", ttlSeconds);
        }
      } catch (redisWriteErr) {
        if (process.env.NODE_ENV !== "test") {
          console.warn(`[L2 Cache Warning] Write error on key "${key}":`, (redisWriteErr as Error).message);
        }
      }

      return liveValue;
    } finally {
      // Remove in-flight promise once completed
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, fetchPromise);
  return fetchPromise as Promise<T>;
}

/**
 * Explicitly read from L1 or L2 cache
 */
export async function getCache<T>(key: string): Promise<T | null> {
  const now = Date.now();
  const l1Entry = l1Cache.get(key) as L1CacheEntry<T> | undefined;
  if (l1Entry && l1Entry.expiresAt > now) {
    l1Hits++;
    return l1Entry.value;
  }

  try {
    if (redis.status === "ready" || redis.status === "connecting") {
      const cached = await redis.get(key);
      if (cached !== null) {
        l2Hits++;
        const parsed = JSON.parse(cached) as T;
        l1Cache.set(key, {
          value: parsed,
          expiresAt: Date.now() + 60000,
        });
        return parsed;
      }
    }
  } catch {
    // Ignore error
  }

  misses++;
  return null;
}

/**
 * Explicitly set a key in both L1 and L2
 */
export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds = 300,
  l1TtlSeconds = 60
): Promise<void> {
  pruneL1IfNeeded();
  l1Cache.set(key, {
    value,
    expiresAt: Date.now() + l1TtlSeconds * 1000,
  });

  try {
    if (redis.status === "ready" || redis.status === "connecting") {
      await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
    }
  } catch {
    // Graceful fallback
  }
}

/**
 * Invalidate a single key across L1 and L2
 */
export async function invalidateCache(key: string): Promise<void> {
  l1Cache.delete(key);
  try {
    if (redis.status === "ready" || redis.status === "connecting") {
      await redis.del(key);
    }
  } catch (error) {
    console.warn(`[Cache Warning] Failed to delete key "${key}":`, (error as Error).message);
  }
}

/**
 * Invalidate keys matching a pattern across both L1 and L2
 */
export async function invalidateCachePattern(pattern: string): Promise<void> {
  // Clear L1 matching keys
  const regexPattern = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
  for (const key of l1Cache.keys()) {
    if (regexPattern.test(key)) {
      l1Cache.delete(key);
    }
  }

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

/**
 * Returns real-time Cache Telemetry Metrics
 */
export function getCacheMetrics(): CacheMetrics {
  const total = l1Hits + l2Hits + misses;
  const hits = l1Hits + l2Hits;
  const ratio = total > 0 ? hits / total : 0;

  return {
    l1Hits,
    l2Hits,
    misses,
    totalRequests: total,
    hitRatio: parseFloat((ratio * 100).toFixed(2)),
    singleflightSaves,
    inMemoryEntries: l1Cache.size,
  };
}

/**
 * Resets cache telemetry metrics
 */
export function resetCacheMetrics(): void {
  l1Hits = 0;
  l2Hits = 0;
  misses = 0;
  singleflightSaves = 0;
}

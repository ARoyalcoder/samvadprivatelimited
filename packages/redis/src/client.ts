import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export function createRedisClient(): Redis {
  const client = new Redis(redisUrl, {
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,
    lazyConnect: true,
    retryStrategy(times) {
      if (times > 3) {
        // Stop retrying aggressively if Redis is unreachable in dev/test
        return null;
      }
      return Math.min(times * 200, 1000);
    },
  });

  client.on("error", (err) => {
    // Graceful logging: do not crash process if Redis connection drops temporarily
    if (process.env.NODE_ENV !== "test") {
      console.warn("⚠️ Redis client warning/error:", err.message);
    }
  });

  return client;
}

export const redis: Redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export default redis;

import { PrismaClient } from "@prisma/client";

declare const process: {
  env: Record<string, string | undefined>;
};

export interface DatabasePoolMetrics {
  activeQueries: number;
  totalQueries: number;
  queryErrors: number;
  activeConnections: number;
  maxLimit: number;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  poolMetrics: DatabasePoolMetrics;
};

export const poolMetrics: DatabasePoolMetrics = globalForPrisma.poolMetrics ?? {
  activeQueries: 0,
  totalQueries: 0,
  queryErrors: 0,
  activeConnections: 1,
  maxLimit: 50,
};

globalForPrisma.poolMetrics = poolMetrics;

/**
 * Ensures optimal connection pooling parameters (connection_limit=50, pool_timeout=10)
 */
function getOptimizedDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url || url.startsWith("mock://") || !url.startsWith("postgres")) {
    return url;
  }
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("connection_limit")) {
      parsed.searchParams.set("connection_limit", process.env.DB_POOL_LIMIT || "50");
    }
    if (!parsed.searchParams.has("pool_timeout")) {
      parsed.searchParams.set("pool_timeout", process.env.DB_POOL_TIMEOUT || "10");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export function createPrismaClient(): PrismaClient {
  const optimizedUrl = getOptimizedDatabaseUrl();
  const client = new PrismaClient({
    datasourceUrl: optimizedUrl,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

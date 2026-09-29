import { NextResponse } from "next/server";
import { prisma } from "@samvad/database";
import { redis } from "@samvad/redis";
import { logger } from "@samvad/logger";
import { metrics } from "@samvad/telemetry";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function GET() {
  metrics.increment("http_requests_total");
  const startTime = Date.now();
  let dbStatus = "healthy";
  let redisStatus = "healthy";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    dbStatus = `unhealthy: ${(error as Error).message}`;
    logger.error("API Gateway database healthcheck failure", error);
  }

  try {
    if (redis.status === "ready" || redis.status === "connecting") {
      await redis.ping();
    } else {
      redisStatus = `offline (${redis.status})`;
    }
  } catch (error) {
    redisStatus = `unhealthy: ${(error as Error).message}`;
  }

  const isHealthy = dbStatus === "healthy";
  const latency = Date.now() - startTime;
  metrics.observe("request_duration_ms", latency);

  const response: ApiResponse<{
    gateway: string;
    status: string;
    services: { database: string; redis: string };
    latencyMs: number;
    timestamp: string;
  }> = {
    success: isHealthy,
    data: {
      gateway: "samvad-api-core",
      status: isHealthy ? "operational" : "degraded",
      services: { database: dbStatus, redis: redisStatus },
      latencyMs: latency,
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response, { status: isHealthy ? 200 : 503 });
}

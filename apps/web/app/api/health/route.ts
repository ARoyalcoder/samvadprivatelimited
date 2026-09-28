import { NextResponse } from "next/server";
import { prisma } from "@samvad/database";
import { redis } from "@samvad/redis";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "unknown";
  let redisStatus = "unknown";

  // Check Database connectivity
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "healthy";
  } catch (error) {
    dbStatus = `unhealthy: ${(error as Error).message}`;
  }

  // Check Redis connectivity
  try {
    if (redis.status === "ready" || redis.status === "connecting") {
      const ping = await redis.ping();
      redisStatus = ping === "PONG" ? "healthy" : "degraded";
    } else {
      redisStatus = `offline (${redis.status})`;
    }
  } catch (error) {
    redisStatus = `unhealthy: ${(error as Error).message}`;
  }

  const response: ApiResponse<{
    status: string;
    services: {
      database: string;
      redis: string;
    };
    latencyMs: number;
    timestamp: string;
  }> = {
    success: dbStatus === "healthy",
    data: {
      status: dbStatus === "healthy" ? "operational" : "degraded",
      services: {
        database: dbStatus,
        redis: redisStatus,
      },
      latencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response, {
    status: dbStatus === "healthy" ? 200 : 503,
  });
}

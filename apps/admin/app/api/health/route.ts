import { NextResponse } from "next/server";
import { prisma } from "@samvad/database";
import { logger } from "@samvad/logger";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const adminLogger = logger.child({ service: "samvad-admin" });
  let dbStatus = "healthy";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    dbStatus = "unhealthy";
    adminLogger.error("Admin healthcheck database ping failed", error);
  }

  const response: ApiResponse<{
    service: string;
    status: string;
    database: string;
    timestamp: string;
  }> = {
    success: dbStatus === "healthy",
    data: {
      service: "samvad-admin-portal",
      status: dbStatus === "healthy" ? "operational" : "degraded",
      database: dbStatus,
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response, {
    status: dbStatus === "healthy" ? 200 : 503,
  });
}

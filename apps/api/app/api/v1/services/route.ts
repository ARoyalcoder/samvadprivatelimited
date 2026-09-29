import { NextResponse } from "next/server";
import { prisma } from "@samvad/database";
import { getOrSetCache } from "@samvad/redis";
import { tracer } from "@samvad/telemetry";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return tracer.withSpan("api.v1.services.get", async () => {
    try {
      const services = await getOrSetCache(
        "content:services:all",
        async () => {
          return prisma.service.findMany({
            orderBy: { orderIndex: "asc" },
          });
        },
        600 // 10 minutes cache TTL
      );

      const response: ApiResponse = {
        success: true,
        data: services,
      };
      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "SERVICE_FETCH_FAILED", message: (error as Error).message },
        },
        { status: 500 }
      );
    }
  });
}

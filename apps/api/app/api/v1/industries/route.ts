import { NextResponse } from "next/server";
import { prisma } from "@samvad/database";
import { getOrSetCache } from "@samvad/redis";
import { tracer } from "@samvad/telemetry";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return tracer.withSpan("api.v1.industries.get", async () => {
    try {
      const industries = await getOrSetCache(
        "content:industries:all",
        async () => {
          return prisma.industry.findMany({
            orderBy: { orderIndex: "asc" },
          });
        },
        600
      );

      const response: ApiResponse = {
        success: true,
        data: industries,
      };
      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INDUSTRY_FETCH_FAILED", message: (error as Error).message },
        },
        { status: 500 }
      );
    }
  });
}

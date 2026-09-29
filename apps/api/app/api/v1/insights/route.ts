import { NextResponse } from "next/server";
import { prisma } from "@samvad/database";
import { getOrSetCache } from "@samvad/redis";
import { tracer } from "@samvad/telemetry";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return tracer.withSpan("api.v1.insights.get", async () => {
    try {
      const insights = await getOrSetCache(
        "content:insights:published",
        async () => {
          return prisma.insight.findMany({
            where: { status: "PUBLISHED" },
            orderBy: { publishedAt: "desc" },
          });
        },
        300
      );

      const response: ApiResponse = {
        success: true,
        data: insights,
      };
      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INSIGHTS_FETCH_FAILED", message: (error as Error).message },
        },
        { status: 500 }
      );
    }
  });
}

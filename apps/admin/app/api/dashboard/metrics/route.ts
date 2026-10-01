import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "../../../../lib/dashboard/dashboard-service";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const metrics = await dashboardService.getMetrics();
    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error("[Dashboard Metrics API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "METRICS_FETCH_FAILED", message: "Failed to compute dashboard metrics." },
      },
      { status: 500 }
    );
  }
}

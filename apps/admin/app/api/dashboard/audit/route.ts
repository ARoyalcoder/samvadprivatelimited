import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "../../../../lib/dashboard/dashboard-service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "ALL";
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    const logs = await dashboardService.getAuditLogs(limit, action);

    return NextResponse.json({
      success: true,
      data: logs,
      total: logs.length,
    });
  } catch (error) {
    console.error("[Dashboard Audit API GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "AUDIT_FETCH_FAILED", message: "Failed to retrieve security audit trail." },
      },
      { status: 500 }
    );
  }
}

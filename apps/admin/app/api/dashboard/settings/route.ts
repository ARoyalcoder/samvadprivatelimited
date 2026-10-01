import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "../../../../lib/dashboard/dashboard-service";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const settings = dashboardService.getSettings();
    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("[Dashboard Settings API GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SETTINGS_FETCH_FAILED", message: "Failed to retrieve platform settings." },
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const callerRole = req.headers.get("x-user-role") || "";
    if (callerRole !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "Configuring platform parameters requires SUPER_ADMIN privilege.",
          },
        },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const adminUserId = req.headers.get("x-user-id") || undefined;

    const updated = await dashboardService.updateSettings(body, adminUserId);

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Platform settings updated successfully.",
    });
  } catch (error) {
    console.error("[Dashboard Settings API POST Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SETTINGS_UPDATE_FAILED", message: "Failed to update platform settings." },
      },
      { status: 500 }
    );
  }
}

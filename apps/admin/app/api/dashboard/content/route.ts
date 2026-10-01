import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "../../../../lib/dashboard/dashboard-service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = (searchParams.get("type") || "ALL") as any;
    const status = searchParams.get("status") || "ALL";
    const search = searchParams.get("search") || "";

    const content = await dashboardService.getContent({ type, status, search });

    return NextResponse.json({
      success: true,
      data: content,
      total: content.length,
    });
  } catch (error) {
    console.error("[Dashboard Content API GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "CONTENT_FETCH_FAILED", message: "Failed to retrieve content items." },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { id, status } = body;
    const adminUserId = req.headers.get("x-user-id") || undefined;

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INVALID_PARAMETERS", message: "id and status are required." },
        },
        { status: 400 }
      );
    }

    const updated = await dashboardService.updateContentStatus(id, status, adminUserId);

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "CONTENT_NOT_FOUND", message: `Content item "${id}" was not found.` },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: `Content status updated to ${status}`,
    });
  } catch (error) {
    console.error("[Dashboard Content API PATCH Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "CONTENT_UPDATE_FAILED", message: "Failed to update content status." },
      },
      { status: 500 }
    );
  }
}

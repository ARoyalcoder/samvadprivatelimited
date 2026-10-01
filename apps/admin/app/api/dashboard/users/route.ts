import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "../../../../lib/dashboard/dashboard-service";
import { AuthRole } from "@samvad/auth";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const users = await dashboardService.getUsers();
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("[Dashboard Users API GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "USERS_FETCH_FAILED", message: "Failed to retrieve admin users directory." },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const callerRole = req.headers.get("x-user-role") || "";
    // Only SUPER_ADMIN can manage user roles
    if (callerRole !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "User administration requires SUPER_ADMIN institutional privilege.",
          },
        },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { userId, role } = body;
    const adminUserId = req.headers.get("x-user-id") || undefined;

    if (!userId || !role) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INVALID_PARAMETERS", message: "userId and role are required." },
        },
        { status: 400 }
      );
    }

    await dashboardService.updateUserRole(userId, role as AuthRole, adminUserId);

    return NextResponse.json({
      success: true,
      message: `User ${userId} role updated to ${role}`,
    });
  } catch (error) {
    console.error("[Dashboard Users API PATCH Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "USER_UPDATE_FAILED", message: "Failed to update user role." },
      },
      { status: 500 }
    );
  }
}

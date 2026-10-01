import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@samvad/auth";
import { adminAuthService } from "../../../../lib/auth/auth-service";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    const unauthResponse: ApiResponse = {
      success: false,
      error: { code: "UNAUTHORIZED", message: "No active session token identified" },
    };
    return NextResponse.json(unauthResponse, { status: 401 });
  }

  const session = await adminAuthService.getSession(token);
  if (!session.authenticated || !session.user) {
    const expiredResponse: ApiResponse = {
      success: false,
      error: { code: "INVALID_SESSION", message: "Session token invalid or expired" },
    };
    return NextResponse.json(expiredResponse, { status: 401 });
  }

  const successResponse: ApiResponse<{
    id: string;
    email: string;
    name: string;
    role: string;
    permissions: string[];
  }> = {
    success: true,
    data: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
      permissions: session.user.permissions,
    },
  };

  return NextResponse.json(successResponse);
}

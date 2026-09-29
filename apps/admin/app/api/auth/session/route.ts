import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@samvad/auth";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("samvad_admin_session")?.value;
  const secret =
    process.env.ADMIN_API_KEY || "super_secure_enterprise_advisory_secret_key_samvad_2026";

  if (!token) {
    const unauthResponse: ApiResponse = {
      success: false,
      error: { code: "UNAUTHORIZED", message: "No active session token identified" },
    };
    return NextResponse.json(unauthResponse, { status: 401 });
  }

  const session = verifySessionToken(token, secret);
  if (!session) {
    const expiredResponse: ApiResponse = {
      success: false,
      error: { code: "INVALID_SESSION", message: "Session token invalid or expired" },
    };
    return NextResponse.json(expiredResponse, { status: 401 });
  }

  const successResponse: ApiResponse<{ userId: string; email: string; role: string }> = {
    success: true,
    data: {
      userId: session.userId,
      email: session.email,
      role: session.role,
    },
  };

  return NextResponse.json(successResponse);
}

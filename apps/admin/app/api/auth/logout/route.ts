import { NextRequest, NextResponse } from "next/server";
import { adminAuthService } from "../../../../lib/auth/auth-service";
import { createClearSessionCookieHeader, SESSION_COOKIE_NAME } from "@samvad/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    await adminAuthService.logout(token, ip, userAgent);

    const response = NextResponse.json({
      success: true,
      message: "Admin session successfully terminated.",
    });

    response.headers.set("Set-Cookie", createClearSessionCookieHeader());

    return response;
  } catch (error) {
    console.error("[Admin Logout Route Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to terminate session." },
      },
      { status: 500 }
    );
  }
}

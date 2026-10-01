import { NextRequest, NextResponse } from "next/server";
import { adminMfaVerifySchema } from "@samvad/validation";
import { adminAuthService } from "../../../../../lib/auth/auth-service";
import { createSessionCookieHeader } from "@samvad/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = adminMfaVerifySchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid MFA verification parameters",
            details: parseResult.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const { challengeToken, code, isBackupCode } = parseResult.data;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await adminAuthService.verifyMfa({
      challengeToken,
      code,
      isBackupCode,
      ip,
      userAgent,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MFA_FAILED",
            message: result.error || "MFA verification failed.",
          },
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      data: {
        user: result.user,
      },
    });

    if (result.sessionToken) {
      const cookieHeader = createSessionCookieHeader(result.sessionToken);
      response.headers.set("Set-Cookie", cookieHeader);
    }

    return response;
  } catch (error) {
    console.error("[Admin MFA Verify Route Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to verify MFA challenge." },
      },
      { status: 500 }
    );
  }
}

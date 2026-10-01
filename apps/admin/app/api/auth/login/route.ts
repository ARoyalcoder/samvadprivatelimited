import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@samvad/validation";
import { adminAuthService } from "../../../../lib/auth/auth-service";
import { createSessionCookieHeader } from "@samvad/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = adminLoginSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid login submission data",
            details: parseResult.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const { email, password, honeypot } = parseResult.data;

    // Silent reject for bot submission via honeypot
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "BOT_DETECTED", message: "Submission rejected" },
        },
        { status: 400 }
      );
    }

    // Extract IP and User-Agent
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await adminAuthService.login({
      email,
      password,
      ip,
      userAgent,
    });

    if (!result.success) {
      if (result.locked) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "ACCOUNT_LOCKED",
              message: result.error,
              remainingMinutes: result.remainingMinutes,
            },
          },
          { status: 423 } // Locked
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: result.error,
            remainingAttempts: result.remainingAttempts,
          },
        },
        { status: 401 }
      );
    }

    // MFA Challenge required
    if (result.mfaRequired && result.challengeToken) {
      return NextResponse.json({
        success: true,
        data: {
          mfaRequired: true,
          challengeToken: result.challengeToken,
        },
      });
    }

    // Standard Login Success
    const response = NextResponse.json({
      success: true,
      data: {
        mfaRequired: false,
        user: result.user,
      },
    });

    if (result.sessionToken) {
      const cookieHeader = createSessionCookieHeader(result.sessionToken);
      response.headers.set("Set-Cookie", cookieHeader);
    }

    return response;
  } catch (error) {
    console.error("[Admin Login Route Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "An unexpected error occurred during authentication." },
      },
      { status: 500 }
    );
  }
}

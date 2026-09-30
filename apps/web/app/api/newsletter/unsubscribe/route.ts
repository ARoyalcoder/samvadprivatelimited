import { NextRequest, NextResponse } from "next/server";
import { newsletterUnsubscribeSchema } from "@samvad/validation";
import { newsletterService } from "@/lib/newsletter/newsletter-service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unsubscribe token is required." },
        { status: 400 }
      );
    }

    const subscriber = await newsletterService.getSubscriberByToken(token);
    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired unsubscribe token." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      subscriber,
    });
  } catch (error) {
    console.error("[Newsletter Unsubscribe GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify unsubscribe token." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let token = searchParams.get("token") || "";
    let reason: string | undefined = undefined;

    // Check if JSON body is supplied
    try {
      const body = await req.json();
      if (body?.token) token = body.token;
      if (body?.reason) reason = body.reason;
    } catch {
      // Body may be empty in RFC 8058 List-Unsubscribe=One-Click POST
    }

    const parseResult = newsletterUnsubscribeSchema.safeParse({ token, reason });
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid unsubscribe parameters",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const result = await newsletterService.unsubscribe(
      parseResult.data.token,
      parseResult.data.reason
    );

    return NextResponse.json(result, {
      status: 200,
      headers: {
        // RFC 8058 compliance header
        "List-Unsubscribe": "One-Click",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to unsubscribe";
    console.error("[Newsletter Unsubscribe POST Error]:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

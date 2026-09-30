import { NextRequest, NextResponse } from "next/server";
import { newsletterSubscriptionSchema } from "@samvad/validation";
import { newsletterService } from "@/lib/newsletter/newsletter-service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() || "127.0.0.1" : "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || undefined;

  try {
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = newsletterSubscriptionSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Subscribe via service (enqueues background email job, zero sync delay)
    const result = await newsletterService.subscribe(parseResult.data, {
      ip,
      userAgent,
    });

    return NextResponse.json(result, {
      status: result.isExisting ? 200 : 201,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to process subscription";

    // Handle rate limit or bot triggers
    if (message.includes("Rate limit exceeded")) {
      return NextResponse.json(
        {
          success: false,
          error: message,
        },
        { status: 429 }
      );
    }

    if (message.includes("Automated submission") || message.includes("Automated bot")) {
      return NextResponse.json(
        {
          success: false,
          error: "Submission rejected by security safeguards.",
        },
        { status: 403 }
      );
    }

    console.error("[Newsletter Subscribe API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

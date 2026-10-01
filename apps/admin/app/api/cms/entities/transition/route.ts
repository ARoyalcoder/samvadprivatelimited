import { NextRequest, NextResponse } from "next/server";
import { cmsService } from "../../../../../lib/cms/cms-service";
import { cmsStatusTransitionSchema } from "@samvad/validation";
import { AuthRole } from "@samvad/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const actorRole = (req.headers.get("x-user-role") || "ANALYST") as AuthRole;
    const actorId = req.headers.get("x-user-id") || "usr_anonymous";
    const actorEmail = req.headers.get("x-user-email") || "anonymous@samvadadvisory.com";

    // ANALYST cannot mutate
    if (actorRole === "ANALYST") {
      return NextResponse.json(
        {
          success: false,
          error: { code: "FORBIDDEN", message: "ANALYST role has strictly read-only intelligence access." },
        },
        { status: 403 }
      );
    }

    const rawBody = await req.json().catch(() => ({}));
    const parseResult = cmsStatusTransitionSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid status transition payload.",
            details: parseResult.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const { id, targetStatus } = parseResult.data;

    const result = await cmsService.transitionStatus(id, targetStatus, {
      id: actorId,
      email: actorEmail,
      role: actorRole,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "TRANSITION_REJECTED", message: result.error || "Transition rejected." },
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: `Entity "${result.data?.title}" transitioned to ${targetStatus}.`,
    });
  } catch (error) {
    console.error("[CMS Status Transition Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to transition content status." },
      },
      { status: 500 }
    );
  }
}

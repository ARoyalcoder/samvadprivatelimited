import { NextRequest, NextResponse } from "next/server";
import { cmsService } from "../../../../lib/cms/cms-service";
import { cmsEntityMutationSchema } from "@samvad/validation";
import { AuthRole } from "@samvad/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const entityType = (searchParams.get("type") || "ALL") as any;
    const status = (searchParams.get("status") || "ALL") as any;
    const search = searchParams.get("search") || "";

    const entities = await cmsService.getEntities({
      entityType,
      status,
      search,
    });

    return NextResponse.json({
      success: true,
      data: entities,
      total: entities.length,
    });
  } catch (error) {
    console.error("[CMS Entities GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "CMS_FETCH_FAILED", message: "Failed to retrieve CMS content entities." },
      },
      { status: 500 }
    );
  }
}

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
    const parseResult = cmsEntityMutationSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid CMS entity payload.",
            details: parseResult.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const result = await cmsService.createEntity(parseResult.data, {
      id: actorId,
      email: actorEmail,
      role: actorRole,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "MUTATION_REJECTED", message: result.error || "Mutation rejected." },
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        message: `Entity "${result.data?.title}" successfully created.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CMS Entities POST Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to create CMS content entity." },
      },
      { status: 500 }
    );
  }
}

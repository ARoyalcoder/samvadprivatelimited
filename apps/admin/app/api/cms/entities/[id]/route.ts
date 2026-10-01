import { NextRequest, NextResponse } from "next/server";
import { cmsService } from "../../../../../lib/cms/cms-service";
import { AuthRole } from "@samvad/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entity = await cmsService.getEntityById(id);

    if (!entity) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: `Entity "${id}" was not located.` },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: entity,
    });
  } catch (error) {
    console.error("[CMS Entity GET by ID Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to fetch entity." },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updates = await req.json().catch(() => ({}));

    const result = await cmsService.updateEntity(id, updates, {
      id: actorId,
      email: actorEmail,
      role: actorRole,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "MUTATION_REJECTED", message: result.error || "Failed to update entity." },
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: `Entity "${result.data?.title}" updated successfully.`,
    });
  } catch (error) {
    console.error("[CMS Entity PATCH Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to update entity." },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const actorRole = (req.headers.get("x-user-role") || "ANALYST") as AuthRole;
    const actorId = req.headers.get("x-user-id") || "usr_anonymous";
    const actorEmail = req.headers.get("x-user-email") || "anonymous@samvadadvisory.com";

    const result = await cmsService.deleteEntity(id, {
      id: actorId,
      email: actorEmail,
      role: actorRole,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "DELETE_REJECTED", message: result.error || "Failed to delete entity." },
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Entity "${id}" was permanently removed or archived.`,
    });
  } catch (error) {
    console.error("[CMS Entity DELETE Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to delete entity." },
      },
      { status: 500 }
    );
  }
}

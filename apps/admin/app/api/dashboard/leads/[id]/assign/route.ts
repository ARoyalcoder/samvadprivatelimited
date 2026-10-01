import { NextRequest, NextResponse } from "next/server";
import { leadService } from "../../../../../../lib/leads/lead-service";
import { adminAuthService } from "../../../../../../lib/auth/auth-service";
import { leadAssignSchema } from "@samvad/validation";
import { AuthRole } from "@samvad/auth";

export const dynamic = "force-dynamic";

function getActorContext(req: NextRequest) {
  const sessionToken = req.cookies.get("samvad_admin_session")?.value;
  let actor = {
    id: req.headers.get("x-user-id") || "usr_anonymous",
    name: req.headers.get("x-user-name") || "Admin User",
    email: req.headers.get("x-user-email") || "admin@samvadadvisory.com",
    role: (req.headers.get("x-user-role") || "ANALYST") as AuthRole,
  };

  if (sessionToken) {
    const session = adminAuthService.getSessionFromCookie(sessionToken);
    if (session) {
      actor = {
        id: session.userId,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      };
    }
  }

  return actor;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const actor = getActorContext(req);

    if (actor.role === "ANALYST") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "ANALYST role has strictly read-only intelligence access.",
          },
        },
        { status: 403 }
      );
    }

    const { id: leadId } = await params;
    const body = await req.json().catch(() => ({}));
    const parseResult = leadAssignSchema.safeParse({ ...body, leadId });

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Invalid lead assignment parameters.",
            details: parseResult.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const { assignedToUserId, assignedToUserName, assignedToUserEmail } = parseResult.data;

    const updated = await leadService.assignLead({
      leadId,
      assignee: {
        userId: assignedToUserId,
        userName: assignedToUserName,
        userEmail: assignedToUserEmail,
      },
      actor: { id: actor.id, name: actor.name, email: actor.email },
    });

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "LEAD_NOT_FOUND", message: `Lead with ID "${leadId}" was not found.` },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: `Lead ${leadId} assigned to ${assignedToUserName}`,
    });
  } catch (error) {
    console.error("[Lead Assign Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "ASSIGN_FAILED", message: "Failed to assign lead." },
      },
      { status: 500 }
    );
  }
}

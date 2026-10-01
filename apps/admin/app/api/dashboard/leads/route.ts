import { NextRequest, NextResponse } from "next/server";
import { leadService } from "../../../../lib/leads/lead-service";
import { adminAuthService } from "../../../../lib/auth/auth-service";
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "ALL";
    const search = searchParams.get("search") || "";
    const industry = searchParams.get("industry") || "ALL";
    const assignedTo = searchParams.get("assignedTo") || "ALL";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const result = await leadService.getLeads({
      status,
      search,
      industry,
      assignedTo,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("[Dashboard Leads API GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "LEADS_FETCH_FAILED", message: "Failed to retrieve leads pipeline." },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
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

    const body = await req.json().catch(() => ({}));
    const { leadId, status, reason } = body;

    if (!leadId || !status) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INVALID_PARAMETERS", message: "leadId and status are required." },
        },
        { status: 400 }
      );
    }

    const updated = await leadService.updateStatus({
      leadId,
      status,
      actor: { id: actor.id, name: actor.name, email: actor.email },
      reason,
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
      message: `Lead ${leadId} status updated to ${status}`,
    });
  } catch (error) {
    console.error("[Dashboard Leads API PATCH Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "LEAD_UPDATE_FAILED", message: "Failed to update lead status." },
      },
      { status: 500 }
    );
  }
}

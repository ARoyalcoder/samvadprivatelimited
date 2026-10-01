import { NextRequest, NextResponse } from "next/server";
import { leadService } from "../../../../../lib/leads/lead-service";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params;
    const lead = await leadService.getLeadById(leadId);

    if (!lead) {
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
      data: lead,
    });
  } catch (error) {
    console.error("[Lead Detail GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "LEAD_FETCH_FAILED", message: "Failed to retrieve lead details." },
      },
      { status: 500 }
    );
  }
}

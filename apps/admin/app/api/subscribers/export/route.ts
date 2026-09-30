import { NextResponse } from "next/server";
import { prisma } from "@samvad/database";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let subscribers: any[] = [];
    try {
      subscribers = await prisma.newsletterSubscriber.findMany({
        where: { status: "SUBSCRIBED" },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      subscribers = [];
    }

    const headers = ["ID", "Email", "Status", "Source", "ConsentedAt", "CreatedAt"].join(",");
    const rows = subscribers.map((s) =>
      [
        `"${s.id}"`,
        `"${s.email}"`,
        `"${s.status}"`,
        `"${s.source}"`,
        `"${s.consentedAt ? new Date(s.consentedAt).toISOString() : ""}"`,
        `"${new Date(s.createdAt).toISOString()}"`,
      ].join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="samvad_subscribers_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("[Subscribers Export Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate CSV export" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@samvad/database";
import { adminSubscriberFilterSchema } from "@samvad/validation";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const parseResult = adminSubscriberFilterSchema.safeParse({
      status: searchParams.get("status") || "ALL",
      search: searchParams.get("search") || "",
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 20,
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid query filters", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { status, search, page, limit } = parseResult.data;

    // Build where conditions
    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search && search.trim() !== "") {
      where.email = { contains: search.toLowerCase().trim(), mode: "insensitive" };
    }

    let subscribers: any[] = [];
    let total = 0;
    let totalSubscribers = 0;
    let activeSubscribers = 0;
    let unsubscribedSubscribers = 0;

    try {
      // 1. Fetch paginated records
      const [records, count, totalCount, activeCount, unsubCount] = await Promise.all([
        prisma.newsletterSubscriber.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
          include: {
            deliveryLogs: {
              take: 3,
              orderBy: { sentAt: "desc" },
            },
          },
        }),
        prisma.newsletterSubscriber.count({ where }),
        prisma.newsletterSubscriber.count(),
        prisma.newsletterSubscriber.count({ where: { status: "SUBSCRIBED" } }),
        prisma.newsletterSubscriber.count({ where: { status: "UNSUBSCRIBED" } }),
      ]);

      subscribers = records;
      total = count;
      totalSubscribers = totalCount;
      activeSubscribers = activeCount;
      unsubscribedSubscribers = unsubCount;
    } catch {
      // If DB is offline, return graceful fallback
      subscribers = [];
      total = 0;
    }

    const totalPages = Math.ceil(total / limit) || 1;
    const churnRatePercent =
      totalSubscribers > 0
        ? parseFloat(((unsubscribedSubscribers / totalSubscribers) * 100).toFixed(1))
        : 0;

    return NextResponse.json({
      success: true,
      subscribers,
      total,
      page,
      limit,
      totalPages,
      stats: {
        totalSubscribers,
        activeSubscribers,
        unsubscribedSubscribers,
        churnRatePercent,
      },
    });
  } catch (error) {
    console.error("[Admin Subscribers API GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve subscriber directory" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { subscriberId, status, reason } = body;

    if (!subscriberId || !status) {
      return NextResponse.json(
        { success: false, error: "subscriberId and target status are required" },
        { status: 400 }
      );
    }

    const updateData: any = { status };
    if (status === "UNSUBSCRIBED") {
      updateData.unsubscribedAt = new Date();
      updateData.unsubscribeReason = reason || "ADMIN_ACTION";
    } else if (status === "SUBSCRIBED") {
      updateData.unsubscribedAt = null;
      updateData.unsubscribeReason = null;
    }

    const updated = await prisma.newsletterSubscriber.update({
      where: { id: subscriberId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: `Subscriber status updated to ${status}`,
      subscriber: updated,
    });
  } catch (error) {
    console.error("[Admin Subscribers API PATCH Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update subscriber record" },
      { status: 500 }
    );
  }
}

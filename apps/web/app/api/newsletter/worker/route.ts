import { NextResponse } from "next/server";
import { newsletterWorker } from "@/lib/newsletter/worker";

export const dynamic = "force-dynamic";

/**
 * Worker Trigger API Route.
 * Can be triggered via cron job or internal service scheduler to drain queued jobs.
 */
export async function POST() {
  try {
    const summary = await newsletterWorker.drainQueue();
    return NextResponse.json({
      success: true,
      message: "Worker queue processed",
      summary,
    });
  } catch (error) {
    console.error("[Newsletter Worker Route Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to execute worker",
      },
      { status: 500 }
    );
  }
}

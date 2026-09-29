import { NextResponse } from "next/server";
import { metrics } from "@samvad/telemetry";

export const dynamic = "force-dynamic";

export async function GET() {
  const output = metrics.exportPrometheusFormat();
  return new NextResponse(output, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
    },
  });
}

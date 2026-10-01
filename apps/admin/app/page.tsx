import * as React from "react";
import type { Metadata } from "next";
import { DashboardView } from "../components/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "SAMVAD Command Dashboard | Perception Advisory",
  description:
    "Executive enterprise administration, intelligence telemetry, leads triage, and content governance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100 flex items-center justify-center font-mono text-xs text-gold-400">
          Initializing Command Center Telemetry...
        </div>
      }
    >
      <DashboardView />
    </React.Suspense>
  );
}

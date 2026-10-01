"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { StrategicVelocityChart, SectorDistributionChart } from "../dashboard-charts";
import { VisitorTrendPoint } from "../../../lib/dashboard/dashboard-service";

interface AnalyticsSectionProps {
  trendData: VisitorTrendPoint[];
}

export function AnalyticsSection({ trendData }: AnalyticsSectionProps) {
  const channelBreakdown = [
    { source: "Institutional Direct / Boardroom Referrals", percentage: 46, count: 22195 },
    { source: "Sovereign Perception Index Quotations", percentage: 28, count: 13510 },
    { source: "Financial Media Citations & Op-Eds", percentage: 16, count: 7720 },
    { source: "Private Family Office Networks", percentage: 10, count: 4825 },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="font-serif text-xl font-semibold text-zinc-100">
          Perception Intelligence &amp; Traffic Telemetry
        </h2>
        <p className="text-xs text-zinc-400 font-light">
          Audience engagement vectors, sovereign node traffic distribution, and conversion analytics
        </p>
      </div>

      {/* 2. Top Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Visitor-to-Lead Conversion",
            value: "3.8%",
            subtext: "Above 2.1% institutional benchmark",
            change: "+0.6%",
          },
          {
            label: "Avg Advisory Cycle",
            value: "14 Days",
            subtext: "Initial inquiry to mandate retainer",
            change: "-2 Days",
          },
          {
            label: "Dispatch Read-Through",
            value: "78.2%",
            subtext: "Executive newsletter engagement",
            change: "+4.1%",
          },
          {
            label: "Sovereign Citation Index",
            value: "94.6 / 100",
            subtext: "Perception index influence score",
            change: "+8.2",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              {item.label}
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl font-bold text-zinc-100">{item.value}</span>
              <span className="font-mono text-xs text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                {item.change}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-light">{item.subtext}</p>
          </div>
        ))}
      </div>

      {/* 3. 30-Day Velocity Curve */}
      <StrategicVelocityChart data={trendData} height={260} />

      {/* 4. Split: Sector Demand & Channel Ingestion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectorDistributionChart />

        {/* Channel Ingestion Breakdown */}
        <div className="rounded border border-zinc-800/80 bg-zinc-950/70 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Acquisition Vectors &amp; Referral Origin
            </h4>
            <span className="font-mono text-[10px] text-zinc-500">48,250 Total Visits</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {channelBreakdown.map((ch) => (
              <div key={ch.source} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 text-[11px]">{ch.source}</span>
                  <span className="text-zinc-400">
                    {ch.percentage}% ({ch.count.toLocaleString()})
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold-500/80"
                    style={{ width: `${ch.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

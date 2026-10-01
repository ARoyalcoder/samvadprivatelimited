"use client";

import * as React from "react";
import { VisitorTrendPoint } from "../../lib/dashboard/dashboard-service";

interface VelocityChartProps {
  data: VisitorTrendPoint[];
  height?: number;
}

export function StrategicVelocityChart({ data, height = 220 }: VelocityChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center font-mono text-xs text-zinc-500 border border-dashed border-zinc-800 rounded">
        No telemetry trajectory points available
      </div>
    );
  }

  // Calculate scales
  const maxVisitors = Math.max(...data.map((d) => d.visitors), 2000);
  const minVisitors = Math.min(...data.map((d) => d.visitors), 1000) * 0.9;
  const paddingX = 40;
  const paddingY = 25;
  const chartWidth = 720;
  const chartHeight = height;
  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * innerWidth;
    const y =
      paddingY +
      innerHeight -
      ((d.visitors - minVisitors) / (maxVisitors - minVisitors)) * innerHeight;
    return { x, y, data: d };
  });

  // SVG Path generator
  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // Catmull-Rom or cubic bezier smoothing
    const prev = points[i - 1]!;
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  // Area path closing
  const areaD = `${pathD} L ${points[points.length - 1]!.x} ${
    paddingY + innerHeight
  } L ${points[0]!.x} ${paddingY + innerHeight} Z`;

  const hovered = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div className="relative w-full overflow-hidden rounded border border-zinc-800/80 bg-zinc-950/70 p-4">
      {/* Chart Header with Live Cursor Diagnostics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-3 mb-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Executive Traffic &amp; Perception Inquiries Velocity (30 Days)
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 font-light">
            Sovereign node visitor volume correlated with confidential strategic inquiries
          </span>
        </div>

        {hovered && (
          <div className="flex items-center gap-4 font-mono text-xs animate-in fade-in duration-150">
            <span className="text-zinc-400">{hovered.data.dayLabel}:</span>
            <span className="text-gold-400 font-semibold">
              {hovered.data.visitors.toLocaleString()} Visitors
            </span>
            <span className="text-emerald-400 font-semibold">
              {hovered.data.inquiries} Inquiries
            </span>
          </div>
        )}
      </div>

      {/* SVG Viewport */}
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Gold Linear Gradient Fill */}
            <linearGradient id="visitorVelocityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = paddingY + innerHeight * (1 - ratio);
            const val = Math.round(minVisitors + (maxVisitors - minVisitors) * ratio);
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#27272a"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-zinc-600 font-mono text-[9px]"
                >
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Shaded Area */}
          <path d={areaD} fill="url(#visitorVelocityGradient)" />

          {/* Golden Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#d4af37"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points on Hover */}
          {points.map((p, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g key={idx}>
                {/* Invisible Hover Zone */}
                <rect
                  x={p.x - 10}
                  y={paddingY}
                  width={20}
                  height={innerHeight}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className="cursor-crosshair"
                />

                {isHovered && (
                  <>
                    <line
                      x1={p.x}
                      y1={paddingY}
                      x2={p.x}
                      y2={paddingY + innerHeight}
                      stroke="#d4af37"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="5"
                      fill="#d4af37"
                      stroke="#09090b"
                      strokeWidth="2"
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Timeline Footnote */}
      <div className="flex justify-between items-center pt-2 font-mono text-[10px] text-zinc-500 border-t border-zinc-900">
        <span>{data[0]?.dayLabel}</span>
        <span>Mid-Period Analysis</span>
        <span>{data[data.length - 1]?.dayLabel} (Today)</span>
      </div>
    </div>
  );
}

/**
 * Strategic Sector Demand Bar Visualization
 */
export function SectorDistributionChart() {
  const sectors = [
    { name: "Defense & Aerospace", percentage: 28, count: 18, color: "bg-amber-500" },
    { name: "FinTech & Sovereign BFSI", percentage: 24, count: 15, color: "bg-gold-500" },
    { name: "Energy & Infrastructure", percentage: 19, count: 12, color: "bg-emerald-500" },
    { name: "Healthcare & Therapeutics", percentage: 15, count: 10, color: "bg-sky-500" },
    { name: "Enterprise DeepTech", percentage: 14, count: 9, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-4 rounded border border-zinc-800/80 bg-zinc-950/70 p-4">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
        <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
          Inquiry Origin by Industry Sector
        </h4>
        <span className="font-mono text-[10px] text-zinc-500">64 Active Client Mandates</span>
      </div>

      <div className="space-y-3">
        {sectors.map((s) => (
          <div key={s.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-300">{s.name}</span>
              <span className="text-zinc-400">
                {s.percentage}% ({s.count})
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
              <div
                className={`h-full rounded-full ${s.color} transition-all duration-500`}
                style={{ width: `${s.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Container, DialogueNetwork } from "@samvad/ui";
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  Radio,
} from "lucide-react";

type AlignmentMode = "unmanaged" | "aligned";

export function StrategicVizSection() {
  const [mode, setMode] = React.useState<AlignmentMode>("aligned");
  const [selectedNode, setSelectedNode] =
    React.useState<string>("regulators");

  const nodes = [
    {
      id: "regulators",
      name: "Sovereign Regulators & Ministries",
      category: "Sovereign Accord",
      unmanaged:
        "Hostile scrutiny, formal inquiry, unpredictable sanctions exposure",
      aligned:
        "Bilateral briefing established; transparent policy compliance accord",
      status:
        mode === "aligned" ? "Clearance Secured" : "Active Scrutiny",
    },
    {
      id: "shareholders",
      name: "Institutional Capital & Proxy Advisors",
      category: "Capital Markets",
      unmanaged:
        "Valuation discount, speculative short raids, panic divestment chatter",
      aligned:
        "Clear strategic thesis, investor sentiment insulated, premium defended",
      status:
        mode === "aligned" ? "Consensus Retained" : "Fragmented Panic",
    },
    {
      id: "press",
      name: "Tier-1 Editorial & Financial Press",
      category: "Media Scrutiny",
      unmanaged:
        "Sensationalist framing, leaks exploited, adverse front-page cycles",
      aligned:
        "Fact-anchored narrative, proactive briefing packets, balanced reporting",
      status:
        mode === "aligned" ? "Narrative Anchored" : "Adverse Spin",
    },
    {
      id: "kol",
      name: "Key Opinion Leaders & Industry Analysts",
      category: "Influence Vectors",
      unmanaged:
        "Asymmetric rumor amplification on algorithmic knowledge graphs",
      aligned:
        "Independent validation, expert endorsement, verified factual citations",
      status:
        mode === "aligned" ? "Authoritative Accord" : "Adversarial Noise",
    },
  ];

  const currentActiveNode =
    nodes.find((n) => n.id === selectedNode) ?? nodes[0]!;

  return (
    <section
      id="strategic-visualization"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-[#a67c45]/[0.035] blur-[140px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[400px] w-[400px] rounded-full bg-[#5d7180]/[0.035] blur-[120px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <Activity className="h-3 w-3 text-[#a67c45]" />
              Strategic Visualization
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
              From narrative noise to
              <br />
              <span className="font-normal italic text-[#a67c45]">
                strategic alignment
              </span>
            </h2>

            <p className="text-[#697176] text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              See how coordinated communication changes the relationship
              between institutions, markets, media, and influential voices.
            </p>
          </div>

          {/* Interactive State Switcher */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8a8f91]">
              Scenario
            </span>

            <div className="inline-flex rounded-full border border-[#d0c9bd] bg-[#ebe7de] p-1">
              <button
                type="button"
                onClick={() => setMode("unmanaged")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  mode === "unmanaged"
                    ? "bg-[#6f3430]/10 text-[#8d4540] border border-[#8d4540]/25"
                    : "text-[#8a8f91] hover:text-[#596267]"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Unmanaged</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("aligned")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  mode === "aligned"
                    ? "bg-[#a67c45]/10 text-[#8c6537] border border-[#a67c45]/30 shadow-sm"
                    : "text-[#8a8f91] hover:text-[#596267]"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Aligned</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Matrix Display Canvas */}
        <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/75 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(29,37,41,0.08)]">
          {/* Top Metric Telemetry Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-[#d8d1c5]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#8a8f91]">
                Discourse Entropy
              </div>

              <div
                className={`font-serif text-2xl sm:text-3xl font-light mt-1 transition-colors duration-300 ${
                  mode === "aligned"
                    ? "text-[#587b69]"
                    : "text-[#9a4b45]"
                }`}
              >
                {mode === "aligned"
                  ? "12% [Minimal]"
                  : "89% [Critical]"}
              </div>

              <div className="font-mono text-[10px] text-[#9b9b98] mt-0.5">
                {mode === "aligned"
                  ? "Low information distortion"
                  : "High narrative distortion"}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#8a8f91]">
                Narrative Coherence
              </div>

              <div
                className={`font-serif text-2xl sm:text-3xl font-light mt-1 transition-colors duration-300 ${
                  mode === "aligned"
                    ? "text-[#a67c45]"
                    : "text-[#9a7040]"
                }`}
              >
                {mode === "aligned" ? "98.4%" : "27.1%"}
              </div>

              <div className="font-mono text-[10px] text-[#9b9b98] mt-0.5">
                {mode === "aligned"
                  ? "Consistent across channels"
                  : "Conflicting signals"}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#8a8f91]">
                Decision Maker Trust
              </div>

              <div
                className={`font-serif text-2xl sm:text-3xl font-light mt-1 transition-colors duration-300 ${
                  mode === "aligned"
                    ? "text-[#1d2529]"
                    : "text-[#8a8f91]"
                }`}
              >
                {mode === "aligned"
                  ? "High Sovereign Trust"
                  : "Severely Eroded"}
              </div>

              <div className="font-mono text-[10px] text-[#9b9b98] mt-0.5">
                {mode === "aligned"
                  ? "Direct institutional access"
                  : "Formal barriers active"}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#8a8f91]">
                Valuation Resilience
              </div>

              <div
                className={`font-serif text-2xl sm:text-3xl font-light mt-1 transition-colors duration-300 ${
                  mode === "aligned"
                    ? "text-[#a67c45]"
                    : "text-[#9a4b45]"
                }`}
              >
                {mode === "aligned"
                  ? "+$1.8B Protected"
                  : "-18% Discount Risk"}
              </div>

              <div className="font-mono text-[10px] text-[#9b9b98] mt-0.5">
                {mode === "aligned"
                  ? "Downside contained"
                  : "Market vulnerability"}
              </div>
            </div>
          </div>

          {/* Interactive Network Visual & Node Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            {/* Left: Dynamic Network Simulation Canvas */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded-xs border border-[#d8d1c5] bg-[#e0dbd1] overflow-hidden flex items-center justify-center">
              <DialogueNetwork
                density={mode === "aligned" ? "medium" : "dense"}
                interactive
                showLabels
                className="absolute inset-0 opacity-80"
              />

              {/* Status Overlay HUD */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#a67c45] backdrop-blur-md">
                <Radio className="h-3 w-3 text-[#a67c45]" />
                <span>
                  Mode:{" "}
                  {mode === "aligned"
                    ? "Alignment Active"
                    : "Narrative Uncontrolled"}
                </span>
              </div>

              {/* Node status indicators */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#8a8f91]">
                <span>
                  Vector:{" "}
                  {mode === "aligned"
                    ? "Harmonic"
                    : "Divergent"}
                </span>
                <span>Latency: &lt;15ms</span>
              </div>
            </div>

            {/* Right: Node Inspection & Detailed Status */}
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                Influence Stakeholders
              </div>

              <div className="space-y-2">
                {nodes.map((node) => {
                  const isSelected = selectedNode === node.id;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedNode(node.id)}
                      className={`w-full text-left p-4 rounded-xs border transition-all ${
                        isSelected
                          ? "border-[#a67c45]/50 bg-[#e2ddd3] shadow-sm"
                          : "border-[#d8d1c5] bg-[#f3f0e8]/60 hover:border-[#bdb5a8] hover:bg-[#ebe7de]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-[#3d474c]">
                          {node.name}
                        </span>

                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs border ${
                            mode === "aligned"
                              ? "border-[#587b69]/30 bg-[#587b69]/10 text-[#587b69]"
                              : "border-[#9a4b45]/30 bg-[#9a4b45]/10 text-[#9a4b45]"
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>

                      <div className="font-mono text-[9px] uppercase tracking-widest text-[#8a8f91] mt-1">
                        {node.category}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Node Analysis Brief */}
              <div className="p-4 rounded-xs border border-[#d8d1c5] bg-[#e7e2d8] space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#596267]">
                  Assessment: {currentActiveNode.name}
                </div>

                <p className="text-xs font-light text-[#697176] leading-relaxed">
                  {mode === "aligned"
                    ? currentActiveNode.aligned
                    : currentActiveNode.unmanaged}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
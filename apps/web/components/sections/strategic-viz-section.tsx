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
  const [selectedNode, setSelectedNode] = React.useState<string>("regulators");

  const nodes = [
    {
      id: "regulators",
      name: "Sovereign Regulators & Ministries",
      category: "Sovereign Accord",
      unmanaged: "Hostile scrutiny, formal inquiry, unpredictable sanctions exposure",
      aligned: "Bilateral briefing established; transparent policy compliance accord",
      status: mode === "aligned" ? "Clearance Secured" : "Active Scrutiny",
    },
    {
      id: "shareholders",
      name: "Institutional Capital & Proxy Advisors",
      category: "Capital Markets",
      unmanaged: "Valuation discount, speculative short raids, panic divestment chatter",
      aligned: "Clear strategic thesis, investor sentiment insulated, premium defended",
      status: mode === "aligned" ? "Consensus Retained" : "Fragmented Panic",
    },
    {
      id: "press",
      name: "Tier-1 Editorial & Financial Press",
      category: "Media Scrutiny",
      unmanaged: "Sensationalist framing, leaks exploited, adverse front-page cycles",
      aligned: "Fact-anchored narrative, proactive briefing packets, balanced reporting",
      status: mode === "aligned" ? "Narrative Anchored" : "Adverse Spin",
    },
    {
      id: "kol",
      name: "Key Opinion Leaders & Industry Analysts",
      category: "Influence Vectors",
      unmanaged: "Asymmetric rumor amplification on algorithmic knowledge graphs",
      aligned: "Independent validation, expert endorsement, verified factual citations",
      status: mode === "aligned" ? "Authoritative Accord" : "Adversarial Noise",
    },
  ];

  const currentActiveNode = nodes.find((n) => n.id === selectedNode) ?? nodes[0]!;

  return (
    <section
      id="strategic-visualization"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <Activity className="h-3 w-3 animate-pulse text-gold-400" />
              Perception Physics Engine
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Strategic Communication Visualization: <br />
              <span className="font-normal italic text-gold-300">
                Discourse Noise vs. Sovereign Alignment
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              In high-consequence environments, unmanaged communications fracture into adversarial noise.
              SAMVAD orchestrates disparate nodes into a cohesive sovereign vector that commands authority.
            </p>
          </div>

          {/* Interactive State Switcher */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
              Topology Simulator
            </span>
            <div className="inline-flex rounded-full border border-obsidian-750 bg-obsidian-900/90 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setMode("unmanaged")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  mode === "unmanaged"
                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                    : "text-obsidian-400 hover:text-sand-300"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Unmanaged Noise</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("aligned")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  mode === "aligned"
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/30 shadow-sm"
                    : "text-obsidian-400 hover:text-sand-300"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>SAMVAD Aligned</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Matrix Display Canvas */}
        <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/50 p-6 sm:p-8 lg:p-10 shadow-elevation-2 backdrop-blur-sm">
          {/* Top Metric Telemetry Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-obsidian-800">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                Discourse Entropy
              </div>
              <div
                className={`font-serif text-2xl sm:text-3xl font-light mt-1 transition-colors duration-300 ${
                  mode === "aligned" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {mode === "aligned" ? "12% [Minimal]" : "89% [Critical]"}
              </div>
              <div className="font-mono text-[10px] text-obsidian-500 mt-0.5">
                {mode === "aligned" ? "Near zero disinformation echo" : "High adversarial distortion"}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                Narrative Coherence
              </div>
              <div
                className={`font-serif text-2xl sm:text-3xl font-light mt-1 transition-colors duration-300 ${
                  mode === "aligned" ? "text-gold-400" : "text-amber-400"
                }`}
              >
                {mode === "aligned" ? "98.4%" : "27.1%"}
              </div>
              <div className="font-mono text-[10px] text-obsidian-500 mt-0.5">
                {mode === "aligned" ? "Harmonic across channels" : "Contradictory internal cues"}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                Decision Maker Trust
              </div>
              <div
                className={`font-serif text-2xl sm:text-3xl font-light mt-1 transition-colors duration-300 ${
                  mode === "aligned" ? "text-sand-100" : "text-obsidian-400"
                }`}
              >
                {mode === "aligned" ? "High Sovereign Trust" : "Severely Eroded"}
              </div>
              <div className="font-mono text-[10px] text-obsidian-500 mt-0.5">
                {mode === "aligned" ? "Direct ministerial access" : "Formal barricades active"}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                Valuation Resilience
              </div>
              <div
                className={`font-serif text-2xl sm:text-3xl font-light mt-1 transition-colors duration-300 ${
                  mode === "aligned" ? "text-gold-300" : "text-red-400"
                }`}
              >
                {mode === "aligned" ? "+$1.8B Protected" : "-18% Discount Risk"}
              </div>
              <div className="font-mono text-[10px] text-obsidian-500 mt-0.5">
                {mode === "aligned" ? "Hostile short-thesis defeated" : "Vulnerable to market runs"}
              </div>
            </div>
          </div>

          {/* Interactive Network Visual & Node Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            {/* Left: Dynamic Network Simulation Canvas */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded-xs border border-obsidian-800/80 bg-obsidian-950 overflow-hidden flex items-center justify-center">
              <DialogueNetwork
                density={mode === "aligned" ? "medium" : "dense"}
                interactive
                showLabels
                className="absolute inset-0 opacity-80"
              />

              {/* Status Overlay HUD */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-xs border border-obsidian-750 bg-obsidian-900/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gold-400 backdrop-blur-md">
                <Radio className="h-3 w-3 animate-pulse text-gold-400" />
                <span>
                  Mode: {mode === "aligned" ? "Sovereign Alignment Active" : "Uncontrolled Narrative Entropy"}
                </span>
              </div>

              {/* Node status indicators */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-obsidian-400">
                <span>Vector: {mode === "aligned" ? "Harmonic Centered" : "Divergent Chaos"}</span>
                <span>Latent Latency: &lt;15ms</span>
              </div>
            </div>

            {/* Right: Node Inspection & Detailed Status */}
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                Select Influence Stakeholder Node
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
                          ? "border-gold-500/50 bg-obsidian-850 shadow-sm"
                          : "border-obsidian-800 bg-obsidian-950/60 hover:border-obsidian-700 hover:bg-obsidian-900/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-sand-200">
                          {node.name}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs border ${
                            mode === "aligned"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                              : "border-red-500/30 bg-red-500/10 text-red-300"
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-obsidian-400 mt-1">
                        {node.category}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Node Analysis Brief */}
              <div className="p-4 rounded-xs border border-obsidian-800 bg-obsidian-900/80 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-sand-300">
                  Operational Node Assessment: {currentActiveNode.name}
                </div>
                <p className="text-xs font-light text-sand-400 leading-relaxed">
                  {mode === "aligned" ? currentActiveNode.aligned : currentActiveNode.unmanaged}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

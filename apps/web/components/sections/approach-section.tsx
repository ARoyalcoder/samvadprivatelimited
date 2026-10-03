"use client";

import * as React from "react";
import Link from "next/link";
import { Container, Badge } from "@samvad/ui";
import {
  Compass,
  FileCheck,
  Radio,
  Anchor,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function ApproachSection() {
  const [selectedPhase, setSelectedPhase] = React.useState(0);

  const phases = [
    {
      num: "01",
      phase: "Phase 01",
      name: "Horizon Reconnaissance & Topology",
      timeframe: "Hours 0 – 24",
      icon: Compass,
      tag: "Intelligence Gathering",
      summary:
        "Mapping adversarial sentiment, regulatory signals, and latent perception vulnerabilities.",
      tactics: [
        "Media graph & sentiment topology analysis",
        "Intelligence gathering across regulatory corridors",
        "Key Opinion Leader vulnerability mapping",
        "Baseline discourse risk and attribution audit",
      ],
      output: "Confidential Threat Horizon Assessment & Action Matrix",
    },
    {
      num: "02",
      phase: "Phase 02",
      name: "Narrative Genesis & Strategic Framing",
      timeframe: "Hours 24 – 72",
      icon: FileCheck,
      tag: "Doctrinal Formulation",
      summary:
        "Building the institutional thesis and preparing evidentiary counter-briefing playbooks.",
      tactics: [
        "Core narrative doctrine and sovereign positioning",
        "Adversarial counter-briefing and fact sheets",
        "Ministerial and regulatory briefing packets",
        "Executive stress-testing and hostile scenarios",
      ],
      output: "Institutional Narrative Playbook & Evidentiary Dossiers",
    },
    {
      num: "03",
      phase: "Phase 03",
      name: "Precision Deployment & Channel Orchestration",
      timeframe: "Day 3 – Day 30",
      icon: Radio,
      tag: "Tactical Execution",
      summary:
        "Coordinated deployment across diplomatic, regulatory, financial, and media channels.",
      tactics: [
        "Stakeholder briefings with key decision-makers",
        "Financial and editorial press briefings",
        "Real-time social and search containment",
        "Parliamentary and legislative engagement",
      ],
      output: "Coordinated Multi-Channel Narrative Deployment",
    },
    {
      num: "04",
      phase: "Phase 04",
      name: "Narrative Anchoring & Sentiment Defense",
      timeframe: "Day 30 – Day 90+",
      icon: Anchor,
      tag: "Enduring Moat",
      summary:
        "Sustained perception defense, search stabilization, and long-term reputation protection.",
      tactics: [
        "Continuous perception telemetry and sentiment reporting",
        "Search reputation and knowledge-graph maintenance",
        "Institutional stakeholder feedback reconciliation",
        "Long-term legacy and valuation protection",
      ],
      output: "Permanent Sovereign Narrative Moat & Continuous Telemetry",
    },
  ];

  const current = phases[selectedPhase] ?? phases[0]!;

  return (
    <section
      id="approach"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Background ambient tone */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#a67c45]/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Header Block */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Operational Protocol
            </div>

            <h2 className="font-serif text-3xl font-light leading-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
              Our Approach: <br />
              <span className="font-normal italic text-[#a67c45]">
                A Four-Phase Operational Discipline
              </span>
            </h2>

            <p className="text-sm font-light leading-relaxed text-[#727a7d] sm:text-base">
              A structured protocol designed to reduce narrative friction and
              build durable institutional authority.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8a918f]">
            <Clock className="h-4 w-4 text-[#a67c45]" />
            <span>Standard Protocol: Hour 0 to Day 90</span>
          </div>
        </div>

        {/* Phase Navigation Stepper */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, idx) => {
            const isCurrent = selectedPhase === idx;
            const Icon = phase.icon;

            return (
              <button
                key={phase.num}
                type="button"
                onClick={() => setSelectedPhase(idx)}
                className={`relative rounded-xs border p-6 text-left transition-all ${
                  isCurrent
                    ? "border-[#a67c45]/60 bg-[#ebe7de] shadow-elevation-2"
                    : "border-[#d0c9bd] bg-[#ebe7de]/55 hover:border-[#b7afa2] hover:bg-[#e7e2d8]"
                }`}
              >
                {/* Active Top Bar Indicator */}
                {isCurrent && (
                  <div className="absolute left-0 right-0 top-0 h-1 rounded-t-xs bg-[#a67c45]" />
                )}

                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#a67c45]">
                    {phase.phase}
                  </span>

                  <span className="font-mono text-[10px] text-[#8a918f]">
                    {phase.timeframe}
                  </span>
                </div>

                <div className="mb-2 flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-xs border ${
                      isCurrent
                        ? "border-[#a67c45]/40 bg-[#a67c45]/10 text-[#a67c45]"
                        : "border-[#c9c2b7] bg-[#f3f0e8] text-[#8a918f]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <div className="font-serif text-sm font-medium text-[#1d2529]">
                    {phase.name}
                  </div>
                </div>

                <div className="pl-10 font-mono text-[9px] uppercase tracking-wider text-[#8a918f]">
                  {phase.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Phase Inspection Panel */}
        <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 shadow-elevation-2 sm:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Narrative Block */}
            <div className="space-y-6 lg:col-span-7">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="border-[#a67c45]/30 bg-[#a67c45]/10 font-mono text-[10px] uppercase tracking-widest text-[#8d6737]"
                >
                  {current.phase} · {current.timeframe}
                </Badge>

                <span className="font-mono text-xs text-[#9a9388]">/</span>

                <span className="font-mono text-xs text-[#a67c45]">
                  {current.tag}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-normal leading-snug text-[#1d2529] sm:text-3xl">
                {current.name}
              </h3>

              <p className="text-sm font-light leading-relaxed text-[#566066] sm:text-base">
                {current.summary}
              </p>

              <div className="space-y-3 pt-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#8a918f]">
                  Tactical Milestones
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {current.tactics.map((tactic, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-3 text-xs font-light text-[#566066]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a67c45]" />
                      <span>{tactic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Deliverable Output Box */}
            <div className="space-y-6 rounded-xs border border-[#d0c9bd] bg-[#e5e0d6] p-8 lg:col-span-5">
              <div className="space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  Verified Phase Deliverable
                </div>

                <h4 className="font-serif text-xl font-normal text-[#1d2529]">
                  {current.output}
                </h4>

                <p className="text-xs font-light leading-relaxed text-[#727a7d]">
                  Every deliverable is reviewed by senior partners and handled
                  under strict confidentiality protocols.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#d0c9bd] pt-4">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#8a918f]">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Audit Trail Logged</span>
                </div>

                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#a67c45] hover:text-[#805d32]"
                >
                  <span>Initiate Protocol</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
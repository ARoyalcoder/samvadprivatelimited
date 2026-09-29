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
        "Comprehensive mapping of adversarial sentiment vectors, regulatory signals, and latent perception vulnerabilities.",
      tactics: [
        "Algorithmic media graph & sentiment topology analysis",
        "Discreet intelligence gathering across regulatory and institutional corridors",
        "Key Opinion Leader (KOL) vulnerability mapping",
        "Baseline discourse risk audit and attribution analysis",
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
        "Synthesizing an unassailable institutional thesis and preparing rapid evidentiary counter-briefing playbooks.",
      tactics: [
        "Core narrative doctrine formulation and sovereign positioning",
        "Adversarial counter-briefing preparation and forensic fact sheets",
        "Ministerial and regulatory briefing packet drafting",
        "Simulated executive stress-testing and hostile scenario rehearsal",
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
        "Synchronized release across confidential diplomatic, regulatory, financial, and tier-1 media channels.",
      tactics: [
        "Bilateral stakeholder briefings with key decision-makers",
        "Tier-1 financial and editorial press background briefings",
        "Real-time social and algorithmic search containment deployment",
        "Parliamentary and legislative committee engagement",
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
        "Permanent institutional defense, search knowledge-graph stabilization, and sustained reputational moats.",
      tactics: [
        "Continuous perception telemetry and sentiment delta reporting",
        "Algorithmic search reputation and LLM knowledge-graph maintenance",
        "Institutional stakeholder feedback reconciliation",
        "Long-term legacy and valuation protection protocols",
      ],
      output: "Permanent Sovereign Narrative Moat & Continuous Telemetry",
    },
  ];

  const current = phases[selectedPhase] ?? phases[0]!;

  return (
    <section
      id="approach"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Operational Protocol
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Our Approach: <br />
              <span className="font-normal italic text-gold-300">
                A Four-Phase Operational Discipline
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              We replace instinct with a battle-tested protocol engineered to systematically eliminate
              narrative friction and anchor enduring institutional authority.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-obsidian-400">
            <Clock className="h-4 w-4 text-gold-400" />
            <span>Standard Protocol: Hour 0 to Day 90</span>
          </div>
        </div>

        {/* Phase Navigation Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, idx) => {
            const isCurrent = selectedPhase === idx;
            const Icon = phase.icon;
            return (
              <button
                key={phase.num}
                type="button"
                onClick={() => setSelectedPhase(idx)}
                className={`text-left p-6 rounded-xs border transition-all relative ${
                  isCurrent
                    ? "border-gold-500/60 bg-obsidian-950 shadow-elevation-2"
                    : "border-obsidian-800 bg-obsidian-950/60 hover:border-obsidian-700 hover:bg-obsidian-900/60"
                }`}
              >
                {/* Active Top Bar Indicator */}
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 rounded-t-xs" />
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-gold-400 font-semibold">
                    {phase.phase}
                  </span>
                  <span className="font-mono text-[10px] text-obsidian-400">
                    {phase.timeframe}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`h-7 w-7 rounded-xs border flex items-center justify-center ${
                      isCurrent
                        ? "border-gold-500/40 bg-gold-500/10 text-gold-400"
                        : "border-obsidian-750 bg-obsidian-900 text-obsidian-400"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="font-serif text-sm font-medium text-sand-100">
                    {phase.name}
                  </div>
                </div>

                <div className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400 pl-10">
                  {phase.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Phase Inspection Panel */}
        <div className="rounded-xs border border-obsidian-750 bg-obsidian-950 p-8 sm:p-12 shadow-elevation-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Block */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-gold-500/30 bg-gold-500/10 text-gold-300 font-mono text-[10px] uppercase tracking-widest">
                  {current.phase} · {current.timeframe}
                </Badge>
                <span className="font-mono text-xs text-obsidian-400">/</span>
                <span className="font-mono text-xs text-gold-400">{current.tag}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-sand-100 leading-snug">
                {current.name}
              </h3>

              <p className="text-sand-300 text-sm sm:text-base font-light leading-relaxed">
                {current.summary}
              </p>

              <div className="space-y-3 pt-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                  Tactical Operational Milestones
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.tactics.map((tactic, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xs border border-obsidian-800 bg-obsidian-900/60 text-xs text-sand-300 font-light flex items-start gap-2.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0 mt-1.5" />
                      <span>{tactic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Deliverable Output Box */}
            <div className="lg:col-span-5 p-8 rounded-xs border border-obsidian-800 bg-obsidian-900/90 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  Verified Phase Deliverable
                </div>
                <h4 className="font-serif text-xl font-normal text-sand-100">
                  {current.output}
                </h4>
                <p className="text-xs text-sand-400 font-light leading-relaxed">
                  Every deliverable is verified by senior partners and encrypted under our sovereign
                  confidentiality infrastructure.
                </p>
              </div>

              <div className="pt-4 border-t border-obsidian-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-obsidian-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Audit Trail Logged</span>
                </div>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300"
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

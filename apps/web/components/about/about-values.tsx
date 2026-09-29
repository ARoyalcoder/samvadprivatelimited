"use client";

import * as React from "react";
import { Container } from "@samvad/ui";
import { Lock, FileCheck, Radar, Landmark } from "lucide-react";

export function AboutValues() {
  const values = [
    {
      code: "01",
      icon: Lock,
      title: "Uncompromising Discretion",
      subtitle: "Sovereign Confidentiality Covenant",
      description:
        "We maintain a non-negotiable zero-attribution posture. The most critical maneuvers we execute are never linked to our firm in public corridors. Confidentiality is our bedrock.",
      principles: [
        "Zero public roster disclosure without express written permission",
        "Air-gapped, encrypted client briefing architecture",
        "Absolute partner-level discretion covenants",
      ],
    },
    {
      code: "02",
      icon: FileCheck,
      title: "Evidentiary Rigor",
      subtitle: "Substance Precedes Narrative",
      description:
        "We reject cosmetic PR spin. Every counter-narrative, whitepaper, and legislative briefing we construct is grounded in verified operational facts, legal durability, and empirical evidence.",
      principles: [
        "Forensic verification of all evidentiary claims",
        "Zero fabrication of facts, figures, or client achievements",
        "Alignment with judicial, regulatory, and audit standards",
      ],
    },
    {
      code: "03",
      icon: Radar,
      title: "Asymmetric Preparedness",
      subtitle: "Horizon Radar over Reaction",
      description:
        "True defense occurs before the confrontation begins. We leverage algorithmic topology and political intelligence to detect perception hazards 60–90 days before escalation.",
      principles: [
        "Predictive sentiment mapping across regulatory jurisdictions",
        "Pre-drafted counter-briefing playbooks for plausible shock events",
        "Continuous 24/7 algorithmic listening and early warning telemetry",
      ],
    },
    {
      code: "04",
      icon: Landmark,
      title: "Institutional Gravitas",
      subtitle: "Enduring Authority over Transient Noise",
      description:
        "We build permanent institutional moats. In an attention economy incentivizing volatile outrage, we anchor our clients with dignified, measured statesmanship that commands enduring respect.",
      principles: [
        "Refusal to engage in tabloid sensationalism or viral gimmicks",
        "Cultivation of bilateral, high-trust sovereign relationships",
        "Decades-long reputation preservation for generational leaders",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[150px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Guiding Ethos
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
            Our Core Values: <br />
            <span className="font-normal italic text-gold-300">
              The Four Non-Negotiable Standards
            </span>
          </h2>
          <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
            In high-stakes arenas, principles are tested by pressure. These four values govern every
            engagement, analysis, and strategic intervention at SAMVAD.
          </p>
        </div>

        {/* 4 Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.code}
                className="group relative flex flex-col justify-between rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-8 sm:p-10 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900 shadow-elevation-1"
              >
                <div className="space-y-6">
                  {/* Top Row with Code & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gold-400 font-semibold tracking-widest">
                      STANDARD {val.code}
                    </span>
                    <div className="h-9 w-9 rounded-xs border border-obsidian-750 bg-obsidian-950 flex items-center justify-center text-sand-300 group-hover:text-gold-300 group-hover:border-gold-500/30 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-2xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                      {val.title}
                    </h3>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-obsidian-400">
                      {val.subtitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-light text-sand-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                {/* Principles Checklist */}
                <div className="mt-8 pt-6 border-t border-obsidian-850 space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-sand-300">
                    Operational Enforcement
                  </div>
                  <ul className="space-y-1.5">
                    {val.principles.map((pr, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs font-light text-sand-400">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

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
      subtitle: "Sovereign Confidentiality",
      description:
        "We maintain a strict zero-attribution posture. Critical mandates remain confidential, protected by disciplined information controls and senior-level discretion.",
      principles: [
        "No public disclosure without written permission",
        "Encrypted client briefing architecture",
        "Partner-level confidentiality protocols",
      ],
    },
    {
      code: "02",
      icon: FileCheck,
      title: "Evidentiary Rigor",
      subtitle: "Substance Before Narrative",
      description:
        "We reject cosmetic PR. Every briefing, narrative, and strategic recommendation is grounded in verified facts, durable evidence, and defensible analysis.",
      principles: [
        "Verification of material claims",
        "No fabrication of facts or outcomes",
        "Alignment with legal and regulatory standards",
      ],
    },
    {
      code: "03",
      icon: Radar,
      title: "Asymmetric Preparedness",
      subtitle: "Horizon Radar Over Reaction",
      description:
        "Effective defense begins before escalation. We identify emerging perception risks early and prepare responses before they become active crises.",
      principles: [
        "Predictive sentiment and risk mapping",
        "Pre-drafted response playbooks",
        "Continuous listening and early-warning signals",
      ],
    },
    {
      code: "04",
      icon: Landmark,
      title: "Institutional Gravitas",
      subtitle: "Enduring Authority Over Noise",
      description:
        "We build durable institutional trust through measured communication, disciplined engagement, and long-term reputation stewardship.",
      principles: [
        "No sensationalism or viral gimmicks",
        "High-trust institutional relationships",
        "Long-term reputation preservation",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#a67c45]/5 blur-[150px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
            Guiding Ethos
          </div>

          <h2 className="font-serif text-3xl font-light leading-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
            Our Core Values: <br />
            <span className="font-normal italic text-[#a67c45]">
              Four Non-Negotiable Standards
            </span>
          </h2>

          <p className="text-sm font-light leading-relaxed text-[#626760] sm:text-base">
            Four principles govern every engagement, analysis, and strategic
            intervention at SAMVAD.
          </p>
        </div>

        {/* 4 Values Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {values.map((val) => {
            const Icon = val.icon;

            return (
              <div
                key={val.code}
                className="group relative flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 shadow-sm transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e9e4da] sm:p-10"
              >
                <div className="space-y-6">
                  {/* Top Row with Code & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-widest text-[#a67c45]">
                      STANDARD {val.code}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xs border border-[#c9c2b6] bg-[#f3f0e8] text-[#626760] transition-colors group-hover:border-[#a67c45]/40 group-hover:text-[#a67c45]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-2xl font-normal text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                      {val.title}
                    </h3>

                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#777970]">
                      {val.subtitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                    {val.description}
                  </p>
                </div>

                {/* Principles Checklist */}
                <div className="mt-8 space-y-2 border-t border-[#d8d1c5] pt-6">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#4f5552]">
                    Operational Enforcement
                  </div>

                  <ul className="space-y-1.5">
                    {val.principles.map((pr, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-2 text-xs font-light text-[#626760]"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a67c45]" />
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
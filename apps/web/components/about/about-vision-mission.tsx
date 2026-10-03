"use client";

import * as React from "react";

import { Container, Badge } from "@samvad/ui";

import {
  Eye,
  Target,
  Compass,
  CheckCircle2,
} from "lucide-react";

export function AboutVisionMission() {
  return (
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute right-1/3 top-0 h-[450px] w-[450px] rounded-full bg-[#a67c45]/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
            <Compass className="h-3 w-3 text-[#a67c45]" />
            Institutional Purpose
          </div>

          <h2 className="font-serif text-3xl font-light leading-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
            Vision &amp; Mission: <br />
            <span className="font-normal italic text-[#a67c45]">
              A Clear Institutional Direction
            </span>
          </h2>

          <p className="text-sm font-light leading-relaxed text-[#626760] sm:text-base">
            Our vision defines the long-term direction; our mission defines
            how we operate.
          </p>
        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Vision Card */}
          <div className="group relative flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 shadow-sm transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e9e4da] sm:p-12">
            <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#a67c45]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 text-[#a67c45]">
                  <Eye className="h-5 w-5" />
                </div>

                <Badge
                  variant="outline"
                  className="border-[#c9c2b6] bg-[#f3f0e8] font-mono text-[9px] uppercase tracking-widest text-[#8d683d]"
                >
                  Long-Term Horizon
                </Badge>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                  Our Vision
                </span>

                <h3 className="font-serif text-2xl font-normal leading-snug text-[#1d2529] sm:text-3xl">
                  The Benchmark for Perception Architecture
                </h3>
              </div>

              <p className="text-sm font-light leading-relaxed text-[#626760] sm:text-base">
                To build a leading perception advisory that helps institutions
                navigate complexity, protect reputation, and establish durable
                authority.
              </p>

              <div className="space-y-2.5 border-t border-[#d8d1c5] pt-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#777970]">
                  Strategic Priorities
                </div>

                <ul className="space-y-2 text-xs font-light text-[#626760]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#a67c45]" />
                    <span>Non-attribution crisis defense</span>
                  </li>

                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#a67c45]" />
                    <span>Advanced perception intelligence</span>
                  </li>

                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#a67c45]" />
                    <span>Statecraft and capital-market insight</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group relative flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 shadow-sm transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e9e4da] sm:p-12">
            <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#a67c45]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 text-[#a67c45]">
                  <Target className="h-5 w-5" />
                </div>

                <Badge
                  variant="outline"
                  className="border-[#c9c2b6] bg-[#f3f0e8] font-mono text-[9px] uppercase tracking-widest text-[#8d683d]"
                >
                  Daily Execution
                </Badge>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                  Our Mission
                </span>

                <h3 className="font-serif text-2xl font-normal leading-snug text-[#1d2529] sm:text-3xl">
                  Protecting Authority Through Evidence
                </h3>
              </div>

              <p className="text-sm font-light leading-relaxed text-[#626760] sm:text-base">
                To equip leadership and institutions with the intelligence,
                crisis counsel, and communications strategy required to protect
                trust and navigate narrative friction.
              </p>

              <div className="space-y-2.5 border-t border-[#d8d1c5] pt-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#777970]">
                  Core Mandates
                </div>

                <ul className="space-y-2 text-xs font-light text-[#626760]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#a67c45]" />
                    <span>Rapid crisis mobilization</span>
                  </li>

                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#a67c45]" />
                    <span>Strict confidentiality</span>
                  </li>

                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#a67c45]" />
                    <span>Direct senior-level engagement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
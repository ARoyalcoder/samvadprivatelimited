"use client";

import * as React from "react";
import { Container, Badge } from "@samvad/ui";
import { Eye, Target, Compass, CheckCircle2 } from "lucide-react";

export function AboutVisionMission() {
  return (
    <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-24 lg:py-32">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute right-1/3 top-0 h-[450px] w-[450px] rounded-full bg-gold-500/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
            <Compass className="h-3 w-3 text-gold-400" />
            Institutional Purpose
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
            Vision &amp; Mission: <br />
            <span className="font-normal italic text-gold-300">
              Guiding High-Consequence Horizons
            </span>
          </h2>
          <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
            Our vision establishes our enduring trajectory; our mission defines our relentless operational discipline.
          </p>
        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card */}
          <div className="group relative flex flex-col justify-between rounded-xs border border-obsidian-800 bg-obsidian-950 p-8 sm:p-12 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900/90 shadow-elevation-1">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xs border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-400">
                  <Eye className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="border-obsidian-750 bg-obsidian-850 font-mono text-[9px] uppercase tracking-widest text-gold-300">
                  Long-Term Horizon
                </Badge>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-400">
                  Our Vision
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-sand-100 leading-snug">
                  The Sovereign Benchmark in Perception Architecture
                </h3>
              </div>

              <p className="text-sand-300 text-sm sm:text-base font-light leading-relaxed">
                To be the preeminent sovereign perception advisory across high-growth and strategic corridors—redefining
                how global institutions navigate complexity, protect reputational capital, and establish unassailable
                authority in an interconnected world.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-obsidian-850">
                <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                  Strategic Horizon Targets
                </div>
                <ul className="space-y-2 text-xs text-sand-400 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                    <span>Setting the global standard for non-attribution crisis defense</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                    <span>Pioneering algorithmic LLM knowledge-graph perception auditing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                    <span>Bridging sovereign statecraft with capital market valuation dynamics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group relative flex flex-col justify-between rounded-xs border border-obsidian-800 bg-obsidian-950 p-8 sm:p-12 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900/90 shadow-elevation-1">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xs border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Target className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="border-obsidian-750 bg-obsidian-850 font-mono text-[9px] uppercase tracking-widest text-blue-300">
                  Daily Execution
                </Badge>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-blue-400">
                  Our Mission
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-sand-100 leading-snug">
                  Defending Authority Through Evidentiary Statecraft
                </h3>
              </div>

              <p className="text-sand-300 text-sm sm:text-base font-light leading-relaxed">
                To provide executive leadership, defense innovators, and sovereign institutions with the predictive
                intelligence, war-room crisis architecture, and bilateral communications counsel necessary to insulate
                enterprise valuation and convert narrative friction into permanent trust.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-obsidian-850">
                <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                  Core Operational Mandates
                </div>
                <ul className="space-y-2 text-xs text-sand-400 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span>Rapid mobilization within minutes of active crisis emergence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span>Uncompromising fidelity to non-disclosure and client privacy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span>Direct partner-level immersion on every single mandate</span>
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

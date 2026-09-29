"use client";

import * as React from "react";
import { Container } from "@samvad/ui";
import { Check, Sparkles } from "lucide-react";

export function AboutDifference() {
  const comparisons = [
    {
      dimension: "Primary Objective",
      traditionalPR: "Vanity impressions, media mentions, cosmetic buzz",
      managementConsulting: "Internal operational efficiency & slide decks",
      crisisLaw: "Courtroom legal defense & statutory compliance",
      samvad: "Sovereign perception physics, enterprise valuation defense & narrative control",
    },
    {
      dimension: "Speed of Mobilization",
      traditionalPR: "Days of approval chains and generic press drafts",
      managementConsulting: "Weeks of diagnostic interviews and frameworks",
      crisisLaw: "Legal filings paced to court calendars",
      samvad: "Senior partner war-room deployed within 15 minutes of trigger",
    },
    {
      dimension: "Algorithmic & AI Defense",
      traditionalPR: "None; reliant on traditional print and press wires",
      managementConsulting: "Theoretical IT strategy without narrative defense",
      crisisLaw: "Subpoenas and takedown demands that amplify exposure",
      samvad: "Real-time LLM knowledge-graph remediation & search topology defense",
    },
    {
      dimension: "Confidentiality Covenant",
      traditionalPR: "Promotes client work aggressively to win awards",
      managementConsulting: "Anonymized benchmarking published in whitepapers",
      crisisLaw: "Attorney-client privilege strictly for court matters",
      samvad: "Zero public attribution covenant; permanent institutional discretion",
    },
    {
      dimension: "Stakeholder Corridors",
      traditionalPR: "Entertainment & trade press journalists",
      managementConsulting: "Internal corporate vice presidents & CFOs",
      crisisLaw: "Judges, prosecutors, and opposing counsel",
      samvad: "Sovereign ministers, parliamentary committees, top-50 institutional investors & Tier-1 editors",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[150px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
            <Sparkles className="h-3 w-3 text-gold-400" />
            Competitive Differentiation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
            Our Difference: <br />
            <span className="font-normal italic text-gold-300">
              Why Sovereign Entities Choose SAMVAD
            </span>
          </h2>
          <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
            Conventional PR agencies chase clicks. Management consultancies produce internal decks.
            Litigation firms fight in courtrooms while the market capitalization collapses outside.
            SAMVAD operates where narrative, statecraft, and valuation intersect.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-xs border border-obsidian-800 bg-obsidian-900/60 shadow-elevation-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-obsidian-800 bg-obsidian-950 font-mono text-[11px] uppercase tracking-wider text-obsidian-400">
                <th className="p-5 sm:p-6 w-1/4">Strategic Dimension</th>
                <th className="p-5 sm:p-6 w-1/5 text-obsidian-400">Traditional PR</th>
                <th className="p-5 sm:p-6 w-1/5 text-obsidian-400">Strategy Consultancies</th>
                <th className="p-5 sm:p-6 w-1/3 text-gold-300 bg-gold-500/10 border-l border-r border-gold-500/30">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold-400" />
                    <span>SAMVAD Perception Advisory</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-obsidian-850/40">
                  <td className="p-5 sm:p-6 font-serif text-sand-200 font-medium">
                    {row.dimension}
                  </td>
                  <td className="p-5 sm:p-6 text-sand-400 font-light">
                    {row.traditionalPR}
                  </td>
                  <td className="p-5 sm:p-6 text-sand-400 font-light">
                    {row.managementConsulting}
                  </td>
                  <td className="p-5 sm:p-6 text-sand-100 font-normal bg-gold-500/5 border-l border-r border-gold-500/20">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{row.samvad}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Three Institutional Distinctions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="p-6 rounded-xs border border-obsidian-800 bg-obsidian-900/40 space-y-3">
            <span className="font-mono text-xs text-gold-400">01 / DISCRETION FIRST</span>
            <h4 className="font-serif text-lg text-sand-100 font-normal">
              No Case Studies for Vanity
            </h4>
            <p className="text-xs text-sand-400 font-light leading-relaxed">
              We never promote our clients to win advertising trophies. Our loyalty is entirely
              to the sovereign entity we counsel.
            </p>
          </div>

          <div className="p-6 rounded-xs border border-obsidian-800 bg-obsidian-900/40 space-y-3">
            <span className="font-mono text-xs text-gold-400">02 / EVIDENTIARY ROOTS</span>
            <h4 className="font-serif text-lg text-sand-100 font-normal">
              Fact-Anchored Architecture
            </h4>
            <p className="text-xs text-sand-400 font-light leading-relaxed">
              We construct narratives that survive intense investigative journalism, parliamentary
              inquiries, and adversarial legal cross-examination.
            </p>
          </div>

          <div className="p-6 rounded-xs border border-obsidian-800 bg-obsidian-900/40 space-y-3">
            <span className="font-mono text-xs text-gold-400">03 / SENIOR IMMERSION</span>
            <h4 className="font-serif text-lg text-sand-100 font-normal">
              No Junior Delegation
            </h4>
            <p className="text-xs text-sand-400 font-light leading-relaxed">
              Engagements are handled directly by senior partners who have sat across tables from ministers,
              appellate benches, and activist short-sellers.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

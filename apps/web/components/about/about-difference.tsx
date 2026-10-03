"use client";

import * as React from "react";

import { Container } from "@samvad/ui";

import { Check, Sparkles } from "lucide-react";

export function AboutDifference() {
  const comparisons = [
    {
      dimension: "Primary Objective",
      traditionalPR: "Vanity impressions, media mentions, cosmetic buzz",
      managementConsulting:
        "Internal operational efficiency & slide decks",
      crisisLaw: "Courtroom legal defense & statutory compliance",
      samvad:
        "Perception strategy, enterprise value protection & narrative control",
    },
    {
      dimension: "Speed of Mobilization",
      traditionalPR: "Days of approvals and generic press drafts",
      managementConsulting:
        "Weeks of diagnostic interviews and frameworks",
      crisisLaw: "Legal filings paced to court calendars",
      samvad: "Senior partner war-room mobilization",
    },
    {
      dimension: "Algorithmic & AI Defense",
      traditionalPR: "Limited traditional media monitoring",
      managementConsulting:
        "Technology strategy without dedicated narrative defense",
      crisisLaw: "Legal remedies focused on statutory exposure",
      samvad:
        "LLM knowledge-graph and search topology defense",
    },
    {
      dimension: "Confidentiality Covenant",
      traditionalPR: "Client work may be used for publicity",
      managementConsulting:
        "Anonymized benchmarking and published case material",
      crisisLaw: "Privilege primarily within legal proceedings",
      samvad:
        "Zero public attribution and institutional discretion",
    },
    {
      dimension: "Stakeholder Corridors",
      traditionalPR: "Journalists and trade media",
      managementConsulting: "Corporate leadership and finance teams",
      crisisLaw: "Courts, regulators, and opposing counsel",
      samvad:
        "Institutional, regulatory, investor, and senior media stakeholders",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#a67c45]/5 blur-[150px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
            <Sparkles className="h-3 w-3 text-[#a67c45]" />
            Strategic Differentiation
          </div>

          <h2 className="font-serif text-3xl font-light leading-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
            Our Difference: <br />
            <span className="font-normal italic text-[#a67c45]">
              Where Our Model Operates Differently
            </span>
          </h2>

          <p className="text-sm font-light leading-relaxed text-[#626760] sm:text-base">
            Conventional PR, consulting, and legal practice solve different
            parts of the problem. SAMVAD operates across perception,
            institutional trust, and strategic exposure.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-xs border border-[#d0c9bd] bg-[#ebe7de] shadow-sm">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#d8d1c5] bg-[#e4dfd5] font-mono text-[11px] uppercase tracking-wider text-[#777970]">
                <th className="w-1/4 p-5 sm:p-6">
                  Strategic Dimension
                </th>

                <th className="w-1/5 p-5 text-[#777970] sm:p-6">
                  Traditional PR
                </th>

                <th className="w-1/5 p-5 text-[#777970] sm:p-6">
                  Strategy Consultancies
                </th>

                <th className="w-1/3 border-l border-r border-[#a67c45]/30 bg-[#a67c45]/10 p-5 text-[#8d683d] sm:p-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#a67c45]" />
                    <span>SAMVAD Perception Advisory</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#d8d1c5]">
              {comparisons.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-[#e4dfd5]/70"
                >
                  <td className="p-5 font-serif font-medium text-[#1d2529] sm:p-6">
                    {row.dimension}
                  </td>

                  <td className="p-5 font-light text-[#626760] sm:p-6">
                    {row.traditionalPR}
                  </td>

                  <td className="p-5 font-light text-[#626760] sm:p-6">
                    {row.managementConsulting}
                  </td>

                  <td className="border-l border-r border-[#a67c45]/20 bg-[#a67c45]/5 p-5 font-normal text-[#1d2529] sm:p-6">
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#a67c45]" />
                      <span>{row.samvad}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Three Institutional Distinctions */}
        <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3">
          <div className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
            <span className="font-mono text-xs text-[#a67c45]">
              01 / DISCRETION FIRST
            </span>

            <h4 className="font-serif text-lg font-normal text-[#1d2529]">
              No Case Studies for Vanity
            </h4>

            <p className="text-xs font-light leading-relaxed text-[#626760]">
              We do not promote clients for publicity. Our focus remains on
              the institution we advise.
            </p>
          </div>

          <div className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
            <span className="font-mono text-xs text-[#a67c45]">
              02 / EVIDENTIARY ROOTS
            </span>

            <h4 className="font-serif text-lg font-normal text-[#1d2529]">
              Fact-Anchored Architecture
            </h4>

            <p className="text-xs font-light leading-relaxed text-[#626760]">
              We build narratives designed to withstand scrutiny from
              journalists, institutions, and legal stakeholders.
            </p>
          </div>

          <div className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
            <span className="font-mono text-xs text-[#a67c45]">
              03 / SENIOR IMMERSION
            </span>

            <h4 className="font-serif text-lg font-normal text-[#1d2529]">
              No Junior Delegation
            </h4>

            <p className="text-xs font-light leading-relaxed text-[#626760]">
              Mandates are handled directly by senior partners throughout the
              engagement.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
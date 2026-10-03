"use client";

import * as React from "react";

import Link from "next/link";

import { Container, Badge, Button, SamvadImage } from "@samvad/ui";

import { ArrowRight, Lock, CheckCircle2, FileText } from "lucide-react";

export function CaseStudiesSection() {
  const [activeDossierIndex, setActiveDossierIndex] = React.useState(0);

  const dossiers = [
    {
      ref: "DOSSIER #8104",
      sector: "Global FinTech / Cross-Border",
      title:
        "Cross-Border FinTech Consortium: Sovereign De-escalation & $1.8B Deal Preservation",
      classification: "DECLASSIFIED EXECUTIVE SUMMARY",
      timeframe: "18-Week Intervention",
      challenge:
        "Facing regulatory blockades and an adversarial disinformation campaign in Southeast Asia, a multinational consortium faced contract cancellation and $1.8B in frozen enterprise valuation.",
      intervention:
        "SAMVAD deployed an emergency response protocol covering disinformation analysis, ministerial briefing dossiers, and institutional credibility communications.",
      metrics: [
        {
          value: "100%",
          label: "Regulatory Clearance",
          sub: "Approval across 3 jurisdictions",
        },
        {
          value: "+74%",
          label: "Sentiment Turnaround",
          sub: "Stakeholder sentiment shifted positive",
        },
        {
          value: "$1.8B",
          label: "Transaction Value",
          sub: "Enterprise valuation preserved",
        },
      ],
      deliverablesCompleted: [
        "Confidential ministerial policy packets",
        "24/7 cross-border response",
        "Financial media counter-briefings",
      ],
    },
    {
      ref: "DOSSIER #6219",
      sector: "Defense & Strategic Aerospace",
      title:
        "Sovereign Aerospace Offset: Parliamentary Accord for $4.2B Capability Transfer",
      classification: "DECLASSIFIED EXECUTIVE SUMMARY",
      timeframe: "24-Week Protocol",
      challenge:
        "A premier international defense contractor faced parliamentary skepticism and competitor opposition regarding a multi-billion-dollar technology transfer accord.",
      intervention:
        "Constructed a sovereign capability narrative supported by committee briefings, defense think-tank alignment, and national economic impact models.",
      metrics: [
        {
          value: "100%",
          label: "Parliamentary Accord",
          sub: "Passed committee scrutiny",
        },
        {
          value: "Zero",
          label: "Information Leakage",
          sub: "Sovereign non-disclosure maintained",
        },
        {
          value: "$4.2B",
          label: "Procurement Secured",
          sub: "Multi-decade offset signed",
        },
      ],
      deliverablesCompleted: [
        "Sovereign capability whitepaper series",
        "Parliamentary committee preparation",
        "Defense analyst briefings",
      ],
    },
    {
      ref: "DOSSIER #9402",
      sector: "Enterprise DeepTech & AI",
      title:
        "Algorithmic Defamation Countermeasure: $850M Valuation Restored in 72 Hours",
      classification: "DECLASSIFIED EXECUTIVE SUMMARY",
      timeframe: "72-Hour Rapid Response",
      challenge:
        "A coordinated activist short-seller campaign manipulated search indexing and knowledge graphs, causing a 28% intra-day market capitalization decline.",
      intervention:
        "Activated algorithmic defense through evidentiary counter-disclosures, institutional shareholder briefings, and search and knowledge-graph remediation.",
      metrics: [
        {
          value: "72 Hrs",
          label: "Valuation Restored",
          sub: "Market capitalization recovered",
        },
        {
          value: "$850M",
          label: "Capitalization Rebounded",
          sub: "Market pressure contained",
        },
        {
          value: "100%",
          label: "Search Graph Cleanse",
          sub: "Defamatory indexing addressed",
        },
      ],
      deliverablesCompleted: [
        "Search and knowledge-graph remediation",
        "Forensic rebuttal dossier",
        "Institutional investor counsel",
      ],
    },
  ];

  const current = dossiers[activeDossierIndex] ?? dossiers[0]!;

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Background radial accent */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-[#a67c45]/[0.035] blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9a703f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Documented Case Records
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
              Declassified Dossiers: <br />
              <span className="font-normal italic text-[#9a703f]">
                Measurable Impact
              </span>
            </h2>

            <p className="text-[#667078] text-sm sm:text-base font-light leading-relaxed">
              Selected institutional engagements and strategic interventions.
              Client identities are anonymized under applicable
              confidentiality agreements.
            </p>
          </div>

          {/* Dossier Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {dossiers.map((dossier, idx) => (
              <button
                key={dossier.ref}
                type="button"
                onClick={() => setActiveDossierIndex(idx)}
                className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border transition-all ${
                  activeDossierIndex === idx
                    ? "border-[#a67c45]/60 bg-[#a67c45]/10 text-[#8f683c] shadow-sm"
                    : "border-[#c9c3b8] bg-[#ebe7de] text-[#899197] hover:text-[#39444a] hover:border-[#a67c45]/40"
                }`}
              >
                <span>{dossier.ref}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Dossier Presentation Frame */}
        <div className="relative rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70 p-8 sm:p-12 lg:p-14 shadow-[0_16px_50px_rgba(29,37,41,0.07)]">
          {/* Architectural Dossier Corner Ticks */}
          <span className="pointer-events-none absolute -left-1.5 -top-1.5 font-mono text-xs text-[#a67c45]/70 select-none">
            +
          </span>

          <span className="pointer-events-none absolute -right-1.5 -top-1.5 font-mono text-xs text-[#a67c45]/70 select-none">
            +
          </span>

          <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 font-mono text-xs text-[#a67c45]/70 select-none">
            +
          </span>

          <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 font-mono text-xs text-[#a67c45]/70 select-none">
            +
          </span>

          {/* Dossier Top Administrative Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#d0c9bd] text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-[#9a703f] font-semibold">
                {current.ref}
              </span>

              <span className="text-[#c0b9ae]">/</span>

              <span className="text-[#536067]">{current.sector}</span>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-[#a67c45]/40 bg-[#a67c45]/10 text-[#8f683c] font-mono text-[9px] uppercase tracking-widest"
              >
                {current.classification}
              </Badge>

              <span className="text-[#899197] text-[10px]">
                {current.timeframe}
              </span>
            </div>
          </div>

          {/* Main Case Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1d2529] leading-snug">
                {current.title}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#667078] font-light leading-relaxed">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#899197] block mb-1">
                    Crisis Context
                  </span>

                  <p>{current.challenge}</p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#9a703f] block mb-1">
                    Strategic Intervention
                  </span>

                  <p className="text-[#536067]">{current.intervention}</p>
                </div>
              </div>

              {/* Verified Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#d0c9bd]">
                {current.metrics.map((metric, i) => (
                  <div key={i} className="space-y-1">
                    <div className="font-serif text-2xl sm:text-3xl font-light text-[#9a703f]">
                      {metric.value}
                    </div>

                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#39444a]">
                      {metric.label}
                    </div>

                    <div className="font-sans text-[11px] text-[#899197] font-light">
                      {metric.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Links */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/work">
                  <Button
                    variant="gold"
                    size="sm"
                    className="font-mono text-xs uppercase tracking-wider px-5 py-2.5"
                  >
                    <span>View Dossier Archive</span>
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>

                <Link href="#contact">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#c9c3b8] font-mono text-xs uppercase tracking-wider px-5 py-2.5 text-[#536067] hover:text-[#8f683c] hover:border-[#a67c45]/50"
                  >
                    <span>Request Briefing</span>
                  </Button>
                </Link>

                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#899197]">
                  <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
                  <span>Partner Verification</span>
                </div>
              </div>
            </div>

            {/* Right Dossier Visual Presentation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xs overflow-hidden border border-[#c9c3b8] bg-[#f3f0e8] p-2 shadow-[0_12px_35px_rgba(29,37,41,0.08)]">
                <SamvadImage
                  assetId="case-study-briefing-binder"
                  aspectRatio="16:9"
                  zoomOnHover
                  className="rounded-xs"
                  caption="Strategic advisory dossier prepared for institutional review."
                />
              </div>

              <div className="rounded-xs border border-[#d0c9bd] bg-[#f3f0e8]/70 p-4 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#39444a] flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-[#a67c45]" />
                  <span>Verified Protocols</span>
                </div>

                <ul className="space-y-1">
                  {current.deliverablesCompleted.map((del, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-[#667078] font-light"
                    >
                      <CheckCircle2 className="h-3 w-3 text-[#a67c45] shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
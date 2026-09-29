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
      title: "Cross-Border FinTech Consortium: Sovereign De-escalation & $1.8B Deal Preservation",
      classification: "DECLASSIFIED EXECUTIVE SUMMARY",
      timeframe: "18-Week Intervention",
      challenge:
        "Facing sudden regulatory blockades and an aggressive adversarial disinformation campaign in Southeast Asia, a multinational consortium faced immediate contract cancellation and $1.8B in frozen enterprise valuation.",
      intervention:
        "SAMVAD deployed an emergency war-room protocol: forensic identification of disinformation origins, preparation of bilateral ministerial briefing dossiers, and an orchestrated institutional credibility campaign across financial media.",
      metrics: [
        { value: "100%", label: "Regulatory Clearance", sub: "Unanimous approval across 3 jurisdictions" },
        { value: "+74%", label: "Sentiment Turnaround", sub: "Editorial & stakeholder sentiment shifted positive" },
        { value: "$1.8B", label: "Transaction Value", sub: "Full enterprise valuation preserved without concessions" },
      ],
      deliverablesCompleted: [
        "Confidential ministerial policy packets",
        "24/7 cross-border war room mobilization",
        "Counter-briefings to Tier-1 financial press",
      ],
    },
    {
      ref: "DOSSIER #6219",
      sector: "Defense & Strategic Aerospace",
      title: "Sovereign Aerospace Offset: Parliamentary Accord for $4.2B Capability Transfer",
      classification: "DECLASSIFIED EXECUTIVE SUMMARY",
      timeframe: "24-Week Protocol",
      challenge:
        "A premier international defense contractor faced intense parliamentary skepticism and competitor-funded opposition regarding a multi-billion dollar indigenous technology transfer accord.",
      intervention:
        "Constructed a multi-tier sovereign capability narrative positioning the program as an essential national security asset. Orchestrated bipartisan committee briefings, defense think-tank alignments, and sovereign job creation models.",
      metrics: [
        { value: "100%", label: "Parliamentary Accord", sub: "Passed committee scrutiny without opposition" },
        { value: "Zero", label: "Information Leakage", sub: "Strict sovereign non-disclosure maintained" },
        { value: "$4.2B", label: "Procurement Secured", sub: "Landmark multi-decade offset signed" },
      ],
      deliverablesCompleted: [
        "Sovereign capability whitepaper series",
        "Parliamentary committee testimony prep",
        "Defense analyst & think-tank briefings",
      ],
    },
    {
      ref: "DOSSIER #9402",
      sector: "Enterprise DeepTech & AI",
      title: "Algorithmic Defamation Countermeasure: $850M Valuation Restored in 72 Hours",
      classification: "DECLASSIFIED EXECUTIVE SUMMARY",
      timeframe: "72-Hour Rapid Response",
      challenge:
        "A coordinated activist short-seller campaign deployed weaponized search indexing and manipulated knowledge graphs, causing a 28% intra-day market capitalization collapse and customer panic.",
      intervention:
        "Activated emergency algorithmic defense: executed high-authority evidentiary counter-disclosures, coordinated key institutional shareholder briefings, and corrected search engine and LLM knowledge graphs.",
      metrics: [
        { value: "72 Hrs", label: "Valuation Restored", sub: "Full recovery of market capitalization" },
        { value: "$850M", label: "Capitalization Rebounded", sub: "Bear raid fully neutralized" },
        { value: "100%", label: "Search Graph Cleanse", sub: "Defamatory indexing completely purged" },
      ],
      deliverablesCompleted: [
        "Algorithmic search and knowledge-graph remediation",
        "Forensic short-seller rebuttal dossier",
        "Top-50 institutional investor direct counsel",
      ],
    },
  ];

  const current = dossiers[activeDossierIndex] ?? dossiers[0]!;

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32"
    >
      {/* Background radial accent */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Documented Case Records
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Declassified Dossiers: <br />
              <span className="font-normal italic text-gold-300">
                Measurable Impact Under Extreme Scrutiny
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              Real institutional crises and sovereign transactions preserved through disciplined
              perception architecture. Client identities anonymized in adherence to strict non-disclosure pacts.
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
                    ? "border-gold-500/50 bg-gold-500/10 text-gold-300 shadow-sm"
                    : "border-obsidian-750 bg-obsidian-900/60 text-obsidian-400 hover:text-sand-300 hover:border-obsidian-700"
                }`}
              >
                <span>{dossier.ref}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Dossier Presentation Frame */}
        <div className="relative rounded-xs border border-obsidian-750 bg-obsidian-900/70 p-8 sm:p-12 lg:p-14 shadow-elevation-2 backdrop-blur-md">
          {/* Architectural Dossier Corner Ticks */}
          <span className="pointer-events-none absolute -left-1.5 -top-1.5 font-mono text-xs text-gold-500/70 select-none">+</span>
          <span className="pointer-events-none absolute -right-1.5 -top-1.5 font-mono text-xs text-gold-500/70 select-none">+</span>
          <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 font-mono text-xs text-gold-500/70 select-none">+</span>
          <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 font-mono text-xs text-gold-500/70 select-none">+</span>

          {/* Dossier Top Administrative Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-obsidian-800 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-gold-400 font-semibold">{current.ref}</span>
              <span className="text-obsidian-600">/</span>
              <span className="text-sand-300">{current.sector}</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-gold-500/30 bg-gold-500/10 text-gold-300 font-mono text-[9px] uppercase tracking-widest">
                {current.classification}
              </Badge>
              <span className="text-obsidian-400 text-[10px]">{current.timeframe}</span>
            </div>
          </div>

          {/* Main Case Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-sand-100 leading-snug">
                {current.title}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400 block mb-1">
                    The Crisis Context
                  </span>
                  <p>{current.challenge}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gold-400/90 block mb-1">
                    SAMVAD Strategic Intervention
                  </span>
                  <p className="text-sand-300">{current.intervention}</p>
                </div>
              </div>

              {/* Verified Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-obsidian-800">
                {current.metrics.map((metric, i) => (
                  <div key={i} className="space-y-1">
                    <div className="font-serif text-2xl sm:text-3xl font-light text-gold-300">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-sand-200">
                      {metric.label}
                    </div>
                    <div className="font-sans text-[11px] text-obsidian-400 font-light">
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
                    <span>Inspect Master Dossier Archive</span>
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-obsidian-750 font-mono text-xs uppercase tracking-wider px-5 py-2.5 text-sand-300 hover:text-gold-300 hover:border-gold-500/50"
                  >
                    <span>Request Briefing</span>
                  </Button>
                </Link>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-obsidian-400">
                  <Lock className="h-3.5 w-3.5 text-gold-400" />
                  <span>Subject to Partner Verification</span>
                </div>
              </div>
            </div>

            {/* Right Dossier Visual Presentation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xs overflow-hidden border border-obsidian-750 bg-obsidian-950 p-2 shadow-2xl">
                <SamvadImage
                  assetId="case-study-briefing-binder"
                  aspectRatio="16:9"
                  zoomOnHover
                  className="rounded-xs"
                  caption="Classified strategic advisory dossier prepared for ministerial review."
                />
              </div>

              <div className="rounded-xs border border-obsidian-800 bg-obsidian-950/70 p-4 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-sand-300 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-gold-400" />
                  <span>Verified Operational Protocols</span>
                </div>
                <ul className="space-y-1">
                  {current.deliverablesCompleted.map((del, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-sand-400 font-light">
                      <CheckCircle2 className="h-3 w-3 text-gold-400 shrink-0" />
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

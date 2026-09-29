"use client";

import * as React from "react";
import { Container, Timeline, type TimelineItem } from "@samvad/ui";
import { History, AlertCircle } from "lucide-react";

export function AboutTimeline() {
  const historyItems: TimelineItem[] = [
    {
      id: "timeline-foundation",
      dateOrPeriod: "[INCORPORATION DATE / YEAR PLACEHOLDER]",
      title: "Statutory Incorporation & Practice Charter",
      description:
        "Formal incorporation of SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED as a specialized strategic communications and perception advisory practice. Initial deployment of sovereign counsel and confidential advisory protocols.",
      tag: "Statutory Incorporation",
      isPlaceholder: true,
      details: [
        "[Statutory registration number and official registrar filings to be verified]",
        "Establishment of core non-disclosure covenant and client air-gapping protocol",
        "Initial focus on enterprise crisis defense and regulatory advisory",
      ],
    },
    {
      id: "timeline-intelligence-desk",
      dateOrPeriod: "[PHASE I MILESTONE PLACEHOLDER]",
      title: "Establishment of Perception Intelligence & Telemetry Desk",
      description:
        "Formalization of the quantitative sentiment topology and algorithmic listening practice. Development of predictive monitoring methodologies to detect adversarial disinformation and short-seller campaigns ahead of public escalation.",
      tag: "Practice Evolution",
      isPlaceholder: true,
      details: [
        "[Specific practice launch date to be populated from corporate archives]",
        "Integration of algorithmic search graph analysis and key opinion leader topology",
        "Deployment of 24/7 rapid response war-room mobilization framework",
      ],
    },
    {
      id: "timeline-cross-border",
      dateOrPeriod: "[PHASE II MILESTONE PLACEHOLDER]",
      title: "Cross-Border Corridors & Regional Expansion",
      description:
        "Expansion of advisory capabilities across key economic corridors (New Delhi, Mumbai, Singapore, and London) to counsel cross-border M&A transactions, sovereign wealth funds, and critical infrastructure consortia.",
      tag: "Corridor Expansion",
      isPlaceholder: true,
      details: [
        "[Regional office operational timeline to be confirmed from registered leases]",
        "Establishment of bilateral parliamentary and legislative briefing capabilities",
        "Cross-border antitrust and regulatory de-escalation protocols",
      ],
    },
    {
      id: "timeline-frontier-tech",
      dateOrPeriod: "[PRESENT / ONGOING PROTOCOL]",
      title: "Digital Sovereignty & Frontier AI Algorithm Defense",
      description:
        "Inauguration of the Digital Sovereignty practice, specifically engineering countermeasures against automated LLM knowledge-graph distortions, synthetic media threats, and algorithmic search volatility for sovereign brands.",
      tag: "Current Focus",
      isPlaceholder: true,
      details: [
        "Continuous horizon scanning and LLM training data perception audits",
        "Expansion into deep-tech, aerospace, and sovereign capability mandates",
        "Operational scaling to support 1,000+ concurrent enterprise stakeholders",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/60 py-24 lg:py-32">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute right-10 top-1/3 h-[450px] w-[450px] rounded-full bg-gold-500/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
            <History className="h-3 w-3 text-gold-400" />
            Institutional Trajectory
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
            Company History &amp; <br />
            <span className="font-normal italic text-gold-300">
              Evolutionary Milestones
            </span>
          </h2>
          <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
            A documented chronological progression of SAMVAD&apos;s institutional capabilities.
            In strict compliance with factual accuracy, unverified dates and corporate achievements
            are held as explicit placeholders until verified by official corporate registrar filings.
          </p>
        </div>

        {/* Factual Integrity Disclaimer Notice */}
        <div className="rounded-xs border border-amber-500/30 bg-amber-500/5 p-5 text-xs text-amber-200/90 font-light flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
              Factual Disclosure &amp; Content Integrity Policy
            </span>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              SAMVAD PERCEPTION ADVISORY maintains strict factual veracity across all public communications.
              The historical milestones below utilize explicit <span className="font-mono text-amber-300">[PLACEHOLDER]</span> markers
              which will be populated with official statutory incorporation records, regulatory certifications,
              and verifiable corporate dates upon formal archival audit. No achievements or historical dates
              have been fabricated.
            </p>
          </div>
        </div>

        {/* Reusable Timeline Component */}
        <div className="pt-4 max-w-4xl">
          <Timeline
            items={historyItems}
            layout="left"
            tone="gold"
            showPlaceholderNotice={false}
          />
        </div>
      </Container>
    </section>
  );
}

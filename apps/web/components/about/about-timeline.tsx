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
        "Formal incorporation of SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED as a specialized strategic communications and perception advisory practice.",
      tag: "Statutory Incorporation",
      isPlaceholder: true,
      details: [
        "[Statutory registration number and official filings to be verified]",
        "Core non-disclosure and client air-gapping protocols established",
        "Initial focus on enterprise crisis and regulatory advisory",
      ],
    },
    {
      id: "timeline-intelligence-desk",
      dateOrPeriod: "[PHASE I MILESTONE PLACEHOLDER]",
      title: "Perception Intelligence & Telemetry Desk",
      description:
        "Formalization of quantitative sentiment analysis and algorithmic listening capabilities to identify emerging perception risks ahead of escalation.",
      tag: "Practice Evolution",
      isPlaceholder: true,
      details: [
        "[Practice launch date to be verified from corporate archives]",
        "Search graph and key-opinion-leader analysis",
        "Rapid-response war-room framework",
      ],
    },
    {
      id: "timeline-cross-border",
      dateOrPeriod: "[PHASE II MILESTONE PLACEHOLDER]",
      title: "Cross-Border Corridors & Regional Expansion",
      description:
        "Expansion across key economic corridors including New Delhi, Mumbai, Singapore, and London to support cross-border transactions and institutional mandates.",
      tag: "Corridor Expansion",
      isPlaceholder: true,
      details: [
        "[Regional office timeline to be formally confirmed]",
        "Parliamentary and legislative briefing capabilities",
        "Cross-border regulatory de-escalation protocols",
      ],
    },
    {
      id: "timeline-frontier-tech",
      dateOrPeriod: "[PRESENT / ONGOING PROTOCOL]",
      title: "Digital Sovereignty & Frontier AI Defense",
      description:
        "Development of the Digital Sovereignty practice focused on LLM knowledge-graph distortion, synthetic media, and algorithmic search volatility.",
      tag: "Current Focus",
      isPlaceholder: true,
      details: [
        "Continuous horizon scanning and LLM perception audits",
        "Deep-tech, aerospace, and sovereign capability mandates",
        "Operational scaling for enterprise stakeholders",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-24 lg:py-32">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute right-10 top-1/3 h-[450px] w-[450px] rounded-full bg-[#a67c45]/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
            <History className="h-3 w-3 text-[#a67c45]" />
            Institutional Trajectory
          </div>

          <h2 className="font-serif text-3xl font-light leading-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
            Company History <br />
            <span className="font-normal italic text-[#a67c45]">
              Evolutionary Milestones
            </span>
          </h2>

          <p className="text-sm font-light leading-relaxed text-[#626760] sm:text-base">
            A documented progression of SAMVAD&apos;s institutional
            capabilities. Unverified dates and achievements remain explicit
            placeholders until formally verified.
          </p>
        </div>

        {/* Factual Integrity Disclaimer Notice */}
        <div className="flex items-start gap-3 rounded-xs border border-[#b68a52]/35 bg-[#a67c45]/5 p-5 text-xs font-light text-[#625544]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#a67c45]" />

          <div className="space-y-1">
            <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8d683d]">
              Factual Disclosure &amp; Content Integrity
            </span>

            <p className="text-xs leading-relaxed text-[#70675b]">
              SAMVAD maintains factual accuracy across public communications.
              Historical milestones use explicit{" "}
              <span className="font-mono text-[#8d683d]">[PLACEHOLDER]</span>{" "}
              markers until official records and verifiable dates are
              confirmed. No historical dates or achievements have been
              fabricated.
            </p>
          </div>
        </div>

        {/* Reusable Timeline Component */}
        <div className="max-w-4xl pt-4">
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
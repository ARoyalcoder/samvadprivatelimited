"use client";

import * as React from "react";

import Link from "next/link";

import { Container, Badge, SamvadImage } from "@samvad/ui";

import {
  Users,
  Lock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

export function AboutLeadership() {
  const leaders = [
    {
      role: "Managing Principal & Practice Leader",
      practice: "Strategic Communications & Sovereign Advisory",
      namePlaceholder: "[EXECUTIVE PRINCIPAL PLACEHOLDER]",
      statusBadge: "Practice Founder [Placeholder]",
      bio: "Leads firm strategy and sovereign advisory engagements across restructurings, cross-border transactions, and perception strategy. [Executive profile pending corporate clearance].",
      imageAsset: "leadership-skyline-silhouette",
      focusAreas: [
        "Sovereign Mandates",
        "Capital Markets Narrative",
        "Boardroom Strategy",
      ],
    },
    {
      role: "Senior Partner",
      practice: "Crisis Architecture & Litigation Defense",
      namePlaceholder: "[SENIOR LITIGATION PARTNER PLACEHOLDER]",
      statusBadge: "War Room Lead [Placeholder]",
      bio: "Oversees emergency response, regulatory investigations, and litigation communications. [Partner credentials pending verified practice records].",
      imageAsset: "corp-comm-press-podium",
      focusAreas: [
        "Hostile Activist Defense",
        "Regulatory Probes",
        "Judicial Comms",
      ],
    },
    {
      role: "Partner & Head of Telemetry",
      practice: "Perception Intelligence & Algorithmic Defense",
      namePlaceholder: "[INTELLIGENCE HEAD PLACEHOLDER]",
      statusBadge: "Telemetry Lead [Placeholder]",
      bio: "Directs sentiment topology, media graph modeling, and search integrity protocols to identify emerging perception risks. [Profile pending technology practice clearance].",
      imageAsset: "tech-datacenter-optical-core",
      focusAreas: [
        "LLM Knowledge-Graphs",
        "Sentiment Topology",
        "Disinformation Defense",
      ],
    },
    {
      role: "Senior Advisory Counsel",
      practice: "Public Affairs & Regulatory Diplomacy",
      namePlaceholder: "[PUBLIC AFFAIRS COUNSEL PLACEHOLDER]",
      statusBadge: "Sovereign Bench [Placeholder]",
      bio: "Advises on ministerial briefings, parliamentary engagement, and sovereign capability positioning across regulated infrastructure sectors. [Credentials pending advisory council verification].",
      imageAsset: "business-strategic-briefing-table",
      focusAreas: [
        "Parliamentary Accord",
        "Bilateral Diplomacy",
        "Critical Infrastructure",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-10 top-1/4 h-[450px] w-[450px] rounded-full bg-[#a67c45]/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <Users className="h-3 w-3 text-[#a67c45]" />
              Leadership &amp; Governance
            </div>

            <h2 className="font-serif text-3xl font-light leading-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
              Advisory Bench <br />
              <span className="font-normal italic text-[#a67c45]">
                Practice Leadership
              </span>
            </h2>

            <p className="text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              Senior principals and practice leaders directly steward every
              engagement. Executive identities remain placeholders until
              formally cleared for public disclosure.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#777970]">
            <Lock className="h-4 w-4 text-[#a67c45]" />
            <span>Zero Unattributed Publicity</span>
          </div>
        </div>

        {/* Factual Disclaimer Banner */}
        <div className="flex items-start gap-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-4 text-xs font-mono text-[#626760]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#a67c45]" />

          <div className="space-y-1">
            <span className="font-semibold uppercase tracking-wider text-[#8d683d]">
              Confidentiality &amp; Roster Transparency
            </span>

            <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
              Certain senior advisors maintain non-public profiles under
              confidentiality covenants. Individual biographies will be
              published following verified corporate approval.
            </p>
          </div>
        </div>

        {/* 4 Leaders Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de] shadow-sm transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e9e4da]"
            >
              {/* Leader Photo / Placeholder */}
              <div className="relative aspect-[4/5] overflow-hidden border-b border-[#d8d1c5] bg-[#e2ddd3]">
                <SamvadImage
                  assetId={leader.imageAsset}
                  aspectRatio="4:5"
                  zoomOnHover
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-3 top-3">
                  <Badge
                    variant="outline"
                    className="border-[#c9c2b6] bg-[#f3f0e8]/90 font-mono text-[9px] uppercase tracking-wider text-[#8d683d] backdrop-blur-md"
                  >
                    {leader.statusBadge}
                  </Badge>
                </div>
              </div>

              {/* Leader Content */}
              <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                    {leader.practice}
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                    {leader.namePlaceholder}
                  </h3>

                  <div className="font-mono text-[11px] text-[#777970]">
                    {leader.role}
                  </div>

                  <p className="pt-2 text-xs font-light leading-relaxed text-[#626760]">
                    {leader.bio}
                  </p>
                </div>

                {/* Focus Areas */}
                <div className="space-y-1.5 border-t border-[#d8d1c5] pt-4">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#777970]">
                    Core Specializations
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {leader.focusAreas.map((area, aIdx) => (
                      <span
                        key={aIdx}
                        className="rounded-xs border border-[#c9c2b6] bg-[#f3f0e8] px-2 py-0.5 font-mono text-[9px] text-[#626760]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Full Leadership Directory */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#d8d1c5] pt-8 sm:flex-row">
          <div className="font-mono text-xs text-[#777970]">
            Full governance charter and partner dossiers are cataloged in the
            leadership directory.
          </div>

          <Link
            href="/leadership"
            className="flex items-center gap-2 rounded-xs border border-[#a67c45]/50 bg-[#a67c45]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#8d683d] transition-all hover:border-[#a67c45] hover:bg-[#a67c45]/15"
          >
            <span>View Advisory Bench</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
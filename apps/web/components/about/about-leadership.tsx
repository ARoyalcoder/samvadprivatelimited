"use client";

import * as React from "react";
import { Container, Badge, SamvadImage } from "@samvad/ui";
import { Users, Lock, AlertCircle } from "lucide-react";

export function AboutLeadership() {
  const leaders = [
    {
      role: "Managing Principal & Practice Leader",
      practice: "Strategic Communications & Sovereign Advisory",
      namePlaceholder: "[EXECUTIVE PRINCIPAL PLACEHOLDER]",
      statusBadge: "Practice Founder [Placeholder]",
      bio: "Leads firm strategy and sovereign statecraft engagements. Decades of combined experience in high-stakes corporate restructurings, cross-border M&A transactions, and enterprise perception architecture. [Real executive profile to be populated upon corporate clearance].",
      imageAsset: "leadership-skyline-silhouette",
      focusAreas: ["Sovereign Mandates", "Capital Markets Narrative", "Boardroom Strategy"],
    },
    {
      role: "Senior Partner",
      practice: "Crisis Architecture & Litigation Defense",
      namePlaceholder: "[SENIOR LITIGATION PARTNER PLACEHOLDER]",
      statusBadge: "War Room Lead [Placeholder]",
      bio: "Oversees 24/7 emergency response protocols, regulatory investigations, and courtroom perception management during active litigation exposure. [Real partner credentials to be populated from senior practice records].",
      imageAsset: "corp-comm-press-podium",
      focusAreas: ["Hostile Activist Defense", "Regulatory Probes", "Judicial Comms"],
    },
    {
      role: "Partner & Head of Telemetry",
      practice: "Perception Intelligence & Algorithmic Defense",
      namePlaceholder: "[INTELLIGENCE HEAD PLACEHOLDER]",
      statusBadge: "Telemetry Lead [Placeholder]",
      bio: "Directs quantitative sentiment topology, media graph modeling, and algorithmic search integrity protocols to identify latent perception hazards before public escalation. [Real bio to be added from technology practice].",
      imageAsset: "tech-datacenter-optical-core",
      focusAreas: ["LLM Knowledge-Graphs", "Sentiment Topology", "Disinformation Defense"],
    },
    {
      role: "Senior Advisory Counsel",
      practice: "Public Affairs & Regulatory Diplomacy",
      namePlaceholder: "[PUBLIC AFFAIRS COUNSEL PLACEHOLDER]",
      statusBadge: "Sovereign Bench [Placeholder]",
      bio: "Specializes in ministerial briefings, parliamentary committee alignment, and sovereign capability positioning across heavily regulated national infrastructure sectors. [Real credentials to be populated from advisory council].",
      imageAsset: "business-strategic-briefing-table",
      focusAreas: ["Parliamentary Accord", "Bilateral Diplomacy", "Critical Infrastructure"],
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-10 top-1/4 h-[450px] w-[450px] rounded-full bg-gold-500/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <Users className="h-3 w-3 text-gold-400" />
              Leadership &amp; Governance
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Advisory Bench &amp; <br />
              <span className="font-normal italic text-gold-300">
                Practice Leadership
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              Our firm is governed by senior principals and practice leaders who directly steward every
              engagement. In adherence to strict factual integrity, executive identities are presented
              with explicit placeholder designations until formal public roster clearance.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-obsidian-400">
            <Lock className="h-4 w-4 text-gold-400" />
            <span>Zero Unattributed Publicity Protocol</span>
          </div>
        </div>

        {/* Factual Disclaimer Banner */}
        <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/50 p-4 text-xs font-mono text-obsidian-300 flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-gold-400 font-semibold uppercase tracking-wider">
              Confidentiality &amp; Roster Transparency Notice
            </span>
            <p className="font-sans text-xs text-sand-400 font-light leading-relaxed">
              Certain members of SAMVAD&apos;s senior advisory bench, including former senior diplomats
              and judicial counsel, maintain non-public profiles in accordance with ongoing sovereign
              non-disclosure covenants. Individual partner biographies will be published upon verified corporate approval.
            </p>
          </div>
        </div>

        {/* 4 Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-obsidian-800 bg-obsidian-900/60 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900 shadow-elevation-1"
            >
              {/* Leader Photo / Placeholder */}
              <div className="relative overflow-hidden aspect-[4/5] border-b border-obsidian-800/80 bg-obsidian-950">
                <SamvadImage
                  assetId={leader.imageAsset}
                  aspectRatio="4:5"
                  zoomOnHover
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="outline"
                    className="border-obsidian-750 bg-obsidian-950/90 font-mono text-[9px] uppercase tracking-wider text-gold-300 backdrop-blur-md"
                  >
                    {leader.statusBadge}
                  </Badge>
                </div>
              </div>

              {/* Leader Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gold-400">
                    {leader.practice}
                  </div>
                  <h3 className="font-serif text-lg font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                    {leader.namePlaceholder}
                  </h3>
                  <div className="font-mono text-[11px] text-obsidian-400">
                    {leader.role}
                  </div>
                  <p className="text-xs text-sand-400 font-light leading-relaxed pt-2">
                    {leader.bio}
                  </p>
                </div>

                {/* Focus Areas */}
                <div className="pt-4 border-t border-obsidian-850 space-y-1.5">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400">
                    Core Specializations
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {leader.focusAreas.map((area, aIdx) => (
                      <span
                        key={aIdx}
                        className="rounded-xs border border-obsidian-800 bg-obsidian-950 px-2 py-0.5 font-mono text-[9px] text-sand-300"
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
      </Container>
    </section>
  );
}

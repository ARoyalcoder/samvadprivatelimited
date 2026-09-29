"use client";

import * as React from "react";
import Link from "next/link";
import { Container, Badge, Button } from "@samvad/ui";
import {
  Layers,
  ShieldAlert,
  TrendingUp,
  Landmark,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function WhatWeDoSection() {
  const pillars = [
    {
      num: "01",
      icon: Layers,
      title: "Perception Architecture",
      subtitle: "Narrative Engineering & Predictive Framing",
      description:
        "We map adversarial perception horizons and engineer preemptive narratives that insulate institutional valuation, customer loyalty, and executive authority before scrutiny materializes.",
      deliverables: [
        "Algorithmic narrative vulnerability audits",
        "Discourse sentiment mapping & topology",
        "Key Opinion Leader (KOL) network alignment",
      ],
      tag: "Preemptive Defense",
    },
    {
      num: "02",
      icon: ShieldAlert,
      title: "Crisis Mobilization",
      subtitle: "Asymmetric Defense & Litigation Comms",
      description:
        "When hostile probes, activist short-seller dossiers, or coordinated media smear campaigns emerge, our rapid response war-room mobilizes counter-briefings within 15 minutes.",
      deliverables: [
        "Immediate 24/7 senior war room deployment",
        "Judicial, regulatory & evidentiary messaging",
        "Algorithmic search & media containment protocols",
      ],
      tag: "Rapid Intervention",
    },
    {
      num: "03",
      icon: TrendingUp,
      title: "Capital Markets Strategy",
      subtitle: "M&A Genesis & Transaction Preservation",
      description:
        "We guide the communications physics of multi-billion dollar transactions, sovereign restructurings, and IPO roadshows to preserve deal premiums and defeat hostile shareholder friction.",
      deliverables: [
        "Transaction valuation & synergy framing",
        "Cross-border antitrust regulatory alignment",
        "Proxy fight & activist defense messaging",
      ],
      tag: "Value Preservation",
    },
    {
      num: "04",
      icon: Landmark,
      title: "Public Affairs & Statecraft",
      subtitle: "Regulatory Diplomacy & Policy Accord",
      description:
        "Operating at the nexus of policy, commercial necessity, and public scrutiny, we build bipartisan consensus and sovereign goodwill across federal, parliamentary, and ministerial corridors.",
      deliverables: [
        "Ministerial & parliamentary briefing dossiers",
        "Sovereign interest & national security alignment",
        "Multilateral policy stakeholder engagement",
      ],
      tag: "Institutional Accord",
    },
  ];

  return (
    <section
      id="what-we-do"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-24 lg:py-32"
    >
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-[450px] w-[450px] rounded-full bg-gold-500/5 blur-[130px]" />

      <Container size="xl" className="relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Strategic Capabilities
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              The Four Pillars of <br />
              <span className="font-normal italic text-gold-300">
                Institutional Influence
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              We operate where reputation directly impacts capitalization, regulatory liberty, and
              sovereign mandate. Every engagement is engineered with precision, discipline, and complete discretion.
            </p>
          </div>

          <Link href="#services">
            <Button
              variant="outline"
              size="md"
              className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-850"
            >
              <span>Explore All Advisory Practices</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative flex flex-col justify-between rounded-xs border border-obsidian-800 bg-obsidian-950/80 p-8 sm:p-10 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900/90 shadow-elevation-1 hover:shadow-elevation-2"
              >
                {/* Subtle top indicator bar on hover */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6">
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-light text-obsidian-600 group-hover:text-gold-400/70 transition-colors">
                      {pillar.num}
                    </span>
                    <Badge variant="outline" className="border-obsidian-750 bg-obsidian-850 font-mono text-[10px] text-gold-300 uppercase tracking-widest">
                      {pillar.tag}
                    </Badge>
                  </div>

                  {/* Icon & Heading */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xs border border-obsidian-750 bg-obsidian-900 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-serif text-2xl font-normal text-sand-100 group-hover:text-sand-50 transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-gold-400/80 pl-12">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed pl-12">
                    {pillar.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="mt-8 pt-6 border-t border-obsidian-800/80 pl-12 space-y-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-sand-300 font-semibold">
                    Core Operational Deliverables
                  </div>
                  <ul className="space-y-2">
                    {pillar.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-sand-400 font-light">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

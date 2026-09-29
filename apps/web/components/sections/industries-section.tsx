"use client";

import * as React from "react";
import Link from "next/link";
import { Container, Badge, SamvadImage } from "@samvad/ui";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function IndustriesSection() {
  const industries = [
    {
      code: "01",
      id: "defense-aerospace",
      title: "Defense & Strategic Aerospace",
      badge: "Sovereign Mandate",
      imageAsset: "leadership-skyline-silhouette",
      description:
        "Sovereign capability positioning, offset negotiation comms, and defense procurement transparency across parliamentary committees.",
      focus: "Cross-border export controls, classified programs, sovereign deterrence narrative.",
    },
    {
      code: "02",
      id: "banking-fintech",
      title: "Banking & Global FinTech",
      badge: "Tier-1 Capital",
      imageAsset: "finance-atrium-architecture",
      description:
        "Solvency reassurance, central bank regulatory dialogue, algorithmic liquidity risk framing, and high-stakes fraud containment.",
      focus: "Basel III/IV compliance discourse, anti-money-laundering audits, cross-border payments.",
    },
    {
      code: "03",
      id: "infrastructure-energy",
      title: "Critical Infrastructure & Energy",
      badge: "National Arteries",
      imageAsset: "infrastructure-highspeed-rail",
      description:
        "Grid security communications, energy transition credibility, environmental litigation defense, and public infrastructure accords.",
      focus: "Energy transition politics, ESG polarization de-escalation, pipeline security.",
    },
    {
      code: "04",
      id: "healthcare-lifesciences",
      title: "Healthcare & Life Sciences",
      badge: "Clinical & Bio-Ethics",
      imageAsset: "healthcare-biotech-optics",
      description:
        "Clinical trial perception management, patent cliff litigation defense, bio-ethics messaging, and pricing scrutiny mitigation.",
      focus: "FDA & international regulatory clearance, IP disputes, public health optics.",
    },
    {
      code: "05",
      id: "deeptech-ai",
      title: "Enterprise DeepTech & AI",
      badge: "Frontier Compute",
      imageAsset: "tech-datacenter-optical-core",
      description:
        "Algorithmic governance positioning, data sovereignty, congressional antitrust scrutiny defense, and AI ethics stewardship.",
      focus: "Model alignment optics, semiconductor supply chains, automated bias rebuttals.",
    },
    {
      code: "06",
      id: "family-offices",
      title: "Family Offices & Sovereign Funds",
      badge: "Discreet Wealth",
      imageAsset: "business-strategic-briefing-table",
      description:
        "Confidential multi-generational wealth stewardship, succession communications, cross-border privacy shielding, and philanthropic legacy.",
      focus: "Non-attribution reputation moats, family governance mediation, offshore privacy.",
    },
  ];

  return (
    <section
      id="industries"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32"
    >
      {/* Background radial accent */}
      <div className="pointer-events-none absolute right-10 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-gold-500/5 blur-[130px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Operating Sectors
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              High-Stakes Arenas & <br />
              <span className="font-normal italic text-gold-300">
                Regulated Corridors
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              Specialized domain depth ensuring regulatory context, jurisdictional intuition,
              and immediate tactical authority in complex operational theatres.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-obsidian-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Strict Client Non-Attribution Observed</span>
          </div>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.code}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-obsidian-800 bg-obsidian-900/60 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900 shadow-elevation-1 hover:shadow-elevation-2"
            >
              {/* Image Header with Zoom on Hover */}
              <div className="relative overflow-hidden aspect-[16/10] border-b border-obsidian-800/80">
                <SamvadImage
                  assetId={industry.imageAsset}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="font-mono text-xs bg-obsidian-950/80 border border-obsidian-750 px-2 py-0.5 rounded-xs text-gold-400">
                    {industry.code}
                  </span>
                  <Badge variant="outline" className="border-obsidian-750 bg-obsidian-900/90 font-mono text-[9px] uppercase tracking-wider text-sand-300 backdrop-blur-md">
                    {industry.badge}
                  </Badge>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-sand-400 font-light">
                    {industry.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-obsidian-800/80 space-y-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                    Core Focus
                  </div>
                  <div className="font-sans text-xs text-sand-300/90 font-light">
                    {industry.focus}
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <span>Request Sector Brief</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

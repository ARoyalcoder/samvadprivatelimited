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
        "Sovereign capability positioning, procurement communications, and defense-sector reputation strategy.",
      focus:
        "Export controls, classified programs, sovereign deterrence narrative.",
    },
    {
      code: "02",
      id: "banking-fintech",
      title: "Banking & Global FinTech",
      badge: "Tier-1 Capital",
      imageAsset: "finance-atrium-architecture",
      description:
        "Solvency communications, regulatory dialogue, liquidity-risk framing, and fraud containment.",
      focus:
        "Basel III/IV discourse, AML audits, cross-border payments.",
    },
    {
      code: "03",
      id: "infrastructure-energy",
      title: "Critical Infrastructure & Energy",
      badge: "National Arteries",
      imageAsset: "infra-highspeed-viaduct",
      description:
        "Grid security communications, energy transition credibility, litigation defense, and infrastructure strategy.",
      focus:
        "Energy transition, ESG polarization, pipeline security.",
    },
    {
      code: "04",
      id: "healthcare-lifesciences",
      title: "Healthcare & Life Sciences",
      badge: "Clinical & Bio-Ethics",
      imageAsset: "health-biotech-cleanroom",
      description:
        "Clinical perception strategy, patent litigation communications, bio-ethics, and pricing scrutiny.",
      focus:
        "Regulatory clearance, IP disputes, public health optics.",
    },
    {
      code: "05",
      id: "deeptech-ai",
      title: "Enterprise DeepTech & AI",
      badge: "Frontier Compute",
      imageAsset: "tech-datacenter-optical-core",
      description:
        "Algorithmic governance, data sovereignty, antitrust communications, and AI ethics strategy.",
      focus:
        "Model alignment, semiconductor supply chains, automated bias response.",
    },
    {
      code: "06",
      id: "family-offices",
      title: "Family Offices & Sovereign Funds",
      badge: "Discreet Wealth",
      imageAsset: "meetings-briefing-table",
      description:
        "Confidential wealth stewardship, succession communications, privacy strategy, and philanthropic legacy.",
      focus:
        "Reputation protection, family governance, cross-border privacy.",
    },
  ];

  return (
    <section
      id="industries"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Background radial accent */}
      <div className="pointer-events-none absolute right-10 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#a67c45]/[0.04] blur-[130px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9a703f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Operating Sectors
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
              High-Stakes Arenas & <br />
              <span className="font-normal italic text-[#9a703f]">
                Regulated Corridors
              </span>
            </h2>

            <p className="text-[#667078] text-sm sm:text-base font-light leading-relaxed">
              Specialized domain expertise across regulated and strategically
              sensitive environments.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#899197]">
            <ShieldCheck className="h-4 w-4 text-[#6d876e]" />
            <span>Client Non-Attribution Observed</span>
          </div>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.code}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70 transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e7e2d8] shadow-[0_8px_30px_rgba(29,37,41,0.05)] hover:shadow-[0_14px_40px_rgba(29,37,41,0.08)]"
            >
              {/* Image Header with Zoom on Hover */}
              <div className="relative overflow-hidden aspect-[16/10] border-b border-[#d0c9bd]">
                <SamvadImage
                  assetId={industry.imageAsset}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="font-mono text-xs bg-[#f3f0e8]/90 border border-[#c9c3b8] px-2 py-0.5 rounded-xs text-[#9a703f]">
                    {industry.code}
                  </span>

                  <Badge
                    variant="outline"
                    className="border-[#c9c3b8] bg-[#f3f0e8]/90 font-mono text-[9px] uppercase tracking-wider text-[#536067] backdrop-blur-md"
                  >
                    {industry.badge}
                  </Badge>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-normal text-[#1d2529] group-hover:text-[#8f683c] transition-colors">
                    {industry.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-[#667078] font-light">
                    {industry.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d0c9bd] space-y-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#899197]">
                    Core Focus
                  </div>

                  <div className="font-sans text-xs text-[#536067] font-light">
                    {industry.focus}
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#9a703f] hover:text-[#7f5c35] transition-colors"
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
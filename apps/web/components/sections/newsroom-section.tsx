"use client";

import * as React from "react";

import Link from "next/link";

import { Container, Badge, Button } from "@samvad/ui";

import {
  ShieldCheck,
  Download,
  Mail,
  ArrowRight,
  Clock,
} from "lucide-react";

export function NewsroomSection() {
  const releases = [
    {
      id: "nr-2026-03",
      date: "September 15, 2026",
      category: "Global Expansion",
      title:
        "SAMVAD Expands Sovereign Advisory Practice with Singapore Operational Hub",
      summary:
        "Strengthening Asia-Pacific presence to counsel sovereign wealth funds and infrastructure consortia navigating cross-border trade tensions.",
      status: "Verified Official Disclosure",
      ref: "DISCLOSURE #2026-SG-01",
    },
    {
      id: "nr-2026-02",
      date: "August 28, 2026",
      category: "Intelligence Report",
      title:
        "2026 Sovereign Perception Index: 68% of Enterprise Leaders Report Algorithmic Disinformation Threats",
      summary:
        "Flagship benchmark survey across 250 global executive boards identifies automated disinformation as a growing corporate reputation liability.",
      status: "Public Monograph",
      ref: "INDEX #2026-SPI-V4",
    },
    {
      id: "nr-2026-01",
      date: "July 10, 2026",
      category: "Senior Governance",
      title:
        "Appointment of Senior Appellate Jurist & Geopolitical Counsel to Crisis Defense Bench",
      summary:
        "Strengthening judicial and regulatory communications with senior counsel across antitrust and sovereign statecraft.",
      status: "Institutional Notice",
      ref: "APPT #2026-GOV-09",
    },
  ];

  return (
    <section
      id="newsroom"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute right-10 top-1/4 h-[450px] w-[450px] rounded-full bg-[#a67c45]/[0.04] blur-[130px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9a703f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Official Disclosures
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
              Newsroom & <br />
              <span className="font-normal italic text-[#9a703f]">
                Institutional Dispatches
              </span>
            </h2>

            <p className="text-[#667078] text-sm sm:text-base font-light leading-relaxed">
              Official announcements, research releases, and verified
              disclosures from SAMVAD Perception Advisory.
            </p>
          </div>

          {/* Media Kit CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link href="#contact">
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs uppercase tracking-wider border-[#c9c3b8] text-[#39444a] hover:border-[#a67c45]/60 hover:bg-[#ebe7de]"
              >
                <Download className="mr-2 h-3.5 w-3.5 text-[#a67c45]" />
                <span>Download Media Kit</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Verified Disclosures Timeline */}
        <div className="space-y-6">
          {releases.map((release) => (
            <div
              key={release.id}
              className="group relative rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70 p-6 sm:p-8 transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e7e2d8] shadow-[0_8px_30px_rgba(29,37,41,0.04)]"
            >
              {/* Subtle hover indicator */}
              <div className="absolute top-0 left-6 right-6 h-px bg-[#a67c45]/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Date & Metadata Column */}
                <div className="lg:col-span-3 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#9a703f] font-medium">
                    <Clock className="h-3 w-3" />
                    <span>{release.date}</span>
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#899197]">
                    {release.ref}
                  </div>

                  <Badge
                    variant="outline"
                    className="border-[#c9c3b8] bg-[#f3f0e8] font-mono text-[9px] uppercase tracking-wider text-[#536067]"
                  >
                    {release.category}
                  </Badge>
                </div>

                {/* Center Title & Summary */}
                <div className="lg:col-span-7 space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1d2529] group-hover:text-[#8f683c] transition-colors leading-snug">
                    {release.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#667078] font-light leading-relaxed">
                    {release.summary}
                  </p>
                </div>

                {/* Right Action */}
                <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-0">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[#9a703f] hover:text-[#7f5c35] transition-colors"
                  >
                    <span>Read Release</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spokesperson & Media Verification Box */}
        <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#6d876e]" />

                <span className="font-mono text-xs uppercase tracking-wider text-[#29343a] font-medium">
                  Verified Media Inquiry Protocol
                </span>
              </div>

              <p className="text-xs text-[#667078] font-light leading-relaxed">
                Official SAMVAD press statements are cryptographically signed
                with our institutional key to help protect against counterfeit
                releases and fraudulent disclosures. Accredited journalists may
                contact the Press Secretary desk.
              </p>

              <div className="font-mono text-[10px] text-[#899197]">
                PGP Fingerprint: 4E9A 82B1 0F3C 7890 2D1A · Verified Institutional Key
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-start lg:justify-end">
              <Link href="#contact">
                <Button
                  variant="gold"
                  size="sm"
                  className="w-full font-mono text-xs uppercase tracking-wider"
                >
                  <Mail className="mr-2 h-3.5 w-3.5" />
                  <span>Contact Press Secretary</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
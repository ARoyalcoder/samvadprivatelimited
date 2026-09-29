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
      title: "SAMVAD Expands Sovereign Advisory Practice with Singapore Operational Hub",
      summary:
        "Strengthening Asia-Pacific presence to counsel sovereign wealth funds and multinational infrastructure consortia navigating cross-border trade tensions.",
      status: "Verified Official Disclosure",
      ref: "DISCLOSURE #2026-SG-01",
    },
    {
      id: "nr-2026-02",
      date: "August 28, 2026",
      category: "Intelligence Report",
      title: "2026 Sovereign Perception Index: 68% of Enterprise Leaders Report Algorithmic Disinformation Threats",
      summary:
        "Flagship benchmark survey across 250 global executive boards identifies automated LLM hallucination indexing as fastest-growing corporate reputation liability.",
      status: "Public Monograph",
      ref: "INDEX #2026-SPI-V4",
    },
    {
      id: "nr-2026-01",
      date: "July 10, 2026",
      category: "Senior Governance",
      title: "Appointment of Senior Appellate Jurist & Geopolitical Counsel to Crisis Defense Bench",
      summary:
        "Enhancing our judicial and regulatory litigation communications practice with deep institutional counsel in antitrust and sovereign statecraft.",
      status: "Institutional Notice",
      ref: "APPT #2026-GOV-09",
    },
  ];

  return (
    <section
      id="newsroom"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/60 py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute right-10 top-1/4 h-[450px] w-[450px] rounded-full bg-gold-500/5 blur-[130px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Official Disclosures & Media Centre
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Newsroom & <br />
              <span className="font-normal italic text-gold-300">
                Institutional Dispatches
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              Official press announcements, public monographs, and verified corporate disclosures
              issued by SAMVAD Perception Advisory Private Limited.
            </p>
          </div>

          {/* Media Kit CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link href="#contact">
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-850"
              >
                <Download className="mr-2 h-3.5 w-3.5 text-gold-400" />
                <span>Download Media Kit (2026)</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Verified Disclosures Timeline */}
        <div className="space-y-6">
          {releases.map((release) => (
            <div
              key={release.id}
              className="group relative rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 sm:p-8 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900 shadow-elevation-1"
            >
              {/* Subtle hover indicator */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Date & Metadata Column */}
                <div className="lg:col-span-3 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-gold-400 font-medium">
                    <Clock className="h-3 w-3" />
                    <span>{release.date}</span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                    {release.ref}
                  </div>
                  <Badge variant="outline" className="border-obsidian-750 bg-obsidian-850 font-mono text-[9px] uppercase tracking-wider text-sand-300">
                    {release.category}
                  </Badge>
                </div>

                {/* Center Title & Summary */}
                <div className="lg:col-span-7 space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors leading-snug">
                    {release.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                    {release.summary}
                  </p>
                </div>

                {/* Right Action */}
                <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-0">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors"
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
        <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-sand-200 font-medium">
                  Verified Media Inquiry Protocol & Cryptographic Provenance
                </span>
              </div>
              <p className="text-xs text-sand-400 font-light leading-relaxed">
                All official press statements released by SAMVAD are cryptographically signed with our
                institutional sovereign key to defend against counterfeit releases and fraudulent market disclosures.
                Accredited journalists may reach our Press Secretary desk with confidential inquiry credentials.
              </p>
              <div className="font-mono text-[10px] text-obsidian-400">
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

import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@samvad/ui";
import { getAllLeadershipProfiles } from "@/lib/leadership-data";
import { LeadershipDirectoryView } from "@/components/leadership/leadership-directory-view";
import {
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Lock,
  Compass,
  FileCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Leadership & Advisory Bench | SAMVAD Perception Advisory",
  description:
    "Governed by senior practice leaders and sovereign advisory counsel. Partner-led stewardship, strategic communications, and crisis architecture.",
  keywords: [
    "SAMVAD Leadership",
    "Perception Advisory Bench",
    "Sovereign Communications Partners",
    "Crisis Architecture Directorate",
    "Boardroom Advisory Leaders",
  ],
};

export default function LeadershipPage() {
  const profiles = getAllLeadershipProfiles();

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-24 border-b border-obsidian-800">
        {/* Ambient lighting glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[950px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 flex flex-col justify-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400"
          >
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">Leadership &amp; Advisory Bench</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Governance &amp; Practice Stewardship
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
              The Stewards of Perception &amp; <br />
              <span className="font-normal italic text-gold-300">
                Strategic Authority
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed max-w-2xl">
              Our firm is governed by senior practice leaders and advisory counsel who directly steer
              every engagement. In strict adherence to factual integrity, executive identities are presented
              with explicit placeholder designations until formal public roster clearance.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. FACTUAL TRANSPARENCY & CONFIDENTIALITY BANNER */}
      <section className="border-b border-obsidian-800 bg-obsidian-900/40 py-6">
        <Container size="xl">
          <div className="rounded-xs border border-obsidian-800 bg-obsidian-950/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gold-400 font-semibold">
                  <span>Roster Disclosure &amp; Non-Fabrication Doctrine</span>
                  <span className="text-obsidian-600">·</span>
                  <span className="text-sand-400 font-normal">Privileged Advisory Practice</span>
                </div>
                <p className="font-sans text-xs text-sand-400 font-light leading-relaxed max-w-3xl">
                  Certain members of SAMVAD&apos;s advisory bench, including former senior diplomats, judicial
                  officers, and intelligence analysts, maintain confidential profiles under sovereign
                  non-disclosure covenants. Executive profiles are presented via structured CMS-driven
                  placeholders pending corporate clearance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400 shrink-0">
              <Lock className="h-3.5 w-3.5 text-gold-400" />
              <span>Zero Fabrication Guarantee</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MAIN DIRECTORY SPREAD */}
      <section className="py-16 lg:py-24">
        <Container size="xl">
          <LeadershipDirectoryView profiles={profiles} />
        </Container>
      </section>

      {/* 4. ADVISORY OPERATING DOCTRINE (3 PILLARS) */}
      <section className="border-t border-obsidian-800 bg-obsidian-900/40 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
              Operating Principles
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              How Our Leadership Governs
            </h2>
            <p className="font-sans text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
              Every mandate undertaken by SAMVAD is anchored by immutable institutional protocols that
              safeguard client discretion, analytical precision, and executive accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 sm:p-8 space-y-4">
              <ShieldCheck className="h-6 w-6 text-gold-400" />
              <h3 className="font-serif text-xl font-light text-sand-100">
                Partner-Led Delivery
              </h3>
              <p className="font-sans text-xs text-sand-400 font-light leading-relaxed">
                We reject the agency model of senior pitching and junior delegation. Every strategic memorandum,
                media intervention, and crisis war room is directly staffed and led by practice partners.
              </p>
            </div>

            <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 sm:p-8 space-y-4">
              <Compass className="h-6 w-6 text-gold-400" />
              <h3 className="font-serif text-xl font-light text-sand-100">
                Sovereign Discretion
              </h3>
              <p className="font-sans text-xs text-sand-400 font-light leading-relaxed">
                Client identities and strategic engagements are held in cryptographic escrow. Our partners
                do not seek publicity through client attribution; our efficacy is reflected in the enduring
                reputation of those we advise.
              </p>
            </div>

            <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 sm:p-8 space-y-4">
              <FileCheck className="h-6 w-6 text-gold-400" />
              <h3 className="font-serif text-xl font-light text-sand-100">
                Quantitative Forensics
              </h3>
              <p className="font-sans text-xs text-sand-400 font-light leading-relaxed">
                Strategic intuition is synthesized with empirical perception telemetry. We model sentiment
                vectors, search knowledge graphs, and algorithmic resonance before formulating narrative positions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. DIRECT CONSULTATION MANDATE CTA */}
      <section className="border-t border-obsidian-800 bg-obsidian-950 py-16 lg:py-20">
        <Container size="xl">
          <div className="rounded-xs border border-gold-500/30 bg-gradient-to-r from-obsidian-900 to-obsidian-900/60 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                Direct Practice Inquiries
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-sand-100">
                Engage Our Advisory Bench
              </h2>
              <p className="font-sans text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
                Chairpersons, sovereign ministers, and general counsel may initiate confidential discussions
                directly with our practice leaders under privileged non-disclosure covenants.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/services"
                className="rounded-xs border border-gold-500/60 bg-gold-500/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-gold-300 hover:bg-gold-500/20 hover:border-gold-500 transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Practice Areas</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

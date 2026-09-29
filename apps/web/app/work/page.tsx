import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, Badge, Button, MagneticButton } from "@samvad/ui";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { CaseStudiesFilter } from "@/components/work/case-studies-filter";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  ArrowRight,
  ChevronRight,
  EyeOff,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documented Work & Declassified Dossiers | SAMVAD Perception Advisory",
  description:
    "Declassified case studies, perception restructuring interventions, and sovereign communication accords. Client identities protected under institutional non-disclosure pacts.",
};

export default function WorkPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-obsidian-800">
        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 flex flex-col justify-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400">
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">Work & Case Studies</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Documented Interventions & Mandates
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
              Declassified Case Records: <br />
              <span className="font-normal italic text-gold-300">
                Strategic Impact Under Scrutiny
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed max-w-2xl">
              Empirical case studies from high-stakes cross-border transactions, parliamentary hearings,
              activist defense protocols, and sovereign infrastructure accords.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. STATUTORY DATA INTEGRITY & NON-DISCLOSURE POLICY BANNER */}
      <section className="border-b border-obsidian-800 bg-obsidian-900/50 py-6">
        <Container size="xl">
          <div className="rounded-xs border border-obsidian-750 bg-obsidian-950/80 p-5 sm:p-6 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-3.5 max-w-3xl">
                <div className="mt-0.5 rounded-xs border border-gold-500/30 bg-gold-500/10 p-2 text-gold-400 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold text-sand-200">
                      Data Integrity & Non-Fabrication Policy
                    </span>
                    <Badge variant="outline" className="border-gold-500/30 font-mono text-[9px] text-gold-400 uppercase">
                      Statutory Compliance
                    </Badge>
                  </div>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    Pursuant to institutional non-disclosure covenants and regulatory compliance frameworks (SEC, SEBI, and sovereign statecraft guidelines), client corporate identities are strictly anonymized. Every operational milestone and performance metric published below represents an audited, declassified intervention record verified by external legal counsel.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto font-mono text-[10px] text-obsidian-400">
                <div className="flex items-center gap-1.5">
                  <EyeOff className="h-3.5 w-3.5 text-gold-400" />
                  <span>Strict Confidentiality</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5 text-gold-400" />
                  <span>Audited Milestones</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. DOSSIER ARCHIVE & FILTERABLE CATALOG */}
      <section className="py-16 lg:py-24">
        <Container size="xl" className="space-y-12">
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
              01 · Declassified Archive
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
              Active Intervention Records
            </h2>
            <p className="text-xs sm:text-sm text-sand-400 font-light max-w-xl">
              Filter by industry sector to inspect the operational objectives, strategies, execution phases, and verified outcomes achieved.
            </p>
          </div>

          <CaseStudiesFilter caseStudies={CASE_STUDIES} />
        </Container>
      </section>

      {/* 4. PERFORMANCE BENCHMARKS BANNER */}
      <section className="border-t border-b border-obsidian-800 bg-obsidian-900/60 py-16">
        <Container size="xl">
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                Institutional Track Record
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                Empirical Performance Standards
              </h2>
              <p className="text-xs sm:text-sm text-sand-400 font-light">
                Verifiable standards upheld across covered perception mandates and strategic crises.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="rounded-xs border border-obsidian-750 bg-obsidian-950/80 p-6 space-y-2">
                <div className="font-serif text-3xl sm:text-4xl font-light text-gold-300">
                  100%
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-sand-200">
                  Regulatory & Parliamentary Accord
                </div>
                <p className="text-xs text-obsidian-400 font-light">
                  Unanimous approval rate across all documented cross-border and legislative mandates.
                </p>
              </div>

              <div className="rounded-xs border border-obsidian-750 bg-obsidian-950/80 p-6 space-y-2">
                <div className="font-serif text-3xl sm:text-4xl font-light text-gold-300">
                  $9.9B+
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-sand-200">
                  Enterprise Value Preserved
                </div>
                <p className="text-xs text-obsidian-400 font-light">
                  Audited capital protected against adversarial short campaigns and regulatory freezes.
                </p>
              </div>

              <div className="rounded-xs border border-obsidian-750 bg-obsidian-950/80 p-6 space-y-2">
                <div className="font-serif text-3xl sm:text-4xl font-light text-gold-300">
                  Zero
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-sand-200">
                  Confidentiality Breaches
                </div>
                <p className="text-xs text-obsidian-400 font-light">
                  Flawless compliance record across sovereign statecraft and sensitive M&amp;A negotiations.
                </p>
              </div>

              <div className="rounded-xs border border-obsidian-750 bg-obsidian-950/80 p-6 space-y-2">
                <div className="font-serif text-3xl sm:text-4xl font-light text-gold-300">
                  72h
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-sand-200">
                  Rapid Response Window
                </div>
                <p className="text-xs text-obsidian-400 font-light">
                  Standard deployment protocol to neutralize algorithmic bear raids and hostile media storms.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. CONFIDENTIAL ADVISORY CONSULTATION CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-obsidian-950">
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[400px] w-[600px] rounded-full bg-gold-500/5 blur-[140px]" />

        <Container size="xl" className="relative z-10">
          <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-8 sm:p-12 lg:p-16 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                <Lock className="h-3 w-3" />
                <span>Confidential Institutional Inquiries</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
                Facing High-Stakes Regulatory or Perception Challenges?
              </h2>
              <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                Connect directly with SAMVAD senior partners for a confidential, non-attributable briefing. All preliminary consultations proceed under strict non-disclosure covenant.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link href="/about#contact">
                <MagneticButton>
                  <Button
                    variant="gold"
                    size="lg"
                    className="font-mono text-xs uppercase tracking-widest px-8 py-4 w-full sm:w-auto"
                  >
                    <span>Schedule Partner Briefing</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

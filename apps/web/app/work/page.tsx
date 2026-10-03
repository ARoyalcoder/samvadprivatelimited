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
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-[#d8d1c5]">
        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#a67c45]/5 blur-[160px]" />

        <Container
          size="xl"
          className="relative z-10 flex flex-col justify-center space-y-6"
        >
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-[#777970]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#3f4847]"
            >
              Home
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-[#a67c45]">Work & Case Studies</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Documented Interventions & Mandates
            </div>

            <h1 className="font-serif text-4xl font-light tracking-tight text-[#1d2529] leading-[1.08] sm:text-5xl lg:text-6xl">
              Declassified Case Records: <br />
              <span className="font-normal italic text-[#a67c45]">
                Strategic Impact Under Scrutiny
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              Documented interventions across complex transactions,
              regulatory scrutiny, crisis response, and institutional mandates.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. STATUTORY DATA INTEGRITY & NON-DISCLOSURE POLICY BANNER */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-6">
        <Container size="xl">
          <div className="rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-5 shadow-sm sm:p-6">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex max-w-3xl items-start gap-3.5">
                <div className="mt-0.5 shrink-0 rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 p-2 text-[#a67c45]">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3f4847]">
                      Data Integrity & Non-Fabrication Policy
                    </span>

                    <Badge
                      variant="outline"
                      className="border-[#a67c45]/30 font-mono text-[9px] uppercase text-[#a67c45]"
                    >
                      Statutory Compliance
                    </Badge>
                  </div>

                  <p className="font-light leading-relaxed text-[#626760] text-xs">
                    Client identities remain anonymized under institutional
                    confidentiality protocols. Published milestones and
                    metrics are presented as verified intervention records.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 self-end font-mono text-[10px] text-[#777970] lg:self-auto">
                <div className="flex items-center gap-1.5">
                  <EyeOff className="h-3.5 w-3.5 text-[#a67c45]" />
                  <span>Strict Confidentiality</span>
                </div>

                <span>·</span>

                <div className="flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5 text-[#a67c45]" />
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
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
              01 · Declassified Archive
            </div>

            <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
              Active Intervention Records
            </h2>

            <p className="max-w-xl font-light text-[#626760] text-xs sm:text-sm">
              Filter by sector to review objectives, strategy, execution, and
              documented outcomes.
            </p>
          </div>

          <CaseStudiesFilter caseStudies={CASE_STUDIES} />
        </Container>
      </section>

      {/* 4. PERFORMANCE BENCHMARKS BANNER */}
      <section className="border-b border-t border-[#d8d1c5] bg-[#ebe7de] py-16">
        <Container size="xl">
          <div className="space-y-8">
            <div className="mx-auto max-w-2xl space-y-2 text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                Institutional Track Record
              </span>

              <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                Documented Performance Standards
              </h2>

              <p className="font-light text-[#626760] text-xs sm:text-sm">
                Standards maintained across covered mandates and strategic
                interventions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm">
                <div className="font-serif text-3xl font-light text-[#a67c45] sm:text-4xl">
                  100%
                </div>

                <div className="font-mono text-xs uppercase tracking-wider text-[#3f4847]">
                  Regulatory & Parliamentary Accord
                </div>

                <p className="font-light text-[#777970] text-xs">
                  Documented approval rate across covered regulatory and
                  legislative mandates.
                </p>
              </div>

              <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm">
                <div className="font-serif text-3xl font-light text-[#a67c45] sm:text-4xl">
                  $9.9B+
                </div>

                <div className="font-mono text-xs uppercase tracking-wider text-[#3f4847]">
                  Enterprise Value Preserved
                </div>

                <p className="font-light text-[#777970] text-xs">
                  Capital protected across documented adversarial and
                  regulatory situations.
                </p>
              </div>

              <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm">
                <div className="font-serif text-3xl font-light text-[#a67c45] sm:text-4xl">
                  Zero
                </div>

                <div className="font-mono text-xs uppercase tracking-wider text-[#3f4847]">
                  Confidentiality Breaches
                </div>

                <p className="font-light text-[#777970] text-xs">
                  Reported breaches across sensitive institutional mandates.
                </p>
              </div>

              <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm">
                <div className="font-serif text-3xl font-light text-[#a67c45] sm:text-4xl">
                  72h
                </div>

                <div className="font-mono text-xs uppercase tracking-wider text-[#3f4847]">
                  Rapid Response Window
                </div>

                <p className="font-light text-[#777970] text-xs">
                  Standard deployment window for high-priority perception and
                  media situations.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. CONFIDENTIAL ADVISORY CONSULTATION CTA */}
      <section className="relative overflow-hidden bg-[#f3f0e8] py-20 lg:py-28">
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[400px] w-[600px] rounded-full bg-[#a67c45]/5 blur-[140px]" />

        <Container size="xl" className="relative z-10">
          <div className="flex flex-col items-start justify-between gap-8 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 shadow-sm sm:p-12 lg:flex-row lg:items-center lg:p-16">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                <Lock className="h-3 w-3" />
                <span>Confidential Institutional Inquiries</span>
              </div>

              <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
                Facing High-Stakes Regulatory or Perception Challenges?
              </h2>

              <p className="font-light leading-relaxed text-[#626760] text-xs sm:text-sm">
                Connect directly with SAMVAD senior partners for a confidential
                briefing. Preliminary consultations proceed under strict
                non-disclosure protocols.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
              <Link href="/about#contact">
                <MagneticButton>
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full px-8 py-4 font-mono text-xs uppercase tracking-widest sm:w-auto"
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
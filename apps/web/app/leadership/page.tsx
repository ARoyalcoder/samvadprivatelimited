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
    "Senior practice leadership and advisory counsel across communications, crisis, and perception strategy.",
  keywords: [
    "SAMVAD Leadership",
    "Advisory Bench",
    "Sovereign Communications",
    "Crisis Architecture",
    "Boardroom Advisory",
  ],
};

export default function LeadershipPage() {
  const profiles = getAllLeadershipProfiles();

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[160px]" />

        <Container
          size="xl"
          className="relative z-10 flex flex-col justify-center space-y-6"
        >
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

            <span className="text-[#a67c45]">
              Leadership &amp; Advisory Bench
            </span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Practice Leadership
            </div>

            <h1 className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
              Advisory Bench
              <br />
              <span className="font-normal italic text-[#a67c45]">
                Strategic Authority
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              Senior counsel directly overseeing strategic engagements.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. FACTUAL TRANSPARENCY & CONFIDENTIALITY BANNER */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-6">
        <Container size="xl">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#a67c45]" />

              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#a67c45]">
                  <span>Roster Disclosure</span>
                  <span className="text-[#c5beb2]">·</span>
                  <span className="font-normal text-[#777970]">
                    Confidential Practice
                  </span>
                </div>

                <p className="max-w-3xl font-sans text-xs font-light leading-relaxed text-[#626760]">
                  Confidential profiles remain undisclosed pending formal
                  clearance.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-[#777970]">
              <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>Zero Fabrication</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MAIN DIRECTORY SPREAD */}
      <section className="bg-[#f3f0e8] py-16 lg:py-24">
        <Container size="xl">
          <LeadershipDirectoryView profiles={profiles} />
        </Container>
      </section>

      {/* 4. ADVISORY OPERATING DOCTRINE */}
      <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
              Operating Principles
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Leadership Doctrine
            </h2>

            <p className="font-sans text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
              Three principles govern every mandate.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm sm:p-8">
              <ShieldCheck className="h-6 w-6 text-[#a67c45]" />

              <h3 className="font-serif text-xl font-light text-[#1d2529]">
                Partner-Led Delivery
              </h3>

              <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
                Senior partners lead strategy, interventions, and crisis
                response.
              </p>
            </div>

            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm sm:p-8">
              <Compass className="h-6 w-6 text-[#a67c45]" />

              <h3 className="font-serif text-xl font-light text-[#1d2529]">
                Sovereign Discretion
              </h3>

              <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
                Client identities and engagements remain confidential.
              </p>
            </div>

            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm sm:p-8">
              <FileCheck className="h-6 w-6 text-[#a67c45]" />

              <h3 className="font-serif text-xl font-light text-[#1d2529]">
                Quantitative Forensics
              </h3>

              <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
                Perception telemetry informs strategic decisions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. DIRECT CONSULTATION MANDATE CTA */}
      <section className="border-t border-[#d8d1c5] bg-[#f3f0e8] py-16 lg:py-20">
        <Container size="xl">
          <div className="flex flex-col items-start justify-between gap-8 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 shadow-sm sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                Direct Practice Inquiry
              </div>

              <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl lg:text-4xl">
                Engage Our Advisory Bench
              </h2>

              <p className="font-sans text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                Initiate a confidential discussion with our practice leaders.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="flex items-center gap-2 rounded-xs border border-[#a67c45]/50 bg-[#a67c45]/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#8d683d] transition-all duration-300 hover:border-[#a67c45] hover:bg-[#a67c45]/15"
              >
                <span>Explore Practices</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
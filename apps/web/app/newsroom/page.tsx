import * as React from "react";

import type { Metadata } from "next";

import Link from "next/link";

import { Container, Badge, Button, MagneticButton } from "@samvad/ui";

import {
  getAllNewsroomItems,
  getNewsroomTypesWithCounts,
  getNewsroomYears,
} from "@/lib/newsroom-data";

import { NewsroomSearchFilter } from "@/components/newsroom/newsroom-search-filter";

import {
  ShieldCheck,
  Download,
  Mail,
  ArrowRight,
  ChevronRight,
  FileCheck,
  Key,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Newsroom & Institutional Dispatches | SAMVAD Perception Advisory",
  description:
    "Official press statements, governance updates, verified media records, and institutional announcements from SAMVAD Perception Advisory.",
  keywords: [
    "SAMVAD Newsroom",
    "Press Releases",
    "Company Announcements",
    "Perception Advisory",
    "Institutional Dispatches",
  ],
};

export default function NewsroomPage() {
  const items = getAllNewsroomItems();
  const typesWithCounts = getNewsroomTypesWithCounts();
  const years = getNewsroomYears();

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-20 lg:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[160px]" />

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

            <span className="text-[#a67c45]">
              Newsroom &amp; Media Centre
            </span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Official Dispatches &amp; Media Centre
            </div>

            <h1 className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
              Newsroom &amp; <br />
              <span className="font-normal italic text-[#a67c45]">
                Institutional Dispatches
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              Official announcements, governance notices, executive updates,
              symposium records, and verified briefing releases.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. STATUTORY NON-FABRICATION & MEDIA POLICY GOVERNANCE BANNER */}
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
                      Media Governance &amp; Non-Fabrication Policy
                    </span>

                    <Badge
                      variant="outline"
                      className="border-[#a67c45]/30 font-mono text-[9px] uppercase text-[#a67c45]"
                    >
                      Strict Integrity Charter
                    </Badge>
                  </div>

                  <p className="text-xs font-light leading-relaxed text-[#626760]">
                    SAMVAD maintains factual integrity across media and public
                    communications. No fabricated coverage, publication
                    records, or synthetic sources are presented as fact.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 self-end font-mono text-[10px] text-[#777970] lg:self-auto">
                <div className="flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-[#a67c45]" />
                  <span>PGP Key Verified</span>
                </div>

                <span>·</span>

                <div className="flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5 text-[#a67c45]" />
                  <span>Counsel Audited</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MEDIA ASSETS & PRESS RESOURCES BAR */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-6">
        <Container size="xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 font-mono text-xs text-[#626760]">
              <span className="text-[10px] uppercase tracking-widest text-[#a67c45]">
                Press Kit Resources:
              </span>

              <span className="text-[#777970]">
                Official Logos · Executive Biographies · Corporate Fact Sheet
                (2026)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/about#contact">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#c9c2b6] bg-[#f3f0e8] font-mono text-xs uppercase tracking-wider text-[#3f4847] hover:border-[#a67c45]/50 hover:bg-[#ebe7de]"
                >
                  <Download className="mr-2 h-3.5 w-3.5 text-[#a67c45]" />
                  <span>Download Media Kit</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. DISCLOSURES CATALOG & INTERACTIVE FILTER */}
      <section className="border-b border-[#d8d1c5] bg-[#f3f0e8] py-16 lg:py-24">
        <Container size="xl" className="space-y-12">
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
              01 · Institutional Disclosures
            </div>

            <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
              Verified Public Releases &amp; Briefings
            </h2>

            <p className="max-w-xl text-xs font-light text-[#626760] sm:text-sm">
              Filter by content type, reference, or archive year across
              authenticated institutional releases.
            </p>
          </div>

          <NewsroomSearchFilter
            items={items}
            typesWithCounts={typesWithCounts}
            years={years}
          />
        </Container>
      </section>

      {/* 5. MEDIA DESK CONTACT & PRESS INQUIRY PROTOCOL */}
      <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-16 lg:py-20">
        <Container size="xl">
          <div className="rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-8 shadow-sm sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Accredited Press Office Desk</span>
                </div>

                <h3 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Media Inquiries &amp; Interview Requests
                </h3>

                <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                  Journalists, regulatory correspondents, and financial
                  newsdesks may contact the press office directly. Verified
                  press inquiries receive expedited handling during market
                  hours.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-[#777970]">
                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Email Desk
                    </span>

                    <a
                      href="mailto:press@samvad.advisory"
                      className="text-[#a67c45] hover:text-[#8d683d]"
                    >
                      press@samvad.advisory
                    </a>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Direct Line
                    </span>

                    <span className="text-[#3f4847]">
                      +91 11 4982 5000
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Response SLA
                    </span>

                    <span className="text-[#3f4847]">
                      2-Hour Window (Accredited Press)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-center space-y-4 lg:col-span-4 lg:items-end">
                <Link href="/about#contact">
                  <MagneticButton>
                    <Button
                      variant="gold"
                      size="md"
                      className="px-8 py-3.5 font-mono text-xs uppercase tracking-widest"
                    >
                      <span>Submit Press Inquiry</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </MagneticButton>
                </Link>

                <span className="font-mono text-[10px] text-[#aaa398]">
                  PGP Key ID: 4E9A 82B1 0F3C 7890
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
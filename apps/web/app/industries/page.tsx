import * as React from "react";

import type { Metadata } from "next";

import Link from "next/link";

import {
  Container,
  Badge,
  Button,
  MagneticButton,
  SamvadImage,
} from "@samvad/ui";

import { PRIMARY_INDUSTRIES } from "@/lib/industries-data";

import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Landmark,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industries & Operating Sectors | SAMVAD Perception Advisory",
  description:
    "Sector-specific advisory frameworks across complex institutional environments.",
};

export default function IndustriesPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[55vh] flex-col justify-center overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[140px]" />

        <Container size="xl" className="relative z-10 space-y-6">
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

            <span className="text-[#a67c45]">Industries</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#ebe7de] px-3.5 py-1.5">
            <Landmark className="h-3.5 w-3.5 text-[#a67c45]" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d683d]">
              Operating Sectors
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
              Industries of
              <br />
              <span className="font-normal italic text-[#a67c45]">
                Consequence
              </span>
            </h1>

            <p className="font-serif text-lg font-light leading-relaxed text-[#626760] sm:text-xl">
              Sector-specific insight for high-stakes environments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/#contact">
              <MagneticButton
                variant="gold"
                size="md"
                className="px-6 py-3 font-mono text-xs uppercase tracking-wider"
              >
                <span>Request Sector Review</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </Container>
      </section>

      {/* 2. CMS GOVERNANCE & FACTUAL INTEGRITY NOTICE */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-6">
        <Container size="xl">
          <div className="flex items-start gap-3.5 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-5 text-xs shadow-sm">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#a67c45]" />

            <div className="space-y-1">
              <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[#a67c45]">
                Sector Disclosure
              </span>

              <p className="font-light leading-relaxed text-[#626760]">
                Sector frameworks are configurable. Client representation
                remains confidential and is not publicly disclosed without
                clearance.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. 8 CONFIGURED SECTORS GRID */}
      <section className="relative overflow-hidden bg-[#f3f0e8] py-24">
        <Container size="xl" className="space-y-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
                Sector Frameworks
              </div>

              <h2 className="font-serif text-3xl font-light text-[#1d2529]">
                Eight Operating Sectors
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#777970]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#66816d]" />
              <span>Configurable Data Model</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PRIMARY_INDUSTRIES.map((industry) => (
              <div
                key={industry.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de] shadow-sm transition-all duration-300 hover:border-[#a67c45]/40 hover:bg-[#e5dfd4]"
              >
                {/* Photo Preview */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[#d8d1c5] bg-[#f3f0e8]">
                  <SamvadImage
                    assetId={industry.imageAssetId}
                    aspectRatio="16:9"
                    zoomOnHover
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-xs border border-[#c9c2b6] bg-[#f3f0e8]/90 px-2 py-0.5 font-mono text-xs text-[#a67c45]">
                      {industry.code}
                    </span>

                    <Badge
                      variant="outline"
                      className="border-[#c9c2b6] bg-[#f3f0e8]/90 font-mono text-[8px] uppercase tracking-wider text-[#626760] backdrop-blur-md"
                    >
                      {industry.categoryGroup}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                      {industry.eyebrow}
                    </div>

                    <h3 className="font-serif text-xl font-normal text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                      {industry.title}
                    </h3>

                    <p className="text-xs font-light leading-relaxed text-[#626760]">
                      {industry.shortSummary}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-[#d8d1c5] pt-3">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#aaa398]">
                      Sector Challenge
                    </div>

                    <p className="line-clamp-2 text-xs font-light text-[#626760]">
                      {industry.challenges[0]?.title}
                    </p>
                  </div>
                </div>

                {/* Action Link */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="flex w-full items-center justify-between border-t border-[#d8d1c5] pt-3 font-mono text-xs text-[#a67c45] transition-colors hover:text-[#8d683d]"
                  >
                    <span>View Framework</span>

                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. ADVISORY CTA */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-24 text-center">
        <Container size="xl" className="mx-auto max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#f3f0e8] px-3.5 py-1.5">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d683d]">
              Bespoke Advisory
            </span>
          </div>

          <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
            Operating Beyond These Sectors?
          </h2>

          <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
            We adapt the same perception and crisis frameworks to emerging
            sectors and unique mandates.
          </p>

          <div className="pt-2">
            <Link href="/#contact">
              <Button
                variant="gold"
                size="lg"
                className="font-mono text-xs uppercase tracking-wider"
              >
                <span>Request Advisory Review</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 font-mono text-xs text-[#777970]">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>Zero Attribution</span>
            </div>

            <span className="text-[#c5beb2]">·</span>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#66816d]" />
              <span>Executive Clearance</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
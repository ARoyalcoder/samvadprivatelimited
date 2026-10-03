"use client";

import * as React from "react";

import Link from "next/link";

import {
  Container,
  MagneticButton,
  Button,
  SamvadImage,
} from "@samvad/ui";

import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Landmark,
} from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-[#f3f0e8] pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 right-10 h-[350px] w-[450px] rounded-full bg-[#a67c45]/5 blur-[120px]" />

      <Container
        size="xl"
        className="relative z-10 flex flex-1 flex-col justify-center"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Headline & Introduction */}
          <div className="space-y-8 lg:col-span-7">
            {/* Top Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#a67c45]/30 bg-[#ebe7de] px-3.5 py-1.5">
              <Landmark className="h-3.5 w-3.5 text-[#a67c45]" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8d683d]">
                SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED
              </span>
            </div>

            {/* Core Hero Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-5xl font-light leading-[1.04] tracking-tight text-[#1d2529] sm:text-6xl lg:text-7xl">
                WHO WE ARE
              </h1>

              <p className="font-serif text-xl font-normal italic text-[#a67c45] sm:text-2xl">
                Architects of sovereign perception and consequential dialogue.
              </p>
            </div>

            {/* Company Introduction */}
            <div className="max-w-2xl space-y-4 text-base font-light leading-relaxed text-[#3f4847] sm:text-lg">
              <p>
                SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED is a specialized
                strategic communications, crisis, and perception intelligence
                advisory practice.
              </p>

              <p className="text-sm text-[#626760] sm:text-base">
                We operate where reputation intersects with valuation,
                regulation, and institutional trust. We provide leadership with
                the intelligence and strategic counsel required to navigate
                complexity and govern narrative.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/#contact">
                <MagneticButton
                  variant="gold"
                  size="lg"
                  className="px-6 py-3.5 font-mono text-xs uppercase tracking-widest"
                >
                  <span>Engage Advisory</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </Link>

              <Link href="#philosophy">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#c9c2b6] bg-[#ebe7de] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#3f4847] hover:border-[#a67c45]/50 hover:bg-[#e5dfd4]"
                >
                  Our Philosophy
                </Button>
              </Link>
            </div>

            {/* Credential Notes */}
            <div className="flex items-center gap-4 pt-2 font-mono text-xs text-[#777970]">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
                <span>Zero Attribution Covenant</span>
              </div>

              <span className="text-[#c9c2b6]">·</span>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#66816d]" />
                <span>Private Limited Entity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Communication Visual */}
          <div className="relative lg:col-span-5">
            <div className="relative rounded-xs border border-[#c9c2b6] bg-[#ebe7de] p-3 shadow-xl">
              {/* Corner tick-marks */}
              <span className="pointer-events-none absolute -left-1 -top-1 select-none font-mono text-[10px] text-[#a67c45]/80">
                +
              </span>

              <span className="pointer-events-none absolute -right-1 -top-1 select-none font-mono text-[10px] text-[#a67c45]/80">
                +
              </span>

              <span className="pointer-events-none absolute -bottom-1 -left-1 select-none font-mono text-[10px] text-[#a67c45]/80">
                +
              </span>

              <span className="pointer-events-none absolute -bottom-1 -right-1 select-none font-mono text-[10px] text-[#a67c45]/80">
                +
              </span>

              <SamvadImage
                assetId="abstract-prism-refraction"
                aspectRatio="4:5"
                zoomOnHover
                className="rounded-xs"
                caption="Abstract perception caustics: Light refracted through optical crystal, representing narrative clarity emerging from informational chaos."
              />

              <div className="mt-3 flex items-center justify-between px-2 font-mono text-[10px] text-[#777970]">
                <span>Visual Asset: Abstract Communication</span>
                <span className="text-[#a67c45]">Refraction Dynamics</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
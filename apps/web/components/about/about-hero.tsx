"use client";

import * as React from "react";
import Link from "next/link";
import { Container, MagneticButton, Button, SamvadImage } from "@samvad/ui";
import { ArrowRight, ShieldCheck, Lock, Landmark } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold-500/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[350px] w-[450px] rounded-full bg-blue-500/5 blur-[120px]" />

      <Container size="xl" className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Introduction */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 backdrop-blur-md">
              <Landmark className="h-3.5 w-3.5 text-gold-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-300 font-semibold">
                SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED
              </span>
            </div>

            {/* Core Hero Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-sand-100 leading-[1.04]">
                WHO WE ARE
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-gold-300/90 font-normal italic">
                Architects of sovereign perception and high-consequence dialogue.
              </p>
            </div>

            {/* Company Introduction */}
            <div className="space-y-4 text-sand-300 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
              <p>
                SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED is a specialized strategic communications,
                crisis architecture, and perception intelligence advisory practice.
              </p>
              <p className="text-sand-400 text-sm sm:text-base">
                We operate where corporate reputation directly impacts balance-sheet valuation, regulatory liberty,
                and sovereign mandate. In an era where information spreads instantaneously and algorithms distort public
                discourse, we provide leadership with the predictive intelligence and strategic statecraft required
                to govern their own narrative.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/#contact">
                <MagneticButton
                  variant="gold"
                  size="lg"
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3.5"
                >
                  <span>Engage Advisory</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </Link>

              <Link href="#philosophy">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-900 px-6 py-3.5"
                >
                  Our Philosophy
                </Button>
              </Link>
            </div>

            {/* Credential Notes */}
            <div className="flex items-center gap-4 text-xs font-mono text-obsidian-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-gold-400" />
                <span>Zero Attribution Covenant</span>
              </div>
              <span className="text-obsidian-700">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Statutory Private Limited Entity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Communication Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xs border border-obsidian-750 bg-obsidian-900/60 p-3 shadow-2xl backdrop-blur-sm">
              {/* Corner tick-marks */}
              <span className="pointer-events-none absolute -left-1 -top-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
              <span className="pointer-events-none absolute -right-1 -top-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
              <span className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
              <span className="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>

              <SamvadImage
                assetId="abstract-prism-refraction"
                aspectRatio="4:5"
                zoomOnHover
                className="rounded-xs"
                caption="Abstract perception caustics: Light refracted through optical crystal, representing narrative clarity emerging from informational chaos."
              />

              <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono text-obsidian-400">
                <span>Visual Asset: Abstract Communication</span>
                <span className="text-gold-400/80">Refraction Dynamics</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

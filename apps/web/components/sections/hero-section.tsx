"use client";

import * as React from "react";
import Link from "next/link";
import {
  Container,
  MagneticButton,
  Button,
  AnimatedCounter,
  DialogueNetwork,
  SamvadImage,
} from "@samvad/ui";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Ambient background gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[400px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] blur-[100px]" />

      <Container size="xl" className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
                Strategic Communications &amp; Perception Advisory
              </span>
            </div>

            {/* Core Hero Concept */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light tracking-tight text-sand-100 leading-[1.04]">
                <span className="block font-normal text-sand-100">SHAPE PERCEPTION.</span>
                <span className="block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent font-medium italic">
                  BUILD INFLUENCE.
                </span>
                <span className="block font-light text-sand-200">CREATE IMPACT.</span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="max-w-2xl font-serif text-base sm:text-lg text-sand-300 leading-relaxed font-light">
              Strategic communications and perception advisory for organizations that want their voice to matter.
              We insulate enterprise valuation, navigate crisis friction, and guide institutional statecraft
              across sovereign corridors.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="#contact">
                <MagneticButton
                  variant="gold"
                  size="lg"
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3.5 shadow-elevation-2"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </Link>

              <Link href="#case-studies">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-900 px-6 py-3.5"
                >
                  Explore Our Work
                </Button>
              </Link>
            </div>

            {/* Trust Assurance Pill */}
            <div className="flex items-center gap-4 text-xs font-mono text-obsidian-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-gold-400" />
                <span>NDA Protected</span>
              </div>
              <span className="text-obsidian-700">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Sovereign Grade Discretion</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Interconnected Perception Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px] lg:max-w-none rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-2 shadow-2xl backdrop-blur-xl overflow-hidden group">
              {/* Layer 1: Curated Editorial AI Image backdrop (Refracted Perception Prism) */}
              <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen scale-105 transition-transform duration-1000 ease-out group-hover:scale-100">
                <SamvadImage
                  assetId="abstract-prism-refraction"
                  aspectRatio="1:1"
                  editorialOverlay="gradient"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Layer 2: Interactive Dialogue & Node Network */}
              <div className="absolute inset-0 z-10 pointer-events-auto">
                <DialogueNetwork
                  density="medium"
                  interactive={true}
                  showLabels={true}
                  fadeEdges={true}
                  className="h-full w-full opacity-80"
                />
              </div>

              {/* Layer 3: Central Convergence Watermark Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-lg border border-obsidian-800/90 bg-obsidian-950/85 px-4 py-2.5 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sand-200">
                    Interconnected Perception Matrix
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400">
                  Global Node Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Metrics Counter Ribbon */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-obsidian-800/80 pt-10">
          <div className="rounded-sm border border-obsidian-850/90 bg-obsidian-900/40 p-5">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-light text-sand-100">$</span>
              <AnimatedCounter value={40} duration={1.8} className="text-3xl sm:text-4xl text-sand-100" />
              <span className="font-serif text-3xl sm:text-4xl font-light text-gold-400">B+</span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-sand-400">
              Transaction Value Preserved
            </p>
          </div>

          <div className="rounded-sm border border-obsidian-850/90 bg-obsidian-900/40 p-5">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-light text-gold-400">&lt;</span>
              <AnimatedCounter value={15} duration={1.2} className="text-3xl sm:text-4xl text-gold-400" />
              <span className="font-serif text-xl sm:text-2xl font-light text-gold-400 ml-1">Min</span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-sand-400">
              Rapid Crisis Mobilization
            </p>
          </div>

          <div className="rounded-sm border border-obsidian-850/90 bg-obsidian-900/40 p-5">
            <div className="flex items-baseline gap-1">
              <AnimatedCounter value={100} duration={1.5} className="text-3xl sm:text-4xl text-sand-100" />
              <span className="font-serif text-3xl sm:text-4xl font-light text-gold-400">%</span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-sand-400">
              Zero Information Leakage
            </p>
          </div>

          <div className="rounded-sm border border-obsidian-850/90 bg-obsidian-900/40 p-5">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-light text-sand-100">24/7</span>
              <span className="font-serif text-xl sm:text-2xl font-light text-gold-400 ml-1">Live</span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-sand-400">
              Cross-Border Advisory Desk
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

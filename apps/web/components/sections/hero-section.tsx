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

import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center overflow-hidden bg-[#f3f0e8] pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-[#a67c45]/[0.035] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[400px] w-[500px] rounded-full bg-[#6d756f]/[0.035] blur-[100px]" />

      <Container
        size="xl"
        className="relative z-10 flex-1 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c9c3b8] bg-[#ebe7de] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45] animate-pulse" />

              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8f683c] font-semibold">
                Strategic Communications & Perception Advisory
              </span>
            </div>

            {/* Core Hero Concept */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light tracking-tight text-[#1d2529] leading-[1.04]">
                <span className="block font-normal text-[#1d2529]">
                  SHAPE PERCEPTION.
                </span>

                <span className="block text-[#9a703f] font-medium italic">
                  BUILD INFLUENCE.
                </span>

                <span className="block font-light text-[#39444a]">
                  CREATE IMPACT.
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="max-w-2xl font-serif text-base sm:text-lg text-[#5e686e] leading-relaxed font-light">
              Strategic communications and perception advisory for
              organizations operating where reputation, regulation, and
              institutional trust matter.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="#contact">
                <MagneticButton
                  variant="gold"
                  size="lg"
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3.5 shadow-[0_10px_30px_rgba(29,37,41,0.08)]"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </Link>

              <Link href="#case-studies">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-mono text-xs uppercase tracking-wider border-[#c9c3b8] text-[#39444a] hover:border-[#a67c45]/60 hover:bg-[#ebe7de] px-6 py-3.5"
                >
                  Explore Our Work
                </Button>
              </Link>
            </div>

            {/* Trust Assurance Pill */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#899197] pt-2">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
                <span>NDA Protected</span>
              </div>

              <span className="text-[#c9c3b8]">·</span>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#6d876e]" />
                <span>Sovereign Grade Discretion</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Interconnected Perception Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px] lg:max-w-none rounded-sm border border-[#d0c9bd] bg-[#ebe7de] p-2 shadow-[0_18px_60px_rgba(29,37,41,0.08)] overflow-hidden group">
              {/* Layer 1: Curated Editorial Image */}
              <div className="absolute inset-0 z-0 opacity-35 scale-105 transition-transform duration-1000 ease-out group-hover:scale-100">
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
                  className="h-full w-full opacity-70"
                />
              </div>

              {/* Layer 3: Central Convergence Watermark Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-sm border border-[#c9c3b8]/90 bg-[#f3f0e8]/90 px-4 py-2.5 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#a67c45] animate-pulse" />

                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#39444a]">
                    Interconnected Perception Matrix
                  </span>
                </div>

                <span className="font-mono text-[9px] uppercase tracking-widest text-[#9a703f]">
                  Global Node Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Metrics Counter Ribbon */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-[#d0c9bd] pt-10">
          <div className="rounded-sm border border-[#d0c9bd] bg-[#ebe7de]/70 p-5">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-light text-[#1d2529]">
                $
              </span>

              <AnimatedCounter
                value={40}
                duration={1.8}
                className="text-3xl sm:text-4xl text-[#1d2529]"
              />

              <span className="font-serif text-3xl sm:text-4xl font-light text-[#a67c45]">
                B+
              </span>
            </div>

            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#667078]">
              Transaction Value Preserved
            </p>
          </div>

          <div className="rounded-sm border border-[#d0c9bd] bg-[#ebe7de]/70 p-5">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-light text-[#a67c45]">
                &lt;
              </span>

              <AnimatedCounter
                value={15}
                duration={1.2}
                className="text-3xl sm:text-4xl text-[#a67c45]"
              />

              <span className="font-serif text-xl sm:text-2xl font-light text-[#a67c45] ml-1">
                Min
              </span>
            </div>

            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#667078]">
              Rapid Crisis Mobilization
            </p>
          </div>

          <div className="rounded-sm border border-[#d0c9bd] bg-[#ebe7de]/70 p-5">
            <div className="flex items-baseline gap-1">
              <AnimatedCounter
                value={100}
                duration={1.5}
                className="text-3xl sm:text-4xl text-[#1d2529]"
              />

              <span className="font-serif text-3xl sm:text-4xl font-light text-[#a67c45]">
                %
              </span>
            </div>

            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#667078]">
              Zero Information Leakage
            </p>
          </div>

          <div className="rounded-sm border border-[#d0c9bd] bg-[#ebe7de]/70 p-5">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-light text-[#1d2529]">
                24/7
              </span>

              <span className="font-serif text-xl sm:text-2xl font-light text-[#a67c45] ml-1">
                Live
              </span>
            </div>

            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#667078]">
              Cross-Border Advisory Desk
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
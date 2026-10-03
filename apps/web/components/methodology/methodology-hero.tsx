"use client";

import * as React from "react";

import Link from "next/link";

import { Container, MagneticButton, Button } from "@samvad/ui";

import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Lock,
} from "lucide-react";

export function MethodologyHero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden border-b border-[#d8d1c5] bg-[#f3f0e8] pb-16 pt-32 lg:pb-20 lg:pt-40">
      {/* Background ambient tone */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[700px] -translate-y-1/2 rounded-full bg-[#a67c45]/5 blur-[150px]" />

      <Container size="xl" className="relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#a67c45]/10 px-3.5 py-1.5">
          <Compass className="h-3.5 w-3.5 text-[#a67c45]" />

          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d6737]">
            The Doctrine of Perception Physics
          </span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
            A Six-Stage Discipline of <br />
            <span className="font-normal italic text-[#a67c45]">
              Narrative Dominance &amp; Authority
            </span>
          </h1>

          <p className="font-serif text-lg font-light leading-relaxed text-[#566066] sm:text-xl">
            We replace instinct with a structured protocol: from horizon
            listening and forensic analysis to strategic engagement and
            long-term measurement.
          </p>
        </div>

        {/* 6 Stage Trackers Pill */}
        <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-xs text-[#566066]">
          {[
            "01 LISTEN",
            "02 ANALYZE",
            "03 STRATEGIZE",
            "04 ENGAGE",
            "05 AMPLIFY",
            "06 MEASURE",
          ].map((stage, i) => (
            <span
              key={i}
              className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] px-3 py-1 text-[11px] text-[#a67c45]"
            >
              {stage}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="/#contact">
            <MagneticButton
              variant="gold"
              size="md"
              className="px-6 py-3.5 font-mono text-xs uppercase tracking-wider"
            >
              <span>Consult On Methodology</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </Link>

          <Link href="/services">
            <Button
              variant="outline"
              size="md"
              className="border-[#c9c2b7] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#566066] hover:border-[#a67c45]/50 hover:bg-[#ebe7de]"
            >
              Explore Practices
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 border-t border-[#d8d1c5] pt-4 font-mono text-xs text-[#8a918f]">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
            <span>Operational Rigor</span>
          </div>

          <span className="text-[#b7afa2]">·</span>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
            <span>Evidentiary Verification</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
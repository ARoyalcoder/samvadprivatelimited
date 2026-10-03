"use client";

import * as React from "react";

import Link from "next/link";

import { Container, MagneticButton, Button } from "@samvad/ui";

import { ArrowRight, Lock, ShieldCheck, Clock } from "lucide-react";

export function MethodologyCta() {
  return (
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-24 text-center">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-[#a67c45]/8 blur-[160px]" />

      <Container
        size="xl"
        className="space-y-8 max-w-3xl mx-auto relative z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/35 bg-[#f3f0e8] px-3.5 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8a6437] font-semibold">
            Institutional Advisory Intake
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1d2529] leading-tight">
            Apply the Protocol to Your <br />
            <span className="font-normal italic text-[#a67c45]">
              Institutional Exposure
            </span>
          </h2>

          <p className="text-[#626a6d] text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            Engage our senior partners for a preliminary Stage 01 Horizon
            Audit across your enterprise, transaction, or regulatory exposure.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link href="/#contact">
            <MagneticButton
              variant="gold"
              size="lg"
              className="font-mono text-xs uppercase tracking-wider px-8 py-4 shadow-elevation-2"
            >
              <span>Initiate Stage 01 Assessment</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </Link>

          <Link href="/services">
            <Button
              variant="outline"
              size="lg"
              className="font-mono text-xs uppercase tracking-wider border-[#bdb5a8] text-[#394247] hover:border-[#a67c45]/60 hover:bg-[#f3f0e8] px-6 py-4"
            >
              Review Advisory Practices
            </Button>
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#7a807f]">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
            <span>Strict NDA Protocol</span>
          </div>

          <span className="text-[#b8b0a4]">·</span>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
            <span>Direct Managing Principal Handling</span>
          </div>

          <span className="text-[#b8b0a4]">·</span>

          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#a67c45]" />
            <span>Rapid Mobilization Available</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
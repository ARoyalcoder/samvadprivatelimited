"use client";

import * as React from "react";

import Link from "next/link";

import { Container, MagneticButton, Button } from "@samvad/ui";

import {
  ArrowRight,
  Lock,
  ShieldCheck,
  Mail,
} from "lucide-react";

export function AboutCta() {
  return (
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[160px]" />

      <Container size="xl" className="relative z-10 space-y-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#f3f0e8] px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a67c45]" />

          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d683d]">
            Confidential Consultation
          </span>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="font-serif text-4xl font-light leading-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
            Perception Shapes Outcomes. <br />
            <span className="font-normal italic text-[#a67c45]">
              Protect Your Mandate.
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-[#626760] sm:text-base">
            From transformative transactions to regulatory scrutiny and
            institutional reputation, engage our senior partners in complete
            discretion.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/#contact">
            <MagneticButton
              variant="gold"
              size="lg"
              className="px-8 py-4 font-mono text-xs uppercase tracking-widest shadow-sm"
            >
              <span>Begin a Confidential Dialogue</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </Link>

          <Link href="/#services">
            <Button
              variant="outline"
              size="lg"
              className="border-[#c9c2b6] bg-[#f3f0e8] px-6 py-4 font-mono text-xs uppercase tracking-wider text-[#3f4847] hover:border-[#a67c45]/50 hover:bg-[#e5dfd4]"
            >
              View Advisory Practices
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 font-mono text-xs text-[#777970]">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
            <span>Strict NDA Protocol</span>
          </div>

          <span className="text-[#c9c2b6]">·</span>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#66816d]" />
            <span>Direct Partner Handling</span>
          </div>

          <span className="text-[#c9c2b6]">·</span>

          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-[#777970]" />
            <span>advisory@samvadadvisory.com</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
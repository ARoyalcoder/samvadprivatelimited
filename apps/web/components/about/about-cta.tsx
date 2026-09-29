"use client";

import * as React from "react";
import Link from "next/link";
import { Container, MagneticButton, Button } from "@samvad/ui";
import { ArrowRight, Lock, ShieldCheck, Mail } from "lucide-react";

export function AboutCta() {
  return (
    <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-gold-500/5 blur-[160px]" />

      <Container size="xl" className="relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
            Confidential Consultation
          </span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-sand-100 leading-tight">
            Perception Dictates Reality. <br />
            <span className="font-normal italic text-gold-300">
              Let Us Protect Your Mandate.
            </span>
          </h2>
          <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Whether preparing for a transformative capital transaction, navigating hostile regulatory scrutiny,
            or building an enduring sovereign reputational moat, engage our senior partners in complete discretion.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/#contact">
            <MagneticButton
              variant="gold"
              size="lg"
              className="font-mono text-xs uppercase tracking-widest px-8 py-4 shadow-elevation-2"
            >
              <span>Begin a Confidential Dialogue</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </Link>

          <Link href="/#services">
            <Button
              variant="outline"
              size="lg"
              className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-900 px-6 py-4"
            >
              View Advisory Practices
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-obsidian-400">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-gold-400" />
            <span>Strict NDA Protocol</span>
          </div>
          <span className="text-obsidian-700">·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Direct Partner Handling</span>
          </div>
          <span className="text-obsidian-700">·</span>
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-sand-400" />
            <span>advisory@samvadadvisory.com</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

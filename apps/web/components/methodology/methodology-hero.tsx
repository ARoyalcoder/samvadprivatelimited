"use client";

import * as React from "react";
import Link from "next/link";
import { Container, MagneticButton, Button } from "@samvad/ui";
import { ArrowRight, Compass, ShieldCheck, Lock } from "lucide-react";

export function MethodologyHero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-obsidian-800">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gold-500/5 blur-[150px]" />

      <Container size="xl" className="relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 backdrop-blur-md">
          <Compass className="h-3.5 w-3.5 text-gold-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
            The Doctrine of Perception Physics
          </span>
        </div>

        <div className="space-y-4 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
            A Six-Stage Discipline of <br />
            <span className="font-normal italic text-gold-300">
              Narrative Dominance &amp; Authority
            </span>
          </h1>

          <p className="font-serif text-lg sm:text-xl text-sand-300 font-light leading-relaxed">
            We replace instinct with a battle-tested protocol: from passive horizon listening and
            forensic root-cause analysis to bilateral diplomatic engagement and permanent moat measurement.
          </p>
        </div>

        {/* 6 Stage Trackers Pill */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-sand-300 pt-2">
          {["01 LISTEN", "02 ANALYZE", "03 STRATEGIZE", "04 ENGAGE", "05 AMPLIFY", "06 MEASURE"].map(
            (stage, i) => (
              <span
                key={i}
                className="rounded-xs border border-obsidian-750 bg-obsidian-900/60 px-3 py-1 text-[11px] text-gold-400"
              >
                {stage}
              </span>
            )
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="/#contact">
            <MagneticButton
              variant="gold"
              size="md"
              className="font-mono text-xs uppercase tracking-wider px-6 py-3.5"
            >
              <span>Consult On Methodology</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </Link>

          <Link href="/services">
            <Button
              variant="outline"
              size="md"
              className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-900 px-6 py-3.5"
            >
              Explore Practices
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-obsidian-400 pt-4 border-t border-obsidian-850">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-gold-400" />
            <span>Operational Rigor</span>
          </div>
          <span className="text-obsidian-700">·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Evidentiary Verification</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

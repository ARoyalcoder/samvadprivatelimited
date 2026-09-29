"use client";

import * as React from "react";
import Link from "next/link";
import {
  Container,
  AcousticWaveform,
  BrandLockup,
} from "@samvad/ui";
import { Shield, Compass, Scale, ArrowRight } from "lucide-react";

export function BrandIntroSection() {
  const tenets = [
    {
      code: "I",
      title: "Discourse Asymmetry",
      description:
        "Truth unshaped is vulnerable to hostile projection. In asymmetric conflicts, perception dictates legal, regulatory, and market reality before facts assemble.",
      icon: Scale,
    },
    {
      code: "II",
      title: "Institutional Gravitas",
      description:
        "Enduring influence is never manufactured through transient hype. We construct permanent institutional authority rooted in verified operational competence.",
      icon: Compass,
    },
    {
      code: "III",
      title: "Sovereign Discretion",
      description:
        "The most consequential perception campaigns are those the public never attributes. Absolute discretion and zero-attribution stewardship are our cardinal covenants.",
      icon: Shield,
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32"
    >
      {/* Subtle background ambient grain & glow */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-sand-200/5 blur-[140px]" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              The Doctrine of Samvāda
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-[1.12]">
              Dialogue is not the aftermath of crisis. <br />
              <span className="italic font-normal text-gold-300">
                It is the architecture of sovereignty.
              </span>
            </h2>

            <div className="pt-2">
              <AcousticWaveform bars={20} height={28} tone="gold" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sand-300 font-light text-base sm:text-lg leading-relaxed">
            <p>
              Derived from the ancient Sanskrit <span className="text-sand-100 font-normal italic">Samvāda</span>—a
              discipline of elevated, purposeful discourse and mutual resonance—SAMVAD was chartered to
              demolish the antiquated paradigm of reactive corporate PR.
            </p>
            <p className="text-sand-400 text-sm sm:text-base">
              In a hyper-connected geopolitical arena where perception precedes balance-sheet solvency,
              enterprises and sovereign bodies cannot rely on standard press statements. We architect
              the underlying narrative physics: shaping how key decision-makers, regulators, judiciary,
              and capital markets interpret your institutional posture.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="#services"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors"
              >
                <span>Discover Our Advisory Doctrine</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Guiding Philosophical Tenets */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {tenets.map((tenet) => {
            const Icon = tenet.icon;
            return (
              <div
                key={tenet.code}
                className="group relative rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-8 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900"
              >
                {/* Hairline top accent */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-6">
                  <div className="font-mono text-xs text-gold-400/80 tracking-widest">
                    TENET {tenet.code}
                  </div>
                  <div className="h-8 w-8 rounded-full border border-obsidian-750 bg-obsidian-850 flex items-center justify-center text-sand-300 group-hover:text-gold-300 group-hover:border-gold-500/30 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-normal text-sand-100 mb-3 group-hover:text-gold-200 transition-colors">
                  {tenet.title}
                </h3>

                <p className="text-xs leading-relaxed text-sand-400 font-light">
                  {tenet.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Senior Partner Perspective Banner */}
        <div className="mt-16 rounded-xs border border-obsidian-800 bg-gradient-to-r from-obsidian-900 via-obsidian-900/90 to-obsidian-950 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-sand-200 italic font-light leading-relaxed">
                &ldquo;When organizations encounter existential friction, victory is not won by shouting louder.
                It is won by anchoring the discourse so deeply that every subsequent debate occurs on your terms.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-2">
                <span className="h-px w-8 bg-gold-400/60" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400 font-medium">
                  Senior Managing Counsel
                </span>
                <span className="text-obsidian-500 text-xs">·</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-sand-400">
                  Perception Strategy Practice
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <BrandLockup layout="stacked" size="md" markTone="gold" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

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
        "Truth unshaped is vulnerable to hostile projection. Perception can shape legal, regulatory, and market reality before facts fully assemble.",
      icon: Scale,
    },
    {
      code: "II",
      title: "Institutional Gravitas",
      description:
        "Enduring influence is not built through transient hype. We construct institutional authority rooted in verified operational competence.",
      icon: Compass,
    },
    {
      code: "III",
      title: "Sovereign Discretion",
      description:
        "The most consequential perception work is often the least visible. Absolute discretion and zero-attribution stewardship remain central.",
      icon: Shield,
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Subtle background ambient tone */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#a67c45]/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#1d2529]/[0.025] blur-[140px]" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              The Doctrine of Samvāda
            </div>

            <h2 className="font-serif text-3xl font-light leading-[1.12] text-[#1d2529] sm:text-4xl lg:text-5xl">
              Dialogue is not the aftermath of crisis. <br />
              <span className="font-normal italic text-[#a67c45]">
                It is the architecture of sovereignty.
              </span>
            </h2>

            <div className="pt-2">
              <AcousticWaveform bars={20} height={28} tone="gold" />
            </div>
          </div>

          <div className="space-y-6 font-light text-base leading-relaxed text-[#566066] sm:text-lg lg:col-span-7">
            <p>
              Derived from the ancient Sanskrit{" "}
              <span className="font-normal italic text-[#1d2529]">
                Samvāda
              </span>
              —a discipline of purposeful discourse and mutual resonance—SAMVAD
              was created to move beyond reactive corporate PR.
            </p>

            <p className="text-sm text-[#727a7d] sm:text-base">
              In environments where perception can precede institutional
              response, organizations need more than standard press statements.
              We shape the narrative environment around decision-makers,
              regulators, judiciary, and capital markets.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <Link
                href="#services"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#a67c45] transition-colors hover:text-[#805d32]"
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
                className="group relative rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/75 p-8 transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e7e2d8]"
              >
                {/* Hairline top accent */}
                <div className="absolute left-6 right-6 top-0 h-px bg-[#a67c45]/35 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-6 flex items-center justify-between">
                  <div className="font-mono text-xs tracking-widest text-[#a67c45]">
                    TENET {tenet.code}
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9c2b7] bg-[#f3f0e8] text-[#566066] transition-colors group-hover:border-[#a67c45]/40 group-hover:text-[#a67c45]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="mb-3 font-serif text-xl font-normal text-[#1d2529] transition-colors group-hover:text-[#8d6737]">
                  {tenet.title}
                </h3>

                <p className="text-xs font-light leading-relaxed text-[#727a7d]">
                  {tenet.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Senior Partner Perspective Banner */}
        <div className="mt-16 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 sm:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <blockquote className="font-serif text-lg font-light italic leading-relaxed text-[#384247] sm:text-xl md:text-2xl">
                &ldquo;When organizations encounter existential friction,
                victory is not won by shouting louder. It is won by anchoring
                the discourse so deeply that every subsequent debate occurs on
                your terms.&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-2">
                <span className="h-px w-8 bg-[#a67c45]/60" />

                <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#a67c45]">
                  Senior Managing Counsel
                </span>

                <span className="text-[#9a9388] text-xs">·</span>

                <span className="font-mono text-[11px] uppercase tracking-wider text-[#727a7d]">
                  Perception Strategy Practice
                </span>
              </div>
            </div>

            <div className="flex justify-start lg:col-span-4 lg:justify-end">
              <BrandLockup
                layout="stacked"
                size="md"
                markTone="gold"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
"use client";

import * as React from "react";

import {
  Container,
  AcousticWaveform,
  BrandLockup,
} from "@samvad/ui";

import {
  MessageSquare,
  Sparkles,
  Scale,
  Shield,
} from "lucide-react";

export function AboutPhilosophy() {
  const dimensions = [
    {
      icon: MessageSquare,
      title: "No Exchange is Neutral",
      description:
        "Every briefing, filing, meeting, and public signal shapes perception. We ensure each reinforces the institutional thesis.",
    },
    {
      icon: Scale,
      title: "Convergence over Coercion",
      description:
        "Samvāda means reciprocal discourse. We align operational truth with clear, credible, and strategic narrative.",
    },
    {
      icon: Shield,
      title: "The Preemptive Shield",
      description:
        "Crises begin in early conversations. We detect narrative risk before it becomes public escalation.",
    },
  ];

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-24 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#a67c45]/5 blur-[140px]" />

      <Container
        size="xl"
        className="relative z-10 space-y-16"
      >
        {/* Section Header */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <Sparkles className="h-3 w-3 text-[#a67c45]" />
              Core Doctrine
            </div>

            <h2 className="font-serif text-3xl font-light leading-[1.14] text-[#1d2529] sm:text-4xl lg:text-5xl">
              Our Philosophy:
              <br />
              <span className="font-normal italic text-[#a67c45]">
                &ldquo;Perception is shaped by every conversation.&rdquo;
              </span>
            </h2>

            <div className="pt-2">
              <AcousticWaveform
                bars={28}
                height={32}
                tone="gold"
              />
            </div>
          </div>

          <div className="space-y-5 font-light leading-relaxed text-[#626760] lg:col-span-6">
            <p className="text-base sm:text-lg">
              Communication is not a broadcast. It is a dialogue
              through which institutions shape and negotiate meaning.
            </p>

            <p className="text-sm sm:text-base">
              Stakeholders form perception across boardrooms, regulators,
              media, and private conversations. We help institutions
              steward those conversations with clarity and authority.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3">
          {dimensions.map((dim, idx) => {
            const Icon = dim.icon;

            return (
              <div
                key={idx}
                className="group relative rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-8 shadow-sm transition-all duration-300 hover:border-[#a67c45]/40 hover:bg-[#eee9df]"
              >
                <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xs border border-[#c9c2b6] bg-[#ebe7de] text-[#a67c45] transition-colors group-hover:border-[#a67c45]/40 group-hover:bg-[#a67c45]/10">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mb-3 font-serif text-xl font-normal text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                  {dim.title}
                </h3>

                <p className="text-xs font-light leading-relaxed text-[#626760]">
                  {dim.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Institutional Monogram Citation */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-8 shadow-sm sm:flex-row">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
              The Doctrine of Samvāda
            </div>

            <p className="text-xs font-light text-[#626760]">
              Precision, dialogue, and institutional statecraft.
            </p>
          </div>

          <BrandLockup
            layout="horizontal"
            size="sm"
            markTone="gold"
          />
        </div>
      </Container>
    </section>
  );
}
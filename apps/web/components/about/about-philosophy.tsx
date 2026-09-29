"use client";

import * as React from "react";
import { Container, AcousticWaveform, BrandLockup } from "@samvad/ui";
import { MessageSquare, Sparkles, Scale, Shield } from "lucide-react";

export function AboutPhilosophy() {
  const dimensions = [
    {
      icon: MessageSquare,
      title: "No Exchange is Neutral",
      description:
        "Every press briefing, investor remark, judicial filing, and private ministerial meeting leaves a permanent sediment of perception. We ensure every signal reinforces your sovereign thesis.",
    },
    {
      icon: Scale,
      title: "Convergence over Coercion",
      description:
        "Rooted in the Sanskrit Samvāda—meaning reciprocal, constructive discourse—true perception shaping is not deceitful propaganda. It is the alignment of authentic operational truth with strategic narrative clarity.",
    },
    {
      icon: Shield,
      title: "The Preemptive Shield",
      description:
        "Crises do not erupt from nowhere; they are born in whispered conversations months prior. By understanding the acoustics of perception, we defuse narrative hazards long before they become headlines.",
    },
  ];

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-gold-500/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <Sparkles className="h-3 w-3 text-gold-400" />
              Core Doctrinal Premise
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-[1.14]">
              Our Philosophy: <br />
              <span className="font-normal italic text-gold-300">
                &ldquo;Perception is shaped by every conversation.&rdquo;
              </span>
            </h2>

            <div className="pt-2">
              <AcousticWaveform bars={28} height={32} tone="gold" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-sand-300 font-light text-base sm:text-lg leading-relaxed">
            <p>
              In traditional public relations, communication is treated as a unilateral broadcast—a
              press release dispatched into the void. At SAMVAD, we understand that perception is
              fundamentally conversational and dialogic.
            </p>
            <p className="text-sand-400 text-sm sm:text-base">
              Stakeholders do not passively absorb marketing messages. They actively negotiate meaning
              in boardrooms, legislative committees, regulatory hearings, and back-channel discussions.
              When an organization fails to steward these conversations, adversarial actors step in to define
              the terms. We ensure your institutional voice resonates with undeniable moral and strategic authority.
            </p>
          </div>
        </div>

        {/* 3 Pillars of the Conversational Doctrine */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {dimensions.map((dim, idx) => {
            const Icon = dim.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-8 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900 shadow-elevation-1"
              >
                <div className="h-9 w-9 rounded-xs border border-obsidian-750 bg-obsidian-950 flex items-center justify-center text-gold-400 mb-6 group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="font-serif text-xl font-normal text-sand-100 mb-3 group-hover:text-gold-200 transition-colors">
                  {dim.title}
                </h3>

                <p className="text-xs leading-relaxed text-sand-400 font-light">
                  {dim.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Institutional Monogram Citation */}
        <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
              The Doctrine of Samvāda
            </div>
            <p className="text-xs text-sand-300 font-light">
              Dialectical precision, bilateral empathy, and sovereign narrative statecraft.
            </p>
          </div>
          <BrandLockup layout="horizontal" size="sm" markTone="gold" />
        </div>
      </Container>
    </section>
  );
}

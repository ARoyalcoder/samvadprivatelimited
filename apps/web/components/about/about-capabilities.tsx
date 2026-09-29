"use client";

import * as React from "react";
import Link from "next/link";
import { Container, Button } from "@samvad/ui";
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  ShieldAlert,
  Compass,
  Landmark,
  Shield,
  Sparkles,
} from "lucide-react";

export function AboutCapabilities() {
  const capabilities = [
    {
      icon: Cpu,
      title: "Perception Intelligence & Sentiment Topology",
      challenge: "Adversarial disinformation emerging unseen in opaque digital corridors.",
      intervention: "Continuous algorithmic graph listening, early signal detection, and threat topology mapping 60–90 days ahead.",
      outcome: "Hazards neutralized before public escalation or regulatory trigger.",
    },
    {
      icon: ShieldAlert,
      title: "Crisis Architecture & Litigation Defense",
      challenge: "Active regulatory investigation, sudden media assault, or activist short raid.",
      intervention: "Emergency war room deployment within 15 minutes, counter-briefing packages, and judicial narrative shielding.",
      outcome: "Valuation defended, narrative anchored, zero information leakage.",
    },
    {
      icon: Compass,
      title: "Strategic Communications & Capital Markets",
      challenge: "Multi-billion dollar transaction, IPO roadshow, or cross-border merger scrutiny.",
      intervention: "Institutional valuation framing, shareholder sentiment insulation, and multilateral regulatory narrative accord.",
      outcome: "Deal premium defended and regulatory clearance accelerated.",
    },
    {
      icon: Landmark,
      title: "Public Affairs & Sovereign Statecraft",
      challenge: "Policy impasse, hostile parliamentary committee, or national security scrutiny.",
      intervention: "Direct bilateral ministerial briefing dossiers, bipartisan alignment, and national interest capability frameworks.",
      outcome: "Regulatory green-light and enduring sovereign credibility.",
    },
    {
      icon: Shield,
      title: "Executive Positioning & Legacy Stewardship",
      challenge: "High-exposure leadership transition or targeted activist executive attack.",
      intervention: "Executive doctrine formulation, peer-level editorial alignment, and confidential reputational moats.",
      outcome: "Leadership mandate preserved with permanent institutional stature.",
    },
    {
      icon: Sparkles,
      title: "Digital Sovereignty & Algorithm Defense",
      challenge: "Weaponized LLM summaries, algorithmic search distortion, or botnet smear campaigns.",
      intervention: "Knowledge graph remediation, high-authority evidentiary indexing, and automated misinformation suppression.",
      outcome: "Digital corpus sanitized and permanent information integrity restored.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[150px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <Layers className="h-3 w-3 text-gold-400" />
              Practice Capabilities
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Operational Depth: <br />
              <span className="font-normal italic text-gold-300">
                Solving Existential Institutional Challenges
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              Our multidisciplinary practices merge quantitative analytics with senior diplomatic
              statecraft to resolve high-friction conflicts.
            </p>
          </div>

          <Link href="/#services">
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-850"
            >
              <span>Explore Homepage Practices</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* 6 Capabilities Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-xs border border-obsidian-800 bg-obsidian-950 p-8 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900/90 shadow-elevation-1"
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xs border border-obsidian-750 bg-obsidian-900 flex items-center justify-center text-gold-400 group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-serif text-xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                    {cap.title}
                  </h3>

                  <div className="space-y-3 pt-2 text-xs font-light">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400 block mb-1">
                        The Friction
                      </span>
                      <p className="text-sand-400">{cap.challenge}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-gold-400 block mb-1">
                        SAMVAD Intervention
                      </span>
                      <p className="text-sand-300">{cap.intervention}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-obsidian-850 flex items-center gap-2 text-xs text-sand-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px] text-emerald-400">{cap.outcome}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

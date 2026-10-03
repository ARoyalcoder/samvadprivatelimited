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
      challenge: "Adversarial narratives emerging across opaque digital corridors.",
      intervention:
        "Continuous graph listening, early-signal detection, and perception risk mapping.",
      outcome:
        "Emerging hazards identified before public escalation.",
    },
    {
      icon: ShieldAlert,
      title: "Crisis Architecture & Litigation Defense",
      challenge:
        "Regulatory investigations, media attacks, or activist pressure.",
      intervention:
        "Rapid war-room deployment, counter-briefing packages, and litigation communications.",
      outcome:
        "Valuation protected, narrative anchored, information controlled.",
    },
    {
      icon: Compass,
      title: "Strategic Communications & Capital Markets",
      challenge:
        "Major transactions, IPOs, or cross-border merger scrutiny.",
      intervention:
        "Institutional valuation framing, shareholder communications, and regulatory narrative strategy.",
      outcome:
        "Transaction narrative strengthened and regulatory engagement supported.",
    },
    {
      icon: Landmark,
      title: "Public Affairs & Sovereign Statecraft",
      challenge:
        "Policy impasse, parliamentary scrutiny, or national-interest concerns.",
      intervention:
        "Ministerial briefing dossiers, stakeholder alignment, and capability frameworks.",
      outcome:
        "Regulatory engagement strengthened and institutional credibility protected.",
    },
    {
      icon: Shield,
      title: "Executive Positioning & Legacy Stewardship",
      challenge:
        "Leadership transitions or targeted executive reputation attacks.",
      intervention:
        "Executive doctrine, editorial alignment, and confidential reputation strategy.",
      outcome:
        "Leadership mandate protected with durable institutional stature.",
    },
    {
      icon: Sparkles,
      title: "Digital Sovereignty & Algorithm Defense",
      challenge:
        "LLM distortions, search volatility, or coordinated digital attacks.",
      intervention:
        "Knowledge-graph remediation, evidentiary indexing, and misinformation response.",
      outcome:
        "Digital information integrity strengthened.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#a67c45]/5 blur-[150px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <Layers className="h-3 w-3 text-[#a67c45]" />
              Practice Capabilities
            </div>

            <h2 className="font-serif text-3xl font-light leading-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
              Operational Depth: <br />
              <span className="font-normal italic text-[#a67c45]">
                Solving Institutional Challenges
              </span>
            </h2>

            <p className="text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              Our multidisciplinary practices combine intelligence, strategic
              communications, and senior advisory counsel for high-friction
              environments.
            </p>
          </div>

          <Link href="/#services">
            <Button
              variant="outline"
              size="sm"
              className="border-[#c9c2b6] bg-[#f3f0e8] font-mono text-xs uppercase tracking-wider text-[#3f4847] hover:border-[#a67c45]/50 hover:bg-[#e5dfd4]"
            >
              <span>Explore Practices</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* 6 Capabilities Matrix */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-8 shadow-sm transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#eee9df]"
              >
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xs border border-[#c9c2b6] bg-[#ebe7de] text-[#a67c45] transition-colors group-hover:border-[#a67c45]/40 group-hover:bg-[#a67c45]/10">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                    {cap.title}
                  </h3>

                  <div className="space-y-3 pt-2 text-xs font-light">
                    <div>
                      <span className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-[#777970]">
                        The Friction
                      </span>

                      <p className="text-[#626760]">
                        {cap.challenge}
                      </p>
                    </div>

                    <div>
                      <span className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-[#a67c45]">
                        SAMVAD Intervention
                      </span>

                      <p className="text-[#3f4847]">
                        {cap.intervention}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-[#d8d1c5] pt-4 text-xs text-[#3f4847]">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#66816d]" />

                  <span className="font-mono text-[11px] text-[#66816d]">
                    {cap.outcome}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
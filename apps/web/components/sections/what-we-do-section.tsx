"use client";

import * as React from "react";

import Link from "next/link";

import { Container, Badge, Button } from "@samvad/ui";

import {
  Layers,
  ShieldAlert,
  TrendingUp,
  Landmark,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function WhatWeDoSection() {
  const pillars = [
    {
      num: "01",
      icon: Layers,
      title: "Perception Architecture",
      subtitle: "Narrative & Perception Strategy",
      description:
        "We identify perception risks and shape narratives that protect institutional reputation, trust, and authority.",
      deliverables: [
        "Narrative vulnerability audits",
        "Sentiment & discourse mapping",
        "Opinion leader alignment",
      ],
      tag: "Preemptive Defense",
    },
    {
      num: "02",
      icon: ShieldAlert,
      title: "Crisis Mobilization",
      subtitle: "Rapid Response & Crisis Communications",
      description:
        "When scrutiny escalates, we coordinate rapid response, messaging, and stakeholder communications.",
      deliverables: [
        "Senior crisis response",
        "Regulatory & legal messaging",
        "Media response protocols",
      ],
      tag: "Rapid Intervention",
    },
    {
      num: "03",
      icon: TrendingUp,
      title: "Capital Markets Strategy",
      subtitle: "Transactions & Value Protection",
      description:
        "We support high-stakes transactions with communication strategies designed to protect value and stakeholder confidence.",
      deliverables: [
        "Transaction & value framing",
        "Regulatory communications",
        "Shareholder communications",
      ],
      tag: "Value Preservation",
    },
    {
      num: "04",
      icon: Landmark,
      title: "Public Affairs & Statecraft",
      subtitle: "Policy & Institutional Engagement",
      description:
        "We navigate policy, commercial priorities, and public scrutiny to build durable institutional relationships.",
      deliverables: [
        "Government briefing materials",
        "Policy stakeholder alignment",
        "Institutional engagement",
      ],
      tag: "Institutional Accord",
    },
  ];

  return (
    <section
      id="what-we-do"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-[450px] w-[450px] rounded-full bg-[#a67c45]/[0.035] blur-[130px]" />

      <Container size="xl" className="relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Strategic Capabilities
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
              Four pillars of{" "}
              <br />
              <span className="font-normal italic text-[#a67c45]">
                institutional influence
              </span>
            </h2>

            <p className="text-[#697176] text-sm sm:text-base font-light leading-relaxed">
              We work where reputation, policy, and value intersect.
              Every engagement is precise, disciplined, and discreet.
            </p>
          </div>

          <Link href="#services">
            <Button
              variant="outline"
              size="md"
              className="font-mono text-xs uppercase tracking-wider border-[#cfc8bc] text-[#596267] hover:border-[#a67c45]/50 hover:bg-[#ebe7de]"
            >
              <span>Explore Practices</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.num}
                className="group relative flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/75 p-8 sm:p-10 transition-all duration-300 hover:border-[#a67c45]/45 hover:bg-[#e7e2d8] shadow-[0_12px_35px_rgba(29,37,41,0.06)] hover:shadow-[0_20px_50px_rgba(29,37,41,0.1)]"
              >
                {/* Subtle top indicator bar on hover */}
                <div className="absolute top-0 left-8 right-8 h-px bg-[#a67c45]/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6">
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-light text-[#b5afa5] group-hover:text-[#a67c45]/70 transition-colors">
                      {pillar.num}
                    </span>

                    <Badge
                      variant="outline"
                      className="border-[#d0c9bd] bg-[#f3f0e8] font-mono text-[10px] text-[#8c6537] uppercase tracking-widest"
                    >
                      {pillar.tag}
                    </Badge>
                  </div>

                  {/* Icon & Heading */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] flex items-center justify-center text-[#a67c45] group-hover:bg-[#a67c45]/10 group-hover:border-[#a67c45]/30 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="font-serif text-2xl font-normal text-[#1d2529] group-hover:text-[#3d474c] transition-colors">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#a67c45]/90 pl-12">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[#697176] text-xs sm:text-sm font-light leading-relaxed pl-12">
                    {pillar.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="mt-8 pt-6 border-t border-[#d8d1c5] pl-12 space-y-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#596267] font-semibold">
                    Key Capabilities
                  </div>

                  <ul className="space-y-2">
                    {pillar.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-[#697176] font-light"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#a67c45] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
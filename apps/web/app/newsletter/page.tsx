import * as React from "react";

import { Metadata } from "next";

import { NewsletterSubscribeForm } from "@/components/newsletter/newsletter-subscribe-form";

import {
  ShieldCheck,
  Mail,
  Lock,
  BookOpen,
  Compass,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Executive Intelligence Dispatches | SAMVAD PERCEPTION ADVISORY",
  description:
    "Fortnightly perception intelligence, crisis doctrine, and policy analysis for institutional leadership.",
};

const DISPATCH_PILLARS = [
  {
    icon: Compass,
    title: "Perception Telemetry",
    summary:
      "Sentiment signals, narrative tracking, and algorithmic risk intelligence.",
  },
  {
    icon: BookOpen,
    title: "Crisis Playbooks",
    summary:
      "Response frameworks for activist pressure, cyber incidents, and disinformation.",
  },
  {
    icon: FileCheck,
    title: "Policy Communications",
    summary:
      "Regulatory strategy for mergers, acquisitions, and public scrutiny.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#f3f0e8] pb-24 pt-32 text-[#1d2529]">
      {/* Background ambient accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-full max-w-7xl -translate-x-1/2 bg-[#a67c45]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Editorial Masthead */}
        <div className="mb-14 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#ebe7de] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#a67c45]">
            <Mail className="h-3.5 w-3.5" />
            <span>Private Intelligence</span>
          </div>

          <h1 className="font-serif text-3xl font-light tracking-tight text-[#1d2529] sm:text-5xl">
            The SAMVAD{" "}
            <span className="font-normal italic text-[#a67c45]">
              Dispatch
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-[#626760] sm:text-base">
            Fortnightly intelligence for institutional and executive
            decision-makers.
          </p>
        </div>

        {/* Subscription Card */}
        <div className="mb-16 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm sm:p-10">
          <div className="mx-auto max-w-2xl">
            <NewsletterSubscribeForm
              source="NEWSLETTER_PAGE_HERO"
              variant="standalone"
              title="Initiate Dispatch Delivery"
              description="Enter your institutional email to receive confidential strategic analysis."
            />
          </div>
        </div>

        {/* Editorial Pillars */}
        <div className="mb-16 space-y-6">
          <div className="border-b border-[#d8d1c5] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#777970]">
              Coverage &amp; Advisory Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {DISPATCH_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={idx}
                  className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-5 shadow-sm"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 text-[#a67c45]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <h3 className="font-serif text-base font-medium text-[#1d2529]">
                    {pillar.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-[#626760]">
                    {pillar.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutional Charter & Trust Safeguards */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 font-mono text-xs text-[#777970] sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-[#a67c45]">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Zero Third-Party Syndication</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 shrink-0 text-[#777970]" />
            <span>Encrypted Subscription Records</span>
          </div>

          <div>
            <span>RFC 8058 One-Click Opt-Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
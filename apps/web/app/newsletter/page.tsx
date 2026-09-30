import * as React from "react";
import { Metadata } from "next";
import { NewsletterSubscribeForm } from "@/components/newsletter/newsletter-subscribe-form";
import { ShieldCheck, Mail, Lock, BookOpen, Compass, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Executive Intelligence Dispatches | SAMVAD PERCEPTION ADVISORY",
  description:
    "Fortnightly strategic communications telemetry, sovereign perception analyses, and boardroom crisis doctrine delivered to authorized leadership.",
};

const DISPATCH_PILLARS = [
  {
    icon: Compass,
    title: "Sovereign Perception Telemetry",
    summary:
      "Predictive sentiment modeling, state-aligned narrative tracking, and algorithmic defense architecture across global jurisdictions.",
  },
  {
    icon: BookOpen,
    title: "Boardroom Crisis Playbooks",
    summary:
      "Declassified response protocols for activist investor incursions, cyber extortion campaigns, and hostile disinformation warfare.",
  },
  {
    icon: FileCheck,
    title: "Policy & Antitrust Communications",
    summary:
      "Regulatory communications strategy tailored for cross-border mergers, sensitive acquisitions, and congressional scrutiny.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-sand-100 pb-24 pt-32">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-radial from-gold-500/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Editorial Masthead */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 font-mono text-xs uppercase tracking-widest">
            <Mail className="h-3.5 w-3.5" />
            <span>Private Intelligence Distribution</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-sand-100 tracking-tight">
            The SAMVAD <span className="italic font-normal text-gold-300">Dispatch</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-obsidian-300 leading-relaxed font-light">
            An institutional-grade intelligence briefing prepared fortnightly for sovereign ministers, Fortune 500 board chairs, and high-consequence corporate leadership.
          </p>
        </div>

        {/* Subscription Card */}
        <div className="mb-16 rounded-2xl border border-obsidian-800 bg-obsidian-900/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-obsidian-950">
          <div className="max-w-2xl mx-auto">
            <NewsletterSubscribeForm
              source="NEWSLETTER_PAGE_HERO"
              variant="standalone"
              title="Initiate Dispatch Delivery"
              description="Enter your corporate or institutional email address below to receive our confidential strategic analyses."
            />
          </div>
        </div>

        {/* Editorial Pillars */}
        <div className="space-y-6 mb-16">
          <div className="border-b border-obsidian-800 pb-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-obsidian-400">
              Coverage &amp; Advisory Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DISPATCH_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-obsidian-800/80 bg-obsidian-900/40 p-5 space-y-3"
                >
                  <div className="h-8 w-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-base font-medium text-sand-100">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-obsidian-400 leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutional Charter & Trust Safeguards */}
        <div className="rounded-xl border border-obsidian-800/60 bg-obsidian-950/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-obsidian-400">
          <div className="flex items-center gap-2 text-gold-300">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Zero Third-Party Syndication</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 shrink-0 text-obsidian-500" />
            <span>End-to-End Encrypted Subscription Records</span>
          </div>
          <div>
            <span>RFC 8058 One-Click Opt-Out Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

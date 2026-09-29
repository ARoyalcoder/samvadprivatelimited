"use client";

import * as React from "react";
import { Container } from "@samvad/ui";
import { LeadForm } from "./lead-form";
import { Lock, ShieldCheck, Clock } from "lucide-react";

export function FinalCtaSection() {
  const offices = [
    { city: "New Delhi", label: "Global Headquarters", zone: "IST (UTC+5:30)", address: "Barakhamba Road, Connaught Place" },
    { city: "Mumbai", label: "Capital Markets Desk", zone: "IST (UTC+5:30)", address: "Bandra-Kurla Complex (BKC)" },
    { city: "Singapore", label: "Asia-Pacific Hub", zone: "SGT (UTC+8:00)", address: "Marina Bay Financial Centre" },
    { city: "London", label: "European Corridor", zone: "BST (UTC+1:00)", address: "St. James's Square, Mayfair" },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gold-500/5 blur-[160px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Institutional Framing & Trust Moat */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                Confidential Strategic Consultation
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
                Begin the Dialogue. <br />
                <span className="font-normal italic text-gold-300">
                  Protect Your Mandate.
                </span>
              </h2>

              <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
                Strategic counsel begins with a confidential assessment. Every communication is bound
                by our strict non-disclosure covenant and routed exclusively to senior partners.
              </p>
            </div>

            {/* Trust Assurances */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xs border border-obsidian-800 bg-obsidian-900/60">
                <div className="h-8 w-8 rounded-xs border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-sand-200 font-semibold">
                    Absolute Non-Disclosure
                  </h4>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    Zero attribution without explicit written consent. Our clients include entities
                    whose names never appear on public rosters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xs border border-obsidian-800 bg-obsidian-900/60">
                <div className="h-8 w-8 rounded-xs border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-sand-200 font-semibold">
                    Rapid Mobilization SLA
                  </h4>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    Critical crisis situations receive immediate senior partner deployment within 15 minutes of verified briefing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xs border border-obsidian-800 bg-obsidian-900/60">
                <div className="h-8 w-8 rounded-xs border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-sand-200 font-semibold">
                    Direct Partner Engagement
                  </h4>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    Your inquiry is reviewed directly by a Managing Partner, never delegated to junior account representatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Confidential Direct Desk */}
            <div className="p-4 rounded-xs border border-obsidian-800 bg-obsidian-900/40 text-xs text-sand-400 font-mono space-y-1">
              <div className="text-[10px] uppercase tracking-wider text-gold-400">
                Emergency Crisis Advisory Desk
              </div>
              <div className="text-sand-200">
                advisory@samvadadvisory.com · 24/7 Sovereign Duty Officer
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Lead Formulation Form */}
          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>

        {/* Global Sovereign Advisory Corridors */}
        <div className="pt-12 border-t border-obsidian-800">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400 mb-6">
            Advisory Desks & Operating Corridors
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office) => (
              <div
                key={office.city}
                className="p-5 rounded-xs border border-obsidian-800 bg-obsidian-900/40 space-y-2 hover:border-obsidian-750 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-sand-100 font-normal">
                    {office.city}
                  </span>
                  <span className="font-mono text-[10px] text-gold-400">
                    {office.zone}
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                  {office.label}
                </div>
                <p className="text-xs text-sand-400 font-light">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

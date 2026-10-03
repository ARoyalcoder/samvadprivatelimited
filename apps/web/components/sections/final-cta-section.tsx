"use client";

import * as React from "react";

import { Container } from "@samvad/ui";

import { LeadForm } from "./lead-form";

import { Lock, ShieldCheck, Clock } from "lucide-react";

export function FinalCtaSection() {
  const offices = [
    {
      city: "New Delhi",
      label: "Global Headquarters",
      zone: "IST (UTC+5:30)",
      address: "Barakhamba Road, Connaught Place",
    },
    {
      city: "Mumbai",
      label: "Capital Markets Desk",
      zone: "IST (UTC+5:30)",
      address: "Bandra-Kurla Complex (BKC)",
    },
    {
      city: "Singapore",
      label: "Asia-Pacific Hub",
      zone: "SGT (UTC+8:00)",
      address: "Marina Bay Financial Centre",
    },
    {
      city: "London",
      label: "European Corridor",
      zone: "BST (UTC+1:00)",
      address: "St. James's Square, Mayfair",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#a67c45]/[0.035] blur-[160px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Institutional Framing & Trust Moat */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9a703f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45] animate-pulse" />
                Confidential Consultation
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
                Begin the Dialogue. <br />
                <span className="font-normal italic text-[#9a703f]">
                  Protect Your Mandate.
                </span>
              </h2>

              <p className="text-[#667078] text-sm sm:text-base font-light leading-relaxed">
                Begin with a confidential assessment. Every inquiry is handled
                discreetly and reviewed by senior advisory partners.
              </p>
            </div>

            {/* Trust Assurances */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70">
                <div className="h-8 w-8 rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 flex items-center justify-center text-[#a67c45] shrink-0">
                  <Lock className="h-4 w-4" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#29343a] font-semibold">
                    Non-Disclosure
                  </h4>

                  <p className="text-xs text-[#667078] font-light leading-relaxed">
                    No attribution without explicit written consent.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70">
                <div className="h-8 w-8 rounded-xs border border-[#b58b68]/30 bg-[#b58b68]/10 flex items-center justify-center text-[#9a6f4c] shrink-0">
                  <Clock className="h-4 w-4" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#29343a] font-semibold">
                    Rapid Mobilization
                  </h4>

                  <p className="text-xs text-[#667078] font-light leading-relaxed">
                    Critical situations can receive senior partner deployment
                    within 15 minutes of verified briefing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70">
                <div className="h-8 w-8 rounded-xs border border-[#6d876e]/30 bg-[#6d876e]/10 flex items-center justify-center text-[#6d876e] shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#29343a] font-semibold">
                    Direct Partner Engagement
                  </h4>

                  <p className="text-xs text-[#667078] font-light leading-relaxed">
                    Inquiries are reviewed directly by senior leadership.
                  </p>
                </div>
              </div>
            </div>

            {/* Confidential Direct Desk */}
            <div className="p-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/60 text-xs text-[#667078] font-mono space-y-1">
              <div className="text-[10px] uppercase tracking-wider text-[#9a703f]">
                Emergency Crisis Advisory Desk
              </div>

              <div className="text-[#39444a]">
                advisory@samvadadvisory.com · 24/7 Duty Officer
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Lead Formulation Form */}
          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>

        {/* Global Sovereign Advisory Corridors */}
        <div className="pt-12 border-t border-[#d0c9bd]">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#9a703f] mb-6">
            Advisory Desks & Operating Corridors
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office) => (
              <div
                key={office.city}
                className="p-5 rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/60 space-y-2 hover:border-[#a67c45]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-[#1d2529] font-normal">
                    {office.city}
                  </span>

                  <span className="font-mono text-[10px] text-[#9a703f]">
                    {office.zone}
                  </span>
                </div>

                <div className="font-mono text-[10px] uppercase tracking-wider text-[#899197]">
                  {office.label}
                </div>

                <p className="text-xs text-[#667078] font-light">
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
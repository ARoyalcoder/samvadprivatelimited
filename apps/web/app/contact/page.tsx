import * as React from "react";

import type { Metadata } from "next";

import Link from "next/link";

import { Container } from "@samvad/ui";

import { ContactForm } from "@/components/contact/contact-form";

import {
  ChevronRight,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  AlertTriangle,
  Lock,
  ArrowUpRight,
  Clock,
  Globe2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | SAMVAD Perception Advisory",
  description:
    "Contact SAMVAD for strategic communications, crisis, and perception advisory.",
  keywords: [
    "Contact SAMVAD",
    "Perception Advisory",
    "Crisis Communications",
    "Strategic Communications",
  ],
};

export default function ContactPage() {
  const bureaus = [
    {
      city: "New Delhi",
      role: "Principal Bureau & Sovereign Bench",
      address: "Barakhamba Road, Connaught Place, New Delhi 110001",
      phone: "+91 11 4982 5000",
      email: "delhi@samvad.advisory",
      status: "Operational · 24/7 Sovereign Desk",
    },
    {
      city: "Mumbai",
      role: "Capital Markets & Litigation War Room",
      address: "Bandra Kurla Complex (BKC), Mumbai 400051",
      phone: "+91 22 6194 8000",
      email: "mumbai@samvad.advisory",
      status: "Operational · Active War Room Node",
    },
    {
      city: "Singapore",
      role: "Asia-Pacific Regional Bureau",
      address: "Marina Bay Financial Centre, Tower 2, Singapore 018983",
      phone: "+65 6812 7000",
      email: "singapore@samvad.advisory",
      status: "Operational · Bilateral Statecraft Desk",
    },
    {
      city: "London",
      role: "European & Sovereign Debt Desk",
      address: "St James's Square, London SW1Y 4LE, United Kingdom",
      phone: "+44 20 7946 0900",
      email: "london@samvad.advisory",
      status: "Operational · Cross-Border Accords",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-20 lg:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[160px]" />

        <Container
          size="xl"
          className="relative z-10 flex flex-col justify-center space-y-6"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-[#777970]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#3f4847]"
            >
              Home
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-[#a67c45]">Contact</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Strategic Intake
            </div>

            <h1 className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
              Initiate a
              <br />
              <span className="font-normal italic text-[#a67c45]">
                Strategic Conversation
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              Strategic communications, crisis, and perception advisory.
              Inquiries are reviewed by senior practice leaders.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. SPECIFICATIONS & SLA BANNER */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-5">
        <Container size="xl">
          <div className="grid grid-cols-1 gap-4 font-mono text-xs text-[#777970] sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-3">
              <Clock className="h-4 w-4 shrink-0 text-[#a67c45]" />

              <div>
                <span className="block text-[11px] font-semibold text-[#3f4847]">
                  4-Hour Partner SLA
                </span>

                <span className="text-[10px] text-[#aaa398]">
                  Direct review
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-3">
              <AlertTriangle className="h-4 w-4 shrink-0 text-[#9b5b52]" />

              <div>
                <span className="block text-[11px] font-semibold text-[#3f4847]">
                  60-Min Crisis Protocol
                </span>

                <span className="text-[10px] text-[#aaa398]">
                  24/7 response
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-3">
              <Lock className="h-4 w-4 shrink-0 text-[#a67c45]" />

              <div>
                <span className="block text-[11px] font-semibold text-[#3f4847]">
                  Mutual NDA
                </span>

                <span className="text-[10px] text-[#aaa398]">
                  Confidential intake
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MAIN SPLIT CONTACT SPREAD */}
      <section className="py-16 lg:py-24">
        <Container size="xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT COLUMN: INTERACTIVE CONTACT FORM */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8 lg:col-span-5">
              {/* Emergency Crisis War Room */}
              <div className="space-y-3 rounded-xs border border-[#9b5b52]/30 bg-[#9b5b52]/5 p-6">
                <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#9b5b52]">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>24/7 Crisis Response</span>
                </div>

                <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                  Active Crisis or Hostile Campaign?
                </h3>

                <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
                  For urgent regulatory, transaction, or coordinated digital
                  threats, contact the crisis desk directly.
                </p>

                <div className="flex items-center gap-2 pt-2 font-mono text-sm font-semibold text-[#8d683d]">
                  <Phone className="h-4 w-4 text-[#a67c45]" />
                  <span>+91 11 4982 5999</span>
                </div>
              </div>

              {/* Global Practice Bureaus */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                  <Globe2 className="h-4 w-4" />
                  <span>Global Bureaus</span>
                </div>

                <div className="space-y-3">
                  {bureaus.map((bureau, idx) => (
                    <div
                      key={idx}
                      className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-5 font-mono text-xs transition-colors hover:border-[#a67c45]/40"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-serif text-base font-normal text-[#1d2529]">
                          {bureau.city}
                        </span>

                        <span className="text-right text-[9px] uppercase tracking-wider text-[#a67c45]">
                          {bureau.role}
                        </span>
                      </div>

                      <div className="font-sans text-[11px] text-[#777970]">
                        {bureau.address}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d8d1c5] pt-2 text-[11px] text-[#626760]">
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-[#a67c45]" />
                          <span>{bureau.phone}</span>
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-[#a67c45]" />
                          <span>{bureau.email}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media & Press Desk */}
              <div className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 font-mono text-xs">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#a67c45]">
                  <Building2 className="h-4 w-4" />
                  <span>Press &amp; Media</span>
                </div>

                <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
                  Accredited journalists may access official releases and
                  media assets through the newsroom.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/newsroom"
                    className="inline-flex items-center gap-1 text-[#8d683d] transition-colors hover:text-[#a67c45]"
                  >
                    <span>Newsroom</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>

                  <Link
                    href="/media"
                    className="inline-flex items-center gap-1 text-[#8d683d] transition-colors hover:text-[#a67c45]"
                  >
                    <span>Media Library</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Data Privacy */}
              <div className="flex items-start gap-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-4 font-mono text-[10px] text-[#777970]">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#a67c45]" />

                <p className="leading-relaxed">
                  SAMVAD follows applicable data-protection standards and
                  institutional confidentiality covenants.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. INSTITUTIONAL INTAKE FAQ */}
      <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-16 lg:py-20">
        <Container size="xl" className="space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
              Intake Protocol
            </div>

            <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
              Engagement FAQs
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 font-sans md:grid-cols-2">
            <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6">
              <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                How is confidentiality protected?
              </h3>

              <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                Intake data is encrypted and access is restricted to
                authorized practice leaders.
              </p>
            </div>

            <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6">
              <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                How fast can crisis support begin?
              </h3>

              <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                Critical crisis mandates can enter the rapid-response
                protocol within 60 minutes of intake.
              </p>
            </div>

            <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6">
              <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                Are mandates partner-led?
              </h3>

              <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                Yes. Senior practice partners directly steward strategic
                engagements.
              </p>
            </div>

            <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6">
              <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                Is cross-border support available?
              </h3>

              <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                New Delhi, Mumbai, Singapore, and London coordinate
                cross-border mandates.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
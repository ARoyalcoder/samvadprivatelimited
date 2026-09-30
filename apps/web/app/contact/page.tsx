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
  title: "Start a Conversation | SAMVAD Perception Advisory",
  description:
    "Strategic communications and perception advisory for organizations that want their voice to matter. Request partner-led counsel, crisis war room mobilization, or confidential briefings.",
  keywords: [
    "Contact SAMVAD",
    "Perception Advisory Consultation",
    "Crisis Communications War Room",
    "Strategic Communications Inquiry",
    "Sovereign Advisory Intake",
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
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100 min-h-screen">
      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-obsidian-800">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[950px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 flex flex-col justify-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400"
          >
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">Start a Conversation</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Strategic Intake &amp; Executive Counsel
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
              Initiate a <br />
              <span className="font-normal italic text-gold-300">
                Strategic Conversation
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed max-w-2xl">
              Strategic communications and perception advisory for organizations that want their voice to matter.
              All inquiries are transmitted via cryptographic escrow and reviewed directly by practice principals.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. SPECIFICATIONS & SLA BANNER */}
      <section className="border-b border-obsidian-800 bg-obsidian-900/50 py-5">
        <Container size="xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-obsidian-400">
            <div className="flex items-center gap-3 p-3 rounded-xs border border-obsidian-800 bg-obsidian-950/60">
              <Clock className="h-4 w-4 text-gold-400 shrink-0" />
              <div>
                <span className="text-sand-200 block text-[11px] font-semibold">4-Hour Partner SLA</span>
                <span className="text-[10px] text-obsidian-500">Direct practice principal review</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xs border border-obsidian-800 bg-obsidian-950/60">
              <AlertTriangle className="h-4 w-4 text-perception-crisis shrink-0" />
              <div>
                <span className="text-sand-200 block text-[11px] font-semibold">60-Min Crisis Protocol</span>
                <span className="text-[10px] text-obsidian-500">24/7 War Room emergency escrow</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xs border border-obsidian-800 bg-obsidian-950/60">
              <Lock className="h-4 w-4 text-gold-400 shrink-0" />
              <div>
                <span className="text-sand-200 block text-[11px] font-semibold">Mutual NDA Escrow</span>
                <span className="text-[10px] text-obsidian-500">Zero public disclosure guarantee</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MAIN SPLIT CONTACT SPREAD */}
      <section className="py-16 lg:py-24">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT COLUMN: INTERACTIVE CONTACT FORM */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* RIGHT COLUMN: PRACTICE BUREAUS & EMERGENCY ESCROW */}
            <div className="lg:col-span-5 space-y-8">
              {/* Emergency Crisis War Room Callout */}
              <div className="rounded-xs border border-perception-crisis/40 bg-perception-crisis/10 p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-perception-crisis font-semibold">
                  <AlertTriangle className="h-4 w-4 text-perception-crisis shrink-0" />
                  <span>24/7 Rapid Response Directorate</span>
                </div>
                <h3 className="font-serif text-lg font-normal text-sand-100">
                  Active Crisis or Hostile Campaign?
                </h3>
                <p className="font-sans text-xs text-sand-300 font-light leading-relaxed">
                  For immediate escalation involving regulatory raids, hostile takeover bids, industrial
                  contingencies, or coordinated algorithmic defamation, contact our crisis command hotline:
                </p>
                <div className="pt-2 font-mono text-sm text-gold-300 font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gold-400" />
                  <span>+91 11 4982 5999 (Crisis Escrow Hotline)</span>
                </div>
              </div>

              {/* Global Practice Bureaus */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold-400">
                  <Globe2 className="h-4 w-4" />
                  <span>Global Advisory Bureaus</span>
                </div>

                <div className="space-y-3">
                  {bureaus.map((bureau, idx) => (
                    <div
                      key={idx}
                      className="rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-5 space-y-2 font-mono text-xs hover:border-gold-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-sand-100 font-normal">
                          {bureau.city}
                        </span>
                        <span className="text-[10px] text-gold-400 uppercase tracking-wider">
                          {bureau.role}
                        </span>
                      </div>

                      <div className="text-[11px] text-obsidian-400 font-sans">
                        {bureau.address}
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-[11px] text-sand-300 pt-2 border-t border-obsidian-800/80">
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-gold-400" />
                          <span>{bureau.phone}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-gold-400" />
                          <span>{bureau.email}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media & Press Desk Gateway */}
              <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/40 p-6 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-gold-400 text-[10px] uppercase tracking-wider font-semibold">
                  <Building2 className="h-4 w-4" />
                  <span>Accredited Press &amp; Media Interaction</span>
                </div>
                <p className="font-sans text-xs text-sand-400 font-light leading-relaxed">
                  Journalists and accredited correspondents seeking on-the-record institutional commentary or
                  broadcast interviews can access official releases and digital media kits via our newsroom portal.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                  <Link
                    href="/newsroom"
                    className="inline-flex items-center gap-1 text-gold-300 hover:text-gold-200 transition-colors"
                  >
                    <span>Newsroom Releases</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                  <Link
                    href="/media"
                    className="inline-flex items-center gap-1 text-gold-300 hover:text-gold-200 transition-colors"
                  >
                    <span>Media Library &amp; Press Kits</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Data Privacy & Sovereign Compliance */}
              <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-4 flex items-start gap-3 font-mono text-[10px] text-obsidian-400">
                <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                <p className="leading-tight">
                  SAMVAD Perception Advisory adheres to sovereign confidentiality frameworks, the Digital Personal Data Protection (DPDP) Act, and institutional non-disclosure covenants.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. INSTITUTIONAL INTAKE FAQ */}
      <section className="border-t border-obsidian-800 bg-obsidian-900/40 py-16 lg:py-20">
        <Container size="xl" className="space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
              Protocol Transparency
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
              Mandate Engagement FAQs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 space-y-2">
              <h3 className="font-serif text-lg font-normal text-sand-100">
                How is client confidentiality safeguarded during initial intake?
              </h3>
              <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                Initial submissions are protected by mutual non-disclosure covenants upon receipt. All data
                is encrypted in transit and at rest, and access is strictly restricted to practice principals.
                Client identities are never publicized for agency self-promotion.
              </p>
            </div>

            <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 space-y-2">
              <h3 className="font-serif text-lg font-normal text-sand-100">
                What is the turnaround time for critical crisis communications?
              </h3>
              <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                For active regulatory investigations, parliamentary subpoenas, or hostile market attacks,
                our Rapid Response Directorate mobilizes within 60 minutes of intake, conducting real-time
                sentiment triage and narrative containment.
              </p>
            </div>

            <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 space-y-2">
              <h3 className="font-serif text-lg font-normal text-sand-100">
                Are mandates managed directly by practice leaders?
              </h3>
              <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                Yes. SAMVAD operates on a strict partner-led delivery model. Every advisory dispatch,
                media intervention, and strategic memorandum is formulated and stewarded directly by our
                senior practice partners.
              </p>
            </div>

            <div className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 space-y-2">
              <h3 className="font-serif text-lg font-normal text-sand-100">
                Can we request cross-border multi-jurisdictional support?
              </h3>
              <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                Our bureaus in New Delhi, Mumbai, Singapore, and London coordinate seamlessly across time zones
                for cross-border M&A transactions, sovereign wealth fund communications, and international
                arbitration dispatches.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

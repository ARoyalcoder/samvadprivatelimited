import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, Badge, Button, MagneticButton } from "@samvad/ui";
import {
  getAllNewsroomItems,
  getNewsroomTypesWithCounts,
  getNewsroomYears,
} from "@/lib/newsroom-data";
import { NewsroomSearchFilter } from "@/components/newsroom/newsroom-search-filter";
import {
  ShieldCheck,
  Download,
  Mail,
  ArrowRight,
  ChevronRight,
  FileCheck,
  Key,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Newsroom & Institutional Dispatches | SAMVAD Perception Advisory",
  description:
    "Official press statements, corporate governance updates, verified media briefing records, and symposium announcements from SAMVAD Perception Advisory.",
  keywords: [
    "SAMVAD Newsroom",
    "Press Releases",
    "Company Announcements",
    "Perception Advisory",
    "Institutional Dispatches",
  ],
};

export default function NewsroomPage() {
  const items = getAllNewsroomItems();
  const typesWithCounts = getNewsroomTypesWithCounts();
  const years = getNewsroomYears();

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-obsidian-800">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 flex flex-col justify-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400">
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">Newsroom &amp; Media Centre</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Official Dispatches &amp; Media Centre
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
              Newsroom &amp; <br />
              <span className="font-normal italic text-gold-300">
                Institutional Dispatches
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed max-w-2xl">
              Official press announcements, corporate governance notices, executive appointments,
              symposium agendas, and verified non-attributable briefing records.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. STATUTORY NON-FABRICATION & MEDIA POLICY GOVERNANCE BANNER */}
      <section className="border-b border-obsidian-800 bg-obsidian-900/50 py-6">
        <Container size="xl">
          <div className="rounded-xs border border-obsidian-750 bg-obsidian-950/80 p-5 sm:p-6 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-3.5 max-w-3xl">
                <div className="mt-0.5 rounded-xs border border-gold-500/30 bg-gold-500/10 p-2 text-gold-400 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold text-sand-200">
                      Media Governance &amp; Non-Fabrication Policy
                    </span>
                    <Badge variant="outline" className="border-gold-500/30 font-mono text-[9px] text-gold-400 uppercase">
                      Strict Integrity Charter
                    </Badge>
                  </div>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    SAMVAD Perception Advisory adheres to an unyielding standard of factual integrity: the firm never fabricates media coverage, invents publication names, or quotes synthetic sources. All media interactions comply with the Chatham House Rule, and all official announcements are cryptographically verified.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto font-mono text-[10px] text-obsidian-400">
                <div className="flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-gold-400" />
                  <span>PGP Key Verified</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5 text-gold-400" />
                  <span>Counsel Audited</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MEDIA ASSETS & PRESS RESOURCES BAR */}
      <section className="border-b border-obsidian-800 bg-obsidian-900/30 py-6">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-xs text-sand-300">
              <span className="text-gold-400 uppercase tracking-widest text-[10px]">Press Kit Resources:</span>
              <span className="text-obsidian-400">Official Logos · Executive Biographies · Corporate Fact Sheet (2026)</span>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/about#contact">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-850"
                >
                  <Download className="mr-2 h-3.5 w-3.5 text-gold-400" />
                  <span>Download Media Kit (PDF)</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. DISCLOSURES CATALOG & INTERACTIVE FILTER */}
      <section className="py-16 lg:py-24">
        <Container size="xl" className="space-y-12">
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
              01 · Institutional Disclosures
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
              Verified Public Releases &amp; Briefings
            </h2>
            <p className="text-xs sm:text-sm text-sand-400 font-light max-w-xl">
              Filter by content type, query by reference code, or browse past archive years across all authenticated announcements.
            </p>
          </div>

          <NewsroomSearchFilter
            items={items}
            typesWithCounts={typesWithCounts}
            years={years}
          />
        </Container>
      </section>

      {/* 5. MEDIA DESK CONTACT & PRESS INQUIRY PROTOCOL */}
      <section className="border-t border-obsidian-800 bg-obsidian-900/70 py-16 lg:py-20">
        <Container size="xl">
          <div className="rounded-xs border border-obsidian-750 bg-obsidian-950 p-8 sm:p-12 lg:p-14 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Accredited Press Office Desk</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Media Inquiries &amp; Interview Requests
                </h3>
                <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                  Journalists, regulatory correspondents, and financial newsdesks with tight deadlines can contact our Office of the Press Secretary directly. All inquiries from verified press credentials receive an expedited response within 2 hours during market trading hours.
                </p>
                <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-obsidian-300">
                  <div>
                    <span className="text-obsidian-500 block text-[10px] uppercase">Email Desk</span>
                    <a href="mailto:press@samvad.advisory" className="text-gold-400 hover:text-gold-300">
                      press@samvad.advisory
                    </a>
                  </div>
                  <div>
                    <span className="text-obsidian-500 block text-[10px] uppercase">Direct Line</span>
                    <span className="text-sand-200">+91 11 4982 5000</span>
                  </div>
                  <div>
                    <span className="text-obsidian-500 block text-[10px] uppercase">Response SLA</span>
                    <span className="text-sand-200">2-Hour Window (Accredited Press)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end space-y-4">
                <Link href="/about#contact">
                  <MagneticButton>
                    <Button
                      variant="gold"
                      size="md"
                      className="font-mono text-xs uppercase tracking-widest px-8 py-3.5"
                    >
                      <span>Submit Press Inquiry</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </MagneticButton>
                </Link>
                <span className="font-mono text-[10px] text-obsidian-500">
                  PGP Key ID: 4E9A 82B1 0F3C 7890
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Badge,
  Button,
  MagneticButton,
  SamvadImage,
} from "@samvad/ui";
import { PRIMARY_INDUSTRIES } from "@/lib/industries-data";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Landmark,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industries & Operating Sectors | SAMVAD Perception Advisory",
  description:
    "Explore SAMVAD's specialized industry advisory frameworks across Technology, Financial Services, Healthcare, Infrastructure, Real Estate, Consumer, Startups, and Institutions.",
};

export default function IndustriesPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold-500/5 blur-[140px]" />

        <Container size="xl" className="relative z-10 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400">
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">Industries</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 backdrop-blur-md">
            <Landmark className="h-3.5 w-3.5 text-gold-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
              Operating Arenas &amp; Sector Topology
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
              Industries of <br />
              <span className="font-normal italic text-gold-300">
                Consequence &amp; Scrutiny
              </span>
            </h1>
            <p className="font-serif text-lg sm:text-xl text-sand-300 font-light leading-relaxed">
              Specialized domain depth ensuring jurisdictional awareness, regulatory intuition,
              and immediate tactical authority where corporate narrative meets high-stakes friction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/#contact">
              <MagneticButton
                variant="gold"
                size="md"
                className="font-mono text-xs uppercase tracking-wider px-6 py-3"
              >
                <span>Request Sector Assessment</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </Container>
      </section>

      {/* 2. CMS GOVERNANCE & FACTUAL INTEGRITY NOTICE */}
      <section className="border-t border-b border-obsidian-800 bg-obsidian-900/60 py-6">
        <Container size="xl">
          <div className="rounded-xs border border-obsidian-750 bg-obsidian-950/80 p-5 flex items-start gap-3.5 text-xs">
            <AlertCircle className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                CMS Category Architecture &amp; Corporate Disclosure Covenant
              </span>
              <p className="text-sand-400 font-light leading-relaxed">
                The eight sectors detailed below represent SAMVAD&apos;s configurable advisory frameworks.
                In strict adherence to corporate governance and non-attribution covenants, active client
                representation within specific sectors is undertaken exclusively following bilateral
                clearance and under non-disclosure agreements. SAMVAD does not publish unverified public client rosters.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. 8 CONFIGURED SECTORS GRID */}
      <section className="relative overflow-hidden py-24 bg-obsidian-950">
        <Container size="xl" className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                Configured Frameworks
              </div>
              <h2 className="font-serif text-3xl font-light text-sand-100">
                Eight Operating Sectors
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-obsidian-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Configurable CMS Data Model</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRIMARY_INDUSTRIES.map((industry) => (
              <div
                key={industry.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-obsidian-800 bg-obsidian-900/60 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900 shadow-elevation-1"
              >
                {/* Photo Preview */}
                <div className="relative overflow-hidden aspect-[16/10] border-b border-obsidian-800/80 bg-obsidian-950">
                  <SamvadImage
                    assetId={industry.imageAssetId}
                    aspectRatio="16:9"
                    zoomOnHover
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="font-mono text-xs bg-obsidian-950/90 border border-obsidian-750 px-2 py-0.5 rounded-xs text-gold-400">
                      {industry.code}
                    </span>
                    <Badge variant="outline" className="border-obsidian-750 bg-obsidian-950/90 font-mono text-[8px] uppercase tracking-wider text-sand-300 backdrop-blur-md">
                      {industry.categoryGroup}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-gold-400">
                      {industry.eyebrow}
                    </div>
                    <h3 className="font-serif text-xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-xs text-sand-400 font-light leading-relaxed">
                      {industry.shortSummary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-obsidian-850 space-y-2">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400">
                      Core Sector Challenge:
                    </div>
                    <p className="text-xs text-sand-300/90 font-light line-clamp-2">
                      {industry.challenges[0]?.title}
                    </p>
                  </div>
                </div>

                {/* Action Link */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="w-full flex items-center justify-between pt-3 border-t border-obsidian-800 text-xs font-mono text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <span>Inspect Framework</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. ADVISORY CTA */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-24 text-center">
        <Container size="xl" className="space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
              Bespoke Cross-Sector Advisory
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
            Operating in an Unlisted Sector?
          </h2>

          <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
            Our perception architecture and crisis mobilization doctrines apply wherever institutional
            authority encounters high-stakes friction. Connect with our Managing Principal for a confidential sector review.
          </p>

          <div className="pt-2">
            <Link href="/#contact">
              <Button variant="gold" size="lg" className="font-mono text-xs uppercase tracking-wider">
                <span>Engage Sovereign Counsel</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono text-obsidian-400">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-gold-400" />
              <span>Zero Attribution Protocol</span>
            </div>
            <span className="text-obsidian-700">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Strict Executive Clearance</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

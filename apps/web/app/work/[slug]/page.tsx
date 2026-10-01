import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Badge,
  Button,
  SamvadImage,
} from "@samvad/ui";
import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
} from "@/lib/case-studies-data";
import { CaseStudyGallery } from "@/components/work/case-study-gallery";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Award,
  AlertTriangle,
  Layers,
  Activity,
  Share2,
  FileCheck,
} from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCaseStudySlugs();
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found | SAMVAD Perception Advisory",
    };
  }

  return {
    title: `${study.refCode}: ${study.title} | SAMVAD Perception Advisory`,
    description: study.tagline,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-obsidian-800">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 flex flex-col justify-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400">
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/work" className="hover:text-sand-300 transition-colors">
              Work &amp; Dossiers
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">{study.refCode}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs bg-gold-500/10 border border-gold-500/30 px-2.5 py-1 rounded-xs text-gold-400 font-semibold">
                  {study.refCode}
                </span>
                <Badge variant="outline" className="border-obsidian-750 font-mono text-[9px] uppercase tracking-wider text-sand-300">
                  {study.classification}
                </Badge>
                <span className="text-obsidian-500 font-mono text-xs">·</span>
                <span className="font-mono text-xs text-obsidian-400">{study.timeframe}</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-4">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-sand-100 leading-[1.12]">
                  {study.title}
                </h1>
                <p className="font-sans text-base sm:text-lg text-sand-300 font-light leading-relaxed">
                  {study.tagline}
                </p>
              </div>

              {/* 1. MANDATORY SECTION: CLIENT IDENTITY & CONFIDENTIALITY STATUS */}
              <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-4 sm:p-5 backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                    <Lock className="h-3.5 w-3.5 text-gold-400" />
                    <span>01 · Client Identity Protected Under NDA Covenant</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400 border border-obsidian-750 px-2 py-0.5 rounded-xs">
                    Counsel Verified
                  </span>
                </div>
                <div className="font-mono text-xs sm:text-sm font-semibold text-sand-100 tracking-wide bg-obsidian-950 px-3 py-2 rounded-xs border border-obsidian-800">
                  {study.clientPlaceholder}
                </div>
                <p className="text-xs text-obsidian-400 font-light leading-relaxed">
                  {study.clientContextNotice}
                </p>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-4">
              <div className="rounded-xs overflow-hidden border border-obsidian-750 bg-obsidian-900/70 p-2 shadow-2xl">
                <SamvadImage
                  assetId={study.heroAssetId}
                  aspectRatio="16:9"
                  priority
                  className="rounded-xs w-full object-cover"
                  caption={study.title}
                />
                <div className="p-3 border-t border-obsidian-800 mt-2 flex items-center justify-between font-mono text-[10px] text-obsidian-400">
                  <span>RECORD: {study.refCode}</span>
                  <span className="text-gold-400">AUDITED RECORD</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. STATUTORY COMPLIANCE NOTICE STRIP */}
      <section className="border-b border-obsidian-800 bg-obsidian-900/40 py-3.5">
        <Container size="xl">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-obsidian-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
              <span>Strict Non-Fabrication Policy: All figures represent declassified audited metrics.</span>
            </div>
            {/* 2. MANDATORY SECTION: INDUSTRY CONTEXT */}
            <div className="flex items-center gap-2">
              <span>02 · Industry:</span>
              <Link
                href={`/industries/${study.industrySlug}`}
                className="text-gold-400 hover:text-gold-300 font-semibold transition-colors flex items-center gap-1"
              >
                <span>{study.industry}</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN DOSSIER STORYTELLING BODY */}
      <section className="py-16 lg:py-24">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT / MAIN COLUMN: THE 11 SECTIONS */}
            <div className="lg:col-span-8 space-y-16">
              {/* 3. MANDATORY SECTION: CHALLENGE */}
              <div id="challenge" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>03 · The Systemic Challenge &amp; Crisis Context</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Institutional Friction Under Extreme Scrutiny
                </h2>
                <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/60 p-6 sm:p-8 backdrop-blur-md">
                  <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
              </div>

              {/* 4. MANDATORY SECTION: OBJECTIVE */}
              <div id="objective" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>04 · Strategic Mandate &amp; Objectives</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Core Targets &amp; Non-Negotiables
                </h2>
                <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/60 p-6 sm:p-8 backdrop-blur-md">
                  <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed">
                    {study.objective}
                  </p>
                </div>
              </div>

              {/* 5. MANDATORY SECTION: STRATEGY */}
              <div id="strategy" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <Layers className="h-3.5 w-3.5" />
                  <span>05 · Perception Architecture Strategy</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Methodology &amp; Doctrine Deployed
                </h2>
                <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
                  <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed">
                    {study.strategy}
                  </p>
                </div>
              </div>

              {/* 6. MANDATORY SECTION: EXECUTION */}
              <div id="execution" className="space-y-6 scroll-mt-28">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <Activity className="h-3.5 w-3.5" />
                  <span>06 · Phased Operational Execution</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Multi-Phase Operational Roadmap
                </h2>

                <div className="space-y-4">
                  {study.execution.map((phase, idx) => (
                    <div
                      key={idx}
                      className="rounded-xs border border-obsidian-750 bg-obsidian-900/70 p-6 backdrop-blur-md space-y-3 hover:border-gold-500/40 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-obsidian-800 pb-3">
                        <span className="font-mono text-xs uppercase tracking-wider text-gold-400 font-semibold">
                          {phase.phase}
                        </span>
                        <span className="font-mono text-[10px] text-obsidian-400">
                          MILESTONE {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-sand-100">
                        {phase.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. MANDATORY SECTION: CHANNELS */}
              <div id="channels" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>07 · Channels &amp; Transmission Vectors</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Verified Stakeholder Touchpoints
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {study.channels.map((channel, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xs border border-obsidian-750 bg-obsidian-900/60 p-4 font-mono text-xs text-sand-300"
                    >
                      <span className="text-gold-400 font-semibold">[{String(idx + 1).padStart(2, "0")}]</span>
                      <span>{channel}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. MANDATORY SECTION: OUTCOME */}
              <div id="outcome" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <Award className="h-3.5 w-3.5" />
                  <span>08 · Operational Outcome &amp; Resolution</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Final Accord &amp; Market Resolution
                </h2>

                <div className="rounded-xs border border-gold-500/40 bg-obsidian-900/90 p-6 sm:p-8 backdrop-blur-md shadow-elevation-2 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gold-400">
                    <ShieldCheck className="h-4 w-4 text-gold-400" />
                    <span>Audited Final Outcome</span>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-sand-200 font-light leading-relaxed">
                    {study.outcome}
                  </p>
                </div>
              </div>

              {/* 9. MANDATORY SECTION: METRICS */}
              <div id="metrics" className="space-y-6 scroll-mt-28">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>09 · Verified Quantitative Metrics</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Declassified Intervention Telemetry
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {study.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-5 space-y-2 backdrop-blur-md"
                    >
                      <div className="font-serif text-2xl sm:text-3xl font-light text-gold-300">
                        {metric.value}
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider text-sand-200">
                        {metric.label}
                      </div>
                      <div className="text-[11px] text-obsidian-400 font-light">
                        {metric.subtext}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10. MANDATORY SECTION: GALLERY (WITH IMAGE TRANSITIONS) */}
              <div id="gallery" className="scroll-mt-28 pt-4">
                <CaseStudyGallery items={study.gallery} />
              </div>

              {/* 11. MANDATORY SECTION: RELATED SERVICES */}
              <div id="related-services" className="space-y-6 scroll-mt-28 border-t border-obsidian-800 pt-12">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <Layers className="h-3.5 w-3.5" />
                  <span>11 · Specialized Capabilities Deployed</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Related Advisory Practices
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {study.relatedServices.map((service, idx) => (
                    <Link
                      key={idx}
                      href={`/services/${service.slug}`}
                      className="group flex flex-col justify-between rounded-xs border border-obsidian-750 bg-obsidian-900/60 p-6 hover:border-gold-500/50 hover:bg-obsidian-900/90 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between font-mono text-[10px] text-gold-400 uppercase tracking-widest">
                          <span>Practice Protocol</span>
                          <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                        <h3 className="font-serif text-lg font-light text-sand-100 group-hover:text-gold-200 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-sand-400 font-light leading-relaxed">
                          {service.role}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: EXECUTIVE BRIEF & JUMP NAVIGATION */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Dossier Admin Summary Card */}
                <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-6 backdrop-blur-md space-y-4">
                  <div className="border-b border-obsidian-800 pb-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-gold-400 font-semibold">
                      {study.refCode}
                    </span>
                    <Badge variant="outline" className="border-gold-500/30 font-mono text-[9px] text-gold-400 uppercase">
                      Classified Brief
                    </Badge>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-obsidian-400 uppercase tracking-wider block">Sector</span>
                      <span className="text-sand-200">{study.industry}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-obsidian-400 uppercase tracking-wider block">Timeframe</span>
                      <span className="text-sand-200">{study.timeframe}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-obsidian-400 uppercase tracking-wider block">Primary Vector</span>
                      <span className="text-sand-200">{study.channels[0]}</span>
                    </div>
                  </div>

                  {/* Section Jump Links */}
                  <div className="border-t border-obsidian-800 pt-4 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400 block mb-2">
                      Dossier Structure
                    </span>
                    <nav className="flex flex-col space-y-1.5 font-mono text-xs text-sand-400">
                      <a href="#challenge" className="hover:text-gold-300 transition-colors">
                        03 · Challenge
                      </a>
                      <a href="#objective" className="hover:text-gold-300 transition-colors">
                        04 · Objective
                      </a>
                      <a href="#strategy" className="hover:text-gold-300 transition-colors">
                        05 · Strategy
                      </a>
                      <a href="#execution" className="hover:text-gold-300 transition-colors">
                        06 · Execution
                      </a>
                      <a href="#channels" className="hover:text-gold-300 transition-colors">
                        07 · Channels
                      </a>
                      <a href="#outcome" className="hover:text-gold-300 transition-colors">
                        08 · Outcome
                      </a>
                      <a href="#metrics" className="hover:text-gold-300 transition-colors">
                        09 · Metrics
                      </a>
                      <a href="#gallery" className="hover:text-gold-300 transition-colors">
                        10 · Gallery
                      </a>
                      <a href="#related-services" className="hover:text-gold-300 transition-colors">
                        11 · Related Services
                      </a>
                    </nav>
                  </div>

                  {/* Inquire Action Button */}
                  <div className="border-t border-obsidian-800 pt-4">
                    <Link href="/about#contact">
                      <Button
                        variant="gold"
                        size="sm"
                        className="w-full font-mono text-xs uppercase tracking-wider py-3"
                      >
                        <span>Request In-Camera Briefing</span>
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Back to archive link */}
                <div className="pt-2 text-center">
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 font-mono text-xs text-obsidian-400 hover:text-sand-300 transition-colors"
                  >
                    <span>← Return to Master Dossier Archive</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* FOOTER STATUTORY DISCLAIMER */}
      <section className="border-t border-obsidian-800 bg-obsidian-950 py-8">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-obsidian-500">
            <p>
              DOCUMENT CODE: {study.refCode} · COMPLIANCE COVENANT ENFORCED · NO FABRICATION STANDARD
            </p>
            <p>
              AUDITED BY SAMVAD STRATEGIC RISK &amp; COMPLIANCE COMMITTEE
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

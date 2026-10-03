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

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-20 lg:pt-36">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[160px]" />

        <Container
          size="xl"
          className="relative z-10 flex flex-col justify-center space-y-6"
        >
          {/* Breadcrumb Navigation */}
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

            <Link
              href="/work"
              className="transition-colors hover:text-[#3f4847]"
            >
              Work &amp; Dossiers
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-[#a67c45]">{study.refCode}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Hero Content */}
            <div className="space-y-6 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[#a67c45]">
                  {study.refCode}
                </span>

                <Badge
                  variant="outline"
                  className="border-[#c9c2b6] font-mono text-[9px] uppercase tracking-wider text-[#626760]"
                >
                  {study.classification}
                </Badge>

                <span className="font-mono text-xs text-[#aaa398]">·</span>

                <span className="font-mono text-xs text-[#777970]">
                  {study.timeframe}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-4">
                <h1 className="font-serif text-3xl font-light leading-[1.12] tracking-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
                  {study.title}
                </h1>

                <p className="font-sans text-base font-light leading-relaxed text-[#626760] sm:text-lg">
                  {study.tagline}
                </p>
              </div>

              {/* 1. MANDATORY SECTION: CLIENT IDENTITY & CONFIDENTIALITY STATUS */}
              <div className="space-y-2.5 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                    <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
                    <span>01 · Client Identity Protected Under NDA</span>
                  </div>

                  <span className="rounded-xs border border-[#c9c2b6] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#777970]">
                    Counsel Verified
                  </span>
                </div>

                <div className="rounded-xs border border-[#d8d1c5] bg-[#f3f0e8] px-3 py-2 font-mono text-xs font-semibold tracking-wide text-[#1d2529] sm:text-sm">
                  {study.clientPlaceholder}
                </div>

                <p className="font-light leading-relaxed text-[#777970] text-xs">
                  {study.clientContextNotice}
                </p>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-2 shadow-sm">
                <SamvadImage
                  assetId={study.heroAssetId}
                  aspectRatio="16:9"
                  priority
                  className="w-full rounded-xs object-cover"
                  caption={study.title}
                />

                <div className="mt-2 flex items-center justify-between border-t border-[#d8d1c5] p-3 font-mono text-[10px] text-[#777970]">
                  <span>RECORD: {study.refCode}</span>
                  <span className="text-[#a67c45]">AUDITED RECORD</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. STATUTORY COMPLIANCE NOTICE STRIP */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-3.5">
        <Container size="xl">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#777970]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>
                Non-Fabrication Policy: Published figures represent
                declassified audited metrics.
              </span>
            </div>

            {/* 2. MANDATORY SECTION: INDUSTRY CONTEXT */}
            <div className="flex items-center gap-2">
              <span>02 · Industry:</span>

              <Link
                href={`/industries/${study.industrySlug}`}
                className="flex items-center gap-1 font-semibold text-[#a67c45] transition-colors hover:text-[#8d683d]"
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT / MAIN COLUMN: THE 11 SECTIONS */}
            <div className="space-y-16 lg:col-span-8">
              {/* 3. MANDATORY SECTION: CHALLENGE */}
              <div id="challenge" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>03 · Systemic Challenge &amp; Crisis Context</span>
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Institutional Friction Under Scrutiny
                </h2>

                <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm sm:p-8">
                  <p className="font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
                    {study.challenge}
                  </p>
                </div>
              </div>

              {/* 4. MANDATORY SECTION: OBJECTIVE */}
              <div id="objective" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>04 · Strategic Mandate &amp; Objectives</span>
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Core Targets &amp; Non-Negotiables
                </h2>

                <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm sm:p-8">
                  <p className="font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
                    {study.objective}
                  </p>
                </div>
              </div>

              {/* 5. MANDATORY SECTION: STRATEGY */}
              <div id="strategy" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <Layers className="h-3.5 w-3.5" />
                  <span>05 · Perception Architecture Strategy</span>
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Methodology &amp; Doctrine Deployed
                </h2>

                <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm sm:p-8">
                  <p className="font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
                    {study.strategy}
                  </p>
                </div>
              </div>

              {/* 6. MANDATORY SECTION: EXECUTION */}
              <div id="execution" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <Activity className="h-3.5 w-3.5" />
                  <span>06 · Phased Operational Execution</span>
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Multi-Phase Operational Roadmap
                </h2>

                <div className="space-y-4">
                  {study.execution.map((phase, idx) => (
                    <div
                      key={idx}
                      className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm transition-colors hover:border-[#a67c45]/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d8d1c5] pb-3">
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#a67c45]">
                          {phase.phase}
                        </span>

                        <span className="font-mono text-[10px] text-[#777970]">
                          MILESTONE {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-normal text-[#1d2529] sm:text-xl">
                        {phase.title}
                      </h3>

                      <p className="font-light leading-relaxed text-[#626760] text-xs sm:text-sm">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. MANDATORY SECTION: CHANNELS */}
              <div id="channels" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>07 · Channels &amp; Transmission Vectors</span>
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Verified Stakeholder Touchpoints
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {study.channels.map((channel, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-4 font-mono text-xs text-[#626760]"
                    >
                      <span className="font-semibold text-[#a67c45]">
                        [{String(idx + 1).padStart(2, "0")}]
                      </span>

                      <span>{channel}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. MANDATORY SECTION: OUTCOME */}
              <div id="outcome" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <Award className="h-3.5 w-3.5" />
                  <span>08 · Operational Outcome &amp; Resolution</span>
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Final Accord &amp; Market Resolution
                </h2>

                <div className="space-y-3 rounded-xs border border-[#a67c45]/40 bg-[#ebe7de] p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                    <ShieldCheck className="h-4 w-4 text-[#a67c45]" />
                    <span>Audited Final Outcome</span>
                  </div>

                  <p className="font-sans text-sm font-light leading-relaxed text-[#3f4847] sm:text-base">
                    {study.outcome}
                  </p>
                </div>
              </div>

              {/* 9. MANDATORY SECTION: METRICS */}
              <div id="metrics" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>09 · Verified Quantitative Metrics</span>
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Declassified Intervention Telemetry
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {study.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-5 shadow-sm"
                    >
                      <div className="font-serif text-2xl font-light text-[#a67c45] sm:text-3xl">
                        {metric.value}
                      </div>

                      <div className="font-mono text-xs uppercase tracking-wider text-[#3f4847]">
                        {metric.label}
                      </div>

                      <div className="font-light text-[#777970] text-[11px]">
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
              <div
                id="related-services"
                className="scroll-mt-28 space-y-6 border-t border-[#d8d1c5] pt-12"
              >
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <Layers className="h-3.5 w-3.5" />
                  <span>11 · Specialized Capabilities Deployed</span>
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Related Advisory Practices
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {study.relatedServices.map((service, idx) => (
                    <Link
                      key={idx}
                      href={`/services/${service.slug}`}
                      className="group flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 transition-all hover:border-[#a67c45]/50 hover:bg-[#e5dfd4]"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                          <span>Practice Protocol</span>

                          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>

                        <h3 className="font-serif text-lg font-light text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                          {service.title}
                        </h3>

                        <p className="font-light leading-relaxed text-[#626760] text-xs">
                          {service.role}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: EXECUTIVE BRIEF & JUMP NAVIGATION */}
            <aside className="space-y-6 lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* Dossier Admin Summary Card */}
                <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#d8d1c5] pb-3">
                    <span className="font-mono text-xs font-semibold text-[#a67c45]">
                      {study.refCode}
                    </span>

                    <Badge
                      variant="outline"
                      className="border-[#a67c45]/30 font-mono text-[9px] uppercase text-[#a67c45]"
                    >
                      Classified Brief
                    </Badge>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
                        Sector
                      </span>
                      <span className="text-[#3f4847]">
                        {study.industry}
                      </span>
                    </div>

                    <div>
                      <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
                        Timeframe
                      </span>
                      <span className="text-[#3f4847]">
                        {study.timeframe}
                      </span>
                    </div>

                    <div>
                      <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
                        Primary Vector
                      </span>
                      <span className="text-[#3f4847]">
                        {study.channels[0]}
                      </span>
                    </div>
                  </div>

                  {/* Section Jump Links */}
                  <div className="space-y-2 border-t border-[#d8d1c5] pt-4">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
                      Dossier Structure
                    </span>

                    <nav className="flex flex-col space-y-1.5 font-mono text-xs text-[#626760]">
                      <a
                        href="#challenge"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        03 · Challenge
                      </a>

                      <a
                        href="#objective"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        04 · Objective
                      </a>

                      <a
                        href="#strategy"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        05 · Strategy
                      </a>

                      <a
                        href="#execution"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        06 · Execution
                      </a>

                      <a
                        href="#channels"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        07 · Channels
                      </a>

                      <a
                        href="#outcome"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        08 · Outcome
                      </a>

                      <a
                        href="#metrics"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        09 · Metrics
                      </a>

                      <a
                        href="#gallery"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        10 · Gallery
                      </a>

                      <a
                        href="#related-services"
                        className="transition-colors hover:text-[#a67c45]"
                      >
                        11 · Related Services
                      </a>
                    </nav>
                  </div>

                  {/* Inquire Action Button */}
                  <div className="border-t border-[#d8d1c5] pt-4">
                    <Link href="/about#contact">
                      <Button
                        variant="gold"
                        size="sm"
                        className="w-full py-3 font-mono text-xs uppercase tracking-wider"
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
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#777970] transition-colors hover:text-[#3f4847]"
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
      <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-8">
        <Container size="xl">
          <div className="flex flex-col items-center justify-between gap-4 font-mono text-[10px] text-[#777970] sm:flex-row">
            <p>
              DOCUMENT CODE: {study.refCode} · COMPLIANCE COVENANT ENFORCED ·
              NO FABRICATION STANDARD
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
import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Badge,
  Button,
  MagneticButton,
  SamvadImage,
} from "@samvad/ui";
import {
  getIndustryBySlug,
  getAllIndustrySlugs,
} from "@/lib/industries-data";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Clock,
  AlertTriangle,
  ChevronRight,
  ArrowUpRight,
  Activity,
  Layers,
} from "lucide-react";

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllIndustrySlugs();
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: "Sector Not Found | SAMVAD Perception Advisory",
    };
  }

  return {
    title: `${industry.title} Sector Framework | SAMVAD Perception Advisory`,
    description: industry.shortSummary,
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] flex flex-col justify-center overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24 border-b border-obsidian-800">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gold-500/5 blur-[150px]" />

        <Container size="xl" className="relative z-10 flex-1 flex flex-col justify-center space-y-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400">
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/industries" className="hover:text-sand-300 transition-colors">
              Industries
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">{industry.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs bg-gold-500/10 border border-gold-500/30 px-2.5 py-1 rounded-xs text-gold-400 font-semibold">
                  SECTOR {industry.code}
                </span>
                <Badge variant="outline" className="border-obsidian-750 font-mono text-[9px] uppercase tracking-wider text-sand-300">
                  {industry.categoryGroup}
                </Badge>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.06]">
                  {industry.title}
                </h1>
                <p className="font-serif text-lg sm:text-xl text-gold-300/90 font-normal italic">
                  {industry.tagline}
                </p>
              </div>

              <p className="text-sand-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
                {industry.longDescription}
              </p>

              {/* CMS Governance Disclaimer Pill */}
              <div className="p-3.5 rounded-xs border border-obsidian-800 bg-obsidian-900/60 text-xs text-obsidian-400 font-mono">
                <span className="text-gold-400 font-semibold">[CMS FRAMEWORK]: </span>
                {industry.cmsApprovalNotice}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/#contact">
                  <MagneticButton
                    variant="gold"
                    size="md"
                    className="font-mono text-xs uppercase tracking-wider px-6 py-3.5"
                  >
                    <span>Request {industry.title} Consultation</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </MagneticButton>
                </Link>

                <Link href="/industries">
                  <Button
                    variant="outline"
                    size="md"
                    className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-900 px-6 py-3.5"
                  >
                    All Sectors
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xs border border-obsidian-750 bg-obsidian-900/60 p-3 shadow-2xl backdrop-blur-sm">
                <span className="pointer-events-none absolute -left-1 -top-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
                <span className="pointer-events-none absolute -right-1 -top-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
                <span className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
                <span className="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>

                <SamvadImage
                  assetId={industry.imageAssetId}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="rounded-xs"
                  caption={`${industry.title} sector visual placeholder.`}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. INDUSTRY CHALLENGES SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-red-400">
              <AlertTriangle className="h-3 w-3 text-red-400" />
              Sector Frictions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              High-Consequence Industry Challenges
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed">
              Systemic hurdles, regulatory scrutiny, and market crosswinds unique to {industry.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="font-mono text-xs text-red-400 font-semibold">
                    CHALLENGE 0{idx + 1}
                  </div>
                  <h3 className="font-serif text-lg font-normal text-sand-100">
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-obsidian-850 space-y-1">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400">
                    Enterprise Exposure:
                  </div>
                  <p className="text-xs text-sand-300 font-light">
                    {challenge.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. COMMUNICATION NEEDS SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <Activity className="h-3 w-3 text-gold-400" />
              Strategic Imperatives
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              Core Communication Needs
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed">
              Mandatory perception and communication capabilities required to withstand scrutiny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.communicationNeeds.map((need, idx) => (
              <div
                key={idx}
                className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-gold-400 font-semibold">NEED 0{idx + 1}</span>
                    <span className="text-obsidian-400 font-mono text-[9px] uppercase tracking-wider">
                      {need.urgency}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-sand-100">
                    {need.need}
                  </h3>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    {need.rationale}
                  </p>
                </div>

                <div className="pt-3 border-t border-obsidian-850 flex items-center gap-2 text-xs font-mono text-gold-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>SAMVAD Protocol Specified</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. RELEVANT SERVICES SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <Layers className="h-3 w-3 text-gold-400" />
              Practice Integration
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              Relevant Advisory Services
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed">
              Primary disciplines deployed to navigate {industry.title} headwinds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.relevantServices.map((srv) => (
              <div
                key={srv.slug}
                className="group rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-6 flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-all"
              >
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    {srv.rationale}
                  </p>
                </div>

                <div className="pt-3 border-t border-obsidian-850">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300"
                  >
                    <span>Inspect {srv.title} Practice</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. CASE STUDIES SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                Case Records
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
                Sector Case Precedents
              </h2>
            </div>
            <Link
              href="/#case-studies"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300"
            >
              <span>All Declassified Dossiers</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.caseStudies.map((cs) => (
              <div
                key={cs.ref}
                className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-8 space-y-6"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gold-400 font-semibold">{cs.ref}</span>
                  <span className="text-obsidian-400">{cs.sector}</span>
                </div>
                <h3 className="font-serif text-xl font-normal text-sand-100">
                  {cs.title}
                </h3>
                <p className="text-xs text-sand-400 font-light leading-relaxed">
                  {cs.outcome}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-obsidian-850">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="font-serif text-2xl font-light text-gold-300">
                        {m.value}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-sand-400">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. INSIGHTS SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Thought Leadership
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              Relevant Executive Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.insights.map((insight, idx) => (
              <div
                key={idx}
                className="rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-obsidian-400">
                    <span className="text-gold-400">{insight.category}</span>
                    <span>{insight.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-sand-100">
                    {insight.title}
                  </h3>
                </div>
                <div className="pt-3 border-t border-obsidian-850 flex items-center justify-between text-xs font-mono text-obsidian-400">
                  <span>{insight.author}</span>
                  <Link
                    href="/#intelligence"
                    className="text-gold-400 hover:text-gold-300 inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. CTA SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-gradient-to-b from-obsidian-950 to-obsidian-900 py-24 text-center">
        <Container size="xl" className="space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
              Confidential Sector Briefing
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-light text-sand-100 leading-tight">
            Consult With Our <br />
            <span className="font-normal italic text-gold-300">
              {industry.title} Sector Specialists
            </span>
          </h2>

          <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            Engage our senior partners under non-disclosure protocols to evaluate your sector-specific
            perception risks, regulatory horizons, and narrative architecture.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact">
              <MagneticButton
                variant="gold"
                size="lg"
                className="font-mono text-xs uppercase tracking-wider px-8 py-4"
              >
                <span>Initiate Confidential Assessment</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>

          <div className="pt-6 flex items-center justify-center gap-4 text-xs font-mono text-obsidian-400">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-gold-400" />
              <span>Strict Discretion Protocol</span>
            </div>
            <span className="text-obsidian-700">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold-400" />
              <span>Direct Partner Intake</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

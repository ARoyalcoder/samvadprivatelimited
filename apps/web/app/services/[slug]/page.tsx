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
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Clock,
  CheckCircle2,
  FileText,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs();
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | SAMVAD Perception Advisory",
    };
  }

  return {
    title: `${service.title} | SAMVAD Perception Advisory`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] flex flex-col justify-center overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24 border-b border-obsidian-800">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gold-500/5 blur-[150px]" />

        <Container size="xl" className="relative z-10 flex-1 flex flex-col justify-center">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-[11px] text-obsidian-400">
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/services" className="hover:text-sand-300 transition-colors">
              Services
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Hero Framing */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
                  {service.eyebrow}
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.06]">
                  {service.title}
                </h1>
                <p className="font-serif text-lg sm:text-xl text-gold-300/90 font-normal italic">
                  {service.tagline}
                </p>
              </div>

              <p className="text-sand-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/#contact">
                  <MagneticButton
                    variant="gold"
                    size="md"
                    className="font-mono text-xs uppercase tracking-wider px-6 py-3.5"
                  >
                    <span>Engage {service.title} Practice</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </MagneticButton>
                </Link>

                <Link href="/services">
                  <Button
                    variant="outline"
                    size="md"
                    className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-300 hover:border-gold-500/50 hover:bg-obsidian-900 px-6 py-3.5"
                  >
                    All Practices
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-obsidian-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-gold-400" />
                  <span>Strict NDA Protocol</span>
                </div>
                <span className="text-obsidian-700">·</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Senior Partner Lead</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xs border border-obsidian-750 bg-obsidian-900/60 p-3 shadow-2xl backdrop-blur-sm">
                <span className="pointer-events-none absolute -left-1 -top-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
                <span className="pointer-events-none absolute -right-1 -top-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
                <span className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>
                <span className="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[10px] text-gold-400/80 select-none">+</span>

                <SamvadImage
                  assetId={service.heroAssetId}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="rounded-xs"
                  caption={`${service.title} practice visual dossier.`}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Practice Monograph
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100 leading-tight">
                Strategic Rationale &amp; <br />
                <span className="font-normal italic text-gold-300">
                  Institutional Stakes
                </span>
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-sand-300 font-light text-sm sm:text-base leading-relaxed">
              <p>{service.longOverview}</p>

              <blockquote className="rounded-xs border-l-2 border-gold-400/70 bg-obsidian-900/60 p-6 font-serif text-base sm:text-lg italic text-sand-200 leading-relaxed">
                &ldquo;In high-stakes arenas, organizations do not rise to the level of their PR statements;
                they fall to the strength of their underlying perception architecture.&rdquo;
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CAPABILITIES SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Core Capabilities
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              Specialized Operational Disciplines
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed">
              Specific interventions engineered to insulate institutions and command discourse authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="group rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900/80 shadow-elevation-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-gold-400">0{idx + 1}</span>
                  <CheckCircle2 className="h-4 w-4 text-gold-400/70" />
                </div>
                <h3 className="font-serif text-lg font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                  {cap}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. PROCESS SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Operational Methodology
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              The Four-Stage Engagement Protocol
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed">
              Every mandate follows a rigorous, verified sequence from reconnaissance to permanent anchoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step) => (
              <div
                key={step.phase}
                className="rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-gold-400 font-semibold">{step.phase}</span>
                    <span className="text-obsidian-400">{step.timeframe}</span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-sand-100">
                    {step.title}
                  </h3>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-obsidian-850 space-y-1.5">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400">
                    Key Outputs:
                  </div>
                  <ul className="space-y-1 text-xs text-sand-300 font-light">
                    {step.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-gold-400 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. DELIVERABLES SECTION */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Verified Work Product
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              Tangible Advisory Deliverables
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed">
              Concrete artifacts and operational instruments delivered under this practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.deliverables.map((del, idx) => (
              <div
                key={idx}
                className="rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 flex items-start gap-3.5"
              >
                <div className="h-8 w-8 rounded-xs border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-normal text-sand-100">
                    {del}
                  </h4>
                  <span className="font-mono text-[10px] text-obsidian-400 block mt-1">
                    Verified Advisory Artifact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. RELEVANT INDUSTRIES */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Sector Alignment
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              Relevant Operating Arenas
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed">
              Industries where {service.title} mandates encounter the highest strategic friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.relevantIndustries.map((ind) => (
              <div
                key={ind.id}
                className="rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold-400">{ind.code}</span>
                  <Badge variant="outline" className="border-obsidian-750 font-mono text-[9px] text-sand-300">
                    High Priority
                  </Badge>
                </div>
                <h3 className="font-serif text-lg font-normal text-sand-100">
                  {ind.title}
                </h3>
                <p className="text-xs text-sand-400 font-light leading-relaxed">
                  {ind.relevance}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. RELATED CASE STUDIES */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/40 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                Case Records
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
                Documented Case Impact
              </h2>
            </div>
            <Link
              href="/#case-studies"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300"
            >
              <span>All Case Records</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.relatedCaseStudies.map((cs) => (
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

      {/* 8. RELATED INSIGHTS */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Thought Leadership
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
              Related Executive Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.relatedInsights.map((insight, idx) => (
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

      {/* 9. PRACTICE CTA */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-gradient-to-b from-obsidian-950 to-obsidian-900 py-24 text-center">
        <Container size="xl" className="space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
              Confidential Engagement
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-light text-sand-100 leading-tight">
            Consult With Our <br />
            <span className="font-normal italic text-gold-300">
              {service.title} Practice Partners
            </span>
          </h2>

          <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            Engage our senior counselors under strict non-disclosure covenants to review your
            strategic exposure, upcoming transaction, or crisis horizon.
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
              <span>Zero Leakage Record</span>
            </div>
            <span className="text-obsidian-700">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold-400" />
              <span>4-Hour Executive Callback</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

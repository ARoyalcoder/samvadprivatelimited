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

export const revalidate = 3600;

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

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[75vh] flex-col justify-center overflow-hidden border-b border-[#d8d1c5] pb-20 pt-32 lg:pb-24 lg:pt-36">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[150px]" />

        <Container
          size="xl"
          className="relative z-10 flex flex-1 flex-col justify-center"
        >
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 font-mono text-[11px] text-[#777970]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#3f4847]"
            >
              Home
            </Link>

            <ChevronRight className="h-3 w-3" />

            <Link
              href="/services"
              className="transition-colors hover:text-[#3f4847]"
            >
              Services
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-[#a67c45]">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Hero Framing */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#ebe7de] px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a67c45]" />

                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#a67c45]">
                  {service.eyebrow}
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl font-light leading-[1.06] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
                  {service.title}
                </h1>

                <p className="font-serif text-lg font-normal italic text-[#a67c45] sm:text-xl">
                  {service.tagline}
                </p>
              </div>

              <p className="max-w-2xl font-light leading-relaxed text-[#626760] text-sm sm:text-base">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/#contact">
                  <MagneticButton
                    variant="gold"
                    size="md"
                    className="px-6 py-3.5 font-mono text-xs uppercase tracking-wider"
                  >
                    <span>Engage {service.title} Practice</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </MagneticButton>
                </Link>

                <Link href="/services">
                  <Button
                    variant="outline"
                    size="md"
                    className="border-[#c9c2b6] bg-[#f3f0e8] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#3f4847] hover:border-[#a67c45]/50 hover:bg-[#ebe7de]"
                  >
                    All Practices
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-2 font-mono text-xs text-[#777970]">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
                  <span>Strict NDA Protocol</span>
                </div>

                <span className="text-[#c5beb2]">·</span>

                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#66816d]" />
                  <span>Senior Partner Lead</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Asset */}
            <div className="relative lg:col-span-5">
              <div className="relative rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-3 shadow-sm">
                <span className="pointer-events-none absolute -left-1 -top-1 select-none font-mono text-[10px] text-[#a67c45]/80">
                  +
                </span>

                <span className="pointer-events-none absolute -right-1 -top-1 select-none font-mono text-[10px] text-[#a67c45]/80">
                  +
                </span>

                <span className="pointer-events-none absolute -bottom-1 -left-1 select-none font-mono text-[10px] text-[#a67c45]/80">
                  +
                </span>

                <span className="pointer-events-none absolute -bottom-1 -right-1 select-none font-mono text-[10px] text-[#a67c45]/80">
                  +
                </span>

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
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
                Practice Monograph
              </div>

              <h2 className="font-serif text-3xl font-light leading-tight text-[#1d2529] sm:text-4xl">
                Strategic Rationale &amp; <br />
                <span className="font-normal italic text-[#a67c45]">
                  Institutional Stakes
                </span>
              </h2>
            </div>

            <div className="space-y-6 font-light leading-relaxed text-[#626760] text-sm sm:text-base lg:col-span-8">
              <p>{service.longOverview}</p>

              <blockquote className="rounded-xs border-l-2 border-[#a67c45]/70 bg-[#f3f0e8] p-6 font-serif text-base italic leading-relaxed text-[#3f4847] sm:text-lg">
                &ldquo;In high-stakes arenas, organizations do not rise to the
                level of their PR statements; they fall to the strength of
                their underlying perception architecture.&rdquo;
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CAPABILITIES SECTION */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              Core Capabilities
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Specialized Operational Disciplines
            </h2>

            <p className="font-light leading-relaxed text-[#626760] text-xs sm:text-sm">
              Specific interventions designed to protect institutional
              position and strengthen narrative authority.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="group rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm transition-all duration-300 hover:border-[#a67c45]/40 hover:bg-[#e5dfd4]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#a67c45]">
                    0{idx + 1}
                  </span>

                  <CheckCircle2 className="h-4 w-4 text-[#a67c45]/70" />
                </div>

                <h3 className="font-serif text-lg font-normal text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                  {cap}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. PROCESS SECTION */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              Operational Methodology
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              The Four-Stage Engagement Protocol
            </h2>

            <p className="font-light leading-relaxed text-[#626760] text-xs sm:text-sm">
              A disciplined sequence from reconnaissance through permanent
              anchoring.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step) => (
              <div
                key={step.phase}
                className="flex flex-col justify-between space-y-6 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-semibold text-[#a67c45]">
                      {step.phase}
                    </span>

                    <span className="text-[#777970]">
                      {step.timeframe}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                    {step.title}
                  </h3>

                  <p className="font-light leading-relaxed text-[#626760] text-xs">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-[#d8d1c5] pt-3">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#777970]">
                    Key Outputs:
                  </div>

                  <ul className="space-y-1 font-light text-[#3f4847] text-xs">
                    {step.deliverables.map((del, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-center gap-1.5"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#a67c45]" />
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
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              Verified Work Product
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Tangible Advisory Deliverables
            </h2>

            <p className="font-light leading-relaxed text-[#626760] text-xs sm:text-sm">
              Concrete artifacts and operational instruments delivered under
              this practice.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((del, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 text-[#a67c45]">
                  <FileText className="h-4 w-4" />
                </div>

                <div>
                  <h4 className="font-serif text-base font-normal text-[#1d2529]">
                    {del}
                  </h4>

                  <span className="mt-1 block font-mono text-[10px] text-[#777970]">
                    Verified Advisory Artifact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. RELEVANT INDUSTRIES */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              Sector Alignment
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Relevant Operating Arenas
            </h2>

            <p className="font-light leading-relaxed text-[#626760] text-xs sm:text-sm">
              Industries where {service.title} mandates encounter the highest
              strategic friction.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {service.relevantIndustries.map((ind) => (
              <div
                key={ind.id}
                className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#a67c45]">
                    {ind.code}
                  </span>

                  <Badge
                    variant="outline"
                    className="border-[#c9c2b6] font-mono text-[9px] text-[#626760]"
                  >
                    High Priority
                  </Badge>
                </div>

                <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                  {ind.title}
                </h3>

                <p className="font-light leading-relaxed text-[#626760] text-xs">
                  {ind.relevance}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. RELATED CASE STUDIES */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
                Case Records
              </div>

              <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
                Documented Case Impact
              </h2>
            </div>

            <Link
              href="/#case-studies"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#a67c45] hover:text-[#8d683d]"
            >
              <span>All Case Records</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {service.relatedCaseStudies.map((cs) => (
              <div
                key={cs.ref}
                className="space-y-6 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 shadow-sm"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-semibold text-[#a67c45]">
                    {cs.ref}
                  </span>

                  <span className="text-[#777970]">{cs.sector}</span>
                </div>

                <h3 className="font-serif text-xl font-normal text-[#1d2529]">
                  {cs.title}
                </h3>

                <p className="font-light leading-relaxed text-[#626760] text-xs">
                  {cs.outcome}
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-[#d8d1c5] pt-4">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="font-serif text-2xl font-light text-[#a67c45]">
                        {m.value}
                      </div>

                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#777970]">
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
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              Thought Leadership
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Related Executive Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.relatedInsights.map((insight, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between space-y-4 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#777970]">
                    <span className="text-[#a67c45]">
                      {insight.category}
                    </span>

                    <span>{insight.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                    {insight.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t border-[#d8d1c5] pt-3 font-mono text-xs text-[#777970]">
                  <span>{insight.author}</span>

                  <Link
                    href="/#intelligence"
                    className="inline-flex items-center gap-1 text-[#a67c45] hover:text-[#8d683d]"
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
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 text-center">
        <Container size="xl" className="mx-auto max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#ebe7de] px-3.5 py-1.5">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#a67c45]">
              Confidential Engagement
            </span>
          </div>

          <h2 className="font-serif text-4xl font-light leading-tight text-[#1d2529] sm:text-5xl">
            Consult With Our <br />
            <span className="font-normal italic text-[#a67c45]">
              {service.title} Practice Partners
            </span>
          </h2>

          <p className="mx-auto max-w-xl font-light leading-relaxed text-[#626760] text-sm sm:text-base">
            Engage our senior counselors under strict non-disclosure
            covenants to review your strategic exposure, transaction, or
            crisis horizon.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/#contact">
              <MagneticButton
                variant="gold"
                size="lg"
                className="px-8 py-4 font-mono text-xs uppercase tracking-wider"
              >
                <span>Initiate Confidential Assessment</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 pt-6 font-mono text-xs text-[#777970]">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>Zero Leakage Record</span>
            </div>

            <span className="text-[#c5beb2]">·</span>

            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>4-Hour Executive Callback</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
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

export default async function IndustryDetailPage({
  params,
}: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] flex flex-col justify-center overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24 border-b border-[#d8d1c5]">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-[#a67c45]/5 blur-[150px]" />

        <Container
          size="xl"
          className="relative z-10 flex-1 flex flex-col justify-center space-y-8"
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
              href="/industries"
              className="transition-colors hover:text-[#3f4847]"
            >
              Industries
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-[#a67c45]">{industry.title}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Hero Content */}
            <div className="space-y-6 lg:col-span-7">
              <div className="flex items-center gap-2.5">
                <span className="rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[#8d683d]">
                  SECTOR {industry.code}
                </span>

                <Badge
                  variant="outline"
                  className="border-[#c9c2b6] bg-[#ebe7de] font-mono text-[9px] uppercase tracking-wider text-[#626760]"
                >
                  {industry.categoryGroup}
                </Badge>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl font-light leading-[1.06] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
                  {industry.title}
                </h1>

                <p className="font-serif text-lg font-normal italic text-[#a67c45] sm:text-xl">
                  {industry.tagline}
                </p>
              </div>

              <p className="max-w-2xl text-sm font-light leading-relaxed text-[#626760] sm:text-base">
                {industry.longDescription}
              </p>

              {/* CMS Governance Disclaimer Pill */}
              <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-3.5 font-mono text-xs text-[#777970]">
                <span className="font-semibold text-[#a67c45]">
                  [CMS FRAMEWORK]:{" "}
                </span>
                {industry.cmsApprovalNotice}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/#contact">
                  <MagneticButton
                    variant="gold"
                    size="md"
                    className="px-6 py-3.5 font-mono text-xs uppercase tracking-wider"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </MagneticButton>
                </Link>

                <Link href="/industries">
                  <Button
                    variant="outline"
                    size="md"
                    className="border-[#c9c2b6] bg-[#f3f0e8] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#3f4847] hover:border-[#a67c45]/50 hover:bg-[#ebe7de]"
                  >
                    All Sectors
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
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
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <AlertTriangle className="h-3 w-3 text-[#a67c45]" />
              Sector Frictions
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Industry Challenges
            </h2>

            <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
              Key risks and pressures across {industry.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {industry.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between space-y-4 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="font-mono text-xs font-semibold text-[#a67c45]">
                    CHALLENGE 0{idx + 1}
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                    {challenge.title}
                  </h3>

                  <p className="text-xs font-light leading-relaxed text-[#626760]">
                    {challenge.description}
                  </p>
                </div>

                <div className="space-y-1 border-t border-[#d8d1c5] pt-3">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#777970]">
                    Enterprise Exposure
                  </div>

                  <p className="text-xs font-light text-[#3f4847]">
                    {challenge.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. COMMUNICATION NEEDS SECTION */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <Activity className="h-3 w-3 text-[#a67c45]" />
              Strategic Imperatives
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Communication Needs
            </h2>

            <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
              Core capabilities required under scrutiny.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {industry.communicationNeeds.map((need, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-semibold text-[#a67c45]">
                      NEED 0{idx + 1}
                    </span>

                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#777970]">
                      {need.urgency}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                    {need.need}
                  </h3>

                  <p className="text-xs font-light leading-relaxed text-[#626760]">
                    {need.rationale}
                  </p>
                </div>

                <div className="flex items-center gap-2 border-t border-[#d8d1c5] pt-3 font-mono text-xs text-[#a67c45]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Protocol Specified</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. RELEVANT SERVICES SECTION */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <Layers className="h-3 w-3 text-[#a67c45]" />
              Practice Integration
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Relevant Advisory Services
            </h2>

            <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
              Practices deployed across {industry.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {industry.relevantServices.map((srv) => (
              <div
                key={srv.slug}
                className="group flex flex-col justify-between space-y-4 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm transition-all hover:border-[#a67c45]/40 hover:bg-[#eee9df]"
              >
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-normal text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                    {srv.title}
                  </h3>

                  <p className="text-xs font-light leading-relaxed text-[#626760]">
                    {srv.rationale}
                  </p>
                </div>

                <div className="border-t border-[#d8d1c5] pt-3">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#a67c45] hover:text-[#8d683d]"
                  >
                    <span>View Practice</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. CASE STUDIES SECTION */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
                Case Records
              </div>

              <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
                Sector Case Records
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
            {industry.caseStudies.map((cs) => (
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

                <p className="text-xs font-light leading-relaxed text-[#626760]">
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

      {/* 6. INSIGHTS SECTION */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#ebe7de] py-20 lg:py-28">
        <Container size="xl" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              Research
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
              Executive Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.insights.map((insight, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between space-y-4 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm"
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

                <div className="flex items-center justify-between border-t border-[#d8d1c5] pt-3 text-xs font-mono text-[#777970]">
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

      {/* 7. CTA SECTION */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 text-center">
        <Container size="xl" className="mx-auto max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#ebe7de] px-3.5 py-1.5">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#a67c45]">
              Confidential Briefing
            </span>
          </div>

          <h2 className="font-serif text-4xl font-light leading-tight text-[#1d2529] sm:text-5xl">
            Consult Our
            <br />
            <span className="font-normal italic text-[#a67c45]">
              {industry.title} Specialists
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-[#626760] sm:text-base">
            Review sector-specific perception, regulatory, and narrative
            risks under strict confidentiality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/#contact">
              <MagneticButton
                variant="gold"
                size="lg"
                className="px-8 py-4 font-mono text-xs uppercase tracking-wider"
              >
                <span>Request Assessment</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 pt-6 font-mono text-xs text-[#777970]">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>Strict Discretion</span>
            </div>

            <span className="text-[#c5beb2]">·</span>

            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>Partner Intake</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
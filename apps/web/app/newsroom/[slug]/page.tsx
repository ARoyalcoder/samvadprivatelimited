import * as React from "react";

import type { Metadata } from "next";

import Link from "next/link";

import { notFound } from "next/navigation";

import {
  Container,
  Badge,
  SamvadImage,
} from "@samvad/ui";

import {
  getNewsroomItemBySlug,
  getAllNewsroomSlugs,
  getRelatedNewsroomItems,
} from "@/lib/newsroom-data";

import { SocialShareBar } from "@/components/insights/social-share-bar";

import {
  Calendar,
  MapPin,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Mail,
  Quote,
  CheckCircle2,
  FileText,
  CalendarCheck,
} from "lucide-react";

interface NewsroomDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllNewsroomSlugs();
}

export async function generateMetadata({
  params,
}: NewsroomDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsroomItemBySlug(slug);

  if (!item) {
    return {
      title: "Dispatch Not Found | SAMVAD Newsroom",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://samvad.advisory";
  const itemUrl = `${siteUrl}/newsroom/${item.slug}`;

  return {
    title: `${item.refCode}: ${item.title} | SAMVAD Newsroom`,
    description: item.summary,
    openGraph: {
      title: `${item.refCode}: ${item.title}`,
      description: item.summary,
      url: itemUrl,
      type: "article",
      publishedTime: item.publishedAt,
      siteName: "SAMVAD Perception Advisory Newsroom",
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
    },
  };
}

export default async function NewsroomDetailPage({
  params,
}: NewsroomDetailPageProps) {
  const { slug } = await params;
  const item = getNewsroomItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedNewsroomItems(item.slug, 3);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://samvad.advisory";
  const itemUrl = `${siteUrl}/newsroom/${item.slug}`;

  // Structured Data (JSON-LD) NewsArticle
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.summary,
    url: itemUrl,
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "SAMVAD Perception Advisory",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": itemUrl,
    },
    keywords: item.tags.join(", "),
  };

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* JSON-LD Structured Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HEADER & METADATA */}
      <header className="relative overflow-hidden border-b border-[#d8d1c5] pb-12 pt-32 lg:pb-16 lg:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[160px]" />

        <Container size="lg" className="relative z-10 space-y-8">
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
              href="/newsroom"
              className="transition-colors hover:text-[#3f4847]"
            >
              Newsroom
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-[#a67c45]">{item.refCode}</span>
          </nav>

          {/* Classification & Administrative Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d8d1c5] pb-4">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 px-2.5 py-1 font-semibold text-[#a67c45]">
                {item.refCode}
              </span>

              <Badge
                variant="outline"
                className="border-[#c9c2b6] bg-[#ebe7de] font-mono text-[9px] uppercase tracking-wider text-[#626760]"
              >
                {item.typeLabel}
              </Badge>

              <span className="text-[#c5beb2]">·</span>

              <span className="text-[#777970]">{item.classification}</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#777970]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>Verified Provenance</span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4">
            <h1 className="font-serif text-3xl font-light leading-[1.12] tracking-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>

            <p className="font-sans text-base font-light leading-relaxed text-[#626760] sm:text-lg">
              {item.subtitle}
            </p>
          </div>

          {/* Dateline & Publication Date Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#d8d1c5] pt-4 font-mono text-xs text-[#777970]">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#a67c45]" />

              <span className="font-semibold uppercase tracking-wider text-[#3f4847]">
                {item.dateline}
              </span>

              <span>—</span>

              <Calendar className="h-3.5 w-3.5" />

              <time dateTime={item.publishedAt}>
                {item.publishedDisplay}
              </time>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase text-[#aaa398]">
                Quarter: {item.quarter}
              </span>
            </div>
          </div>

          {/* Social Share Bar */}
          <SocialShareBar title={item.title} url={itemUrl} />
        </Container>
      </header>

      {/* 2. COVER VISUAL */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-10">
        <Container size="lg">
          <figure className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] shadow-sm">
              <SamvadImage
                assetId={item.coverAssetId}
                aspectRatio="16:9"
                priority
                className="h-full w-full object-cover"
                caption={item.coverCaption}
              />
            </div>

            <figcaption className="mx-auto max-w-2xl text-center font-sans text-xs italic text-[#777970]">
              {item.coverCaption}
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* 3. MAIN RELEASE BODY */}
      <main className="bg-[#f3f0e8] py-16 lg:py-20">
        <Container size="lg">
          <article className="mx-auto max-w-3xl space-y-12">
            {/* Lead Summary */}
            <div className="rounded-xs border-l-2 border-[#a67c45] bg-[#ebe7de] p-6 shadow-sm sm:p-8">
              <p className="font-sans text-sm font-normal leading-relaxed text-[#3f4847] sm:text-base">
                <strong>{item.dateline}</strong> — {item.summary}
              </p>
            </div>

            {/* Event Specific Card (if Event) */}
            {item.eventDetails && (
              <div className="space-y-4 rounded-xs border border-[#a67c45]/30 bg-[#ebe7de] p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <CalendarCheck className="h-4 w-4 text-[#a67c45]" />
                  <span>Official Event Schedule &amp; Accreditation</span>
                </div>

                <div className="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2">
                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Dates
                    </span>
                    <span className="font-semibold text-[#1d2529]">
                      {item.eventDetails.date}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Location
                    </span>
                    <span className="font-semibold text-[#1d2529]">
                      {item.eventDetails.location}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Format
                    </span>
                    <span className="text-[#3f4847]">
                      {item.eventDetails.format}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Delegation Protocol
                    </span>
                    <span className="font-medium text-[#a67c45]">
                      {item.eventDetails.registrationStatus}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Media Coverage Notice (if Media Coverage) */}
            {item.coverageSource && (
              <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 font-mono text-xs">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#a67c45]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Factual Media Verification Notice</span>
                </div>

                <div className="font-semibold text-[#1d2529]">
                  {item.coverageSource.publicationCategory}
                </div>

                <p className="text-[11px] font-light leading-relaxed text-[#777970]">
                  {item.coverageSource.verifiedNote}
                </p>
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-6 text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              {item.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Executive Quote Block */}
            {item.executiveQuote && (
              <div className="relative my-8 overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm sm:p-8">
                <Quote className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-[#a67c45]/10" />

                <blockquote className="relative z-10 space-y-3">
                  <p className="font-serif text-lg font-light italic leading-relaxed text-[#8d683d] sm:text-xl">
                    &ldquo;{item.executiveQuote.quote}&rdquo;
                  </p>

                  <footer className="border-t border-[#d8d1c5] pt-2 font-mono text-xs uppercase tracking-wider text-[#777970]">
                    <strong className="block font-serif text-sm font-normal normal-case text-[#1d2529]">
                      {item.executiveQuote.speaker}
                    </strong>

                    <span className="text-[11px] text-[#777970]">
                      {item.executiveQuote.role}
                    </span>
                  </footer>
                </blockquote>
              </div>
            )}

            {/* Operational Bullet Points */}
            {item.bulletPoints && item.bulletPoints.length > 0 && (
              <div className="space-y-3 rounded-xs border border-[#d8d1c5] bg-[#ebe7de] p-6">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Key Disclosure Highlights &amp; Mandate Terms</span>
                </div>

                <ul className="space-y-2">
                  {item.bulletPoints.map((bp, bIndex) => (
                    <li
                      key={bIndex}
                      className="flex items-start gap-2.5 text-xs font-light text-[#626760] sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a67c45]" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Standard Institutional Boilerplate */}
            <div className="space-y-3 border-t border-[#d8d1c5] pt-8 text-xs text-[#777970]">
              <h3 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#a67c45]">
                About SAMVAD Perception Advisory
              </h3>

              <p className="font-light leading-relaxed">
                SAMVAD Perception Advisory Private Limited is a specialized
                strategic communications and perception advisory firm. The
                firm counsels sovereign institutions, multilateral consortia,
                and enterprise boards operating in high-consequence
                regulatory and market environments. SAMVAD operates principal
                offices in New Delhi, Mumbai, Bengaluru, and Singapore.
              </p>
            </div>

            {/* Official Media Contact Box */}
            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-[#d8d1c5] pb-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Official Media Relations Contact</span>
                </div>

                <span className="font-mono text-[10px] text-[#777970]">
                  REF: {item.refCode}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2">
                <div>
                  <span className="block text-[10px] uppercase text-[#aaa398]">
                    Designated Desk
                  </span>
                  <span className="block font-medium text-[#1d2529]">
                    {item.pressContact.name}
                  </span>
                  <span className="block text-[11px] text-[#777970]">
                    {item.pressContact.title}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase text-[#aaa398]">
                    Inquiries Email
                  </span>

                  <a
                    href={`mailto:${item.pressContact.email}`}
                    className="text-[#a67c45] hover:text-[#8d683d]"
                  >
                    {item.pressContact.email}
                  </a>
                </div>

                <div>
                  <span className="block text-[10px] uppercase text-[#aaa398]">
                    Telephone Desk
                  </span>
                  <span className="text-[#3f4847]">
                    {item.pressContact.phone}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase text-[#aaa398]">
                    Office Location
                  </span>
                  <span className="text-[#3f4847]">
                    {item.pressContact.officeLocation}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Social Share Bar */}
            <SocialShareBar title={item.title} url={itemUrl} />

            {/* Back link */}
            <div className="pt-2 text-center">
              <Link
                href="/newsroom"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#777970] transition-colors hover:text-[#3f4847]"
              >
                <span>← Return to Newsroom Archive</span>
              </Link>
            </div>
          </article>
        </Container>
      </main>

      {/* 4. RELATED NEWSROOM ITEMS */}
      {related.length > 0 && (
        <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-16 lg:py-20">
          <Container size="xl" className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  Archive Navigation
                </span>

                <h2 className="font-serif text-2xl font-light text-[#1d2529]">
                  Related Public Dispatches
                </h2>
              </div>

              <Link
                href="/newsroom"
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#a67c45] hover:text-[#8d683d]"
              >
                <span>View Full Newsroom</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 shadow-sm transition-all hover:border-[#a67c45]/40 hover:bg-[#eee9df]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#777970]">
                      <span className="font-semibold text-[#a67c45]">
                        {rel.refCode}
                      </span>

                      <span>{rel.publishedDisplay}</span>
                    </div>

                    <h3 className="font-serif text-lg font-light leading-snug text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                      <Link href={`/newsroom/${rel.slug}`}>
                        {rel.title}
                      </Link>
                    </h3>

                    <p className="line-clamp-2 font-sans text-xs font-light leading-relaxed text-[#626760]">
                      {rel.summary}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#d8d1c5] pt-4 font-mono text-xs">
                    <Badge
                      variant="outline"
                      className="border-[#c9c2b6] font-mono text-[9px] uppercase text-[#626760]"
                    >
                      {rel.typeLabel}
                    </Badge>

                    <Link
                      href={`/newsroom/${rel.slug}`}
                      className="flex items-center gap-1 text-[11px] text-[#a67c45] transition-transform group-hover:translate-x-0.5 hover:text-[#8d683d]"
                    >
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. FOOTER STATUTORY DISCLAIMER */}
      <footer className="border-t border-[#d8d1c5] bg-[#f3f0e8] py-8">
        <Container size="xl">
          <div className="flex flex-col items-center justify-between gap-4 font-mono text-[10px] text-[#aaa398] sm:flex-row">
            <p>
              DISCLOSURE CODE: {item.refCode} · OFFICIAL INSTITUTIONAL RECORD ·
              VERIFIED PROVENANCE
            </p>

            <p>
              ISSUED BY OFFICE OF THE PRESS SECRETARY · SAMVAD PERCEPTION
              ADVISORY
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
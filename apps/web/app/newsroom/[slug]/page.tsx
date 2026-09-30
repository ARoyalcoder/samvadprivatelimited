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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samvad.advisory";
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samvad.advisory";
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
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* JSON-LD Structured Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HEADER & METADATA */}
      <header className="relative overflow-hidden pt-32 pb-12 lg:pt-36 lg:pb-16 border-b border-obsidian-800">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="lg" className="relative z-10 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400"
          >
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/newsroom"
              className="hover:text-sand-300 transition-colors"
            >
              Newsroom
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">{item.refCode}</span>
          </nav>

          {/* Classification & Administrative Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-obsidian-800 pb-4">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="text-gold-400 font-semibold bg-gold-500/10 border border-gold-500/30 px-2.5 py-1 rounded-xs">
                {item.refCode}
              </span>
              <Badge
                variant="outline"
                className="border-obsidian-750 bg-obsidian-900 font-mono text-[9px] uppercase tracking-wider text-sand-300"
              >
                {item.typeLabel}
              </Badge>
              <span className="text-obsidian-500">·</span>
              <span className="text-obsidian-400">{item.classification}</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
              <span>Cryptographic Provenance Verified</span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-sand-100 leading-[1.12]">
              {item.title}
            </h1>
            <p className="font-sans text-base sm:text-lg text-sand-300 font-light leading-relaxed">
              {item.subtitle}
            </p>
          </div>

          {/* Dateline & Publication Date Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-obsidian-800 font-mono text-xs text-obsidian-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold-400" />
              <span className="font-semibold text-sand-200 uppercase tracking-wider">
                {item.dateline}
              </span>
              <span>—</span>
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={item.publishedAt}>{item.publishedDisplay}</time>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase text-obsidian-500">
                Quarter: {item.quarter}
              </span>
            </div>
          </div>

          {/* Social Share Bar */}
          <SocialShareBar title={item.title} url={itemUrl} />
        </Container>
      </header>

      {/* 2. COVER VISUAL */}
      <section className="border-b border-obsidian-800 bg-obsidian-950 py-10">
        <Container size="lg">
          <figure className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-obsidian-750 bg-obsidian-900 shadow-2xl">
              <SamvadImage
                assetId={item.coverAssetId}
                aspectRatio="16:9"
                priority
                className="h-full w-full object-cover"
                caption={item.coverCaption}
              />
            </div>
            <figcaption className="font-sans text-xs text-obsidian-400 italic text-center max-w-2xl mx-auto">
              {item.coverCaption}
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* 3. MAIN RELEASE BODY */}
      <main className="py-16 lg:py-20">
        <Container size="lg">
          <article className="max-w-3xl mx-auto space-y-12">
            {/* Lead Summary */}
            <div className="rounded-xs border-l-2 border-gold-400 bg-obsidian-900/60 p-6 sm:p-8 backdrop-blur-sm">
              <p className="font-sans text-sm sm:text-base text-sand-200 font-normal leading-relaxed">
                <strong>{item.dateline}</strong> — {item.summary}
              </p>
            </div>

            {/* Event Specific Card (if Event) */}
            {item.eventDetails && (
              <div className="rounded-xs border border-gold-500/30 bg-obsidian-900/80 p-6 sm:p-8 space-y-4 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <CalendarCheck className="h-4 w-4 text-gold-400" />
                  <span>Official Event Schedule &amp; Accreditation</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-obsidian-400 uppercase block">Dates</span>
                    <span className="text-sand-100 font-semibold">{item.eventDetails.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-obsidian-400 uppercase block">Location</span>
                    <span className="text-sand-100 font-semibold">{item.eventDetails.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-obsidian-400 uppercase block">Format</span>
                    <span className="text-sand-100">{item.eventDetails.format}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-obsidian-400 uppercase block">Delegation Protocol</span>
                    <span className="text-gold-300 font-medium">{item.eventDetails.registrationStatus}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Media Coverage Notice (if Media Coverage) */}
            {item.coverageSource && (
              <div className="rounded-xs border border-obsidian-750 bg-obsidian-950 p-6 space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-gold-400 text-[10px] uppercase tracking-widest font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Factual Media Verification Notice</span>
                </div>
                <div className="text-sand-200 font-semibold">
                  {item.coverageSource.publicationCategory}
                </div>
                <p className="text-[11px] text-obsidian-400 font-light leading-relaxed">
                  {item.coverageSource.verifiedNote}
                </p>
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-6 text-sm sm:text-base text-sand-300 font-light leading-relaxed">
              {item.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Executive Quote Block */}
            {item.executiveQuote && (
              <div className="my-8 rounded-xs border border-obsidian-750 bg-obsidian-900/90 p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
                <Quote className="absolute -bottom-4 -right-4 h-24 w-24 text-gold-500/5 pointer-events-none" />
                <blockquote className="space-y-3 relative z-10">
                  <p className="font-serif text-lg sm:text-xl text-gold-200 font-light leading-relaxed italic">
                    &ldquo;{item.executiveQuote.quote}&rdquo;
                  </p>
                  <footer className="font-mono text-xs uppercase tracking-wider text-obsidian-300 pt-2 border-t border-obsidian-800">
                    <strong className="text-sand-100 block normal-case font-serif text-sm">
                      {item.executiveQuote.speaker}
                    </strong>
                    <span className="text-obsidian-400 text-[11px]">
                      {item.executiveQuote.role}
                    </span>
                  </footer>
                </blockquote>
              </div>
            )}

            {/* Operational Bullet Points */}
            {item.bulletPoints && item.bulletPoints.length > 0 && (
              <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/50 p-6 space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-wider text-gold-400 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Key Disclosure Highlights &amp; Mandate Terms</span>
                </div>
                <ul className="space-y-2">
                  {item.bulletPoints.map((bp, bIndex) => (
                    <li
                      key={bIndex}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-sand-300 font-light"
                    >
                      <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Standard Institutional Boilerplate */}
            <div className="rounded-xs border-t border-obsidian-800 pt-8 space-y-3 text-xs text-obsidian-400">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                About SAMVAD Perception Advisory
              </h3>
              <p className="leading-relaxed font-light">
                SAMVAD Perception Advisory Private Limited is a specialized strategic communications and perception advisory firm. The firm counsels sovereign institutions, multilateral consortia, and enterprise boards operating in high-consequence regulatory and market environments. SAMVAD operates principal offices in New Delhi, Mumbai, Bengaluru, and Singapore.
              </p>
            </div>

            {/* Official Media Contact Box */}
            <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-6 sm:p-8 space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Official Media Relations Contact</span>
                </div>
                <span className="font-mono text-[10px] text-obsidian-400">
                  REF: {item.refCode}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-obsidian-500 uppercase block">Designated Desk</span>
                  <span className="text-sand-100 font-medium block">{item.pressContact.name}</span>
                  <span className="text-obsidian-400 text-[11px] block">{item.pressContact.title}</span>
                </div>
                <div>
                  <span className="text-[10px] text-obsidian-500 uppercase block">Inquiries Email</span>
                  <a href={`mailto:${item.pressContact.email}`} className="text-gold-400 hover:text-gold-300">
                    {item.pressContact.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-obsidian-500 uppercase block">Telephone Desk</span>
                  <span className="text-sand-200">{item.pressContact.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-obsidian-500 uppercase block">Office Location</span>
                  <span className="text-sand-200">{item.pressContact.officeLocation}</span>
                </div>
              </div>
            </div>

            {/* Bottom Social Share Bar */}
            <SocialShareBar title={item.title} url={itemUrl} />

            {/* Back link */}
            <div className="pt-2 text-center">
              <Link
                href="/newsroom"
                className="inline-flex items-center gap-2 font-mono text-xs text-obsidian-400 hover:text-sand-300 transition-colors"
              >
                <span>← Return to Master Dispatches Archive</span>
              </Link>
            </div>
          </article>
        </Container>
      </main>

      {/* 4. RELATED NEWSROOM ITEMS */}
      {related.length > 0 && (
        <section className="border-t border-obsidian-800 bg-obsidian-900/50 py-16 lg:py-20">
          <Container size="xl" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  Archive Navigation
                </span>
                <h2 className="font-serif text-2xl font-light text-sand-100">
                  Related Public Dispatches
                </h2>
              </div>
              <Link
                href="/newsroom"
                className="font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
              >
                <span>View Full Newsroom</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col justify-between rounded-xs border border-obsidian-750 bg-obsidian-900/70 p-6 hover:border-gold-500/40 hover:bg-obsidian-900/90 transition-all shadow-elevation-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[10px] text-obsidian-400">
                      <span className="text-gold-400 font-semibold">{rel.refCode}</span>
                      <span>{rel.publishedDisplay}</span>
                    </div>

                    <h3 className="font-serif text-lg font-light text-sand-100 group-hover:text-gold-200 transition-colors leading-snug">
                      <Link href={`/newsroom/${rel.slug}`}>{rel.title}</Link>
                    </h3>

                    <p className="font-sans text-xs text-sand-400 font-light leading-relaxed line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-obsidian-800 mt-4 flex items-center justify-between font-mono text-xs">
                    <Badge variant="outline" className="border-obsidian-750 font-mono text-[9px] uppercase text-sand-300">
                      {rel.typeLabel}
                    </Badge>

                    <Link
                      href={`/newsroom/${rel.slug}`}
                      className="text-gold-400 hover:text-gold-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]"
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
      <footer className="border-t border-obsidian-800 bg-obsidian-950 py-8">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-obsidian-500">
            <p>
              DISCLOSURE CODE: {item.refCode} · OFFICIAL INSTITUTIONAL RECORD · VERIFIED PROVENANCE
            </p>
            <p>
              ISSUED BY OFFICE OF THE PRESS SECRETARY · SAMVAD PERCEPTION ADVISORY
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

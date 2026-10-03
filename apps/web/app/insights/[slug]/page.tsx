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
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
} from "@/lib/insights-data";

import { ReadingProgress } from "@/components/insights/reading-progress";

import { SocialShareBar } from "@/components/insights/social-share-bar";

import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  Tag,
  Quote,
  ShieldCheck,
} from "lucide-react";

interface InsightPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllArticleSlugs();
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | SAMVAD Perception Advisory",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://samvad.advisory";

  const articleUrl = `${siteUrl}/insights/${article.slug}`;

  return {
    title: `${article.title} | SAMVAD Insights`,
    description: article.seo.metaDescription,
    keywords: article.seo.keywords,
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      url: articleUrl,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      siteName: "SAMVAD Perception Advisory",
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      creator: "@SAMVAD_Advisory",
    },
  };
}

export default async function InsightDetailPage({
  params,
}: InsightPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article.slug, 3);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://samvad.advisory";

  const articleUrl = `${siteUrl}/insights/${article.slug}`;

  // Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      worksFor: {
        "@type": "Organization",
        name: article.author.affiliation,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "SAMVAD Perception Advisory",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: article.tags.join(", "),
  };

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* JSON-LD Structured Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* 1. ARTICLE HERO & MASTHEAD */}
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
              href="/insights"
              className="transition-colors hover:text-[#3f4847]"
            >
              Insights
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-[#a67c45]">{article.category}</span>
          </nav>

          {/* Category & Timing */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="border-[#a67c45]/40 bg-[#a67c45]/10 font-mono text-[10px] uppercase tracking-widest text-[#8d683d]"
            >
              {article.category}
            </Badge>

            <span className="font-mono text-xs text-[#c5beb2]">·</span>

            <span className="flex items-center gap-1.5 font-mono text-xs text-[#777970]">
              <Clock className="h-3.5 w-3.5 text-[#a67c45]" />
              {article.readingTimeMinutes} min
            </span>

            <span className="font-mono text-xs text-[#c5beb2]">·</span>

            <span className="flex items-center gap-1.5 font-mono text-xs text-[#777970]">
              <Calendar className="h-3.5 w-3.5" />

              <time dateTime={article.publishedAt}>
                {article.publishedDisplay}
              </time>
            </span>
          </div>

          {/* Editorial Headline */}
          <div className="space-y-6">
            <h1 className="font-serif text-3xl font-light leading-[1.12] tracking-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="font-sans text-lg font-light leading-relaxed text-[#626760] sm:text-xl">
              {article.subtitle}
            </p>
          </div>

          {/* Author Header Byline */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#d8d1c5] pt-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#a67c45]/30 bg-[#ebe7de] font-serif text-base text-[#a67c45] shadow-sm">
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="space-y-0.5">
                <div className="font-mono text-xs font-medium text-[#3f4847] sm:text-sm">
                  {article.author.name}
                </div>

                <div className="text-xs font-light text-[#777970]">
                  {article.author.role} · {article.author.affiliation}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-[#d0c9bd] bg-[#ebe7de] font-mono text-[9px] uppercase tracking-wider text-[#626760]"
              >
                Peer-Reviewed
              </Badge>
            </div>
          </div>

          {/* Top Social Sharing Bar */}
          <SocialShareBar title={article.title} url={articleUrl} />
        </Container>
      </header>

      {/* 2. COVER IMAGE */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-10">
        <Container size="lg">
          <figure className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] shadow-sm">
              <SamvadImage
                assetId={article.coverAssetId}
                aspectRatio="16:9"
                priority
                className="h-full w-full object-cover"
                caption={article.coverCaption}
              />
            </div>

            <figcaption className="mx-auto max-w-2xl text-center font-sans text-xs italic text-[#777970]">
              {article.coverCaption}
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* 3. MAIN EDITORIAL ARTICLE BODY */}
      <main className="bg-[#f3f0e8] py-16 lg:py-20">
        <Container size="lg">
          <article className="mx-auto max-w-3xl space-y-16">
            {/* Opening Excerpt */}
            <div className="rounded-xs border-l-2 border-[#a67c45] bg-[#ebe7de] p-6 sm:p-8">
              <p className="font-serif text-lg font-light italic leading-relaxed text-[#3f4847] sm:text-xl">
                &ldquo;{article.excerpt}&rdquo;
              </p>
            </div>

            {/* Content Sections */}
            {article.sections.map((section, sIndex) => (
              <section key={sIndex} className="space-y-6">
                <div className="space-y-2 border-b border-[#d8d1c5] pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                    Section {String(sIndex + 1).padStart(2, "0")}
                  </span>

                  <h2 className="font-serif text-2xl font-light leading-snug text-[#1d2529] sm:text-3xl">
                    {section.heading}
                  </h2>

                  {section.subheading && (
                    <p className="font-sans text-xs font-light text-[#777970] sm:text-sm">
                      {section.subheading}
                    </p>
                  )}
                </div>

                {/* Paragraphs */}
                <div className="space-y-5 text-sm font-light leading-relaxed text-[#626760] sm:text-base">
                  {section.paragraphs.map((p, pIndex) => (
                    <p
                      key={pIndex}
                      className={
                        sIndex === 0 && pIndex === 0
                          ? "first-letter:float-left first-letter:pr-3 first-letter:font-serif first-letter:text-5xl first-letter:leading-none first-letter:text-[#a67c45]"
                          : ""
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Editorial Pull Quote */}
                {section.callout && (
                  <div className="relative my-8 overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 sm:p-8">
                    <Quote className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-[#a67c45]/10" />

                    <blockquote className="relative z-10 space-y-3">
                      <p className="font-serif text-lg font-light italic leading-relaxed text-[#8d683d] sm:text-xl">
                        &ldquo;{section.callout.quote}&rdquo;
                      </p>

                      {section.callout.attribution && (
                        <footer className="font-mono text-xs uppercase tracking-wider text-[#777970]">
                          — {section.callout.attribution}
                        </footer>
                      )}
                    </blockquote>
                  </div>
                )}

                {/* Key Takeaways */}
                {section.keyTakeaways &&
                  section.keyTakeaways.length > 0 && (
                    <div className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                        <Bookmark className="h-3.5 w-3.5" />
                        <span>Key Takeaways</span>
                      </div>

                      <ul className="space-y-2">
                        {section.keyTakeaways.map((takeaway, tIndex) => (
                          <li
                            key={tIndex}
                            className="flex items-start gap-2.5 text-xs font-light text-[#626760] sm:text-sm"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a67c45]" />

                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </section>
            ))}

            {/* Article Tags Footer */}
            <div className="space-y-3 border-t border-[#d8d1c5] pt-8">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#aaa398]">
                <Tag className="h-3 w-3 text-[#a67c45]" />
                <span>Topics</span>
              </span>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/insights?topic=${encodeURIComponent(tag)}`}
                    className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] px-3 py-1.5 font-mono text-xs text-[#626760] transition-colors hover:border-[#a67c45]/50 hover:text-[#8d683d]"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Social Share Bar */}
            <SocialShareBar title={article.title} url={articleUrl} />

            {/* Full Author Bio Card */}
            <div className="flex flex-col items-start gap-6 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 sm:flex-row sm:p-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#a67c45]/40 bg-[#f3f0e8] font-serif text-xl text-[#a67c45]">
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  Author
                </div>

                <h3 className="font-serif text-xl font-light text-[#1d2529]">
                  {article.author.name}
                </h3>

                <div className="font-mono text-xs text-[#777970]">
                  {article.author.role} · {article.author.affiliation}
                </div>

                <p className="pt-1 font-sans text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                  {article.author.bio}
                </p>
              </div>
            </div>
          </article>
        </Container>
      </main>

      {/* 4. RELATED ARTICLES SECTION */}
      {related.length > 0 && (
        <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-16 lg:py-24">
          <Container size="xl" className="space-y-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  Related
                </span>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Strategic Research
                </h2>
              </div>

              <Link
                href="/insights"
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#a67c45] hover:text-[#8d683d]"
              >
                <span>All Publications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] shadow-sm transition-all hover:border-[#a67c45]/40 hover:bg-[#eee9df]"
                >
                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-[#d8d1c5] bg-[#ebe7de]">
                      <SamvadImage
                        assetId={rel.coverAssetId}
                        aspectRatio="16:9"
                        zoomOnHover
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        caption={rel.title}
                      />
                    </div>

                    <div className="space-y-3 p-6">
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#777970]">
                        <span className="uppercase tracking-widest text-[#a67c45]">
                          {rel.category}
                        </span>

                        <span>{rel.readingTimeMinutes} min</span>
                      </div>

                      <h3 className="font-serif text-lg font-light leading-snug text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                        <Link href={`/insights/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h3>

                      <p className="line-clamp-2 font-sans text-xs font-light leading-relaxed text-[#777970]">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-t border-[#d8d1c5] p-6 pt-4 font-mono text-xs">
                    <span className="max-w-[140px] truncate text-[10px] text-[#aaa398]">
                      {rel.author.name}
                    </span>

                    <Link
                      href={`/insights/${rel.slug}`}
                      className="flex items-center gap-1 text-[#a67c45] transition-transform group-hover:translate-x-0.5 hover:text-[#8d683d]"
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

      {/* 5. STRATEGIC INQUIRY BANNER */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-20 lg:py-24">
        <Container size="xl">
          <div className="flex flex-col items-start justify-between gap-8 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Advisory Research</span>
              </div>

              <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                Need Custom Perception Research?
              </h2>

              <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                Commission confidential perception audits, research, or
                crisis analysis.
              </p>
            </div>

            <Link href="/about#contact">
              <MagneticButton>
                <Button
                  variant="gold"
                  size="md"
                  className="whitespace-nowrap px-8 py-3.5 font-mono text-xs uppercase tracking-widest"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </MagneticButton>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
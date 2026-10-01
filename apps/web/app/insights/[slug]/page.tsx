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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samvad.advisory";
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

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article.slug, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samvad.advisory";
  const articleUrl = `${siteUrl}/insights/${article.slug}`;

  // Structured Data (JSON-LD) for Google & Core Web Vitals optimization
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
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* JSON-LD Structured Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* 1. ARTICLE HERO & MASTHEAD */}
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
              href="/insights"
              className="hover:text-sand-300 transition-colors"
            >
              Insights
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">{article.category}</span>
          </nav>

          {/* Category & Timing Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="border-gold-500/40 bg-gold-500/10 font-mono text-[10px] uppercase tracking-widest text-gold-300"
            >
              {article.category}
            </Badge>
            <span className="font-mono text-xs text-obsidian-500">·</span>
            <span className="font-mono text-xs text-obsidian-400 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold-400" />
              {article.readingTimeMinutes} min read
            </span>
            <span className="font-mono text-xs text-obsidian-500">·</span>
            <span className="font-mono text-xs text-obsidian-400 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={article.publishedAt}>
                {article.publishedDisplay}
              </time>
            </span>
          </div>

          {/* Large Editorial Headline & Subtitle */}
          <div className="space-y-6">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-sand-100 leading-[1.12]">
              {article.title}
            </h1>
            <p className="font-sans text-lg sm:text-xl text-sand-300 font-light leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Author Header Byline */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-obsidian-800">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-full border border-gold-500/30 bg-obsidian-900 flex items-center justify-center text-gold-400 font-serif text-base shadow-sm">
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="space-y-0.5">
                <div className="font-mono text-xs sm:text-sm text-sand-100 font-medium">
                  {article.author.name}
                </div>
                <div className="text-xs text-obsidian-400 font-light">
                  {article.author.role} · {article.author.affiliation}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-obsidian-750 font-mono text-[9px] uppercase tracking-wider text-sand-300"
              >
                Peer-Reviewed Monograph
              </Badge>
            </div>
          </div>

          {/* Top Social Sharing Bar */}
          <SocialShareBar title={article.title} url={articleUrl} />
        </Container>
      </header>

      {/* 2. COVER IMAGE */}
      <section className="border-b border-obsidian-800 bg-obsidian-950 py-10">
        <Container size="lg">
          <figure className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-obsidian-750 bg-obsidian-900 shadow-2xl">
              <SamvadImage
                assetId={article.coverAssetId}
                aspectRatio="16:9"
                priority
                className="h-full w-full object-cover"
                caption={article.coverCaption}
              />
            </div>
            <figcaption className="font-sans text-xs text-obsidian-400 italic text-center max-w-2xl mx-auto">
              {article.coverCaption}
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* 3. MAIN EDITORIAL ARTICLE BODY */}
      <main className="py-16 lg:py-20">
        <Container size="lg">
          <article className="max-w-3xl mx-auto space-y-16">
            {/* Opening Excerpt Lead Paragraph */}
            <div className="rounded-xs border-l-2 border-gold-400 bg-obsidian-900/60 p-6 sm:p-8 backdrop-blur-sm">
              <p className="font-serif text-lg sm:text-xl text-sand-200 font-light leading-relaxed italic">
                &ldquo;{article.excerpt}&rdquo;
              </p>
            </div>

            {/* Content Sections */}
            {article.sections.map((section, sIndex) => (
              <section key={sIndex} className="space-y-6">
                <div className="space-y-2 border-b border-obsidian-800/80 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                    Section {String(sIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100 leading-snug">
                    {section.heading}
                  </h2>
                  {section.subheading && (
                    <p className="font-sans text-xs sm:text-sm text-sand-400 font-light">
                      {section.subheading}
                    </p>
                  )}
                </div>

                {/* Paragraphs with Drop Cap on First Paragraph of Section 1 */}
                <div className="space-y-5 text-sm sm:text-base text-sand-300 font-light leading-relaxed">
                  {section.paragraphs.map((p, pIndex) => (
                    <p
                      key={pIndex}
                      className={
                        sIndex === 0 && pIndex === 0
                          ? "first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:text-gold-400 first-letter:leading-none"
                          : ""
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Editorial Pull Quote Callout Box */}
                {section.callout && (
                  <div className="my-8 rounded-xs border border-obsidian-750 bg-obsidian-900/90 p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
                    <Quote className="absolute -bottom-4 -right-4 h-24 w-24 text-gold-500/5 pointer-events-none" />
                    <blockquote className="space-y-3 relative z-10">
                      <p className="font-serif text-lg sm:text-xl text-gold-200 font-light leading-relaxed italic">
                        &ldquo;{section.callout.quote}&rdquo;
                      </p>
                      {section.callout.attribution && (
                        <footer className="font-mono text-xs uppercase tracking-wider text-obsidian-400">
                          — {section.callout.attribution}
                        </footer>
                      )}
                    </blockquote>
                  </div>
                )}

                {/* Key Takeaways Card */}
                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/50 p-6 space-y-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-gold-400 flex items-center gap-2">
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>Executive Key Takeaways</span>
                    </div>
                    <ul className="space-y-2">
                      {section.keyTakeaways.map((takeaway, tIndex) => (
                        <li
                          key={tIndex}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-sand-300 font-light"
                        >
                          <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}

            {/* Article Tags Footer */}
            <div className="pt-8 border-t border-obsidian-800 space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian-500 flex items-center gap-1.5">
                <Tag className="h-3 w-3 text-gold-400" />
                <span>Indexed Topics &amp; Practice Disciplines:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/insights?topic=${encodeURIComponent(tag)}`}
                    className="font-mono text-xs text-sand-300 bg-obsidian-900 px-3 py-1.5 rounded-xs border border-obsidian-750 hover:border-gold-500/50 hover:text-gold-300 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Social Share Bar */}
            <SocialShareBar title={article.title} url={articleUrl} />

            {/* Full Author Bio Card */}
            <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-start gap-6">
              <div className="h-16 w-16 rounded-full border border-gold-500/40 bg-obsidian-950 flex items-center justify-center text-gold-400 font-serif text-xl shrink-0">
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  About the Author
                </div>
                <h3 className="font-serif text-xl text-sand-100 font-light">
                  {article.author.name}
                </h3>
                <div className="font-mono text-xs text-obsidian-400">
                  {article.author.role} · {article.author.affiliation}
                </div>
                <p className="font-sans text-xs sm:text-sm text-sand-300 font-light leading-relaxed pt-1">
                  {article.author.bio}
                </p>
              </div>
            </div>
          </article>
        </Container>
      </main>

      {/* 4. RELATED ARTICLES SECTION */}
      {related.length > 0 && (
        <section className="border-t border-obsidian-800 bg-obsidian-900/50 py-16 lg:py-24">
          <Container size="xl" className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  Curated Analysis
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Related Strategic Research
                </h2>
              </div>
              <Link
                href="/insights"
                className="font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
              >
                <span>Browse All Publications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xs border border-obsidian-750 bg-obsidian-900/70 transition-all hover:border-gold-500/40 hover:bg-obsidian-900/90 shadow-elevation-1"
                >
                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-obsidian-800 bg-obsidian-950">
                      <SamvadImage
                        assetId={rel.coverAssetId}
                        aspectRatio="16:9"
                        zoomOnHover
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        caption={rel.title}
                      />
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between font-mono text-[10px] text-obsidian-400">
                        <span className="text-gold-400/90 uppercase tracking-widest">
                          {rel.category}
                        </span>
                        <span>{rel.readingTimeMinutes} min read</span>
                      </div>

                      <h3 className="font-serif text-lg font-light text-sand-100 group-hover:text-gold-200 transition-colors leading-snug">
                        <Link href={`/insights/${rel.slug}`}>{rel.title}</Link>
                      </h3>

                      <p className="font-sans text-xs text-sand-400 font-light leading-relaxed line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-obsidian-800/80 mt-2 flex items-center justify-between font-mono text-xs">
                    <span className="text-[10px] text-obsidian-400 truncate max-w-[140px]">
                      {rel.author.name}
                    </span>
                    <Link
                      href={`/insights/${rel.slug}`}
                      className="text-gold-400 hover:text-gold-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
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
      <section className="relative py-20 lg:py-24 border-t border-obsidian-800 bg-obsidian-950 overflow-hidden">
        <Container size="xl">
          <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-8 sm:p-12 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Advisory Mandates &amp; In-Camera Counsel</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                Commission Custom Perception Research or Crisis Analysis
              </h2>
              <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                SAMVAD&apos;s senior principals conduct non-attributable perception audits and disinformation forensics for sovereign and corporate clients under strict confidentiality pacts.
              </p>
            </div>

            <Link href="/about#contact">
              <MagneticButton>
                <Button
                  variant="gold"
                  size="md"
                  className="font-mono text-xs uppercase tracking-widest px-8 py-3.5 whitespace-nowrap"
                >
                  <span>Schedule Partner Deliberation</span>
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

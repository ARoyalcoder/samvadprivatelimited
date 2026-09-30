import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, Badge, Button, MagneticButton, SamvadImage } from "@samvad/ui";
import {
  getAllArticles,
  getFeaturedArticle,
  getAllCategories,
  getAllTags,
} from "@/lib/insights-data";
import { InsightsSearchFilter } from "@/components/insights/insights-search-filter";
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Insights & Strategic Review | SAMVAD Perception Advisory",
  description:
    "Authoritative thought leadership, empirical studies on disinformation, and strategic perception doctrine published by SAMVAD senior partners and researchers.",
  keywords: [
    "Perception Architecture",
    "Disinformation Forensics",
    "Strategic Communications",
    "Crisis Advisory",
    "Sovereign Statecraft",
  ],
};

export default function InsightsPage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. EDITORIAL MASTHEAD */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-obsidian-800">
        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 flex flex-col justify-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400">
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">Insights &amp; Strategic Review</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Strategic Intelligence &amp; Research Review
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
              Executive Thought Leadership &amp; <br />
              <span className="font-normal italic text-gold-300">
                Perception Doctrine
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed max-w-2xl">
              Original research, technical analyses of algorithmic distortion, and operational statecraft
              published by our senior advisory partners and computational intelligence unit.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. PROMINENT FEATURED EDITORIAL ARTICLE */}
      {featured && (
        <section className="border-b border-obsidian-800 bg-obsidian-900/50 py-16 lg:py-20">
          <Container size="xl">
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                <span>Featured Monograph</span>
              </div>

              <article className="group relative rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-8 sm:p-10 lg:p-12 backdrop-blur-md transition-all duration-300 hover:border-gold-500/50 hover:bg-obsidian-900/90 shadow-elevation-2">
                {/* Architectural corner marks */}
                <span className="pointer-events-none absolute left-1 top-1 font-mono text-xs text-gold-500/50 select-none">+</span>
                <span className="pointer-events-none absolute right-1 top-1 font-mono text-xs text-gold-500/50 select-none">+</span>
                <span className="pointer-events-none absolute bottom-1 left-1 font-mono text-xs text-gold-500/50 select-none">+</span>
                <span className="pointer-events-none absolute bottom-1 right-1 font-mono text-xs text-gold-500/50 select-none">+</span>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  {/* Left Column: Typography & Byline */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant="outline"
                        className="border-gold-500/40 bg-gold-500/10 font-mono text-[10px] uppercase tracking-widest text-gold-300"
                      >
                        {featured.category}
                      </Badge>
                      <span className="font-mono text-xs text-obsidian-500">·</span>
                      <span className="font-mono text-xs text-obsidian-400 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gold-400" />
                        {featured.readingTimeMinutes} min read
                      </span>
                      <span className="font-mono text-xs text-obsidian-500">·</span>
                      <span className="font-mono text-xs text-obsidian-400 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {featured.publishedDisplay}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-sand-100 group-hover:text-gold-200 transition-colors leading-[1.18]">
                        <Link href={`/insights/${featured.slug}`}>
                          {featured.title}
                        </Link>
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
                        {featured.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-sand-400 font-light leading-relaxed line-clamp-3">
                      {featured.excerpt}
                    </p>

                    {/* Author Byline & Read CTA */}
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-obsidian-800">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full border border-gold-500/30 bg-obsidian-950 flex items-center justify-center text-gold-400 font-serif text-sm">
                          {featured.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-mono text-xs text-sand-200 font-medium">
                            {featured.author.name}
                          </div>
                          <div className="text-[11px] text-obsidian-400 font-light">
                            {featured.author.role}
                          </div>
                        </div>
                      </div>

                      <Link href={`/insights/${featured.slug}`}>
                        <MagneticButton>
                          <Button
                            variant="gold"
                            size="sm"
                            className="font-mono text-xs uppercase tracking-wider px-6 py-2.5"
                          >
                            <span>Read Full Monograph</span>
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </Button>
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Editorial Visual */}
                  <div className="lg:col-span-5">
                    <div className="relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-xs border border-obsidian-750 bg-obsidian-950 p-2 shadow-2xl">
                      <SamvadImage
                        assetId={featured.coverAssetId}
                        aspectRatio="16:9"
                        priority
                        zoomOnHover
                        className="h-full w-full object-cover rounded-xs"
                        caption={featured.coverCaption}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </Container>
        </section>
      )}

      {/* 3. SEARCH & COMPLETE CATALOG */}
      <section className="py-16 lg:py-24">
        <Container size="xl" className="space-y-12">
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
              01 · Publication Archive
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
              Strategic Analyses &amp; Policy Papers
            </h2>
            <p className="text-xs sm:text-sm text-sand-400 font-light max-w-xl">
              Search by subject, filter by practice discipline, or explore specific policy topics across our active thought-leadership publications.
            </p>
          </div>

          <InsightsSearchFilter
            articles={articles}
            categories={categories}
            tags={tags}
          />
        </Container>
      </section>

      {/* 4. CONFIDENTIAL EXECUTIVE DISPATCH SUBSCRIPTION */}
      <section className="border-t border-obsidian-800 bg-obsidian-900/60 py-20">
        <Container size="xl">
          <div className="rounded-xs border border-obsidian-750 bg-obsidian-950/80 p-8 sm:p-12 lg:p-14 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                <Mail className="h-3.5 w-3.5" />
                <span>Private Executive Dispatch</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                Receive In-Camera Intelligence &amp; Research Monographs
              </h3>
              <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                A private, periodic intelligence briefing delivered directly to corporate board members, sovereign ministers, and strategic communications directors. No marketing noise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link href="/about#contact">
                <Button
                  variant="gold"
                  size="md"
                  className="font-mono text-xs uppercase tracking-widest px-8 py-3.5 w-full sm:w-auto"
                >
                  <span>Request Dispatch Access</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

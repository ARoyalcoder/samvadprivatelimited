import * as React from "react";

import type { Metadata } from "next";

import Link from "next/link";

import {
  Container,
  Badge,
  Button,
  MagneticButton,
  SamvadImage,
} from "@samvad/ui";

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
    "Research, perception intelligence, and strategic analysis from SAMVAD.",
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
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. EDITORIAL MASTHEAD */}
      <section className="relative overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-20 lg:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[160px]" />

        <Container
          size="xl"
          className="relative z-10 flex flex-col justify-center space-y-6"
        >
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

            <span className="text-[#a67c45]">
              Insights &amp; Strategic Review
            </span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Intelligence &amp; Research
            </div>

            <h1 className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
              Executive Insights
              <br />
              <span className="font-normal italic text-[#a67c45]">
                Perception Doctrine
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              Research and analysis for complex institutional environments.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. PROMINENT FEATURED EDITORIAL ARTICLE */}
      {featured && (
        <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-16 lg:py-20">
          <Container size="xl">
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Featured</span>
              </div>

              <article className="group relative rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-8 shadow-sm transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#eee9df] sm:p-10 lg:p-12">
                <span className="pointer-events-none absolute left-1 top-1 select-none font-mono text-xs text-[#a67c45]/50">
                  +
                </span>

                <span className="pointer-events-none absolute right-1 top-1 select-none font-mono text-xs text-[#a67c45]/50">
                  +
                </span>

                <span className="pointer-events-none absolute bottom-1 left-1 select-none font-mono text-xs text-[#a67c45]/50">
                  +
                </span>

                <span className="pointer-events-none absolute bottom-1 right-1 select-none font-mono text-xs text-[#a67c45]/50">
                  +
                </span>

                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  {/* Left Column */}
                  <div className="space-y-6 lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant="outline"
                        className="border-[#a67c45]/40 bg-[#a67c45]/10 font-mono text-[10px] uppercase tracking-widest text-[#8d683d]"
                      >
                        {featured.category}
                      </Badge>

                      <span className="font-mono text-xs text-[#c5beb2]">
                        ·
                      </span>

                      <span className="flex items-center gap-1.5 font-mono text-xs text-[#777970]">
                        <Clock className="h-3.5 w-3.5 text-[#a67c45]" />
                        {featured.readingTimeMinutes} min
                      </span>

                      <span className="font-mono text-xs text-[#c5beb2]">
                        ·
                      </span>

                      <span className="flex items-center gap-1.5 font-mono text-xs text-[#777970]">
                        <Calendar className="h-3.5 w-3.5" />
                        {featured.publishedDisplay}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-serif text-2xl font-light leading-[1.18] text-[#1d2529] transition-colors group-hover:text-[#8d683d] sm:text-3xl lg:text-4xl">
                        <Link href={`/insights/${featured.slug}`}>
                          {featured.title}
                        </Link>
                      </h2>

                      <p className="font-sans text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                        {featured.subtitle}
                      </p>
                    </div>

                    <p className="line-clamp-3 font-sans text-xs font-light leading-relaxed text-[#777970] sm:text-sm">
                      {featured.excerpt}
                    </p>

                    {/* Author Byline & Read CTA */}
                    <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#d8d1c5] pt-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#a67c45]/30 bg-[#ebe7de] font-serif text-sm text-[#a67c45]">
                          {featured.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>

                        <div>
                          <div className="font-mono text-xs font-medium text-[#3f4847]">
                            {featured.author.name}
                          </div>

                          <div className="text-[11px] font-light text-[#777970]">
                            {featured.author.role}
                          </div>
                        </div>
                      </div>

                      <Link href={`/insights/${featured.slug}`}>
                        <MagneticButton>
                          <Button
                            variant="gold"
                            size="sm"
                            className="px-6 py-2.5 font-mono text-xs uppercase tracking-wider"
                          >
                            <span>Read</span>
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </Button>
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-5">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-2 shadow-sm lg:aspect-[4/3]">
                      <SamvadImage
                        assetId={featured.coverAssetId}
                        aspectRatio="16:9"
                        priority
                        zoomOnHover
                        className="h-full w-full rounded-xs object-cover"
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
      <section className="bg-[#f3f0e8] py-16 lg:py-24">
        <Container size="xl" className="space-y-12">
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
              01 · Archive
            </div>

            <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
              Strategic Research
            </h2>

            <p className="max-w-xl text-xs font-light text-[#626760] sm:text-sm">
              Search by category, topic, or keyword.
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
      <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-20">
        <Container size="xl">
          <div className="flex flex-col items-start justify-between gap-8 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-8 shadow-sm sm:p-12 lg:flex-row lg:items-center lg:p-14">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                <Mail className="h-3.5 w-3.5" />
                <span>Private Dispatch</span>
              </div>

              <h3 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                Executive Intelligence
              </h3>

              <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                Periodic research and strategic analysis for institutional
                leaders.
              </p>
            </div>

            <div className="w-full shrink-0 sm:w-auto">
              <Link href="/about#contact">
                <Button
                  variant="gold"
                  size="md"
                  className="w-full px-8 py-3.5 font-mono text-xs uppercase tracking-widest sm:w-auto"
                >
                  <span>Request Access</span>
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
"use client";

import * as React from "react";

import Link from "next/link";

import { Container, Badge, Button, SamvadImage } from "@samvad/ui";

import { ArrowUpRight, Clock, ArrowRight } from "lucide-react";

export function InsightsSection() {
  const [activeFilter, setActiveFilter] = React.useState<string>("all");

  const articles = [
    {
      id: "death-of-reactive-pr",
      category: "Whitepaper",
      categoryKey: "whitepaper",
      title:
        "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
      abstract:
        "Why traditional press releases fail against algorithmic discourse, and how proactive narrative strategy builds a stronger corporate moat.",
      readTime: "8 min read",
      author: "Vikramaditya Sharma, Managing Principal",
      date: "Q3 2026",
      assetId: "leadership-skyline-silhouette",
      badge: "Flagship Monograph",
    },
    {
      id: "algorithmic-asymmetry",
      category: "Intelligence Dossier",
      categoryKey: "intelligence",
      title:
        "Algorithmic Asymmetry: How Disinformation Weaponizes Search Indexing & LLM Graphs",
      abstract:
        "An empirical analysis of coordinated disinformation across knowledge graphs, search systems, and AI-generated summaries.",
      readTime: "12 min read",
      author: "SAMVAD Intelligence & Telemetry Unit",
      date: "Q3 2026",
      assetId: "tech-datacenter-optical-core",
      badge: "Empirical Study",
    },
    {
      id: "boardroom-crisis-playbook",
      category: "Crisis Casebook",
      categoryKey: "casebook",
      title:
        "Crisis in the Boardroom: Ten Operational Rules for Hostile Activist Incursions",
      abstract:
        "A tactical executive handbook for contested proxy fights, regulatory pressure, and reputation-led crises.",
      readTime: "10 min read",
      author: "Sovereign Defense Practice",
      date: "Q2 2026",
      assetId: "reputation-crisis-monitoring",
      badge: "Executive Briefing",
    },
  ];

  const filteredArticles =
    activeFilter === "all"
      ? articles
      : articles.filter((a) => a.categoryKey === activeFilter);

  return (
    <section
      id="intelligence"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-10 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#a67c45]/[0.04] blur-[130px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9a703f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Perception Intelligence
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
              Executive Intelligence & <br />
              <span className="font-normal italic text-[#9a703f]">
                Strategic Dossiers
              </span>
            </h2>

            <p className="text-[#667078] text-sm sm:text-base font-light leading-relaxed">
              Research, analysis, and strategic frameworks from our advisory
              and intelligence teams.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Insights" },
              { id: "whitepaper", label: "Whitepapers" },
              { id: "intelligence", label: "Intelligence" },
              { id: "casebook", label: "Casebooks" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
                  activeFilter === tab.id
                    ? "border-[#a67c45]/60 bg-[#a67c45]/10 text-[#8f683c]"
                    : "border-[#c9c3b8] bg-[#ebe7de] text-[#899197] hover:text-[#39444a] hover:border-[#a67c45]/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70 transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e7e2d8] shadow-[0_8px_30px_rgba(29,37,41,0.05)] hover:shadow-[0_14px_40px_rgba(29,37,41,0.08)]"
            >
              {/* Image Preview with Zoom on Hover */}
              <div className="relative overflow-hidden aspect-[16/9] border-b border-[#d0c9bd]">
                <SamvadImage
                  assetId={article.assetId}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3">
                  <Badge
                    variant="outline"
                    className="border-[#c9c3b8] bg-[#f3f0e8]/90 font-mono text-[9px] uppercase tracking-wider text-[#9a703f] backdrop-blur-md"
                  >
                    {article.badge}
                  </Badge>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#899197]">
                    <span className="text-[#9a703f] uppercase tracking-widest">
                      {article.category}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1d2529] group-hover:text-[#8f683c] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#667078] font-light leading-relaxed">
                    {article.abstract}
                  </p>
                </div>

                {/* Author & Read Link */}
                <div className="pt-4 border-t border-[#d0c9bd] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#899197]">
                    {article.author}
                  </span>

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[#9a703f] hover:text-[#7f5c35]"
                  >
                    <span>Request Copy</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Intelligence Briefing Subscription Banner */}
        <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl text-[#1d2529] font-normal">
              Private Intelligence Briefings
            </h4>

            <p className="text-xs text-[#667078] font-light">
              Periodic dispatches on regulatory shifts, information risk, and
              capital perception.
            </p>
          </div>

          <Link href="#contact">
            <Button
              variant="outline"
              size="md"
              className="font-mono text-xs uppercase tracking-wider border-[#c9c3b8] text-[#39444a] hover:border-[#a67c45]/60 hover:bg-[#f3f0e8]"
            >
              <span>Request Subscription</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
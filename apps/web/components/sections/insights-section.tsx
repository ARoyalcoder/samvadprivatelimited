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
      title: "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
      abstract:
        "Why 20th-century press releases fail against algorithmic discourse distortion, and how proactive narrative physics construct an unassailable corporate moat.",
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
      title: "Algorithmic Asymmetry: How Disinformation Weaponizes Search Indexing & LLM Graphs",
      abstract:
        "An empirical analysis of how coordinated activist short-sellers manipulate automated knowledge graphs, search snippets, and AI summaries to trigger market panics.",
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
      title: "Crisis in the Boardroom: Ten Operational Rules for Hostile Activist Incursions",
      abstract:
        "A tactical executive handbook for defending enterprise sovereignty during contested proxy fights, regulatory leak traps, and smear campaigns.",
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
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-24 lg:py-32"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-10 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-gold-500/5 blur-[130px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Perception Intelligence
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Executive Thought Leadership & <br />
              <span className="font-normal italic text-gold-300">
                Strategic Intelligence Dossiers
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              Proprietary research and analytical frameworks published by our senior advisory partners
              and intelligence analysts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Insights" },
              { id: "whitepaper", label: "Whitepapers" },
              { id: "intelligence", label: "Intelligence Dossiers" },
              { id: "casebook", label: "Crisis Casebooks" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
                  activeFilter === tab.id
                    ? "border-gold-500/40 bg-gold-500/10 text-gold-300"
                    : "border-obsidian-750 bg-obsidian-850 text-obsidian-400 hover:text-sand-300 hover:border-obsidian-700"
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
              className="group flex flex-col justify-between overflow-hidden rounded-xs border border-obsidian-800 bg-obsidian-900/60 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900 shadow-elevation-1 hover:shadow-elevation-2"
            >
              {/* Image Preview with Zoom on Hover */}
              <div className="relative overflow-hidden aspect-[16/9] border-b border-obsidian-800/80">
                <SamvadImage
                  assetId={article.assetId}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="border-obsidian-750 bg-obsidian-950/90 font-mono text-[9px] uppercase tracking-wider text-gold-400 backdrop-blur-md">
                    {article.badge}
                  </Badge>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-obsidian-400">
                    <span className="text-gold-400/90 uppercase tracking-widest">{article.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    {article.abstract}
                  </p>
                </div>

                {/* Author & Read Link */}
                <div className="pt-4 border-t border-obsidian-800/80 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-obsidian-400">
                    {article.author}
                  </span>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-gold-400 hover:text-gold-300"
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
        <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl text-sand-100 font-normal">
              Subscribe to Confidential Executive Intelligence
            </h4>
            <p className="text-xs text-sand-400 font-light">
              Periodic private dispatches on regulatory shifts, disinformation vectors, and capital perception dynamics.
            </p>
          </div>
          <Link href="#contact">
            <Button
              variant="outline"
              size="md"
              className="font-mono text-xs uppercase tracking-wider border-obsidian-750 text-sand-200 hover:border-gold-500/50 hover:bg-obsidian-850"
            >
              <span>Request Private Briefing Subscription</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

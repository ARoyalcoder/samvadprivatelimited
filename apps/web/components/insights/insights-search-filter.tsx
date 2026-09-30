"use client";

import * as React from "react";
import Link from "next/link";
import { Badge, SamvadImage } from "@samvad/ui";
import type { InsightArticle } from "@/lib/insights-data";
import {
  Search,
  X,
  Clock,
  Calendar,
  User,
  ArrowRight,
  SlidersHorizontal,
  Tag,
  BookOpen,
} from "lucide-react";

interface InsightsSearchFilterProps {
  articles: InsightArticle[];
  categories: { label: string; slug: string; count: number }[];
  tags: string[];
}

export function InsightsSearchFilter({
  articles,
  categories,
  tags,
}: InsightsSearchFilterProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  // Filtered articles
  const filteredArticles = React.useMemo(() => {
    return articles.filter((article) => {
      // Category filter
      if (
        selectedCategory !== "all" &&
        article.categorySlug !== selectedCategory
      ) {
        return false;
      }

      // Tag filter
      if (selectedTag && !article.tags.includes(selectedTag)) {
        return false;
      }

      // Text search
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesSubtitle = article.subtitle.toLowerCase().includes(query);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(query);
        const matchesAuthor = article.author.name.toLowerCase().includes(query);
        const matchesTag = article.tags.some((t) =>
          t.toLowerCase().includes(query)
        );

        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesExcerpt &&
          !matchesAuthor &&
          !matchesTag
        ) {
          return false;
        }
      }

      return true;
    });
  }, [articles, selectedCategory, selectedTag, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTag(null);
  };

  return (
    <div className="space-y-10">
      {/* Search Bar & Primary Category Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 border-b border-obsidian-800 pb-8">
        {/* Search Input Field */}
        <div className="relative w-full lg:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-obsidian-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search analysis, topics, authors, keywords..."
            className="w-full rounded-xs border border-obsidian-750 bg-obsidian-900/80 py-2.5 pl-10 pr-9 font-sans text-xs text-sand-100 placeholder-obsidian-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-obsidian-400 hover:text-sand-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Results Counter & Active Filters Indicator */}
        <div className="flex items-center gap-3 font-mono text-xs text-obsidian-400">
          <span>
            Showing <strong className="text-gold-400 font-semibold">{filteredArticles.length}</strong> of{" "}
            {articles.length} publications
          </span>
          {(searchQuery || selectedCategory !== "all" || selectedTag) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] uppercase tracking-wider text-gold-400 hover:text-gold-300 underline underline-offset-4"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-obsidian-400">
          <SlidersHorizontal className="h-3 w-3 text-gold-400" />
          <span>Filter by Practice Category</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border transition-all ${
              selectedCategory === "all"
                ? "border-gold-500/50 bg-gold-500/10 text-gold-300 shadow-sm"
                : "border-obsidian-750 bg-obsidian-900/60 text-obsidian-400 hover:text-sand-300 hover:border-obsidian-700"
            }`}
          >
            All Disciplines ({articles.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border transition-all ${
                selectedCategory === cat.slug
                  ? "border-gold-500/50 bg-gold-500/10 text-gold-300 shadow-sm"
                  : "border-obsidian-750 bg-obsidian-900/60 text-obsidian-400 hover:text-sand-300 hover:border-obsidian-700"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags Horizontal Scroller */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
          <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian-500 flex items-center gap-1 mr-1">
            <Tag className="h-3 w-3" />
            <span>Topics:</span>
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`font-mono text-[10px] px-2.5 py-1 rounded-xs border transition-all ${
                selectedTag === tag
                  ? "border-gold-500 bg-gold-500/20 text-gold-300"
                  : "border-obsidian-800 bg-obsidian-950/70 text-obsidian-400 hover:border-obsidian-700 hover:text-sand-300"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/40 p-12 text-center space-y-4">
          <BookOpen className="h-8 w-8 text-obsidian-500 mx-auto" />
          <h3 className="font-serif text-xl text-sand-100 font-light">
            No publications found matching your criteria
          </h3>
          <p className="text-xs text-sand-400 font-light max-w-md mx-auto">
            Try adjusting your search keywords, clearing specific topic tags, or browsing across all editorial categories.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 underline underline-offset-4"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xs border border-obsidian-750 bg-obsidian-900/70 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900/90 shadow-elevation-1 hover:shadow-elevation-3"
            >
              <div>
                {/* Visual Cover Preview with Zoom on Hover */}
                <div className="relative overflow-hidden aspect-[16/9] border-b border-obsidian-800/80 bg-obsidian-950">
                  <SamvadImage
                    assetId={article.coverAssetId}
                    aspectRatio="16:9"
                    zoomOnHover
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    caption={article.title}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-obsidian-750 bg-obsidian-950/90 font-mono text-[9px] uppercase tracking-wider text-gold-400 backdrop-blur-md"
                    >
                      {article.category}
                    </Badge>
                  </div>
                </div>

                {/* Editorial Content Info */}
                <div className="p-6 space-y-4">
                  {/* Reading Metadata */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-obsidian-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.publishedDisplay}
                    </span>
                    <span className="flex items-center gap-1 text-gold-400/90">
                      <Clock className="h-3 w-3" />
                      {article.readingTimeMinutes} min read
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg sm:text-xl font-light text-sand-100 group-hover:text-gold-200 transition-colors leading-snug">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-xs text-sand-400 font-light leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-obsidian-400 bg-obsidian-950 px-2 py-0.5 rounded-xs border border-obsidian-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Byline & Read Action */}
              <div className="p-6 pt-0 border-t border-obsidian-800/80 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-obsidian-400">
                  <User className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                  <span className="font-mono text-[10px] truncate max-w-[140px]">
                    {article.author.name}
                  </span>
                </div>

                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors group-hover:translate-x-0.5"
                >
                  <span>Read Monograph</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

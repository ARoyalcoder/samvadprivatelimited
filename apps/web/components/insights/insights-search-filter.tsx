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
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("all");
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
        const matchesSubtitle = article.subtitle
          .toLowerCase()
          .includes(query);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(query);
        const matchesAuthor = article.author.name
          .toLowerCase()
          .includes(query);
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
      <div className="flex flex-col items-stretch justify-between gap-6 border-b border-[#d8d1c5] pb-8 lg:flex-row lg:items-center">
        {/* Search Input Field */}
        <div className="relative w-full lg:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#777970]">
            <Search className="h-4 w-4" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search insights, topics or authors..."
            className="w-full rounded-xs border border-[#c9c2b6] bg-[#ebe7de] py-2.5 pl-10 pr-9 font-sans text-xs text-[#1d2529] placeholder-[#8a8b84] transition-all focus:border-[#a67c45] focus:outline-none focus:ring-1 focus:ring-[#a67c45]/20"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#777970] hover:text-[#1d2529]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Results Counter & Active Filters Indicator */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#777970]">
          <span>
            Showing{" "}
            <strong className="font-semibold text-[#a67c45]">
              {filteredArticles.length}
            </strong>{" "}
            of {articles.length}
          </span>

          {(searchQuery || selectedCategory !== "all" || selectedTag) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] uppercase tracking-wider text-[#a67c45] underline underline-offset-4 hover:text-[#8d683d]"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#777970]">
          <SlidersHorizontal className="h-3 w-3 text-[#a67c45]" />
          <span>Filter by Category</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-xs border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
              selectedCategory === "all"
                ? "border-[#a67c45]/60 bg-[#a67c45]/10 text-[#8d683d] shadow-sm"
                : "border-[#c9c2b6] bg-[#ebe7de] text-[#777970] hover:border-[#a67c45]/40 hover:text-[#1d2529]"
            }`}
          >
            All Insights ({articles.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-xs border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                selectedCategory === cat.slug
                  ? "border-[#a67c45]/60 bg-[#a67c45]/10 text-[#8d683d] shadow-sm"
                  : "border-[#c9c2b6] bg-[#ebe7de] text-[#777970] hover:border-[#a67c45]/40 hover:text-[#1d2529]"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags Horizontal Scroller */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="mr-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#8a8b84]">
            <Tag className="h-3 w-3" />
            <span>Topics</span>
          </span>

          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`rounded-xs border px-2.5 py-1 font-mono text-[10px] transition-all ${
                selectedTag === tag
                  ? "border-[#a67c45] bg-[#a67c45]/10 text-[#8d683d]"
                  : "border-[#d8d1c5] bg-[#ebe7de] text-[#777970] hover:border-[#a67c45]/50 hover:text-[#1d2529]"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="space-y-4 rounded-xs border border-[#d8d1c5] bg-[#ebe7de] p-12 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-[#9a9b94]" />

          <h3 className="font-serif text-xl font-light text-[#1d2529]">
            No insights found
          </h3>

          <p className="mx-auto max-w-md text-xs font-light text-[#777970]">
            Adjust your search or clear the active filters.
          </p>

          <button
            type="button"
            onClick={handleResetFilters}
            className="font-mono text-xs uppercase tracking-wider text-[#a67c45] underline underline-offset-4 hover:text-[#8d683d]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/75 shadow-sm transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#ebe7de] hover:shadow-md"
            >
              <div>
                {/* Visual Cover Preview with Zoom on Hover */}
                <div className="relative aspect-[16/9] overflow-hidden border-b border-[#d8d1c5] bg-[#ddd8ce]">
                  <SamvadImage
                    assetId={article.coverAssetId}
                    aspectRatio="16:9"
                    zoomOnHover
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    caption={article.title}
                  />

                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-[#c9c2b6] bg-[#f3f0e8]/90 font-mono text-[9px] uppercase tracking-wider text-[#8d683d] backdrop-blur-md"
                    >
                      {article.category}
                    </Badge>
                  </div>
                </div>

                {/* Editorial Content Info */}
                <div className="space-y-4 p-6">
                  {/* Reading Metadata */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#777970]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.publishedDisplay}
                    </span>

                    <span className="flex items-center gap-1 text-[#a67c45]">
                      <Clock className="h-3 w-3" />
                      {article.readingTimeMinutes} min
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-light leading-snug text-[#1d2529] transition-colors group-hover:text-[#a67c45] sm:text-xl">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="line-clamp-3 font-sans text-xs font-light leading-relaxed text-[#626760]">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xs border border-[#d8d1c5] bg-[#f3f0e8] px-2 py-0.5 font-mono text-[9px] text-[#777970]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Byline & Read Action */}
              <div className="mt-4 flex items-center justify-between border-t border-[#d8d1c5] p-6 pt-4">
                <div className="flex items-center gap-2 text-xs text-[#777970]">
                  <User className="h-3.5 w-3.5 shrink-0 text-[#a67c45]" />

                  <span className="max-w-[140px] truncate font-mono text-[10px]">
                    {article.author.name}
                  </span>
                </div>

                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#a67c45] transition-colors hover:text-[#8d683d] group-hover:translate-x-0.5"
                >
                  <span>Read Insight</span>
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
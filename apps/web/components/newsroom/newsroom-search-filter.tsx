"use client";

import * as React from "react";
import Link from "next/link";
import { Badge, SamvadImage } from "@samvad/ui";
import type { NewsroomItem, NewsroomContentType } from "@/lib/newsroom-data";
import {
  Search,
  X,
  Calendar,
  MapPin,
  ArrowRight,
  FileText,
  SlidersHorizontal,
  Archive,
} from "lucide-react";

interface NewsroomSearchFilterProps {
  items: NewsroomItem[];
  typesWithCounts: {
    type: NewsroomContentType;
    label: string;
    count: number;
  }[];
  years: number[];
}

export function NewsroomSearchFilter({
  items,
  typesWithCounts,
  years,
}: NewsroomSearchFilterProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [selectedYear, setSelectedYear] = React.useState<string>("all");

  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      // Type filter
      if (selectedType !== "all" && item.type !== selectedType) {
        return false;
      }

      // Year filter
      if (selectedYear !== "all" && item.year !== Number(selectedYear)) {
        return false;
      }

      // Keyword search
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSummary = item.summary.toLowerCase().includes(query);
        const matchesRef = item.refCode.toLowerCase().includes(query);
        const matchesDateline = item.dateline.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesSummary && !matchesRef && !matchesDateline && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [items, selectedType, selectedYear, searchQuery]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedYear("all");
  };

  return (
    <div className="space-y-10">
      {/* Search Bar & Archive Controls */}
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
            placeholder="Search press releases, disclosures, reference codes..."
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

        {/* Year / Archive Dropdown & Results Counter */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-obsidian-400">
          <div className="flex items-center gap-2">
            <Archive className="h-3.5 w-3.5 text-gold-400" />
            <span>Archive:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedYear("all")}
                className={`px-2.5 py-1 rounded-xs border text-[11px] transition-all ${
                  selectedYear === "all"
                    ? "border-gold-500/50 bg-gold-500/10 text-gold-300 font-semibold"
                    : "border-obsidian-800 bg-obsidian-950 text-obsidian-400 hover:text-sand-300"
                }`}
              >
                All
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setSelectedYear(String(y))}
                  className={`px-2.5 py-1 rounded-xs border text-[11px] transition-all ${
                    selectedYear === String(y)
                      ? "border-gold-500/50 bg-gold-500/10 text-gold-300 font-semibold"
                      : "border-obsidian-800 bg-obsidian-950 text-obsidian-400 hover:text-sand-300"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {(searchQuery || selectedType !== "all" || selectedYear !== "all") && (
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] uppercase tracking-wider text-gold-400 hover:text-gold-300 underline underline-offset-4 ml-auto lg:ml-0"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Content Type Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-obsidian-400">
          <SlidersHorizontal className="h-3 w-3 text-gold-400" />
          <span>Filter by Disclosure Classification</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedType("all")}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border transition-all ${
              selectedType === "all"
                ? "border-gold-500/50 bg-gold-500/10 text-gold-300 shadow-sm"
                : "border-obsidian-750 bg-obsidian-900/60 text-obsidian-400 hover:text-sand-300 hover:border-obsidian-700"
            }`}
          >
            All Dispatches ({items.length})
          </button>
          {typesWithCounts.map((tc) => (
            <button
              key={tc.type}
              type="button"
              onClick={() => setSelectedType(tc.type)}
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border transition-all ${
                selectedType === tc.type
                  ? "border-gold-500/50 bg-gold-500/10 text-gold-300 shadow-sm"
                  : "border-obsidian-750 bg-obsidian-900/60 text-obsidian-400 hover:text-sand-300 hover:border-obsidian-700"
              }`}
            >
              {tc.label} ({tc.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between font-mono text-xs text-obsidian-400 border-b border-obsidian-850 pb-2">
        <span>
          Displaying <strong className="text-gold-400 font-semibold">{filteredItems.length}</strong> official release records
        </span>
        <span className="text-[11px] text-obsidian-500">
          Cryptographically Signed Institutional Feeds
        </span>
      </div>

      {/* Dispatches List / Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/40 p-12 text-center space-y-4">
          <FileText className="h-8 w-8 text-obsidian-500 mx-auto" />
          <h3 className="font-serif text-xl text-sand-100 font-light">
            No official dispatches found matching your query
          </h3>
          <p className="text-xs text-sand-400 font-light max-w-md mx-auto">
            Try adjusting your search terms, changing the archive year, or selecting a broader disclosure category.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 underline underline-offset-4"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group relative rounded-xs border border-obsidian-750 bg-obsidian-900/70 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900/90 shadow-elevation-1 hover:shadow-elevation-2"
            >
              {/* Architectural corner marks */}
              <span className="pointer-events-none absolute left-1 top-1 font-mono text-xs text-gold-500/40 select-none group-hover:text-gold-400 transition-colors">+</span>
              <span className="pointer-events-none absolute right-1 top-1 font-mono text-xs text-gold-500/40 select-none group-hover:text-gold-400 transition-colors">+</span>
              <span className="pointer-events-none absolute bottom-1 left-1 font-mono text-xs text-gold-500/40 select-none group-hover:text-gold-400 transition-colors">+</span>
              <span className="pointer-events-none absolute bottom-1 right-1 font-mono text-xs text-gold-500/40 select-none group-hover:text-gold-400 transition-colors">+</span>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Metadata Column */}
                <div className="lg:col-span-3 space-y-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-gold-400 font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.publishedDisplay}</span>
                  </div>

                  <div className="font-mono text-xs text-sand-200 font-semibold tracking-wide">
                    {item.refCode}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-obsidian-750 bg-obsidian-850 font-mono text-[9px] uppercase tracking-wider text-sand-300"
                    >
                      {item.typeLabel}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-obsidian-400 pt-1">
                    <MapPin className="h-3 w-3 text-gold-400 shrink-0" />
                    <span>{item.dateline}</span>
                  </div>
                </div>

                {/* Center Content Column */}
                <div className="lg:col-span-6 space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-sand-100 group-hover:text-gold-200 transition-colors leading-snug">
                    <Link href={`/newsroom/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-obsidian-400 bg-obsidian-950 px-2 py-0.5 rounded-xs border border-obsidian-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Visual & Action Column */}
                <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end space-y-4">
                  <div className="relative aspect-[16/9] w-full max-w-[240px] overflow-hidden rounded-xs border border-obsidian-800 bg-obsidian-950">
                    <SamvadImage
                      assetId={item.coverAssetId}
                      aspectRatio="16:9"
                      zoomOnHover
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      caption={item.title}
                    />
                  </div>

                  <Link
                    href={`/newsroom/${item.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Read Full Record</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

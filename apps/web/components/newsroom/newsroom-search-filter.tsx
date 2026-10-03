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
        const matchesTags = item.tags.some((t) =>
          t.toLowerCase().includes(query)
        );

        if (
          !matchesTitle &&
          !matchesSummary &&
          !matchesRef &&
          !matchesDateline &&
          !matchesTags
        ) {
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
      <div className="flex flex-col items-stretch justify-between gap-6 border-b border-[#d0c9bd] pb-8 lg:flex-row lg:items-center">
        {/* Search Input Field */}
        <div className="relative w-full lg:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8a918f]">
            <Search className="h-4 w-4" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search releases, disclosures, reference codes..."
            className="w-full rounded-xs border border-[#c9c2b7] bg-[#ebe7de] py-2.5 pl-10 pr-9 font-sans text-xs text-[#1d2529] placeholder-[#8a918f] transition-all focus:border-[#a67c45] focus:outline-none focus:ring-1 focus:ring-[#a67c45]/30"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8a918f] hover:text-[#1d2529]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Year / Archive Dropdown & Results Counter */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#8a918f]">
          <div className="flex items-center gap-2">
            <Archive className="h-3.5 w-3.5 text-[#a67c45]" />
            <span>Archive:</span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedYear("all")}
                className={`rounded-xs border px-2.5 py-1 text-[11px] transition-all ${
                  selectedYear === "all"
                    ? "border-[#a67c45]/50 bg-[#a67c45]/10 font-semibold text-[#8d6737]"
                    : "border-[#d0c9bd] bg-[#f3f0e8] text-[#8a918f] hover:text-[#566066]"
                }`}
              >
                All
              </button>

              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setSelectedYear(String(y))}
                  className={`rounded-xs border px-2.5 py-1 text-[11px] transition-all ${
                    selectedYear === String(y)
                      ? "border-[#a67c45]/50 bg-[#a67c45]/10 font-semibold text-[#8d6737]"
                      : "border-[#d0c9bd] bg-[#f3f0e8] text-[#8a918f] hover:text-[#566066]"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {(searchQuery ||
            selectedType !== "all" ||
            selectedYear !== "all") && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto text-[11px] uppercase tracking-wider text-[#a67c45] underline underline-offset-4 hover:text-[#805d32] lg:ml-0"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Content Type Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8a918f]">
          <SlidersHorizontal className="h-3 w-3 text-[#a67c45]" />
          <span>Filter by Classification</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedType("all")}
            className={`rounded-xs border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
              selectedType === "all"
                ? "border-[#a67c45]/50 bg-[#a67c45]/10 text-[#8d6737] shadow-sm"
                : "border-[#d0c9bd] bg-[#ebe7de]/70 text-[#8a918f] hover:border-[#b7afa2] hover:text-[#566066]"
            }`}
          >
            All Dispatches ({items.length})
          </button>

          {typesWithCounts.map((tc) => (
            <button
              key={tc.type}
              type="button"
              onClick={() => setSelectedType(tc.type)}
              className={`rounded-xs border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                selectedType === tc.type
                  ? "border-[#a67c45]/50 bg-[#a67c45]/10 text-[#8d6737] shadow-sm"
                  : "border-[#d0c9bd] bg-[#ebe7de]/70 text-[#8a918f] hover:border-[#b7afa2] hover:text-[#566066]"
              }`}
            >
              {tc.label} ({tc.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-[#d8d1c5] pb-2 font-mono text-xs text-[#8a918f]">
        <span>
          Displaying{" "}
          <strong className="font-semibold text-[#a67c45]">
            {filteredItems.length}
          </strong>{" "}
          official records
        </span>

        <span className="text-[11px] text-[#9a9388]">
          Verified Institutional Feed
        </span>
      </div>

      {/* Dispatches List / Grid */}
      {filteredItems.length === 0 ? (
        <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/70 p-12 text-center">
          <FileText className="mx-auto h-8 w-8 text-[#9a9388]" />

          <h3 className="font-serif text-xl font-light text-[#1d2529]">
            No dispatches found
          </h3>

          <p className="mx-auto max-w-md text-xs font-light text-[#727a7d]">
            Try adjusting your search, archive year, or disclosure category.
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="font-mono text-xs uppercase tracking-wider text-[#a67c45] underline underline-offset-4 hover:text-[#805d32]"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group relative rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/75 p-6 shadow-elevation-1 transition-all duration-300 hover:border-[#a67c45]/45 hover:bg-[#e7e2d8] hover:shadow-elevation-2 sm:p-8"
            >
              {/* Architectural corner marks */}
              <span className="pointer-events-none absolute left-1 top-1 select-none font-mono text-xs text-[#a67c45]/40 transition-colors group-hover:text-[#a67c45]">
                +
              </span>

              <span className="pointer-events-none absolute right-1 top-1 select-none font-mono text-xs text-[#a67c45]/40 transition-colors group-hover:text-[#a67c45]">
                +
              </span>

              <span className="pointer-events-none absolute bottom-1 left-1 select-none font-mono text-xs text-[#a67c45]/40 transition-colors group-hover:text-[#a67c45]">
                +
              </span>

              <span className="pointer-events-none absolute bottom-1 right-1 select-none font-mono text-xs text-[#a67c45]/40 transition-colors group-hover:text-[#a67c45]">
                +
              </span>

              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                {/* Left Metadata Column */}
                <div className="space-y-2.5 lg:col-span-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-medium text-[#a67c45]">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.publishedDisplay}</span>
                  </div>

                  <div className="font-mono text-xs font-semibold tracking-wide text-[#384247]">
                    {item.refCode}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-[#c9c2b7] bg-[#f3f0e8] font-mono text-[9px] uppercase tracking-wider text-[#566066]"
                    >
                      {item.typeLabel}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1 font-mono text-[10px] text-[#8a918f]">
                    <MapPin className="h-3 w-3 shrink-0 text-[#a67c45]" />
                    <span>{item.dateline}</span>
                  </div>
                </div>

                {/* Center Content Column */}
                <div className="space-y-3 lg:col-span-6">
                  <h3 className="font-serif text-xl font-light leading-snug text-[#1d2529] transition-colors group-hover:text-[#8d6737] sm:text-2xl">
                    <Link href={`/newsroom/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="font-sans text-xs font-light leading-relaxed text-[#727a7d] sm:text-sm">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] px-2 py-0.5 font-mono text-[9px] text-[#8a918f]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Visual & Action Column */}
                <div className="flex flex-col items-start justify-between space-y-4 lg:col-span-3 lg:items-end">
                  <div className="relative aspect-[16/9] w-full max-w-[240px] overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#e5e0d6]">
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
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#a67c45] transition-colors hover:text-[#805d32] group-hover:translate-x-0.5"
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
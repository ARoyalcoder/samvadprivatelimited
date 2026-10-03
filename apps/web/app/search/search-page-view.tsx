"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  Loader2,
  ArrowRight,
  Compass,
  Building2,
  Briefcase,
  FileText,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { SearchCategory } from "@samvad/validation";
import { SearchResultPayload } from "@/lib/search/search-types";

const DOMAIN_TABS: Array<{ id: SearchCategory; label: string }> = [
  { id: "ALL", label: "All Records" },
  { id: "SERVICES", label: "Services" },
  { id: "INDUSTRIES", label: "Industries" },
  { id: "CASE_STUDIES", label: "Case Studies" },
  { id: "INSIGHTS", label: "Insights" },
  { id: "NEWSROOM", label: "Newsroom" },
];

const DOMAIN_COLOR_CONFIG: Record<
  string,
  { badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  SERVICES: {
    badgeClass: "bg-[#a67c45]/10 text-[#a67c45] border-[#a67c45]/25",
    icon: Compass,
  },
  INDUSTRIES: {
    badgeClass: "bg-[#536b7b]/10 text-[#536b7b] border-[#536b7b]/25",
    icon: Building2,
  },
  CASE_STUDIES: {
    badgeClass: "bg-[#66745f]/10 text-[#66745f] border-[#66745f]/25",
    icon: Briefcase,
  },
  INSIGHTS: {
    badgeClass: "bg-[#655d75]/10 text-[#655d75] border-[#655d75]/25",
    icon: FileText,
  },
  NEWSROOM: {
    badgeClass: "bg-[#815b52]/10 text-[#815b52] border-[#815b52]/25",
    icon: Newspaper,
  },
};

const POPULAR_RECOMMENDATIONS = [
  "Crisis Communications",
  "Sovereign Perception Index",
  "Hostile Takeover Defense",
  "Algorithmic Asymmetry",
  "Financial Services",
  "Singapore Office Expansion",
  "Boardroom Crisis Playbook",
  "Technology Data Sovereignty",
];

export function SearchPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get("q") ?? "";
  const urlType = (searchParams.get("type") as SearchCategory) ?? "ALL";
  const urlPage = parseInt(searchParams.get("page") ?? "1", 10);

  const [inputVal, setInputVal] = React.useState(urlQuery);
  const [activeTab, setActiveTab] = React.useState<SearchCategory>(urlType);
  const [currentPage, setCurrentPage] = React.useState<number>(urlPage || 1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [payload, setPayload] = React.useState<SearchResultPayload | null>(null);

  // Sync state with URL params
  React.useEffect(() => {
    setInputVal(urlQuery);
    setActiveTab(urlType);
    setCurrentPage(urlPage || 1);
  }, [urlQuery, urlType, urlPage]);

  // Fetch search data from API
  const performSearch = React.useCallback(
    async (q: string, tab: SearchCategory, p: number) => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          q: q.trim(),
          type: tab,
          page: String(p),
          limit: "10",
        });

        const res = await fetch(`/api/search?${params.toString()}`);

        if (!res.ok) throw new Error("Search request failed");

        const data: SearchResultPayload = await res.json();
        setPayload(data);
      } catch (err) {
        console.error("Search page fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Trigger search on parameter change
  React.useEffect(() => {
    performSearch(urlQuery, urlType, urlPage);
  }, [urlQuery, urlType, urlPage, performSearch]);

  // Update URL parameters
  const updateUrl = (q: string, tab: SearchCategory, p: number) => {
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (tab !== "ALL") params.set("type", tab);
    if (p > 1) params.set("page", String(p));

    router.replace(`/search?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(inputVal, activeTab, 1);
  };

  const handleTabChange = (newTab: SearchCategory) => {
    setActiveTab(newTab);
    updateUrl(inputVal, newTab, 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateUrl(inputVal, activeTab, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRecommendationClick = (rec: string) => {
    setInputVal(rec);
    updateUrl(rec, activeTab, 1);
  };

  return (
    <div className="min-h-screen bg-[#f3f0e8] text-[#1d2529] pb-24 pt-28">
      {/* Editorial background */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-64 overflow-hidden">
        <div className="absolute right-[8%] top-0 h-64 w-64 rounded-full bg-[#a67c45]/[0.035] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Editorial Header */}
        <div className="mb-12 border-b border-[#1d2529]/15 pb-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#a67c45]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8b6a43]">
              Intelligence Index
            </span>
          </div>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-normal tracking-[-0.03em] text-[#1d2529] sm:text-6xl">
                Search{" "}
                <span className="italic text-[#a67c45]">SAMVAD</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#697174]">
                Search services, industries, case studies, insights and news.
              </p>
            </div>

            <div className="hidden border-l border-[#1d2529]/15 pl-5 sm:block">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#969995]">
                Archive
              </div>
              <div className="mt-1 font-serif text-lg text-[#394348]">
                Strategic Intelligence
              </div>
            </div>
          </div>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative mb-8">
          <div className="relative flex items-center border-b-2 border-[#1d2529]/30 bg-[#ebe7de] px-4 transition-colors focus-within:border-[#a67c45]">
            <Search className="mr-3 h-5 w-5 shrink-0 text-[#737a7d]" />

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search topics, capabilities, sectors..."
              className="flex-1 bg-transparent py-4 text-base text-[#1d2529] placeholder:text-[#9a9b97] focus:outline-none sm:text-lg"
            />

            <div className="flex items-center gap-2">
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-[#a67c45]" />
              )}

              {inputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setInputVal("");
                    updateUrl("", activeTab, 1);
                  }}
                  className="p-1.5 text-[#7d8384] transition-colors hover:text-[#1d2529]"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#1d2529] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#f3f0e8] transition-colors hover:bg-[#a67c45]"
              >
                Search
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </form>

        {/* Filter Navigation Tabs */}
        <div className="mb-7 flex items-center gap-0 overflow-x-auto border-y border-[#1d2529]/15 no-scrollbar">
          <SlidersHorizontal className="mr-3 h-3.5 w-3.5 shrink-0 text-[#8a8e8b]" />

          {DOMAIN_TABS.map((tab, index) => {
            const count =
              payload?.countsByDomain?.[
                tab.id as keyof typeof payload.countsByDomain
              ] ?? 0;

            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex shrink-0 items-center gap-2 px-3.5 py-3 font-mono text-[9px] uppercase tracking-[0.12em] transition-all ${
                  isSelected
                    ? "bg-[#1d2529] text-[#f3f0e8]"
                    : "text-[#737a7d] hover:bg-[#ebe7de] hover:text-[#1d2529]"
                }`}
              >
                <span className="hidden text-[8px] text-[#a67c45] sm:inline">
                  0{index + 1}
                </span>

                <span>{tab.label}</span>

                {payload && (
                  <span
                    className={
                      isSelected ? "text-[#c5a477]" : "text-[#9b9e9a]"
                    }
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Suggestions */}
        {(!urlQuery || (payload && payload.suggestions.length > 0)) && (
          <div className="mb-8 border-b border-[#1d2529]/15 pb-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#a67c45]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8b908d]">
                {urlQuery ? "Related Searches" : "Explore"}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {(payload && payload.suggestions.length > 0
                ? payload.suggestions
                : POPULAR_RECOMMENDATIONS
              ).map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleRecommendationClick(sug)}
                  className="border-b border-[#1d2529]/20 pb-1 text-xs text-[#596165] transition-colors hover:border-[#a67c45] hover:text-[#a67c45]"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Status Bar */}
        {payload && (
          <div className="mb-5 flex flex-col justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#929693] sm:flex-row">
            <div>
              <span className="text-[#1d2529]">
                {payload.totalResults}
              </span>{" "}
              records
              <span className="mx-2 text-[#c1c0bb]">/</span>
              {activeTab === "ALL"
                ? "All domains"
                : activeTab.toLowerCase()}
              {urlQuery && (
                <>
                  <span className="mx-2 text-[#c1c0bb]">/</span>
                  <span className="text-[#a67c45]">{urlQuery}</span>
                </>
              )}
            </div>

            <div>{payload.executionTimeMs}ms</div>
          </div>
        )}

        {/* Results List */}
        <div className="border-t border-[#1d2529]/15">
          {payload && payload.results.length > 0 ? (
            payload.results.map((item, index) => {
              const domainMeta = DOMAIN_COLOR_CONFIG[item.domain] || {
                badgeClass:
                  "bg-[#1d2529]/5 text-[#596165] border-[#1d2529]/15",
                icon: Compass,
              };

              const DomainIcon = domainMeta.icon;

              return (
                <article
                  key={item.id}
                  className="group border-b border-[#1d2529]/12 py-7 transition-colors hover:bg-[#ebe7de] sm:py-8"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Result Number */}
                    <div className="w-8 shrink-0 pt-1 font-serif text-xl text-[#c0b8aa] sm:w-10 sm:text-2xl">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Meta badges */}
                      <div className="mb-3 flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] ${domainMeta.badgeClass}`}
                        >
                          <DomainIcon className="h-3 w-3" />
                          <span>{item.domainLabel}</span>
                        </span>

                        {item.badge && (
                          <span className="text-[10px] text-[#8c918e]">
                            {item.badge}
                          </span>
                        )}

                        {item.publishedAt && (
                          <span className="font-mono text-[9px] text-[#9b9e9a]">
                            {item.publishedAt}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="max-w-3xl font-serif text-xl font-medium leading-tight tracking-[-0.015em] text-[#1d2529] sm:text-2xl">
                        <Link
                          href={item.url}
                          className="transition-colors hover:text-[#a67c45]"
                          dangerouslySetInnerHTML={{
                            __html: item.highlightedTitle || item.title,
                          }}
                        />
                      </h3>

                      {/* Description */}
                      <p
                        className="mt-2 max-w-2xl text-sm leading-6 text-[#697174]"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.highlightedDescription ||
                            item.description,
                        }}
                      />

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-3 flex items-center gap-3 flex-wrap">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#969a97]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* View Arrow */}
                    <Link
                      href={item.url}
                      className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-[#1d2529]/15 text-[#777e80] transition-all group-hover:border-[#a67c45] group-hover:bg-[#a67c45] group-hover:text-white"
                      aria-label={`View ${item.title}`}
                    >
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              );
            })
          ) : !isLoading && payload ? (
            <div className="border-b border-[#1d2529]/15 py-16 text-center">
              <Search className="mx-auto mb-4 h-8 w-8 stroke-[1.25] text-[#9a9d99]" />

              <div className="font-serif text-2xl text-[#1d2529]">
                No matching records
              </div>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#747b7d]">
                Nothing matched &ldquo;{urlQuery}&rdquo; in the{" "}
                {activeTab === "ALL"
                  ? "advisory index"
                  : `${activeTab.toLowerCase()} category`}
                .
              </p>

              {activeTab !== "ALL" && (
                <button
                  type="button"
                  onClick={() => handleTabChange("ALL")}
                  className="mt-5 inline-flex items-center gap-2 bg-[#1d2529] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#f3f0e8] transition-colors hover:bg-[#a67c45]"
                >
                  Expand search
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ) : null}
        </div>

        {/* Pagination Controls */}
        {payload && payload.totalPages > 1 && (
          <div className="mt-7 flex items-center justify-between border-t border-[#1d2529]/15 pt-5">
            <button
              type="button"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => handlePageChange(currentPage - 1)}
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#697174] transition-colors hover:text-[#a67c45] disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#949793]">
              Page{" "}
              <span className="text-[#1d2529]">
                {payload.page}
              </span>{" "}
              of{" "}
              <span className="text-[#1d2529]">
                {payload.totalPages}
              </span>
            </div>

            <button
              type="button"
              disabled={
                currentPage >= payload.totalPages || isLoading
              }
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#697174] transition-colors hover:text-[#a67c45] disabled:opacity-30"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
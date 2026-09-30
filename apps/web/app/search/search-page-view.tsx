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
    badgeClass: "bg-gold-500/10 text-gold-300 border-gold-500/30",
    icon: Compass,
  },
  INDUSTRIES: {
    badgeClass: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    icon: Building2,
  },
  CASE_STUDIES: {
    badgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    icon: Briefcase,
  },
  INSIGHTS: {
    badgeClass: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    icon: FileText,
  },
  NEWSROOM: {
    badgeClass: "bg-rose-500/10 text-rose-300 border-rose-500/30",
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
    <div className="min-h-screen bg-obsidian-950 text-sand-100 pb-24 pt-28">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-radial from-gold-500/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Editorial Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-gold-400">
              Intelligence Search Index
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-sand-100 tracking-tight">
            Search Across <span className="italic font-normal text-gold-300">SAMVAD</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-obsidian-300 max-w-2xl">
            Query our integrated archive of strategic communications practices, industry arenas, verified case studies, advisory insights, and institutional dispatches.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative mb-8">
          <div className="relative flex items-center rounded-xl border border-obsidian-700 bg-obsidian-900/90 shadow-2xl backdrop-blur-md px-4 py-3.5 focus-within:border-gold-500/50 focus-within:ring-2 focus-within:ring-gold-500/20 transition-all">
            <Search className="h-5 w-5 text-obsidian-400 shrink-0 mr-3" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search by topic, capability, sector, keyword, or dispatch..."
              className="flex-1 bg-transparent text-base sm:text-lg text-sand-100 placeholder:text-obsidian-500 focus:outline-none"
            />
            <div className="flex items-center gap-2">
              {isLoading && (
                <Loader2 className="h-5 w-5 animate-spin text-gold-400" />
              )}
              {inputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setInputVal("");
                    updateUrl("", activeTab, 1);
                  }}
                  className="p-1.5 rounded-full text-obsidian-400 hover:text-sand-100 hover:bg-obsidian-800 transition-colors"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-500/40 text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-obsidian-800 no-scrollbar">
          <SlidersHorizontal className="h-4 w-4 text-obsidian-400 shrink-0 mr-1" />
          {DOMAIN_TABS.map((tab) => {
            const count =
              payload?.countsByDomain?.[
                tab.id as keyof typeof payload.countsByDomain
              ] ?? 0;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/40 font-semibold shadow-sm"
                    : "text-obsidian-400 hover:text-sand-200 hover:bg-obsidian-900 border border-obsidian-800"
                }`}
              >
                <span>{tab.label}</span>
                {payload && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-gold-500/30 text-gold-200"
                        : "bg-obsidian-800 text-obsidian-400"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Suggestions & Recommended Inquiries */}
        {(!urlQuery || (payload && payload.suggestions.length > 0)) && (
          <div className="mb-8 p-4 rounded-xl border border-obsidian-800 bg-obsidian-900/40">
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-obsidian-400">
                {urlQuery ? "Related Advisory Suggestions" : "Recommended Search Inquiries"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(payload && payload.suggestions.length > 0
                ? payload.suggestions
                : POPULAR_RECOMMENDATIONS
              ).map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleRecommendationClick(sug)}
                  className="text-xs text-sand-300 hover:text-gold-300 bg-obsidian-800/60 hover:bg-obsidian-800 px-3 py-1.5 rounded-lg border border-obsidian-700/60 transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Status Bar */}
        {payload && (
          <div className="flex items-center justify-between text-xs font-mono text-obsidian-400 mb-6">
            <div>
              Found <span className="text-sand-200 font-semibold">{payload.totalResults}</span>{" "}
              records across {activeTab === "ALL" ? "all domains" : activeTab.toLowerCase()}
              {urlQuery && (
                <span> for &ldquo;<span className="text-gold-300">{urlQuery}</span>&rdquo;</span>
              )}
            </div>
            <div>Query executed in {payload.executionTimeMs}ms</div>
          </div>
        )}

        {/* Results List */}
        <div className="space-y-4">
          {payload && payload.results.length > 0 ? (
            payload.results.map((item) => {
              const domainMeta = DOMAIN_COLOR_CONFIG[item.domain] || {
                badgeClass: "bg-obsidian-800 text-obsidian-300 border-obsidian-700",
                icon: Compass,
              };
              const DomainIcon = domainMeta.icon;

              return (
                <article
                  key={item.id}
                  className="group relative p-5 sm:p-6 rounded-xl border border-obsidian-800 bg-obsidian-900/50 hover:bg-obsidian-900/90 hover:border-gold-500/40 transition-all shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Meta badges */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase border ${domainMeta.badgeClass}`}
                        >
                          <DomainIcon className="h-3.5 w-3.5" />
                          <span>{item.domainLabel}</span>
                        </span>
                        {item.badge && (
                          <span className="text-xs font-mono text-obsidian-400">
                            {item.badge}
                          </span>
                        )}
                        {item.publishedAt && (
                          <span className="text-xs font-mono text-obsidian-500">
                            {item.publishedAt}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-sand-100 group-hover:text-gold-300 transition-colors">
                        <Link
                          href={item.url}
                          dangerouslySetInnerHTML={{
                            __html: item.highlightedTitle || item.title,
                          }}
                        />
                      </h3>

                      {/* Highlighted contextual description */}
                      <p
                        className="mt-2 text-sm text-sand-300/80 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: item.highlightedDescription || item.description,
                        }}
                      />

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-mono text-obsidian-400 bg-obsidian-800/60 px-2 py-0.5 rounded"
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
                      className="shrink-0 p-2.5 rounded-lg border border-obsidian-800 bg-obsidian-950 text-obsidian-400 group-hover:text-gold-300 group-hover:border-gold-500/40 transition-all self-center"
                      aria-label={`View ${item.title}`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })
          ) : !isLoading && payload ? (
            <div className="py-16 text-center rounded-xl border border-obsidian-800/60 bg-obsidian-900/20">
              <Search className="h-10 w-10 text-obsidian-500 mx-auto mb-3 stroke-[1.5]" />
              <div className="font-serif text-xl text-sand-100">
                No matching records located
              </div>
              <p className="mt-2 text-sm text-obsidian-400 max-w-md mx-auto">
                No indexed items matched &ldquo;{urlQuery}&rdquo; within the{" "}
                {activeTab === "ALL" ? "advisory corpus" : `${activeTab.toLowerCase()} category`}.
              </p>
              {activeTab !== "ALL" && (
                <button
                  type="button"
                  onClick={() => handleTabChange("ALL")}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold-400 hover:text-gold-300 bg-obsidian-900 border border-gold-500/30 px-4 py-2 rounded-lg"
                >
                  Expand search to All Records
                </button>
              )}
            </div>
          ) : null}
        </div>

        {/* Pagination Controls */}
        {payload && payload.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between border-t border-obsidian-800 pt-6">
            <button
              type="button"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => handlePageChange(currentPage - 1)}
              className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-sand-300 hover:text-gold-300 disabled:opacity-40 disabled:hover:text-sand-300 px-3 py-1.5 rounded border border-obsidian-800"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs font-mono text-obsidian-400">
              Page <span className="text-sand-100 font-semibold">{payload.page}</span> of{" "}
              <span className="text-sand-100 font-semibold">{payload.totalPages}</span>
            </div>

            <button
              type="button"
              disabled={currentPage >= payload.totalPages || isLoading}
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-sand-300 hover:text-gold-300 disabled:opacity-40 disabled:hover:text-sand-300 px-3 py-1.5 rounded border border-obsidian-800"
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

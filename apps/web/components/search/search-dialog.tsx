"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Loader2,
  CornerDownLeft,
  ArrowRight,
  Briefcase,
  Building2,
  FileText,
  Newspaper,
  Compass,
  Sparkles,
} from "lucide-react";
import { SearchCategory } from "@samvad/validation";
import { useSearch } from "@/lib/search/search-context";
import {
  SearchResultItem,
  SearchResultPayload,
} from "@/lib/search/search-types";

const DOMAIN_TABS: Array<{ id: SearchCategory; label: string }> = [
  { id: "ALL", label: "All" },
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
    badgeClass:
      "bg-[#a67c45]/10 text-[#a67c45] border-[#a67c45]/25",
    icon: Compass,
  },
  INDUSTRIES: {
    badgeClass:
      "bg-[#536b7b]/10 text-[#536b7b] border-[#536b7b]/25",
    icon: Building2,
  },
  CASE_STUDIES: {
    badgeClass:
      "bg-[#66745f]/10 text-[#66745f] border-[#66745f]/25",
    icon: Briefcase,
  },
  INSIGHTS: {
    badgeClass:
      "bg-[#655d75]/10 text-[#655d75] border-[#655d75]/25",
    icon: FileText,
  },
  NEWSROOM: {
    badgeClass:
      "bg-[#815b52]/10 text-[#815b52] border-[#815b52]/25",
    icon: Newspaper,
  },
};

const POPULAR_RECOMMENDATIONS = [
  "Crisis Communications",
  "Sovereign Perception Index",
  "Hostile Takeover Defense",
  "Algorithmic Asymmetry",
  "Financial Services",
  "Technology Data Sovereignty",
];

export function SearchDialog() {
  const { isOpen, closeSearch, initialQuery } = useSearch();
  const router = useRouter();

  const [query, setQuery] = React.useState("");
  const [activeTab, setActiveTab] =
    React.useState<SearchCategory>("ALL");
  const [isLoading, setIsLoading] = React.useState(false);
  const [payload, setPayload] =
    React.useState<SearchResultPayload | null>(null);
  const [results, setResults] = React.useState<SearchResultItem[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const activeItemRef = React.useRef<HTMLDivElement | null>(null);

  // Sync initial query when opened
  React.useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery);
      }

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      setQuery("");
      setActiveTab("ALL");
      setPayload(null);
      setResults([]);
      setActiveIndex(0);
      setPage(1);
    }
  }, [isOpen, initialQuery]);

  // Execute search API request
  const fetchSearchResults = React.useCallback(
    async (
      q: string,
      tab: SearchCategory,
      targetPage: number = 1,
      append: boolean = false
    ) => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          q: q.trim(),
          type: tab,
          page: String(targetPage),
          limit: "10",
        });

        const res = await fetch(`/api/search?${params.toString()}`);

        if (!res.ok) {
          throw new Error("Failed to search");
        }

        const data: SearchResultPayload = await res.json();
        setPayload(data);

        if (append) {
          setResults((prev) => [...prev, ...data.results]);
        } else {
          setResults(data.results);
          setActiveIndex(0);
        }

        setPage(data.page);
        setHasMore(data.page < data.totalPages);
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Debounced search on query or tab change
  React.useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      fetchSearchResults(query, activeTab, 1, false);
    }, 220);

    return () => clearTimeout(timer);
  }, [query, activeTab, isOpen, fetchSearchResults]);

  // Scroll active item into view during keyboard navigation
  React.useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // Keyboard navigation inside dialog
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeSearch();
      return;
    }

    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = results[activeIndex];

      if (current) {
        closeSearch();
        router.push(current.url);
      }
    }
  };

  const handleSelectResult = (item: SearchResultItem) => {
    closeSearch();
    router.push(item.url);
  };

  const handleSelectRecommendation = (rec: string) => {
    setQuery(rec);
    inputRef.current?.focus();
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchSearchResults(query, activeTab, page + 1, true);
    }
  };

  const handleViewFullPage = () => {
    closeSearch();

    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (activeTab !== "ALL") params.set("type", activeTab);

    router.push(`/search?${params.toString()}`);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
      className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-12 sm:px-6 sm:pt-20"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101417]/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Dialog Card */}
      <div className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden border border-[#c9c3b8] bg-[#f3f0e8] shadow-[0_30px_80px_rgba(20,25,28,0.3)] animate-in zoom-in-95 duration-150">
        <h2 id="global-search-title" className="sr-only">
          Global Website Search
        </h2>

        {/* Input Bar */}
        <div className="relative flex items-center border-b border-[#1d2529]/15 bg-[#ebe7de] px-4 py-3.5">
          <Search className="mr-3 h-5 w-5 shrink-0 text-[#777e80]" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, sectors, insights..."
            className="flex-1 bg-transparent text-sm text-[#1d2529] placeholder:text-[#999b97] focus:outline-none sm:text-base"
            autoComplete="off"
            spellCheck={false}
          />

          <div className="flex items-center gap-2">
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-[#a67c45]" />
            )}

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear query"
                className="rounded p-1 text-[#777e80] transition-colors hover:bg-[#ded9cf] hover:text-[#1d2529]"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <kbd className="hidden items-center border border-[#1d2529]/15 bg-[#f3f0e8] px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#858987] sm:inline-flex">
              ESC
            </kbd>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-0 overflow-x-auto border-b border-[#1d2529]/12 bg-[#f3f0e8] px-4 no-scrollbar">
          {DOMAIN_TABS.map((tab) => {
            const count =
              payload?.countsByDomain?.[
                tab.id as keyof typeof payload.countsByDomain
              ] ?? 0;

            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`relative flex shrink-0 items-center gap-2 px-3 py-3 font-mono text-[9px] uppercase tracking-[0.12em] transition-all ${
                  isSelected
                    ? "bg-[#1d2529] text-[#f3f0e8]"
                    : "text-[#737a7d] hover:bg-[#ebe7de] hover:text-[#1d2529]"
                }`}
              >
                <span>{tab.label}</span>

                {payload && (
                  <span
                    className={
                      isSelected
                        ? "text-[#c7a77b]"
                        : "text-[#a0a29e]"
                    }
                  >
                    {count}
                  </span>
                )}

                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#a67c45]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Autocomplete Suggestions */}
        {query &&
          payload &&
          payload.suggestions &&
          payload.suggestions.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto border-b border-[#1d2529]/10 bg-[#ebe7de] px-4 py-2 no-scrollbar">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#a67c45]" />

              <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-[#898d8a]">
                Suggestions
              </span>

              <div className="flex items-center gap-2">
                {payload.suggestions.slice(0, 4).map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() =>
                      handleSelectRecommendation(sug)
                    }
                    className="whitespace-nowrap border-b border-[#1d2529]/15 px-1 py-0.5 text-xs text-[#596165] transition-colors hover:border-[#a67c45] hover:text-[#a67c45]"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

        {/* Body / Results List */}
        <div
          ref={listRef}
          className="flex-1 divide-y divide-[#1d2529]/10 overflow-y-auto bg-[#f3f0e8] px-3 py-3 sm:px-4"
        >
          {/* Empty Query: Discovery & Recommendations */}
          {!query && (
            <div className="space-y-6 py-4">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#a67c45]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#858a87]">
                    Explore
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {POPULAR_RECOMMENDATIONS.map((rec) => (
                    <button
                      key={rec}
                      type="button"
                      onClick={() =>
                        handleSelectRecommendation(rec)
                      }
                      className="border-b border-[#1d2529]/15 pb-1 text-left text-xs text-[#596165] transition-colors hover:border-[#a67c45] hover:text-[#a67c45]"
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.16em] text-[#858a87]">
                  Navigate
                </span>

                <div className="grid grid-cols-2 gap-0 border-l border-t border-[#1d2529]/12 text-xs sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/services");
                    }}
                    className="border-b border-r border-[#1d2529]/12 p-3 text-left transition-colors hover:bg-[#ebe7de]"
                  >
                    <div className="font-medium text-[#1d2529]">
                      Services
                    </div>
                    <div className="mt-0.5 text-[10px] text-[#858b8c]">
                      Strategic practices
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/industries");
                    }}
                    className="border-b border-r border-[#1d2529]/12 p-3 text-left transition-colors hover:bg-[#ebe7de]"
                  >
                    <div className="font-medium text-[#1d2529]">
                      Industries
                    </div>
                    <div className="mt-0.5 text-[10px] text-[#858b8c]">
                      Key sectors
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/work");
                    }}
                    className="border-b border-r border-[#1d2529]/12 p-3 text-left transition-colors hover:bg-[#ebe7de]"
                  >
                    <div className="font-medium text-[#1d2529]">
                      Case Archive
                    </div>
                    <div className="mt-0.5 text-[10px] text-[#858b8c]">
                      Selected work
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/insights");
                    }}
                    className="border-b border-r border-[#1d2529]/12 p-3 text-left transition-colors hover:bg-[#ebe7de]"
                  >
                    <div className="font-medium text-[#1d2529]">
                      Insights
                    </div>
                    <div className="mt-0.5 text-[10px] text-[#858b8c]">
                      Intelligence briefs
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/newsroom");
                    }}
                    className="border-b border-r border-[#1d2529]/12 p-3 text-left transition-colors hover:bg-[#ebe7de]"
                  >
                    <div className="font-medium text-[#1d2529]">
                      Newsroom
                    </div>
                    <div className="mt-0.5 text-[10px] text-[#858b8c]">
                      Press & dispatches
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/leadership");
                    }}
                    className="border-b border-r border-[#1d2529]/12 p-3 text-left transition-colors hover:bg-[#ebe7de]"
                  >
                    <div className="font-medium text-[#1d2529]">
                      Leadership
                    </div>
                    <div className="mt-0.5 text-[10px] text-[#858b8c]">
                      Partners & directors
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 &&
            results.map((item, index) => {
              const isSelected = index === activeIndex;

              const domainMeta =
                DOMAIN_COLOR_CONFIG[item.domain] || {
                  badgeClass:
                    "bg-[#1d2529]/5 text-[#596165] border-[#1d2529]/15",
                  icon: Compass,
                };

              const DomainIcon = domainMeta.icon;

              return (
                <div
                  key={item.id}
                  ref={isSelected ? activeItemRef : null}
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative my-1 cursor-pointer border px-3 py-3 transition-all sm:p-3.5 ${
                    isSelected
                      ? "border-[#a67c45]/45 bg-[#ebe7de]"
                      : "border-transparent hover:bg-[#ebe7de]/70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {/* Domain and Badge */}
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] ${domainMeta.badgeClass}`}
                        >
                          <DomainIcon className="h-3 w-3" />
                          <span>{item.domainLabel}</span>
                        </span>

                        {item.badge && (
                          <span className="font-mono text-[9px] text-[#858b8c]">
                            {item.badge}
                          </span>
                        )}

                        {item.publishedAt && (
                          <span className="font-mono text-[9px] text-[#9a9d99]">
                            {item.publishedAt}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4
                        className={`font-serif text-sm font-medium transition-colors sm:text-base ${
                          isSelected
                            ? "text-[#a67c45]"
                            : "text-[#1d2529]"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html:
                            item.highlightedTitle ||
                            item.title,
                        }}
                      />

                      {/* Description */}
                      <p
                        className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#697174]"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.highlightedDescription ||
                            item.description,
                        }}
                      />

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {item.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="font-mono text-[9px] uppercase tracking-[0.06em] text-[#969a97]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Active Selection Indicator */}
                    <div className="shrink-0 self-center">
                      {isSelected ? (
                        <div className="flex items-center gap-1 font-mono text-xs text-[#a67c45]">
                          <CornerDownLeft className="h-4 w-4 animate-pulse" />
                        </div>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-[#a5a8a5] transition-colors group-hover:text-[#a67c45]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {/* No Results State */}
          {query && !isLoading && results.length === 0 && (
            <div className="space-y-3 py-12 text-center">
              <Search className="mx-auto h-8 w-8 stroke-[1.5] text-[#a0a39f]" />

              <div className="font-serif text-base text-[#1d2529]">
                No matching results
              </div>

              <p className="mx-auto max-w-sm text-xs text-[#747b7d]">
                Nothing matched &ldquo;
                <span className="font-medium text-[#596165]">
                  {query}
                </span>
                &rdquo;
                {activeTab !== "ALL" &&
                  ` in ${activeTab.toLowerCase()}.`}
              </p>

              {activeTab !== "ALL" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("ALL")}
                  className="mt-2 font-mono text-xs text-[#a67c45] underline underline-offset-4 transition-colors hover:text-[#805d36]"
                >
                  Search all domains →
                </button>
              )}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="py-4 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="border border-[#1d2529]/20 bg-transparent px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#596165] transition-colors hover:border-[#a67c45] hover:text-[#a67c45] disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  <span>Load more</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Dialog Footer */}
        <div className="flex items-center justify-between border-t border-[#1d2529]/12 bg-[#ebe7de] px-4 py-2.5 font-mono text-[10px] text-[#858a87]">
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 sm:inline-flex">
              <kbd className="border border-[#1d2529]/15 bg-[#f3f0e8] px-1.5 py-0.5 text-[#687073]">
                ↑
              </kbd>
              <kbd className="border border-[#1d2529]/15 bg-[#f3f0e8] px-1.5 py-0.5 text-[#687073]">
                ↓
              </kbd>
              <span>navigate</span>
            </span>

            <span className="hidden items-center gap-1 sm:inline-flex">
              <kbd className="border border-[#1d2529]/15 bg-[#f3f0e8] px-1.5 py-0.5 text-[#687073]">
                ↵
              </kbd>
              <span>select</span>
            </span>

            {payload && (
              <span className="text-[#858a87]">
                {payload.totalResults} results ·{" "}
                {payload.executionTimeMs}ms
              </span>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={handleViewFullPage}
              className="inline-flex items-center gap-1 text-[#a67c45] transition-colors hover:text-[#805d36] hover:underline"
            >
              <span>Full Search</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
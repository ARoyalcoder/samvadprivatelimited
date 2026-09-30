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
import { SearchResultItem, SearchResultPayload } from "@/lib/search/search-types";

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
  "Technology Data Sovereignty",
];

export function SearchDialog() {
  const { isOpen, closeSearch, initialQuery } = useSearch();
  const router = useRouter();

  const [query, setQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<SearchCategory>("ALL");
  const [isLoading, setIsLoading] = React.useState(false);
  const [payload, setPayload] = React.useState<SearchResultPayload | null>(null);
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
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-6"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-xl border border-obsidian-800 bg-obsidian-900/95 shadow-2xl shadow-obsidian-950/80 backdrop-blur-xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        <h2 id="global-search-title" className="sr-only">
          Global Website Search
        </h2>

        {/* Input Bar */}
        <div className="relative flex items-center border-b border-obsidian-800 px-4 py-3.5 bg-obsidian-950/60">
          <Search className="h-5 w-5 text-obsidian-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practices, industries, case studies, intelligence, newsroom..."
            className="flex-1 bg-transparent text-sm sm:text-base text-sand-100 placeholder:text-obsidian-500 focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <div className="flex items-center gap-2">
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-gold-400" />
            )}
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear query"
                className="p-1 rounded text-obsidian-400 hover:text-sand-100 hover:bg-obsidian-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded border border-obsidian-700 bg-obsidian-800/80 text-obsidian-400">
              ESC
            </kbd>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-b border-obsidian-800/80 bg-obsidian-950/40 no-scrollbar">
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
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/40 font-semibold"
                    : "text-obsidian-400 hover:text-sand-200 hover:bg-obsidian-800/50 border border-transparent"
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

        {/* Dynamic Autocomplete Suggestions (when typing) */}
        {query && payload && payload.suggestions && payload.suggestions.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-obsidian-950/30 border-b border-obsidian-800/40 overflow-x-auto no-scrollbar">
            <Sparkles className="h-3.5 w-3.5 text-gold-400 shrink-0" />
            <span className="text-[11px] font-mono text-obsidian-400 shrink-0 uppercase tracking-wider">
              Suggestions:
            </span>
            <div className="flex items-center gap-1.5">
              {payload.suggestions.slice(0, 4).map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => handleSelectRecommendation(sug)}
                  className="text-xs text-sand-300 hover:text-gold-300 bg-obsidian-800/60 hover:bg-obsidian-800 px-2 py-0.5 rounded border border-obsidian-700/60 transition-colors whitespace-nowrap"
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
          className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 divide-y divide-obsidian-800/40"
        >
          {/* Empty Query: Discovery & Recommendations */}
          {!query && (
            <div className="py-4 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-gold-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-obsidian-400">
                    Curated Strategic Inquiries
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_RECOMMENDATIONS.map((rec) => (
                    <button
                      key={rec}
                      type="button"
                      onClick={() => handleSelectRecommendation(rec)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-obsidian-800 bg-obsidian-950/60 text-sand-300 hover:text-gold-300 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all text-left"
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-obsidian-400 block mb-3">
                  Practice Navigation
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/services");
                    }}
                    className="p-2.5 rounded-lg border border-obsidian-800/70 hover:border-gold-500/30 bg-obsidian-950/40 text-left hover:bg-obsidian-800/50 transition-colors"
                  >
                    <div className="font-semibold text-sand-200">Services Explorer</div>
                    <div className="text-[11px] text-obsidian-400 mt-0.5">
                      6 Strategic Practices
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/industries");
                    }}
                    className="p-2.5 rounded-lg border border-obsidian-800/70 hover:border-gold-500/30 bg-obsidian-950/40 text-left hover:bg-obsidian-800/50 transition-colors"
                  >
                    <div className="font-semibold text-sand-200">Industry Sectors</div>
                    <div className="text-[11px] text-obsidian-400 mt-0.5">
                      8 High-Stakes Arenas
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/work");
                    }}
                    className="p-2.5 rounded-lg border border-obsidian-800/70 hover:border-gold-500/30 bg-obsidian-950/40 text-left hover:bg-obsidian-800/50 transition-colors"
                  >
                    <div className="font-semibold text-sand-200">Case Archive</div>
                    <div className="text-[11px] text-obsidian-400 mt-0.5">
                      Disclosed Engagements
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/insights");
                    }}
                    className="p-2.5 rounded-lg border border-obsidian-800/70 hover:border-gold-500/30 bg-obsidian-950/40 text-left hover:bg-obsidian-800/50 transition-colors"
                  >
                    <div className="font-semibold text-sand-200">Insights & Essays</div>
                    <div className="text-[11px] text-obsidian-400 mt-0.5">
                      Intelligence Briefs
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/newsroom");
                    }}
                    className="p-2.5 rounded-lg border border-obsidian-800/70 hover:border-gold-500/30 bg-obsidian-950/40 text-left hover:bg-obsidian-800/50 transition-colors"
                  >
                    <div className="font-semibold text-sand-200">Newsroom</div>
                    <div className="text-[11px] text-obsidian-400 mt-0.5">
                      Press & Dispatches
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push("/leadership");
                    }}
                    className="p-2.5 rounded-lg border border-obsidian-800/70 hover:border-gold-500/30 bg-obsidian-950/40 text-left hover:bg-obsidian-800/50 transition-colors"
                  >
                    <div className="font-semibold text-sand-200">Leadership</div>
                    <div className="text-[11px] text-obsidian-400 mt-0.5">
                      Partners & Directors
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
              const domainMeta = DOMAIN_COLOR_CONFIG[item.domain] || {
                badgeClass: "bg-obsidian-800 text-obsidian-300 border-obsidian-700",
                icon: Compass,
              };
              const DomainIcon = domainMeta.icon;

              return (
                <div
                  key={item.id}
                  ref={isSelected ? activeItemRef : null}
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative p-3 sm:p-3.5 my-1 rounded-lg cursor-pointer transition-all border ${
                    isSelected
                      ? "border-gold-500/40 bg-obsidian-950/90 shadow-md ring-1 ring-gold-500/20"
                      : "border-transparent hover:bg-obsidian-950/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Domain and Badge */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border ${domainMeta.badgeClass}`}
                        >
                          <DomainIcon className="h-3 w-3" />
                          <span>{item.domainLabel}</span>
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono text-obsidian-400">
                            {item.badge}
                          </span>
                        )}
                        {item.publishedAt && (
                          <span className="text-[10px] font-mono text-obsidian-500">
                            {item.publishedAt}
                          </span>
                        )}
                      </div>

                      {/* Title with highlighted match */}
                      <h4
                        className={`text-sm sm:text-base font-serif font-medium transition-colors ${
                          isSelected ? "text-gold-200" : "text-sand-100"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: item.highlightedTitle || item.title,
                        }}
                      />

                      {/* Description with contextual snippet & highlighted match */}
                      <p
                        className="text-xs text-sand-300/80 mt-1 line-clamp-2 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: item.highlightedDescription || item.description,
                        }}
                      />

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {item.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono text-obsidian-400 bg-obsidian-800/40 px-1.5 py-0.5 rounded"
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
                        <div className="flex items-center gap-1 text-gold-400 text-xs font-mono">
                          <CornerDownLeft className="h-4 w-4 animate-pulse" />
                        </div>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-obsidian-600 group-hover:text-sand-400 transition-colors" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {/* No Results State */}
          {query && !isLoading && results.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <Search className="h-8 w-8 text-obsidian-500 mx-auto stroke-[1.5]" />
              <div className="text-sand-200 font-serif text-base">
                No matching results found
              </div>
              <p className="text-xs text-obsidian-400 max-w-sm mx-auto">
                No indexed entries matched &ldquo;<span className="text-sand-300 font-medium">{query}</span>&rdquo;{" "}
                {activeTab !== "ALL" && `within the ${activeTab.toLowerCase()} practice area`}.
              </p>
              {activeTab !== "ALL" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("ALL")}
                  className="mt-2 text-xs font-mono text-gold-400 hover:text-gold-300 underline underline-offset-4"
                >
                  Search across all practice domains →
                </button>
              )}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="py-3 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="text-xs font-mono uppercase tracking-wider text-gold-400 hover:text-gold-300 bg-obsidian-950/60 border border-gold-500/30 px-4 py-2 rounded-lg hover:bg-gold-500/10 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading more...
                  </span>
                ) : (
                  <span>Load Next Page of Results</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Dialog Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-obsidian-800/80 bg-obsidian-950/80 text-[11px] font-mono text-obsidian-400">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-obsidian-700 bg-obsidian-900 text-obsidian-300">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-obsidian-700 bg-obsidian-900 text-obsidian-300">
                ↓
              </kbd>
              <span>navigate</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-obsidian-700 bg-obsidian-900 text-obsidian-300">
                ↵
              </kbd>
              <span>select</span>
            </span>
            {payload && (
              <span className="text-obsidian-400">
                {payload.totalResults} results ({payload.executionTimeMs}ms)
              </span>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={handleViewFullPage}
              className="text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 transition-colors hover:underline"
            >
              <span>Full Search Page</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

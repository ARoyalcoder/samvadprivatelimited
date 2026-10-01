"use client";

import * as React from "react";
import {
  Search,
  BookOpen,
  Newspaper,
  FileBadge,
  RefreshCw,
} from "lucide-react";
import { Badge, EmptyState } from "@samvad/ui";
import { UnifiedContentItem } from "../../../lib/dashboard/dashboard-service";
import { CmsManager } from "../../cms/cms-manager";
import { Sparkles, Layers } from "lucide-react";

interface ContentSectionProps {
  content: UnifiedContentItem[];
  loading: boolean;
  onUpdateStatus: (id: string, newStatus: "PUBLISHED" | "DRAFT" | "ARCHIVED") => Promise<void>;
  callerRole?: string;
}

export function ContentSection({ content, loading, onUpdateStatus, callerRole = "ANALYST" }: ContentSectionProps) {
  const [viewMode, setViewMode] = React.useState<"cms" | "feed">("cms");
  const [selectedType, setSelectedType] = React.useState<"ALL" | "INSIGHTS" | "NEWSROOM" | "CASE_STUDIES">("ALL");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  // Filter content
  const filtered = React.useMemo(() => {
    return content.filter((item) => {
      if (selectedType === "INSIGHTS" && item.type !== "INSIGHT") return false;
      if (selectedType === "NEWSROOM" && item.type !== "NEWSROOM") return false;
      if (selectedType === "CASE_STUDIES" && item.type !== "CASE_STUDY") return false;

      if (selectedStatus !== "ALL" && item.status !== selectedStatus) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.authorOrContact.toLowerCase().includes(q) ||
          item.categoryOrSector.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [content, selectedType, selectedStatus, searchQuery]);

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    setUpdatingId(id);
    const targetStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await onUpdateStatus(id, targetStatus);
    setUpdatingId(null);
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 rounded border border-zinc-800 bg-zinc-900/40" />
        <div className="h-96 rounded border border-zinc-800 bg-zinc-900/40" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header with View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <span>Unified Content Management System</span>
            <span className="font-mono text-[10px] text-gold-400 bg-gold-950/60 border border-gold-800/40 px-2 py-0.5 rounded">
              8 Core Domains
            </span>
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            Sovereign editorial governance: Pages, Services, Industries, Case Studies, Insights, Newsroom, Leadership, and Media Assets.
          </p>
        </div>

        {/* View Mode Toggle: CMS Studio vs Feed Stream */}
        <div className="flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-950 p-1 font-mono text-xs">
          <button
            onClick={() => setViewMode("cms")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              viewMode === "cms"
                ? "bg-gold-500 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>CMS Studio</span>
          </button>
          <button
            onClick={() => setViewMode("feed")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              viewMode === "feed"
                ? "bg-gold-500 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Quick Feed</span>
          </button>
        </div>
      </div>

      {/* 2. Content Render based on View Mode */}
      {viewMode === "cms" ? (
        <CmsManager callerRole={callerRole} />
      ) : (
        <div className="space-y-6">
          {/* Feed Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Type Filter Tabs */}
            <div className="flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-950 p-1 font-mono text-xs">
              {[
                { id: "ALL", label: "All Items" },
                { id: "INSIGHTS", label: "Insights" },
                { id: "NEWSROOM", label: "Newsroom" },
                { id: "CASE_STUDIES", label: "Case Studies" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id as any)}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    selectedType === tab.id
                      ? "bg-gold-500 text-zinc-950 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-zinc-500 uppercase">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-xs text-zinc-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or sector..."
              className="w-full rounded border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>

      {/* 3. Content Table or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          code="CONTENT_NOT_FOUND"
          title="No Matching Content Items"
          description="No published or drafted narratives matched your active filter or search criteria."
          action={
            <button
              onClick={() => {
                setSelectedType("ALL");
                setSelectedStatus("ALL");
                setSearchQuery("");
              }}
              className="rounded border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-gold-400 hover:bg-zinc-800 transition-colors"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded border border-zinc-800 bg-zinc-900/60 shadow-sm">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-zinc-800/80 bg-zinc-950/80 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Title &amp; Classification</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Author / Desk</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-950/40 transition-colors">
                  <td className="py-3 px-4 max-w-sm">
                    <div className="space-y-0.5">
                      <span className="font-serif text-sm font-medium text-zinc-100 hover:text-gold-300 transition-colors block truncate">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-zinc-500">/{item.slug}</span>
                        <span className="font-mono text-[10px] text-gold-500/80">
                          {item.categoryOrSector}
                        </span>
                        {item.isFeatured && (
                          <span className="rounded bg-gold-950/50 border border-gold-800/40 px-1.5 py-0.2 font-mono text-[9px] text-gold-300">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px]">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      {item.type === "INSIGHT" ? (
                        <BookOpen className="h-3.5 w-3.5 text-sky-400" />
                      ) : item.type === "NEWSROOM" ? (
                        <Newspaper className="h-3.5 w-3.5 text-purple-400" />
                      ) : (
                        <FileBadge className="h-3.5 w-3.5 text-indigo-400" />
                      )}
                      {item.type}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-zinc-400">{item.authorOrContact}</td>

                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-500">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={item.status === "PUBLISHED" ? "gold" : "outline"}>
                      {item.status}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleStatusToggle(item.id, item.status)}
                      disabled={updatingId === item.id}
                      className="font-mono text-[11px] px-2.5 py-1 rounded border border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-gold-500/50 hover:text-gold-300 transition-colors disabled:opacity-50"
                    >
                      {updatingId === item.id ? (
                        <RefreshCw className="h-3 w-3 animate-spin inline" />
                      ) : item.status === "PUBLISHED" ? (
                        "Unpublish"
                      ) : (
                        "Publish"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle,
  UserX,
  TrendingDown,
  Search,
  Download,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface SubscriberRecord {
  id: string;
  email: string;
  status: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING" | "BOUNCED";
  source: string;
  consentGiven: boolean;
  consentedAt: string;
  unsubscribedAt?: string | null;
  unsubscribeReason?: string | null;
  createdAt: string;
}

interface StatsData {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribedSubscribers: number;
  churnRatePercent: number;
}

const STATUS_FILTERS = ["ALL", "SUBSCRIBED", "UNSUBSCRIBED", "BOUNCED"] as const;

export function SubscribersView() {
  const [subscribers, setSubscribers] = React.useState<SubscriberRecord[]>([]);
  const [stats, setStats] = React.useState<StatsData>({
    totalSubscribers: 0,
    activeSubscribers: 0,
    unsubscribedSubscribers: 0,
    churnRatePercent: 0,
  });
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [actionInProgress, setActionInProgress] = React.useState<string | null>(null);

  const fetchSubscribers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        search: search.trim(),
        page: String(page),
        limit: "15",
      });

      const res = await fetch(`/api/subscribers?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load subscribers");
      const data = await res.json();

      setSubscribers(data.subscribers || []);
      setStats((prev) => data.stats || prev);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Subscribers fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, search, page]);

  React.useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const handleStatusChange = async (subscriberId: string, newStatus: string) => {
    setActionInProgress(subscriberId);
    try {
      const res = await fetch("/api/subscribers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriberId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Status update failed");
      await fetchSubscribers();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleExportCsv = () => {
    window.location.href = "/api/subscribers/export";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 lg:p-10 space-y-8">
      {/* 1. Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              Syndication Gateway: Active
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
            Executive Dispatches &amp; Subscribers
          </h1>
          <p className="text-xs text-zinc-400 font-light">
            Monitor verified readership, consent audit trails, and automated RFC 8058 opt-out compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Active CSV</span>
          </button>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
          >
            Command Portal
          </Link>
        </div>
      </header>

      {/* 2. Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Reach</span>
            <Users className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-zinc-100">
            {stats.totalSubscribers}
          </div>
          <p className="text-[11px] text-zinc-500">Cumulative verified subscribers</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-mono uppercase tracking-wider">Active Subscribers</span>
            <CheckCircle className="h-4 w-4" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-300">
            {stats.activeSubscribers}
          </div>
          <p className="text-[11px] text-zinc-500">Scheduled for next executive dispatch</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-xs font-mono uppercase tracking-wider">Opt-Out Directives</span>
            <UserX className="h-4 w-4" />
          </div>
          <div className="font-serif text-3xl font-bold text-rose-300">
            {stats.unsubscribedSubscribers}
          </div>
          <p className="text-[11px] text-zinc-500">Honored opt-outs &amp; suppressions</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono uppercase tracking-wider">Churn Rate</span>
            <TrendingDown className="h-4 w-4" />
          </div>
          <div className="font-serif text-3xl font-bold text-amber-300">
            {stats.churnRatePercent}%
          </div>
          <p className="text-[11px] text-zinc-500">Opt-outs as percentage of total</p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search subscriber email address..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 pl-9 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Filter className="h-3.5 w-3.5 text-zinc-500 shrink-0 mr-1" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono tracking-wider transition-colors ${
                statusFilter === s
                  ? "bg-gold-500/20 text-gold-300 border border-gold-500/40 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-950/60"
              }`}
            >
              {s}
            </button>
          ))}
          <button
            type="button"
            onClick={fetchSubscribers}
            className="p-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 ml-1"
            title="Refresh Directory"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* 4. Table */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 border-b border-zinc-800 font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Subscriber Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Acquisition Source</th>
                <th className="py-3 px-4">Consent Date</th>
                <th className="py-3 px-4">Opt-Out Details</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-light">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-gold-400" />
                    <span>Synchronizing directory records...</span>
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No subscriber records matching current parameters.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => {
                  const isBusy = actionInProgress === sub.id;
                  const isSubscribed = sub.status === "SUBSCRIBED";

                  return (
                    <tr key={sub.id} className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-zinc-200">
                        {sub.email}
                      </td>
                      <td className="py-3 px-4">
                        {isSubscribed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            ACTIVE
                          </span>
                        ) : sub.status === "UNSUBSCRIBED" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/30">
                            OPTED OUT
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            {sub.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                        {sub.source}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                        {new Date(sub.consentedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                        {sub.unsubscribedAt ? (
                          <div>
                            <div>{new Date(sub.unsubscribedAt).toLocaleDateString()}</div>
                            {sub.unsubscribeReason && (
                              <div className="text-[10px] text-zinc-500 truncate max-w-xs">
                                Reason: {sub.unsubscribeReason}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {isSubscribed ? (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(sub.id, "UNSUBSCRIBED")}
                            disabled={isBusy}
                            className="font-mono text-[10px] uppercase tracking-wider text-rose-400 hover:text-rose-300 border border-rose-500/30 hover:border-rose-500/60 px-2 py-1 rounded bg-rose-500/5 transition-colors disabled:opacity-50"
                          >
                            {isBusy ? "Updating..." : "Manual Opt-Out"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(sub.id, "SUBSCRIBED")}
                            disabled={isBusy}
                            className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 px-2 py-1 rounded bg-emerald-500/5 transition-colors disabled:opacity-50"
                          >
                            {isBusy ? "Updating..." : "Reactivate"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-800 p-4 font-mono text-xs text-zinc-400">
            <button
              type="button"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 px-3 py-1 rounded border border-zinc-800 hover:text-zinc-200 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages || isLoading}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 px-3 py-1 rounded border border-zinc-800 hover:text-zinc-200 disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Search, RefreshCw } from "lucide-react";
import { Badge, EmptyState } from "@samvad/ui";
import { AuditRecord } from "../../../lib/auth/auth-service";

interface AuditSectionProps {
  logs: AuditRecord[];
  loading: boolean;
  onRefresh: () => void;
}

export function AuditSection({ logs, loading, onRefresh }: AuditSectionProps) {
  const [actionFilter, setActionFilter] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredLogs = React.useMemo(() => {
    return logs.filter((log) => {
      if (actionFilter !== "ALL" && log.action !== actionFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          log.action.toLowerCase().includes(q) ||
          (log.userId && log.userId.toLowerCase().includes(q)) ||
          (log.ipAddress && log.ipAddress.toLowerCase().includes(q)) ||
          (log.entityType && log.entityType.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [logs, actionFilter, searchQuery]);

  const getActionBadgeVariant = (action: string): "gold" | "secondary" | "outline" => {
    if (action.includes("SUCCESS") || action.includes("VERIFIED")) return "gold";
    if (action.includes("FAILED") || action.includes("LOCKED")) return "outline";
    return "secondary";
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
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-zinc-100">
            Immutable Security Audit Telemetry
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            Cryptographic ledger tracking authentication, privilege escalations, and administrative events
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:text-gold-300 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh Ledger</span>
        </button>
      </div>

      {/* 2. Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, actor, or IP address..."
            className="w-full rounded border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-zinc-500 uppercase">Action Filter:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-xs text-zinc-300 focus:border-gold-500 focus:outline-none"
          >
            <option value="ALL">All Recorded Actions</option>
            <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
            <option value="LOGIN_FAILED">LOGIN_FAILED</option>
            <option value="ACCOUNT_LOCKED">ACCOUNT_LOCKED</option>
            <option value="MFA_CHALLENGE_ISSUED">MFA_CHALLENGE_ISSUED</option>
            <option value="MFA_VERIFICATION_SUCCESS">MFA_VERIFICATION_SUCCESS</option>
            <option value="LOGOUT">LOGOUT</option>
            <option value="LEAD_STATUS_UPDATED">LEAD_STATUS_UPDATED</option>
            <option value="PLATFORM_SETTINGS_UPDATED">PLATFORM_SETTINGS_UPDATED</option>
          </select>
        </div>
      </div>

      {/* 3. Audit Table or Empty State */}
      {filteredLogs.length === 0 ? (
        <EmptyState
          code="NO_AUDIT_MATCH"
          title="No Audit Records Located"
          description="There are currently no security telemetry events matching your specified filter criteria."
          action={
            <button
              onClick={() => {
                setActionFilter("ALL");
                setSearchQuery("");
              }}
              className="rounded border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-gold-400 hover:bg-zinc-800 transition-colors"
            >
              Reset Audit Filter
            </button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded border border-zinc-800 bg-zinc-900/60 shadow-sm font-mono text-xs">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-800/80 bg-zinc-950/80 text-[10px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Event ID &amp; Timestamp</th>
                <th className="py-3 px-4">Security Action</th>
                <th className="py-3 px-4">Actor ID</th>
                <th className="py-3 px-4">Entity Target</th>
                <th className="py-3 px-4">Origin IP</th>
                <th className="py-3 px-4 text-right">Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-950/40 transition-colors">
                  <td className="py-3 px-4 text-zinc-400">
                    <span className="text-zinc-200 block">{log.id}</span>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={getActionBadgeVariant(log.action)}>{log.action}</Badge>
                  </td>

                  <td className="py-3 px-4 text-zinc-400">
                    {log.userId ? log.userId : <span className="text-zinc-600">Unauthenticated</span>}
                  </td>

                  <td className="py-3 px-4 text-zinc-400">
                    <span className="text-gold-500/80">{log.entityType}</span>
                    {log.entityId && <span className="text-zinc-500 block text-[10px]">/{log.entityId}</span>}
                  </td>

                  <td className="py-3 px-4 text-zinc-400">
                    {log.ipAddress || "127.0.0.1"}
                  </td>

                  <td className="py-3 px-4 text-right text-[10px] text-zinc-500 truncate max-w-xs">
                    {log.metadata ? JSON.stringify(log.metadata) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

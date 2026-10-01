"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@samvad/ui";
import { CmsManager } from "../../components/cms/cms-manager";

export function CmsPageView() {
  const [callerRole, setCallerRole] = React.useState<string>("ANALYST");
  const [userName, setUserName] = React.useState<string>("Executive Officer");
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function loadSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setCallerRole(json.data.role);
            setUserName(json.data.name || json.data.email);
          }
        }
      } catch {
        // Fallback to ANALYST
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-gold-500/30">
      {/* 1. TOP MASTHEAD */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Back & Title */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 font-mono text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-gradient-to-br from-gold-400 to-gold-700 text-xs font-bold text-zinc-950 shadow-sm">
                S
              </div>
              <div>
                <h1 className="font-serif text-sm font-bold uppercase tracking-[0.2em] text-zinc-100">
                  SAMVAD CMS Studio
                </h1>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                  Multi-Domain Perception Governance
                </span>
              </div>
            </div>
          </div>

          {/* Right: Role, Identity & Quick Portal Links */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center gap-2 border-r border-zinc-800 pr-3 font-mono text-[11px] text-zinc-400">
              <Link
                href="/media"
                className="flex items-center gap-1 hover:text-gold-300 transition-colors"
              >
                <span>Media CDN</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
              <span className="text-zinc-700">|</span>
              <Link
                href="/subscribers"
                className="flex items-center gap-1 hover:text-gold-300 transition-colors"
              >
                <span>Subscribers</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>

            <Badge variant="gold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-gold-400" />
                <span>{callerRole}</span>
              </span>
            </Badge>

            <span className="hidden sm:inline font-mono text-xs text-zinc-300">
              {userName}
            </span>
          </div>
        </div>
      </header>

      {/* 2. MAIN CMS WORKSPACE */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="space-y-4 animate-pulse pt-8">
            <div className="h-10 rounded border border-zinc-800 bg-zinc-900/40" />
            <div className="h-96 rounded border border-zinc-800 bg-zinc-900/40" />
          </div>
        ) : (
          <CmsManager callerRole={callerRole} />
        )}
      </main>
    </div>
  );
}

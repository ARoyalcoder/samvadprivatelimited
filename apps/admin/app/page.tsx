import * as React from "react";
import { ShieldCheck, Lock, Terminal } from "lucide-react";
import { Badge } from "@samvad/ui";

export default function AdminFoundationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-gradient-to-br from-gold-400 to-gold-700 text-xs font-bold text-zinc-950">
              S
            </div>
            <span className="font-serif text-sm font-bold uppercase tracking-[0.2em] text-zinc-200">
              SAMVAD
            </span>
          </div>
          <Badge variant="gold">Restricted Access</Badge>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-zinc-100">Advisory Command Center</h1>
          <p className="text-xs leading-relaxed text-zinc-400">
            Enterprise administration, strategic narrative arbitrations, and encrypted lead
            management. Authentication required for all operational nodes.
          </p>
        </div>

        <div className="space-y-2 rounded-sm border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-[11px] text-zinc-400">
          <div className="flex items-center gap-2 text-gold-400">
            <Terminal className="h-3.5 w-3.5" />
            <span>Architecture Node Status: ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-zinc-400" />
            <span>Session Protocol: RBAC Guarded</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
            <span>Audit Trail: Immutable Log Active</span>
          </div>
        </div>

        {/* Portal Operations Navigation */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href="/subscribers"
            className="flex flex-col items-center justify-center p-3 rounded border border-zinc-800 bg-zinc-950/50 hover:border-gold-500/40 hover:bg-zinc-900 transition-colors text-center group"
          >
            <span className="font-serif text-sm font-medium text-zinc-200 group-hover:text-gold-300">
              Subscribers
            </span>
            <span className="text-[10px] font-mono text-zinc-500 mt-0.5">
              Dispatches &amp; Opt-Outs
            </span>
          </a>
          <a
            href="/media"
            className="flex flex-col items-center justify-center p-3 rounded border border-zinc-800 bg-zinc-950/50 hover:border-gold-500/40 hover:bg-zinc-900 transition-colors text-center group"
          >
            <span className="font-serif text-sm font-medium text-zinc-200 group-hover:text-gold-300">
              Media Assets
            </span>
            <span className="text-[10px] font-mono text-zinc-500 mt-0.5">
              CDN &amp; Ingestion
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

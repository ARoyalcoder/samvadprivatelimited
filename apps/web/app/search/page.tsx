import * as React from "react";
import { Suspense } from "react";
import { Metadata } from "next";
import { SearchPageView } from "./search-page-view";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Intelligence Archive | SAMVAD PERCEPTION ADVISORY",
  description:
    "Institutional search across SAMVAD practices, industry sectors, case archives, intelligence reports, and newsroom dispatches.",
};

function SearchPageSkeleton() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-sand-100 flex items-center justify-center pt-24 pb-24">
      <div className="flex flex-col items-center gap-3 text-obsidian-400">
        <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
        <span className="font-mono text-xs uppercase tracking-widest">
          Loading Search Intelligence Index...
        </span>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageView />
    </Suspense>
  );
}

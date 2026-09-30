import * as React from "react";
import { Suspense } from "react";
import { Metadata } from "next";
import { UnsubscribeView } from "./unsubscribe-view";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsubscribe & Preferences | SAMVAD PERCEPTION ADVISORY",
  description:
    "Manage your SAMVAD intelligence dispatch preferences and opt-out directives.",
  robots: {
    index: false,
    follow: false,
  },
};

function UnsubscribeSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center pt-24 pb-24">
      <div className="flex flex-col items-center gap-3 text-zinc-400">
        <Loader2 className="h-6 w-6 animate-spin text-gold-400" />
        <span className="font-mono text-xs uppercase tracking-widest">
          Loading Preference Protocol...
        </span>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<UnsubscribeSkeleton />}>
      <UnsubscribeView />
    </Suspense>
  );
}

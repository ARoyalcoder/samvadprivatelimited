"use client";

import * as React from "react";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { SubscribeResult } from "@/lib/newsletter/types";

export interface NewsletterSubscribeFormProps {
  source?: string;
  variant?: "footer" | "standalone" | "compact";
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterSubscribeForm({
  source = "WEBSITE_FOOTER",
  variant = "footer",
  title = "Executive Intelligence Dispatches",
  description = "Fortnightly strategic communications telemetry, sovereign perception analyses, and boardroom crisis doctrine.",
  className = "",
}: NewsletterSubscribeFormProps) {
  const [email, setEmail] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState("");
  const [mountTime] = React.useState<number>(() => Date.now());

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<SubscribeResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side quick check
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid institutional or personal email address.");
      return;
    }

    if (!consent) {
      setErrorMsg("Please affirm consent to receive intelligence dispatches.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          consent,
          source,
          honeypot,
          clientTimestamp: mountTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process subscription");
      }

      setResult(data);
      setEmail("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const isStandalone = variant === "standalone";

  return (
    <div className={`relative ${isStandalone ? "space-y-4" : ""} ${className}`}>
      {/* Title & Description */}
      {title && (
        <div className="mb-3 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-gold-400">
              {title}
            </span>
          </div>
          {description && (
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Success State */}
      {result ? (
        <div className="rounded-lg border border-gold-500/40 bg-zinc-900/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-serif text-sm font-medium text-zinc-100">
                {result.isExisting ? "Subscription Active" : "Briefing Schedule Initiated"}
              </h5>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {result.message}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                <span>Encrypted • No unsolicited syndication • One-click opt-out</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          {/* Honeypot field (hidden from view) */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website_url_honeypot">Website URL</label>
            <input
              id="website_url_honeypot"
              type="text"
              name="website_url_honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Email Input + Submit Button Row */}
          <div className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="executive@institution.com"
              disabled={isLoading}
              required
              className="w-full rounded-md border border-zinc-700 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-gold-500/60 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all pr-24"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-1 top-1 bottom-1 flex items-center gap-1.5 rounded bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-500/40 px-3 font-mono text-[11px] uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer group text-[11px] text-zinc-400 select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={isLoading}
              className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-700 bg-zinc-900 text-gold-500 focus:ring-gold-500/40 focus:ring-offset-0 focus:ring-1 accent-gold-500"
            />
            <span className="leading-tight group-hover:text-zinc-300 transition-colors">
              I agree to receive confidential intelligence dispatches and affirm the{" "}
              <span className="text-gold-300 underline underline-offset-2">Privacy Charter</span>.
            </span>
          </label>

          {/* Inline Error Message */}
          {errorMsg && (
            <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded p-2">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

"use client";

import * as React from "react";

import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

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
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isStandalone = variant === "standalone";

  return (
    <div
      className={`relative ${
        isStandalone ? "space-y-4" : ""
      } ${className}`}
    >
      {/* Title & Description */}
      {title && (
        <div className="mb-3 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />

            <span className="font-mono text-[11px] uppercase tracking-widest text-[#a67c45]">
              {title}
            </span>
          </div>

          {description && (
            <p className="text-xs font-light leading-relaxed text-[#727a7d]">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Success State */}
      {result ? (
        <div className="animate-in fade-in rounded-xs border border-[#a67c45]/40 bg-[#ebe7de] p-4 duration-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#a67c45]" />

            <div className="space-y-1">
              <h5 className="font-serif text-sm font-medium text-[#1d2529]">
                {result.isExisting
                  ? "Subscription Active"
                  : "Briefing Schedule Initiated"}
              </h5>

              <p className="text-xs leading-relaxed text-[#566066]">
                {result.message}
              </p>

              <div className="flex items-center gap-2 pt-2 font-mono text-[10px] text-[#8a918f]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#a67c45]" />
                <span>
                  Encrypted • No unsolicited syndication • One-click opt-out
                </span>
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
              className="w-full rounded-xs border border-[#c9c2b7] bg-[#ebe7de] px-3.5 py-2.5 pr-24 text-xs text-[#1d2529] placeholder:text-[#9a9388] transition-all focus:border-[#a67c45]/60 focus:outline-none focus:ring-1 focus:ring-[#a67c45]/30"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="absolute bottom-1 right-1 top-1 flex items-center gap-1.5 rounded-xs border border-[#a67c45]/40 bg-[#a67c45]/10 px-3 font-mono text-[11px] uppercase tracking-wider text-[#8d6737] transition-colors hover:bg-[#a67c45]/20 disabled:opacity-50"
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
          <label className="group flex cursor-pointer select-none items-start gap-2 text-[11px] text-[#8a918f]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={isLoading}
              className="mt-0.5 h-3.5 w-3.5 rounded border-[#c9c2b7] bg-[#ebe7de] text-[#a67c45] accent-[#a67c45] focus:ring-1 focus:ring-[#a67c45]/40 focus:ring-offset-0"
            />

            <span className="leading-tight transition-colors group-hover:text-[#566066]">
              I agree to receive confidential intelligence dispatches and
              affirm the{" "}
              <span className="text-[#8d6737] underline underline-offset-2">
                Privacy Charter
              </span>
              .
            </span>
          </label>

          {/* Inline Error Message */}
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xs border border-rose-700/20 bg-rose-700/5 p-2 text-xs text-rose-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
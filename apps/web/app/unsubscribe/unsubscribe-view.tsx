"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  ArrowRight,
} from "lucide-react";

const REASONS = [
  { id: "TOO_FREQUENT", label: "Dispatches are delivered too frequently" },
  { id: "NOT_RELEVANT", label: "Content is no longer relevant to my executive mandate" },
  { id: "UNAUTHORIZED", label: "I did not personally authorize this subscription" },
  { id: "PREFER_RSS", label: "I prefer reviewing intelligence directly on the portal" },
  { id: "OTHER", label: "Other / Organizational restructuring" },
];

export function UnsubscribeView() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [isLoading, setIsLoading] = React.useState(!!token);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [tokenError, setTokenError] = React.useState<string | null>(null);
  const [subscriberEmail, setSubscriberEmail] = React.useState<string | null>(null);
  const [selectedReason, setSelectedReason] = React.useState<string>("NOT_RELEVANT");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Manual token input state if token wasn't in URL
  const [manualToken, setManualToken] = React.useState("");

  // Verify token on mount if present
  React.useEffect(() => {
    if (!token) return;

    let isMounted = true;
    setIsLoading(true);
    setTokenError(null);

    fetch(`/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!isMounted) return;

        if (!res.ok) {
          throw new Error(data.error || "Invalid or expired unsubscribe link.");
        }

        setSubscriberEmail(data.subscriber.emailMasked);
        if (data.subscriber.status === "UNSUBSCRIBED") {
          setIsSuccess(true);
          setSuccessMessage("This address is already unsubscribed from all dispatches.");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setTokenError(err.message);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleConfirmUnsubscribe = async (activeToken: string) => {
    setIsSubmitting(true);
    setTokenError(null);

    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: activeToken,
          reason: selectedReason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process unsubscription.");
      }

      setIsSuccess(true);
      setSuccessMessage(data.message);
    } catch (err) {
      setTokenError(err instanceof Error ? err.message : "Unsubscription failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24 pt-32 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Masthead */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-gold-400">
            <Shield className="h-3.5 w-3.5" />
            <span>Dispatch Preference Protocol</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-zinc-100">
            Manage Dispatch Subscription
          </h1>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            SAMVAD strictly honors all opt-out directives in compliance with CAN-SPAM, GDPR, and sovereign communications standards.
          </p>
        </div>

        {/* Card Body */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* 1. Loading State */}
          {isLoading && (
            <div className="py-12 text-center space-y-3">
              <Loader2 className="h-6 w-6 animate-spin text-gold-400 mx-auto" />
              <p className="font-mono text-xs text-zinc-400">
                Verifying cryptographic token credentials...
              </p>
            </div>
          )}

          {/* 2. Success State */}
          {!isLoading && isSuccess && (
            <div className="py-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-medium text-zinc-100">
                  Unsubscription Confirmed
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
                  {successMessage || "Your directive has been recorded. No further executive intelligence dispatches will be delivered to this address."}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-400 space-y-3">
                <p className="font-mono text-[11px]">
                  Directive executed with zero delay across global syndication nodes.
                </p>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-mono text-xs uppercase tracking-wider"
                  >
                    <span>Return to Portal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 3. Valid Token: Confirmation Form */}
          {!isLoading && !isSuccess && token && !tokenError && (
            <div className="space-y-6">
              {subscriberEmail && (
                <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-950/70 font-mono text-xs flex items-center justify-between">
                  <span className="text-zinc-400">Recipient Address:</span>
                  <span className="text-gold-300 font-semibold">{subscriberEmail}</span>
                </div>
              )}

              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Select Reason for Opt-Out (Optional):
                </label>
                <div className="space-y-2">
                  {REASONS.map((reason) => (
                    <label
                      key={reason.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-xs ${
                        selectedReason === reason.id
                          ? "border-gold-500/50 bg-gold-500/5 text-zinc-100"
                          : "border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="optout_reason"
                        value={reason.id}
                        checked={selectedReason === reason.id}
                        onChange={() => setSelectedReason(reason.id)}
                        className="accent-gold-500"
                      />
                      <span>{reason.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleConfirmUnsubscribe(token)}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 py-3 text-xs font-mono uppercase tracking-widest transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Confirm Immediate Unsubscription</span>
                )}
              </button>
            </div>
          )}

          {/* 4. Missing or Invalid Token State */}
          {!isLoading && !isSuccess && (!token || tokenError) && (
            <div className="space-y-6">
              {tokenError ? (
                <div className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Verification Notice</p>
                    <p className="mt-0.5">{tokenError}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-400 leading-relaxed">
                  To unsubscribe, please use the secure one-click link included at the bottom of any SAMVAD intelligence email dispatch, or enter your unsubscribe token below:
                </p>
              )}

              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Unsubscribe Token:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                    placeholder="unsub_xxxxxxxxxxxx"
                    className="flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-gold-500/50 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleConfirmUnsubscribe(manualToken.trim())}
                    disabled={!manualToken.trim() || isSubmitting}
                    className="rounded bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-500/40 px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

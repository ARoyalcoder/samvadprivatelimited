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
  { id: "NOT_RELEVANT", label: "Content is no longer relevant to my mandate" },
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
  const [subscriberEmail, setSubscriberEmail] = React.useState<string | null>(
    null,
  );
  const [selectedReason, setSelectedReason] =
    React.useState<string>("NOT_RELEVANT");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  );

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
          setSuccessMessage(
            "This address is already unsubscribed from all dispatches.",
          );
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
      setTokenError(
        err instanceof Error ? err.message : "Unsubscription failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f0e8] px-4 pb-24 pt-32 text-[#1d2529] sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* Masthead */}
        <div className="mb-8 space-y-2 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#a67c45]">
            <Shield className="h-3.5 w-3.5" />
            <span>Dispatch Preference Protocol</span>
          </div>

          <h1 className="font-serif text-2xl font-light tracking-tight text-[#1d2529] sm:text-3xl">
            Manage Dispatch Subscription
          </h1>

          <p className="mx-auto max-w-md text-xs text-[#777970]">
            SAMVAD honors all opt-out directives under applicable
            communications and privacy standards.
          </p>
        </div>

        {/* Card Body */}
        <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm sm:p-8">
          {/* 1. Loading State */}
          {isLoading && (
            <div className="space-y-3 py-12 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#a67c45]" />

              <p className="font-mono text-xs text-[#777970]">
                Verifying secure token...
              </p>
            </div>
          )}

          {/* 2. Success State */}
          {!isLoading && isSuccess && (
            <div className="space-y-4 py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#66816d]/30 bg-[#66816d]/10 text-[#66816d]">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg font-medium text-[#1d2529]">
                  Unsubscription Confirmed
                </h3>

                <p className="mx-auto max-w-sm font-light leading-relaxed text-[#626760] text-xs">
                  {successMessage ||
                    "Your directive has been recorded. No further intelligence dispatches will be delivered to this address."}
                </p>
              </div>

              <div className="space-y-3 border-t border-[#d8d1c5] pt-6 text-[#777970] text-xs">
                <p className="font-mono text-[11px]">
                  Directive processed across the dispatch system.
                </p>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#a67c45] hover:text-[#8d683d]"
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
                <div className="flex items-center justify-between rounded-xs border border-[#d8d1c5] bg-[#f3f0e8] p-3.5 font-mono text-xs">
                  <span className="text-[#777970]">Recipient Address:</span>
                  <span className="font-semibold text-[#a67c45]">
                    {subscriberEmail}
                  </span>
                </div>
              )}

              <div className="space-y-3">
                <label className="block font-mono text-xs uppercase tracking-wider text-[#777970]">
                  Select Reason for Opt-Out (Optional):
                </label>

                <div className="space-y-2">
                  {REASONS.map((reason) => (
                    <label
                      key={reason.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xs border p-3 text-xs transition-all ${
                        selectedReason === reason.id
                          ? "border-[#a67c45]/50 bg-[#a67c45]/10 text-[#1d2529]"
                          : "border-[#d0c9bd] bg-[#f3f0e8] text-[#777970] hover:border-[#bdb5a8] hover:text-[#626760]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="optout_reason"
                        value={reason.id}
                        checked={selectedReason === reason.id}
                        onChange={() => setSelectedReason(reason.id)}
                        className="accent-[#a67c45]"
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
                className="flex w-full items-center justify-center gap-2 rounded-xs border border-[#a67c45]/40 bg-[#a67c45]/10 py-3 font-mono text-xs uppercase tracking-widest text-[#8d683d] transition-colors hover:bg-[#a67c45]/15 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Confirm Unsubscription</span>
                )}
              </button>
            </div>
          )}

          {/* 4. Missing or Invalid Token State */}
          {!isLoading && !isSuccess && (!token || tokenError) && (
            <div className="space-y-6">
              {tokenError ? (
                <div className="flex items-start gap-2.5 rounded-xs border border-[#b96b62]/30 bg-[#b96b62]/10 p-3 text-xs text-[#8f5149]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

                  <div>
                    <p className="font-semibold">Verification Notice</p>
                    <p className="mt-0.5">{tokenError}</p>
                  </div>
                </div>
              ) : (
                <p className="font-light leading-relaxed text-[#777970] text-xs">
                  Use the secure link included in a SAMVAD intelligence
                  dispatch, or enter your unsubscribe token below.
                </p>
              )}

              <div className="space-y-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777970]">
                  Unsubscribe Token:
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                    placeholder="unsub_xxxxxxxxxxxx"
                    className="flex-1 rounded-xs border border-[#c9c2b6] bg-[#f3f0e8] px-3 py-2 font-mono text-xs text-[#1d2529] placeholder:text-[#aaa398] focus:border-[#a67c45]/50 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleConfirmUnsubscribe(manualToken.trim())
                    }
                    disabled={!manualToken.trim() || isSubmitting}
                    className="rounded-xs border border-[#a67c45]/40 bg-[#a67c45]/10 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-[#8d683d] transition-colors hover:bg-[#a67c45]/15 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      "Submit"
                    )}
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
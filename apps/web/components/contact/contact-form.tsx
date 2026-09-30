"use client";

import * as React from "react";
import { Button } from "@samvad/ui";
import type {
  ContactService,
  ContactIndustry,
} from "@samvad/validation";
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Copy,
  Check,
  Loader2,
  Lock,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

interface SubmissionSuccessData {
  referenceCode: string;
  receivedAt: string;
  company: string;
  serviceRequired: string;
  slaCommitment: string;
}

export function ContactForm() {
  // Form State
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [industry, setIndustry] = React.useState<ContactIndustry>("Technology");
  const [serviceRequired, setServiceRequired] =
    React.useState<ContactService>("Strategic Communications");
  const [message, setMessage] = React.useState("");

  // Anti-Spam Hidden Fields
  const [honeypot, setHoneypot] = React.useState("");
  const [clientTimestamp, setClientTimestamp] = React.useState<number>(0);

  // Status & Telemetry
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [successData, setSuccessData] =
    React.useState<SubmissionSuccessData | null>(null);
  const [copiedCode, setCopiedCode] = React.useState(false);

  React.useEffect(() => {
    // Record form initialization timestamp for velocity verification
    setClientTimestamp(Date.now());
  }, []);

  const serviceOptions: ContactService[] = [
    "PR",
    "Strategic Communications",
    "Reputation Management",
    "Digital Communications",
    "Crisis Communications",
    "Advisory",
    "Other",
  ];

  const industryOptions: ContactIndustry[] = [
    "Technology",
    "Financial Services",
    "Healthcare",
    "Infrastructure",
    "Real Estate",
    "Consumer",
    "Startups",
    "Institutions",
    "Other",
  ];

  const handleCopyCode = async (code: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setName("");
    setCompany("");
    setDesignation("");
    setEmail("");
    setPhone("");
    setIndustry("Technology");
    setServiceRequired("Strategic Communications");
    setMessage("");
    setErrors({});
    setServerError(null);
    setSuccessData(null);
    setClientTimestamp(Date.now());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    // Client-side quick validation
    const localErrors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      localErrors.name = "Full name must be at least 2 characters.";
    }
    if (!company.trim() || company.trim().length < 2) {
      localErrors.company = "Company or organization name is required.";
    }
    if (!designation.trim() || designation.trim().length < 2) {
      localErrors.designation = "Your designation / title is required.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      localErrors.email = "Please enter a valid business email address.";
    }
    if (!message.trim() || message.trim().length < 15) {
      localErrors.message = "Please provide an inquiry scope of at least 15 characters.";
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        company: company.trim(),
        designation: designation.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        industry,
        serviceRequired,
        message: message.trim(),
        honeypot,
        clientTimestamp,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.details && typeof result.details === "object") {
          const fieldErrMap: Record<string, string> = {};
          Object.entries(result.details).forEach(([key, val]) => {
            fieldErrMap[key] = Array.isArray(val) ? val[0] : String(val);
          });
          setErrors(fieldErrMap);
        }
        throw new Error(result.error || "Submission failed. Please check your inputs.");
      }

      setSuccessData(result);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to transmit inquiry to advisory desk."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE
  if (successData) {
    return (
      <div className="rounded-xs border border-gold-500/40 bg-obsidian-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gold-500/10 p-2.5 text-gold-400 border border-gold-500/30">
            <CheckCircle2 className="h-8 w-8 text-gold-400" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gold-400 block">
              Confidential Transmission Acknowledged
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
              Mandate Intake Received
            </h2>
          </div>
        </div>

        {/* Reference Code Card */}
        <div className="rounded-xs border border-obsidian-750 bg-obsidian-950 p-6 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-obsidian-400">
            <span>Official Tracking Reference:</span>
            <span className="text-[10px] uppercase text-gold-400">Cryptographically Sealed</span>
          </div>

          <div className="flex items-center justify-between gap-4 py-2 border-y border-obsidian-800">
            <code className="text-lg sm:text-xl font-bold tracking-wider text-gold-300">
              {successData.referenceCode}
            </code>
            <button
              type="button"
              onClick={() => handleCopyCode(successData.referenceCode)}
              className="flex items-center gap-1.5 rounded-xs border border-obsidian-750 bg-obsidian-900 px-3 py-1.5 text-xs text-sand-300 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
            >
              {copiedCode ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-gold-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-obsidian-400 pt-1">
            <span>Organization: <strong className="text-sand-200">{successData.company}</strong></span>
            <span>Practice: <strong className="text-gold-300">{successData.serviceRequired}</strong></span>
          </div>
        </div>

        {/* SLA & Partner Commitment */}
        <div className="rounded-xs border border-obsidian-800 bg-obsidian-950/60 p-5 space-y-2">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gold-400 font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>Service Level Commitment</span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
            {successData.slaCommitment} An encrypted receipt and briefing confirmation has been dispatched to your corporate email. All disclosures are governed under mutual non-disclosure escrow.
          </p>
        </div>

        <div className="pt-4 border-t border-obsidian-800 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-obsidian-400 hover:text-sand-200 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Submit Another Mandate Inquiry</span>
          </button>

          <span className="font-mono text-[10px] text-obsidian-500">
            Escalation Hotline: +91 11 4982 5000 (New Delhi Bureau)
          </span>
        </div>
      </div>
    );
  }

  // ACTIVE FORM STATE
  return (
    <div className="relative rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-obsidian-800 pb-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
          <Lock className="h-3.5 w-3.5" />
          <span>Privileged Strategic Counsel Intake</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
          Start a Confidential Conversation
        </h2>
        <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
          Submissions are directly reviewed by practice principals. Please outline your organization&apos;s strategic or crisis mandate below.
        </p>
      </div>

      {/* Global Server Error State */}
      {serverError && (
        <div className="rounded-xs border border-perception-crisis/40 bg-perception-crisis/10 p-4 flex items-start gap-3 text-xs text-sand-200 animate-in fade-in duration-300">
          <AlertCircle className="h-4 w-4 text-perception-crisis shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-perception-crisis block">Inquiry Transmission Alert</span>
            <p>{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anti-Spam Honeypot Field (Invisible to human users) */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="website_hp">Do not fill this field</label>
          <input
            type="text"
            id="website_hp"
            name="website_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* 1. Name & Designation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider text-obsidian-300 block">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikramaditya Singhania"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-sans text-xs text-sand-100 placeholder-obsidian-500 focus:outline-none transition-colors ${
                errors.name
                  ? "border-perception-crisis bg-perception-crisis/5 focus:border-perception-crisis"
                  : "border-obsidian-750 bg-obsidian-950 focus:border-gold-500"
              }`}
            />
            {errors.name && (
              <p className="font-mono text-[10px] text-perception-crisis">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider text-obsidian-300 block">
              Designation / Title *
            </label>
            <input
              type="text"
              required
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="e.g. Managing Director & Chief Executive"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-sans text-xs text-sand-100 placeholder-obsidian-500 focus:outline-none transition-colors ${
                errors.designation
                  ? "border-perception-crisis bg-perception-crisis/5 focus:border-perception-crisis"
                  : "border-obsidian-750 bg-obsidian-950 focus:border-gold-500"
              }`}
            />
            {errors.designation && (
              <p className="font-mono text-[10px] text-perception-crisis">{errors.designation}</p>
            )}
          </div>
        </div>

        {/* 2. Company & Corporate Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider text-obsidian-300 block">
              Organization / Corporation *
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Bharat Infrastructure Holdings Ltd."
              className={`w-full rounded-xs border px-3.5 py-2.5 font-sans text-xs text-sand-100 placeholder-obsidian-500 focus:outline-none transition-colors ${
                errors.company
                  ? "border-perception-crisis bg-perception-crisis/5 focus:border-perception-crisis"
                  : "border-obsidian-750 bg-obsidian-950 focus:border-gold-500"
              }`}
            />
            {errors.company && (
              <p className="font-mono text-[10px] text-perception-crisis">{errors.company}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider text-obsidian-300 block">
              Corporate / Institutional Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="v.singhania@bharatholdings.com"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-sans text-xs text-sand-100 placeholder-obsidian-500 focus:outline-none transition-colors ${
                errors.email
                  ? "border-perception-crisis bg-perception-crisis/5 focus:border-perception-crisis"
                  : "border-obsidian-750 bg-obsidian-950 focus:border-gold-500"
              }`}
            />
            {errors.email && (
              <p className="font-mono text-[10px] text-perception-crisis">{errors.email}</p>
            )}
          </div>
        </div>

        {/* 3. Phone & Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-obsidian-300">
                Direct Contact Phone
              </label>
              <span className="font-mono text-[9px] text-obsidian-500">With Country Code</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98110 54321"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-mono text-xs text-sand-100 placeholder-obsidian-500 focus:outline-none transition-colors ${
                errors.phone
                  ? "border-perception-crisis bg-perception-crisis/5 focus:border-perception-crisis"
                  : "border-obsidian-750 bg-obsidian-950 focus:border-gold-500"
              }`}
            />
            {errors.phone && (
              <p className="font-mono text-[10px] text-perception-crisis">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider text-obsidian-300 block">
              Industry Sector *
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as ContactIndustry)}
              className="w-full rounded-xs border border-obsidian-750 bg-obsidian-950 px-3.5 py-2.5 font-mono text-xs text-sand-100 focus:border-gold-500 focus:outline-none"
            >
              {industryOptions.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Service Required (Radio Chips) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] uppercase tracking-wider text-obsidian-300">
              Primary Practice Service Required *
            </label>
            <span className="font-mono text-[9px] text-gold-400">Select Practice Specialization</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {serviceOptions.map((srv) => {
              const isSelected = serviceRequired === srv;
              return (
                <button
                  type="button"
                  key={srv}
                  onClick={() => setServiceRequired(srv)}
                  className={`rounded-xs px-3 py-2 text-left font-mono text-xs transition-all duration-200 border ${
                    isSelected
                      ? "border-gold-500 bg-gold-500/15 text-gold-300 font-semibold shadow-sm"
                      : "border-obsidian-800 bg-obsidian-950/70 text-obsidian-400 hover:text-sand-200 hover:border-obsidian-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{srv}</span>
                    {isSelected && <span className="text-gold-400 text-xs">●</span>}
                  </div>
                </button>
              );
            })}
          </div>
          {errors.serviceRequired && (
            <p className="font-mono text-[10px] text-perception-crisis">{errors.serviceRequired}</p>
          )}
        </div>

        {/* 5. Message */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] uppercase tracking-wider text-obsidian-300">
              Mandate Brief / Inquiry Message *
            </label>
            <span className="font-mono text-[9px] text-obsidian-500">
              {message.length}/4000 characters
            </span>
          </div>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please outline the nature of the mandate, critical timeline constraints, key stakeholders, and any active litigation or regulatory sensitivities..."
            className={`w-full rounded-xs border p-3.5 font-sans text-xs text-sand-100 placeholder-obsidian-500 focus:outline-none transition-colors resize-none ${
              errors.message
                ? "border-perception-crisis bg-perception-crisis/5 focus:border-perception-crisis"
                : "border-obsidian-750 bg-obsidian-950 focus:border-gold-500"
            }`}
          />
          {errors.message && (
            <p className="font-mono text-[10px] text-perception-crisis">{errors.message}</p>
          )}
        </div>

        {/* Submit Actions & Security Guarantee */}
        <div className="pt-4 border-t border-obsidian-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-obsidian-400">
            <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" />
            <span>Encrypted Transmission · Zero Public Attribution SLA</span>
          </div>

          <Button
            type="submit"
            variant="gold"
            disabled={isSubmitting}
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider px-8 py-3 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Transmitting Encrypted Mandate...</span>
              </>
            ) : (
              <>
                <span>Submit Confidential Inquiry</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

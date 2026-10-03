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
  const [industry, setIndustry] =
    React.useState<ContactIndustry>("Technology");
  const [serviceRequired, setServiceRequired] =
    React.useState<ContactService>("Strategic Communications");
  const [message, setMessage] = React.useState("");

  // Anti-Spam Hidden Fields
  const [honeypot, setHoneypot] = React.useState("");
  const [clientTimestamp, setClientTimestamp] =
    React.useState<number>(0);

  // Status & Telemetry
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] =
    React.useState<string | null>(null);
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
      localErrors.company =
        "Company or organization name is required.";
    }

    if (!designation.trim() || designation.trim().length < 2) {
      localErrors.designation = "Your designation / title is required.";
    }

    if (
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      localErrors.email = "Please enter a valid business email address.";
    }

    if (!message.trim() || message.trim().length < 15) {
      localErrors.message =
        "Please provide an inquiry scope of at least 15 characters.";
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
            fieldErrMap[key] = Array.isArray(val)
              ? val[0]
              : String(val);
          });

          setErrors(fieldErrMap);
        }

        throw new Error(
          result.error || "Submission failed. Please check your inputs."
        );
      }

      setSuccessData(result);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Failed to transmit inquiry to advisory desk."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE
  if (successData) {
    return (
      <div className="space-y-8 rounded-xs border border-[#a67c45]/40 bg-[#ebe7de] p-8 shadow-sm animate-in fade-in zoom-in-95 duration-500 sm:p-12">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[#a67c45]/30 bg-[#a67c45]/10 p-2.5 text-[#a67c45]">
            <CheckCircle2 className="h-8 w-8 text-[#a67c45]" />
          </div>

          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
              Transmission Received
            </span>

            <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
              Inquiry Received
            </h2>
          </div>
        </div>

        {/* Reference Code Card */}
        <div className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 font-mono">
          <div className="flex items-center justify-between text-xs text-[#777970]">
            <span>Reference:</span>
            <span className="text-[10px] uppercase text-[#a67c45]">
              Secured
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-y border-[#d8d1c5] py-2">
            <code className="text-lg font-bold tracking-wider text-[#8d683d] sm:text-xl">
              {successData.referenceCode}
            </code>

            <button
              type="button"
              onClick={() =>
                handleCopyCode(successData.referenceCode)
              }
              className="flex items-center gap-1.5 rounded-xs border border-[#c9c2b6] bg-[#ebe7de] px-3 py-1.5 text-xs text-[#626760] transition-colors hover:border-[#a67c45]/50 hover:text-[#1d2529]"
            >
              {copiedCode ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#5f806d]" />
                  <span className="text-[#5f806d]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#a67c45]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between pt-1 text-[11px] text-[#777970]">
            <span>
              Organization:{" "}
              <strong className="text-[#1d2529]">
                {successData.company}
              </strong>
            </span>

            <span>
              Practice:{" "}
              <strong className="text-[#8d683d]">
                {successData.serviceRequired}
              </strong>
            </span>
          </div>
        </div>

        {/* SLA & Partner Commitment */}
        <div className="space-y-2 rounded-xs border border-[#d8d1c5] bg-[#f3f0e8] p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#a67c45]">
            <ShieldCheck className="h-4 w-4" />
            <span>Service Commitment</span>
          </div>

          <p className="font-sans text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
            {successData.slaCommitment} A confirmation has been sent to
            your corporate email. All disclosures remain confidential.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#d8d1c5] pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#777970] transition-colors hover:text-[#1d2529]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Submit Another Inquiry</span>
          </button>

          <span className="font-mono text-[10px] text-[#8a8b84]">
            New Delhi Bureau · +91 11 4982 5000
          </span>
        </div>
      </div>
    );
  }

  // ACTIVE FORM STATE
  return (
    <div className="relative space-y-8 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 shadow-sm sm:p-10">
      {/* Header */}
      <div className="space-y-2 border-b border-[#d8d1c5] pb-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
          <Lock className="h-3.5 w-3.5" />
          <span>Confidential Intake</span>
        </div>

        <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
          Start a Confidential Conversation
        </h2>

        <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
          Share your organization&apos;s strategic or communications
          requirement. Our practice team will review it directly.
        </p>
      </div>

      {/* Global Server Error State */}
      {serverError && (
        <div className="flex items-start gap-3 rounded-xs border border-[#a45b4f]/30 bg-[#a45b4f]/5 p-4 text-xs text-[#626760] animate-in fade-in duration-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#a45b4f]" />

          <div className="space-y-1">
            <span className="block font-semibold text-[#a45b4f]">
              Submission Alert
            </span>
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
              Full Name *
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikramaditya Singhania"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-sans text-xs text-[#1d2529] placeholder-[#96968f] transition-colors focus:outline-none ${
                errors.name
                  ? "border-[#a45b4f] bg-[#a45b4f]/5 focus:border-[#a45b4f]"
                  : "border-[#c9c2b6] bg-[#f3f0e8] focus:border-[#a67c45]"
              }`}
            />

            {errors.name && (
              <p className="font-mono text-[10px] text-[#a45b4f]">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
              Designation *
            </label>

            <input
              type="text"
              required
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="e.g. Managing Director"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-sans text-xs text-[#1d2529] placeholder-[#96968f] transition-colors focus:outline-none ${
                errors.designation
                  ? "border-[#a45b4f] bg-[#a45b4f]/5 focus:border-[#a45b4f]"
                  : "border-[#c9c2b6] bg-[#f3f0e8] focus:border-[#a67c45]"
              }`}
            />

            {errors.designation && (
              <p className="font-mono text-[10px] text-[#a45b4f]">
                {errors.designation}
              </p>
            )}
          </div>
        </div>

        {/* 2. Company & Corporate Email */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
              Organization *
            </label>

            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Bharat Infrastructure Holdings"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-sans text-xs text-[#1d2529] placeholder-[#96968f] transition-colors focus:outline-none ${
                errors.company
                  ? "border-[#a45b4f] bg-[#a45b4f]/5 focus:border-[#a45b4f]"
                  : "border-[#c9c2b6] bg-[#f3f0e8] focus:border-[#a67c45]"
              }`}
            />

            {errors.company && (
              <p className="font-mono text-[10px] text-[#a45b4f]">
                {errors.company}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
              Corporate Email *
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-sans text-xs text-[#1d2529] placeholder-[#96968f] transition-colors focus:outline-none ${
                errors.email
                  ? "border-[#a45b4f] bg-[#a45b4f]/5 focus:border-[#a45b4f]"
                  : "border-[#c9c2b6] bg-[#f3f0e8] focus:border-[#a67c45]"
              }`}
            />

            {errors.email && (
              <p className="font-mono text-[10px] text-[#a45b4f]">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* 3. Phone & Industry */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#777970]">
                Contact Phone
              </label>

              <span className="font-mono text-[9px] text-[#96968f]">
                Country Code
              </span>
            </div>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98110 54321"
              className={`w-full rounded-xs border px-3.5 py-2.5 font-mono text-xs text-[#1d2529] placeholder-[#96968f] transition-colors focus:outline-none ${
                errors.phone
                  ? "border-[#a45b4f] bg-[#a45b4f]/5 focus:border-[#a45b4f]"
                  : "border-[#c9c2b6] bg-[#f3f0e8] focus:border-[#a67c45]"
              }`}
            />

            {errors.phone && (
              <p className="font-mono text-[10px] text-[#a45b4f]">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#777970]">
              Industry *
            </label>

            <select
              value={industry}
              onChange={(e) =>
                setIndustry(e.target.value as ContactIndustry)
              }
              className="w-full rounded-xs border border-[#c9c2b6] bg-[#f3f0e8] px-3.5 py-2.5 font-mono text-xs text-[#1d2529] focus:border-[#a67c45] focus:outline-none"
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
            <label className="font-mono text-[10px] uppercase tracking-wider text-[#777970]">
              Primary Practice *
            </label>

            <span className="font-mono text-[9px] text-[#a67c45]">
              Select One
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {serviceOptions.map((srv) => {
              const isSelected = serviceRequired === srv;

              return (
                <button
                  type="button"
                  key={srv}
                  onClick={() => setServiceRequired(srv)}
                  className={`rounded-xs border px-3 py-2 text-left font-mono text-xs transition-all duration-200 ${
                    isSelected
                      ? "border-[#a67c45] bg-[#a67c45]/10 font-semibold text-[#8d683d] shadow-sm"
                      : "border-[#d8d1c5] bg-[#f3f0e8] text-[#777970] hover:border-[#a67c45]/50 hover:text-[#1d2529]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{srv}</span>

                    {isSelected && (
                      <span className="text-xs text-[#a67c45]">●</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {errors.serviceRequired && (
            <p className="font-mono text-[10px] text-[#a45b4f]">
              {errors.serviceRequired}
            </p>
          )}
        </div>

        {/* 5. Message */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] uppercase tracking-wider text-[#777970]">
              Inquiry Brief *
            </label>

            <span className="font-mono text-[9px] text-[#96968f]">
              {message.length}/4000
            </span>
          </div>

          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Outline the mandate, timeline, key stakeholders, or relevant sensitivities..."
            className={`w-full resize-none rounded-xs border p-3.5 font-sans text-xs text-[#1d2529] placeholder-[#96968f] transition-colors focus:outline-none ${
              errors.message
                ? "border-[#a45b4f] bg-[#a45b4f]/5 focus:border-[#a45b4f]"
                : "border-[#c9c2b6] bg-[#f3f0e8] focus:border-[#a67c45]"
            }`}
          />

          {errors.message && (
            <p className="font-mono text-[10px] text-[#a45b4f]">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Actions & Security Guarantee */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#d8d1c5] pt-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#777970]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#a67c45]" />
            <span>Encrypted · Confidential</span>
          </div>

          <Button
            type="submit"
            variant="gold"
            disabled={isSubmitting}
            className="flex w-full cursor-pointer items-center justify-center gap-2 px-8 py-3 font-mono text-xs uppercase tracking-wider sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
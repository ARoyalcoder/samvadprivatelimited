"use client";

import * as React from "react";
import { Button, Input, Textarea, Label } from "@samvad/ui";
import { Shield, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function LeadForm() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    corporateEmail: "",
    companyName: "",
    jobTitle: "",
    phoneNumber: "",
    serviceInterest: "PERCEPTION_INTELLIGENCE",
    industry: "ENTERPRISE_TECH",
    estimatedBudgetRange: "100K_250K",
    message: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to transmit confidential inquiry");
      }

      setSuccess(true);
    } catch (err) {
      setErrorMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4 rounded-lg border border-gold-500/40 bg-zinc-900/60 p-8 text-center backdrop-blur-md">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-400" />
        <h3 className="font-serif text-2xl font-bold text-zinc-100">
          Inquiry Transmitted Securely
        </h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-300">
          Your transmission has been encrypted and routed directly to our Managing Principal&apos;s
          confidential queue under standard non-disclosure protocol. An executive partner will reach
          out within 4 business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-xl md:p-10"
    >
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
            Encrypted Channel
          </span>
          <h3 className="font-serif text-xl font-semibold text-zinc-100">
            Confidential Strategic Inquiry
          </h3>
        </div>
        <Shield className="h-5 w-5 text-gold-400" />
      </div>

      {errorMessage && (
        <div className="flex items-start gap-3 rounded-sm border border-red-800/50 bg-red-950/40 p-4 text-xs text-red-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name & Honorific</Label>
          <Input
            id="fullName"
            required
            placeholder="e.g. Dr. A. Vardhan"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="corporateEmail">Corporate / Institutional Email</Label>
          <Input
            id="corporateEmail"
            type="email"
            required
            placeholder="name@organization.com"
            value={formData.corporateEmail}
            onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Enterprise / Institution Name</Label>
          <Input
            id="companyName"
            required
            placeholder="e.g. Sovereign Holdings Ltd."
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Executive Designation</Label>
          <Input
            id="jobTitle"
            placeholder="e.g. Chief Executive Officer / General Counsel"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="serviceInterest">Advisory Practice</Label>
          <select
            id="serviceInterest"
            className="flex h-11 w-full rounded-sm border border-zinc-800 bg-zinc-950/80 px-3 text-xs text-zinc-200 focus:border-gold-500/80 focus:outline-none"
            value={formData.serviceInterest}
            onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
          >
            <option value="PERCEPTION_INTELLIGENCE">Perception Intelligence</option>
            <option value="CRISIS_REPUTATION">Crisis Architecture</option>
            <option value="STRATEGIC_COMMUNICATIONS">Strategic Communications</option>
            <option value="PUBLIC_AFFAIRS">Public Affairs & Policy</option>
            <option value="NARRATIVE_ARCHITECTURE">Narrative Architecture</option>
            <option value="EXECUTIVE_PROFILING">Executive Shield</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry Sector</Label>
          <select
            id="industry"
            className="flex h-11 w-full rounded-sm border border-zinc-800 bg-zinc-950/80 px-3 text-xs text-zinc-200 focus:border-gold-500/80 focus:outline-none"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          >
            <option value="DEFENSE_AEROSPACE">Defense & Aerospace</option>
            <option value="FINTECH_BFSI">Banking & FinTech</option>
            <option value="ENERGY_INFRASTRUCTURE">Energy & Critical Infra</option>
            <option value="HEALTHCARE_PHARMA">Healthcare & Bio</option>
            <option value="ENTERPRISE_TECH">Enterprise Technology</option>
            <option value="FAMILY_OFFICES_UHNW">Family Offices & UHNW</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedBudgetRange">Engagement Scale</Label>
          <select
            id="estimatedBudgetRange"
            className="flex h-11 w-full rounded-sm border border-zinc-800 bg-zinc-950/80 px-3 text-xs text-zinc-200 focus:border-gold-500/80 focus:outline-none"
            value={formData.estimatedBudgetRange}
            onChange={(e) => setFormData({ ...formData, estimatedBudgetRange: e.target.value })}
          >
            <option value="50K_100K">$50k - $100k</option>
            <option value="100K_250K">$100k - $250k</option>
            <option value="250K_500K">$250k - $500k</option>
            <option value="500K_PLUS">$500k+</option>
            <option value="RETAINER_CONFIDENTIAL">Annual Retainer (Confidential)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Strategic Scope / Operational Context</Label>
        <Textarea
          id="message"
          required
          rows={4}
          placeholder="Briefly describe the strategic challenge, timeline, or upcoming milestone. Strict NDA applies prior to any verbal disclosure."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        disabled={loading}
        className="w-full tracking-[0.2em]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Transmitting Under Protocol...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Initiate Confidential Consultation
          </>
        )}
      </Button>

      <p className="text-center font-mono text-[11px] text-zinc-400">
        All communications are legally privileged under prospective counsel confidentiality
        provisions.
      </p>
    </form>
  );
}

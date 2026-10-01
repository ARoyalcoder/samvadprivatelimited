"use client";

import * as React from "react";
import {
  Users,
  Briefcase,
  MailCheck,
  BookOpen,
  Newspaper,
  FileBadge,
  Send,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@samvad/ui";
import { DashboardMetricsResult, LeadItem } from "../../../lib/dashboard/dashboard-service";
import { StrategicVelocityChart } from "../dashboard-charts";

interface OverviewSectionProps {
  metrics: DashboardMetricsResult | null;
  leads: LeadItem[];
  loading: boolean;
  onNavigateSection: (section: string) => void;
  onSelectLead: (lead: LeadItem) => void;
}

export function OverviewSection({
  metrics,
  leads,
  loading,
  onNavigateSection,
  onSelectLead,
}: OverviewSectionProps) {
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-28 rounded border border-zinc-800 bg-zinc-900/40 p-4" />
          ))}
        </div>
        {/* Chart Skeleton */}
        <div className="h-64 rounded border border-zinc-800 bg-zinc-900/40" />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="rounded border border-zinc-800 bg-zinc-900/40 p-12 text-center font-mono text-xs text-zinc-400">
        Telemetry dataset unavailable. Please verify API connection.
      </div>
    );
  }

  const kpis = [
    {
      id: "visitors",
      title: "Website Visitors",
      value: metrics.websiteVisitors.formattedValue,
      subtext: `Today: ${metrics.websiteVisitors.uniqueToday.toLocaleString()} unique`,
      change: "+18.4%",
      isPositive: true,
      icon: Users,
      color: "text-amber-400",
      section: "analytics",
    },
    {
      id: "leads",
      title: "Leads Pipeline",
      value: metrics.leads.formattedValue,
      subtext: `${metrics.leads.newCount} new inquiries require triage`,
      change: "+24.2%",
      isPositive: true,
      icon: Briefcase,
      color: "text-gold-400",
      section: "leads",
    },
    {
      id: "contacts",
      title: "Contact Submissions",
      value: metrics.contactSubmissions.formattedValue,
      subtext: `${metrics.contactSubmissions.recent7d} received in last 7 days`,
      change: "+12.5%",
      isPositive: true,
      icon: MailCheck,
      color: "text-emerald-400",
      section: "leads",
    },
    {
      id: "insights",
      title: "Published Articles",
      value: metrics.publishedArticles.formattedValue,
      subtext: `${metrics.publishedArticles.draftCount} draft in review`,
      change: "+15.0%",
      isPositive: true,
      icon: BookOpen,
      color: "text-sky-400",
      section: "content",
    },
    {
      id: "news",
      title: "News Articles",
      value: metrics.newsArticles.formattedValue,
      subtext: `${metrics.newsArticles.recent30d} releases in 30 days`,
      change: "Neutral",
      isPositive: true,
      icon: Newspaper,
      color: "text-purple-400",
      section: "content",
    },
    {
      id: "cases",
      title: "Case Studies",
      value: metrics.caseStudies.formattedValue,
      subtext: `${metrics.caseStudies.featuredCount} flagship interventions`,
      change: "+33.3%",
      isPositive: true,
      icon: FileBadge,
      color: "text-indigo-400",
      section: "content",
    },
    {
      id: "subscribers",
      title: "Newsletter Subscribers",
      value: metrics.newsletterSubscribers.formattedValue,
      subtext: `${metrics.newsletterSubscribers.churnRatePercent}% churn rate`,
      change: "+9.8%",
      isPositive: true,
      icon: Send,
      color: "text-teal-400",
      section: "analytics",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. SEVEN CORE DASHBOARD METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              onClick={() => onNavigateSection(kpi.section)}
              className="group cursor-pointer rounded border border-zinc-800/80 bg-zinc-900/60 p-4 hover:border-gold-500/50 hover:bg-zinc-900/90 transition-all duration-200 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200">
                  {kpi.title}
                </span>
                <div className={`p-1.5 rounded bg-zinc-950/70 border border-zinc-800 ${kpi.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-serif text-2xl font-bold tracking-tight text-zinc-100">
                  {kpi.value}
                </span>
                <span className="inline-flex items-center text-[10px] font-mono text-emerald-400 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {kpi.change}
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-500 font-light">
                <span>{kpi.subtext}</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. STRATEGIC 30-DAY VELOCITY CHART */}
      <StrategicVelocityChart data={metrics.websiteVisitors.trend} />

      {/* 3. RECENT INQUIRIES & SYSTEM OPERATIONS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Leads Pipeline */}
        <div className="lg:col-span-2 rounded border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div>
              <h3 className="font-serif text-base font-semibold text-zinc-100">
                Recent Strategic Inquiries
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Confidential mandate requests awaiting partner arbitration
              </p>
            </div>
            <button
              onClick={() => onNavigateSection("leads")}
              className="font-mono text-xs text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1"
            >
              <span>View All Pipeline</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {leads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="py-3 flex items-center justify-between hover:bg-zinc-950/40 px-2 rounded cursor-pointer transition-colors group"
              >
                <div className="space-y-0.5 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-medium text-zinc-200 group-hover:text-gold-300 truncate">
                      {lead.companyName}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {lead.referenceCode || lead.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>{lead.fullName}</span>
                    <span>&bull;</span>
                    <span className="font-mono text-[11px] text-zinc-500">{lead.industry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge
                    variant={
                      lead.status === "NEW"
                        ? "gold"
                        : lead.status === "QUALIFIED"
                        ? "secondary"
                        : lead.status === "CONVERTED"
                        ? "gold"
                        : "outline"
                    }
                  >
                    {lead.status}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Operational Governance Alerts */}
        <div className="rounded border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-4">
          <div className="border-b border-zinc-800/80 pb-3">
            <h3 className="font-serif text-base font-semibold text-zinc-100">
              Command Integrity
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Autonomous system diagnostics and policy enforcement
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="rounded border border-zinc-800 bg-zinc-950/70 p-3 space-y-1">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  MFA Protection Active
                </span>
                <span className="text-[10px]">ENFORCED</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                All 5 administrative roles are governed by RFC 6238 TOTP verification.
              </p>
            </div>

            <div className="rounded border border-zinc-800 bg-zinc-950/70 p-3 space-y-1">
              <div className="flex items-center justify-between text-gold-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock className="h-3.5 w-3.5" />
                  Lockout Policy Engaged
                </span>
                <span className="text-[10px]">5 ATTEMPTS / 15M</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                Brute-force credential stuffing defense active across edge gateways.
              </p>
            </div>

            <div className="rounded border border-zinc-800 bg-zinc-950/70 p-3 space-y-1">
              <div className="flex items-center justify-between text-sky-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  RFC 8058 Compliance
                </span>
                <span className="text-[10px]">AUTOMATED</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                Newsletter opt-out tokens and List-Unsubscribe headers operational.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

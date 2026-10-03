"use client";

import * as React from "react";

import Link from "next/link";

import { Badge, SamvadImage } from "@samvad/ui";

import type { CaseStudyRecord } from "@/lib/case-studies-data";

import {
  ArrowRight,
  Lock,
  ShieldCheck,
  FileText,
  ArrowUpRight,
} from "lucide-react";

interface CaseStudiesFilterProps {
  caseStudies: CaseStudyRecord[];
}

export function CaseStudiesFilter({
  caseStudies,
}: CaseStudiesFilterProps) {
  const [selectedIndustry, setSelectedIndustry] =
    React.useState<string>("all");

  // Extract unique industries
  const industryOptions = React.useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((cs) => set.add(cs.industrySlug));
    return Array.from(set);
  }, [caseStudies]);

  const filteredStudies = React.useMemo(() => {
    if (selectedIndustry === "all") return caseStudies;
    return caseStudies.filter(
      (cs) => cs.industrySlug === selectedIndustry
    );
  }, [caseStudies, selectedIndustry]);

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d8d1c5] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedIndustry("all")}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border transition-all ${
              selectedIndustry === "all"
                ? "border-[#a67c45]/50 bg-[#a67c45]/10 text-[#8c6537] shadow-sm"
                : "border-[#d0c9bd] bg-[#ebe7de]/70 text-[#8a8f91] hover:text-[#3d474c] hover:border-[#bdb5a8]"
            }`}
          >
            All Work ({caseStudies.length})
          </button>

          {industryOptions.map((slug) => {
            const match = caseStudies.find(
              (c) => c.industrySlug === slug
            );
            const label = match ? match.industry : slug;
            const count = caseStudies.filter(
              (c) => c.industrySlug === slug
            ).length;

            return (
              <button
                key={slug}
                type="button"
                onClick={() => setSelectedIndustry(slug)}
                className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border transition-all ${
                  selectedIndustry === slug
                    ? "border-[#a67c45]/50 bg-[#a67c45]/10 text-[#8c6537] shadow-sm"
                    : "border-[#d0c9bd] bg-[#ebe7de]/70 text-[#8a8f91] hover:text-[#3d474c] hover:border-[#bdb5a8]"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-[#8a8f91]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#a67c45]" />
          <span>Independent Review</span>
        </div>
      </div>

      {/* Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStudies.map((study) => (
          <article
            key={study.id}
            className="group relative flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/75 p-6 sm:p-8 transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e7e2d8] shadow-[0_12px_35px_rgba(29,37,41,0.06)] hover:shadow-[0_20px_50px_rgba(29,37,41,0.1)]"
          >
            {/* Architectural corner marks */}
            <span className="pointer-events-none absolute left-1 top-1 font-mono text-xs text-[#a67c45]/40 select-none group-hover:text-[#a67c45] transition-colors">
              +
            </span>
            <span className="pointer-events-none absolute right-1 top-1 font-mono text-xs text-[#a67c45]/40 select-none group-hover:text-[#a67c45] transition-colors">
              +
            </span>
            <span className="pointer-events-none absolute bottom-1 left-1 font-mono text-xs text-[#a67c45]/40 select-none group-hover:text-[#a67c45] transition-colors">
              +
            </span>
            <span className="pointer-events-none absolute bottom-1 right-1 font-mono text-xs text-[#a67c45]/40 select-none group-hover:text-[#a67c45] transition-colors">
              +
            </span>

            <div className="space-y-6">
              {/* Header Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d8d1c5] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-[#a67c45]">
                    {study.refCode}
                  </span>

                  <span className="text-[#b5afa5]">/</span>

                  <Link
                    href={`/industries/${study.industrySlug}`}
                    className="font-mono text-[11px] text-[#697176] hover:text-[#8c6537] transition-colors flex items-center gap-1"
                  >
                    <span>{study.industry}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>

                <Badge
                  variant="outline"
                  className="border-[#d0c9bd] bg-[#f3f0e8] font-mono text-[9px] uppercase tracking-wider text-[#697176]"
                >
                  {study.timeframe}
                </Badge>
              </div>

              {/* Confidentiality Notice Seal */}
              <div className="rounded-xs border border-[#d8d1c5] bg-[#f3f0e8]/80 px-3.5 py-2 flex items-center gap-2 text-[#8a8f91] font-mono text-[10px]">
                <Lock className="h-3 w-3 text-[#a67c45] shrink-0" />
                <span className="truncate text-[#596267]">
                  {study.clientPlaceholder}
                </span>
              </div>

              {/* Visual Thumbnail */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-[#d8d1c5] bg-[#dcd7cd]">
                <SamvadImage
                  assetId={study.heroAssetId}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  caption={study.title}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d2529]/80 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-[#f3f0e8]">
                  <span className="text-[10px] uppercase tracking-widest text-[#c39a62] bg-[#1d2529]/80 px-2 py-0.5 rounded-xs border border-[#a67c45]/20">
                    {study.classification.split("//")[0]?.trim()}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1d2529] group-hover:text-[#8c6537] transition-colors leading-snug">
                  <Link href={`/work/${study.slug}`}>
                    {study.title}
                  </Link>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#697176] font-light leading-relaxed line-clamp-2">
                  {study.tagline}
                </p>
              </div>

              {/* Key Metrics Highlight Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#d8d1c5] pt-4">
                {study.metrics.slice(0, 3).map((metric, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="font-serif text-lg sm:text-xl font-light text-[#a67c45]">
                      {metric.value}
                    </div>

                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#697176] truncate">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-6 pt-4 border-t border-[#d8d1c5] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8a8f91] flex items-center gap-1.5">
                <FileText className="h-3 w-3 text-[#a67c45]" />
                <span>11 Sections</span>
              </span>

              <Link
                href={`/work/${study.slug}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#a67c45] hover:text-[#7f5c32] transition-colors group-hover:translate-x-0.5"
              >
                <span>View Case</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
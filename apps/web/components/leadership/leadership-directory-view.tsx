"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@samvad/ui";
import type { LeadershipProfile } from "@samvad/validation";
import {
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Target,
  ArrowUpRight,
  SlidersHorizontal,
  Award,
} from "lucide-react";

interface LeadershipDirectoryViewProps {
  profiles: LeadershipProfile[];
}

export function LeadershipDirectoryView({
  profiles,
}: LeadershipDirectoryViewProps) {
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("ALL");

  const categories = [
    { key: "ALL", label: "All Advisors" },
    { key: "Executive Leadership", label: "Executive Leadership" },
    { key: "Practice Leadership", label: "Practice Leadership" },
    { key: "Senior Advisory Council", label: "Senior Advisory Council" },
  ];

  const filteredProfiles = React.useMemo(() => {
    if (selectedCategory === "ALL") return profiles;
    return profiles.filter((p) => p.roleCategory === selectedCategory);
  }, [profiles, selectedCategory]);

  return (
    <div className="space-y-16">
      {/* 1. CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d0c9bd] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`relative rounded-xs px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-[#a67c45]/10 text-[#8a6437] border border-[#a67c45]/45"
                    : "border border-[#d0c9bd] bg-[#ebe7de] text-[#7a807f] hover:text-[#394247] hover:border-[#a67c45]/40"
                }`}
              >
                <span>{cat.label}</span>

                {isActive && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-[#a67c45]/15 px-1.5 py-0.2 font-mono text-[10px] text-[#8a6437]">
                    {cat.key === "ALL"
                      ? profiles.length
                      : profiles.filter(
                          (p) => p.roleCategory === cat.key
                        ).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-[#7a807f]">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#a67c45]" />
          <span>Showing {filteredProfiles.length} Advisors</span>
        </div>
      </div>

      {/* 2. ASYMMETRICAL EDITORIAL PROFILES (NON-CARD ARCHITECTURE) */}
      <div className="space-y-24">
        {filteredProfiles.map((leader, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={leader.id}
              id={leader.slug}
              className="relative border-b border-[#d0c9bd]/80 pb-20 last:border-b-0 last:pb-0"
            >
              {/* Profile Background Glow */}
              <div
                className={`pointer-events-none absolute -top-10 ${
                  isEven ? "right-0" : "left-0"
                } h-96 w-96 rounded-full bg-[#a67c45]/6 blur-[120px]`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* PHOTO & DOSSIER STAMP COLUMN */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  } space-y-4`}
                >
                  <div className="group relative overflow-hidden rounded-xs border border-[#c5beb2] bg-[#ebe7de] aspect-[4/5] shadow-xl">
                    <Image
                      src={leader.photoUrl}
                      alt={leader.photoAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0"
                    />

                    {/* Architectural hairline overlay */}
                    <div className="pointer-events-none absolute inset-0 border border-[#a67c45]/20" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1d2529] via-[#1d2529]/55 to-transparent" />

                    {/* Top status tag */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="border-[#c5beb2] bg-[#1d2529]/85 font-mono text-[9px] uppercase tracking-wider text-[#ead6b8] backdrop-blur-md"
                      >
                        {leader.statusBadge || leader.roleCategory}
                      </Badge>

                      {leader.isPlaceholder && (
                        <Badge
                          variant="outline"
                          className="border-emerald-700/40 bg-emerald-900/20 font-mono text-[9px] uppercase tracking-wider text-[#e5eee8] backdrop-blur-md"
                        >
                          Verified Placeholder
                        </Badge>
                      )}
                    </div>

                    {/* Bottom stamp on photo */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 font-mono text-[10px] text-[#c8cbc8] flex items-center justify-between border-t border-[#d0c9bd]/30 pt-2 backdrop-blur-sm">
                      <span className="uppercase tracking-widest text-[#d4aa70]">
                        {leader.primaryOffice}
                      </span>
                      <span>REF: {leader.id.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Factual Integrity Micro-Notice */}
                  <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-3 flex items-start gap-2.5 font-mono text-[10px] text-[#7a807f]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#a67c45] shrink-0 mt-0.5" />

                    <p className="leading-tight">
                      Executive profile maintained as a verified CMS
                      placeholder under non-fabrication governance.
                    </p>
                  </div>
                </div>

                {/* EDITORIAL CONTENT COLUMN */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  } space-y-6`}
                >
                  {/* Category Index & Practice */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[#a67c45]">
                      0{index + 1} {"//"} {leader.roleCategory.toUpperCase()}
                    </span>

                    <span className="text-[#b8b0a4]">·</span>

                    <span className="font-mono text-xs uppercase tracking-wider text-[#626a6d]">
                      {leader.advisoryPractice}
                    </span>
                  </div>

                  {/* Heading & Designation */}
                  <div className="space-y-2">
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#1d2529] leading-tight">
                      {leader.name}
                    </h2>

                    <div className="font-serif text-lg sm:text-xl text-[#8a6437] font-normal italic">
                      {leader.designation}
                    </div>
                  </div>

                  {/* Leader Thesis / Pull Quote */}
                  {leader.quote && (
                    <div className="relative border-l-2 border-[#a67c45]/60 pl-5 py-1">
                      <blockquote className="font-serif text-base sm:text-lg text-[#394247] font-light italic leading-relaxed">
                        &ldquo;{leader.quote}&rdquo;
                      </blockquote>
                    </div>
                  )}

                  {/* Biography Paragraph */}
                  <div className="font-sans text-sm sm:text-base text-[#626a6d] font-light leading-relaxed space-y-3">
                    <p>{leader.biography}</p>
                  </div>

                  {/* Expertise Matrix */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#7a807f]">
                      <Award className="h-3 w-3 text-[#a67c45]" />
                      <span>Core Competencies</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((exp, expIdx) => (
                        <span
                          key={expIdx}
                          className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] px-2.5 py-1 font-mono text-[11px] text-[#4f595d]"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Areas of Focus & Experience Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#d0c9bd]/80">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#8a6437]">
                        <Target className="h-3 w-3" />
                        <span>Areas of Focus</span>
                      </div>

                      <ul className="space-y-1 font-mono text-xs text-[#4f595d]">
                        {leader.areasOfFocus.map((focus, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-center gap-2"
                          >
                            <span className="text-[#a67c45] text-xs">›</span>
                            <span>{focus}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#8a6437]">
                        <Briefcase className="h-3 w-3" />
                        <span>Recent Appointments</span>
                      </div>

                      <div className="space-y-2 font-mono text-xs text-[#7a807f]">
                        {leader.experience.slice(0, 2).map((exp, eIdx) => (
                          <div key={eIdx} className="space-y-0.5">
                            <div className="text-[#394247] font-semibold truncate">
                              {exp.title}
                            </div>

                            <div className="text-[10px] text-[#7a807f]">
                              {exp.organization}{" "}
                              {exp.period && `(${exp.period})`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Dossier CTA */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/leadership/${leader.slug}`}
                      className="inline-flex items-center gap-2 rounded-xs border border-[#a67c45]/45 bg-[#a67c45]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#8a6437] hover:bg-[#a67c45]/15 hover:border-[#a67c45] transition-all duration-300"
                    >
                      <span>View Dossier</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                      href="/about#leadership"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#7a807f] hover:text-[#394247] transition-colors"
                    >
                      <span>Governance Charter</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
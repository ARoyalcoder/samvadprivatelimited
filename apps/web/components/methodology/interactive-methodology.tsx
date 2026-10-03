"use client";

import * as React from "react";
import { Container, Badge, cn } from "@samvad/ui";
import {
  METHODOLOGY_STAGES,
  type MethodologyStage,
} from "@/lib/methodology-data";
import { MethodologyNetworkCanvas } from "./methodology-network-canvas";
import {
  CheckCircle2,
  FileText,
  Radio,
  SlidersHorizontal,
  Eye,
  EyeOff,
} from "lucide-react";

export function InteractiveMethodology() {
  const [activeStageIndex, setActiveStageIndex] = React.useState(0);
  const [staticMode, setStaticMode] = React.useState(false);
  const sectionRefs = React.useRef<(HTMLElement | null)[]>([]);

  const activeStage: MethodologyStage =
    METHODOLOGY_STAGES[activeStageIndex] ?? METHODOLOGY_STAGES[0]!;

  // Scroll-driven IntersectionObserver to update active stage
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveStageIndex(index);
            }
          });
        },
        {
          threshold: [0.3, 0.6],
          rootMargin: "-15% 0px -40% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToStage = (index: number) => {
    setActiveStageIndex(index);
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f3f0e8] py-16 lg:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-[#a67c45]/8 blur-[150px]" />

      <Container size="xl" className="space-y-10">
        {/* Sticky Stage Scrubber & Accessibility Controls */}
        <div className="sticky top-20 z-30 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8]/95 p-3 shadow-elevation-2 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Scrubber Tabs */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0"
              role="tablist"
              aria-label="Methodology Stages"
            >
              {METHODOLOGY_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stage.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => scrollToStage(idx)}
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap rounded-xs px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all",
                      isActive
                        ? "border border-[#a67c45]/50 bg-[#a67c45]/10 text-[#8a6437] shadow-sm"
                        : "border border-transparent text-[#7a807f] hover:text-[#394247] hover:border-[#c5beb2]"
                    )}
                  >
                    <span className="font-semibold text-[#a67c45]">
                      {stage.num}
                    </span>
                    <span>{stage.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Static / Motion Accessibility Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#d8d1c5]">
              <button
                type="button"
                onClick={() => setStaticMode(!staticMode)}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#7a807f] hover:text-[#8a6437] transition-colors"
                aria-label={
                  staticMode
                    ? "Enable animated visualization"
                    : "Disable animation (static mode)"
                }
              >
                {staticMode ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5 text-[#a67c45]" />
                    <span>Mode: Static Snapshot</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Mode: Live Visual Topology</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll-Driven Workspace: Left Narrative Stream + Right Sticky Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative Stream (7 Cols) */}
          <div className="lg:col-span-7 space-y-24">
            {METHODOLOGY_STAGES.map((stage, idx) => (
              <article
                key={stage.id}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                className={cn(
                  "scroll-mt-36 rounded-xs border p-8 sm:p-10 transition-all duration-300 space-y-8",
                  activeStageIndex === idx
                    ? "border-[#a67c45]/50 bg-[#ebe7de] shadow-elevation-2"
                    : "border-[#d8d1c5]/80 bg-[#f3f0e8]/80 opacity-80 hover:opacity-100"
                )}
              >
                {/* Stage Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#a67c45] tracking-widest">
                      STAGE {stage.num} · {stage.name}
                    </span>

                    <Badge
                      variant="outline"
                      className="border-[#c5beb2] font-mono text-[9px] uppercase tracking-wider text-[#626a6d]"
                    >
                      {stage.eyebrow}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1d2529] leading-tight">
                    {stage.title}
                  </h3>

                  <p className="font-serif text-lg text-[#8a6437] italic font-normal">
                    {stage.tagline}
                  </p>
                </div>

                {/* Explanation */}
                <div className="space-y-3 text-[#4f595d] font-light text-sm sm:text-base leading-relaxed">
                  <p>{stage.explanation}</p>
                </div>

                {/* Activities List */}
                <div className="space-y-3 pt-4 border-t border-[#d8d1c5]">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#394247] font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#a67c45]" />
                    <span>Operational Activities</span>
                  </div>

                  <ul className="space-y-2">
                    {stage.activities.map((act, aIdx) => (
                      <li
                        key={aIdx}
                        className="flex items-start gap-2.5 text-xs text-[#626a6d] font-light"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#a67c45] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outputs List */}
                <div className="space-y-3 pt-4 border-t border-[#d8d1c5]">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#394247] font-semibold flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-[#a67c45]" />
                    <span>Stage Outputs</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {stage.outputs.map((out, oIdx) => (
                      <div
                        key={oIdx}
                        className="rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] px-3 py-2 text-xs font-mono text-[#4f595d] flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45] shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Senior Counsel Perspective Quote */}
                <blockquote className="rounded-xs border-l-2 border-[#a67c45]/80 bg-[#f3f0e8] p-5 font-serif text-sm italic text-[#4f595d] leading-relaxed">
                  &ldquo;{stage.quote}&rdquo;
                </blockquote>
              </article>
            ))}
          </div>

          {/* Right Column: Sticky Visual Environment (5 Cols) */}
          <div className="lg:col-span-5 sticky top-36 space-y-6">
            <div className="rounded-xs border border-[#c5beb2] bg-[#ebe7de] p-5 shadow-2xl backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#d0c9bd] pb-3 font-mono text-xs">
                <span className="text-[#8a6437] font-semibold">
                  Visual Environment · Stage {activeStage.num}
                </span>

                <Badge
                  variant="outline"
                  className="border-[#a67c45]/30 bg-[#a67c45]/10 text-[#8a6437] font-mono text-[9px] uppercase tracking-wider"
                >
                  {staticMode ? "Static Snapshot" : "Dynamic Canvas"}
                </Badge>
              </div>

              {/* Dynamic Network Canvas */}
              <MethodologyNetworkCanvas
                activeStage={activeStage}
                staticMode={staticMode}
              />

              {/* Stage Context Box */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#7a807f]">
                  Active Methodology Phase:
                </div>

                <div className="font-serif text-xl font-normal text-[#1d2529]">
                  {activeStage.num} {activeStage.name}: {activeStage.title}
                </div>

                <p className="text-xs text-[#626a6d] font-light leading-relaxed">
                  {activeStage.tagline}
                </p>
              </div>

              {/* Scrubber Quick Step */}
              <div className="pt-3 border-t border-[#d0c9bd] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#7a807f]">
                  <Radio className="h-3 w-3 text-[#a67c45] animate-pulse" />
                  <span>Interactive Topology Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
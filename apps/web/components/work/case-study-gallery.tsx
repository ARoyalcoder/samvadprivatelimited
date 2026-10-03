"use client";

import * as React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { SamvadImage } from "@samvad/ui";

import type { GalleryItem } from "@/lib/case-studies-data";

import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Layers,
  ShieldCheck,
} from "lucide-react";

interface CaseStudyGalleryProps {
  items: GalleryItem[];
  title?: string;
}

export function CaseStudyGallery({
  items,
  title = "Operational Evidence Gallery",
}: CaseStudyGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const current = items[activeIndex] ?? items[0]!;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d8d1c5] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
            <Layers className="h-3.5 w-3.5" />
            <span>09 · Visual Evidence</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1d2529]">
            {title}
          </h3>
        </div>

        {items.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#8a8f91] mr-2">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous operational artifact"
              className="flex h-8 w-8 items-center justify-center rounded-xs border border-[#d0c9bd] bg-[#ebe7de] text-[#596267] hover:border-[#a67c45]/50 hover:text-[#a67c45] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next operational artifact"
              className="flex h-8 w-8 items-center justify-center rounded-xs border border-[#d0c9bd] bg-[#ebe7de] text-[#596267] hover:border-[#a67c45]/50 hover:text-[#a67c45] transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Showcase Frame with Transition */}
      <div className="relative rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-2 sm:p-3 shadow-[0_20px_60px_rgba(29,37,41,0.08)] overflow-hidden">
        {/* Architectural corner marks */}
        <span className="pointer-events-none absolute left-1 top-1 font-mono text-xs text-[#a67c45]/60 select-none z-20">
          +
        </span>
        <span className="pointer-events-none absolute right-1 top-1 font-mono text-xs text-[#a67c45]/60 select-none z-20">
          +
        </span>
        <span className="pointer-events-none absolute bottom-1 left-1 font-mono text-xs text-[#a67c45]/60 select-none z-20">
          +
        </span>
        <span className="pointer-events-none absolute bottom-1 right-1 font-mono text-xs text-[#a67c45]/60 select-none z-20">
          +
        </span>

        <div className="relative overflow-hidden rounded-xs bg-[#dcd7cd] aspect-[16/9] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.assetId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative h-full w-full"
            >
              <SamvadImage
                assetId={current.assetId}
                aspectRatio="16:9"
                priority
                className="h-full w-full object-cover"
                caption={current.caption}
              />
            </motion.div>
          </AnimatePresence>

          {/* Classification Overlay Tag */}
          <div className="pointer-events-none absolute top-4 left-4 z-10 flex items-center gap-2 rounded-xs border border-[#d0c9bd]/80 bg-[#1d2529]/85 px-2.5 py-1 backdrop-blur-md">
            <ShieldCheck className="h-3 w-3 text-[#c39a62]" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#f3f0e8]">
              Verified Record
            </span>
          </div>
        </div>

        {/* Caption & Metadata Bar */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 py-1 text-xs text-[#697176] font-light">
          <p className="italic text-[#596267] sm:max-w-xl">
            &ldquo;{current.caption}&rdquo;
          </p>

          <div className="flex items-center gap-3 font-mono text-[10px] text-[#8a8f91] self-end sm:self-auto shrink-0">
            <span>KEY: {current.assetId}</span>
            <span>RATIO: {current.aspectRatio}</span>
          </div>
        </div>
      </div>

      {/* Thumbnails Row if more than 1 item */}
      {items.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {items.map((item, idx) => (
            <button
              key={item.assetId}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative overflow-hidden rounded-xs border p-1 text-left transition-all ${
                activeIndex === idx
                  ? "border-[#a67c45] bg-[#ebe7de] ring-1 ring-[#a67c45]/30"
                  : "border-[#d8d1c5] bg-[#f3f0e8]/60 hover:border-[#bdb5a8] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs bg-[#dcd7cd]">
                <SamvadImage
                  assetId={item.assetId}
                  aspectRatio="16:9"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-1.5 flex items-center justify-between font-mono text-[9px]">
                <span
                  className={
                    activeIndex === idx
                      ? "text-[#a67c45] font-semibold"
                      : "text-[#8a8f91]"
                  }
                >
                  ITEM {String(idx + 1).padStart(2, "0")}
                </span>

                <span className="text-[#9b9b98]">
                  <Eye className="h-2.5 w-2.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
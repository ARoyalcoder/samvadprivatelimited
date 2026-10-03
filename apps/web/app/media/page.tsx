import * as React from "react";

import type { Metadata } from "next";

import Link from "next/link";

import { Container } from "@samvad/ui";

import { ObjectStorageService } from "@/lib/media/storage-service";

import { MediaGalleryView } from "@/components/media/media-gallery-view";

import {
  ShieldCheck,
  ChevronRight,
  Globe,
  Sparkles,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Media Library | SAMVAD Perception Advisory",
  description:
    "SAMVAD's institutional media and digital asset repository.",
  keywords: [
    "SAMVAD Media Library",
    "Digital Assets",
    "Press Kit",
    "Editorial Photography",
    "Research PDFs",
  ],
};

export default function MediaLibraryPage() {
  const assets = ObjectStorageService.listAssets();
  const telemetry = ObjectStorageService.getStorageTelemetry();

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-20 lg:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[160px]" />

        <Container
          size="xl"
          className="relative z-10 flex flex-col justify-center space-y-6"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-[#777970]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#3f4847]"
            >
              Home
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-[#a67c45]">Media Library</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Digital Assets
            </div>

            <h1 className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
              Media Library
              <br />
              <span className="font-normal italic text-[#a67c45]">
                Institutional Assets
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
              Editorial media, research, and press assets.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. TECHNICAL SPECIFICATIONS BANNER */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-6">
        <Container size="xl">
          <div className="grid grid-cols-1 gap-4 font-mono text-xs text-[#777970] sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-3">
              <Globe className="h-4 w-4 shrink-0 text-[#a67c45]" />

              <div>
                <span className="block text-[11px] font-semibold text-[#3f4847]">
                  Global CDN
                </span>

                <span className="text-[10px] text-[#aaa398]">
                  &lt;50ms TTFB
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-3">
              <Sparkles className="h-4 w-4 shrink-0 text-[#a67c45]" />

              <div>
                <span className="block text-[11px] font-semibold text-[#3f4847]">
                  Optimized Delivery
                </span>

                <span className="text-[10px] text-[#aaa398]">
                  WebP · AVIF
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#a67c45]" />

              <div>
                <span className="block text-[11px] font-semibold text-[#3f4847]">
                  Integrity Verified
                </span>

                <span className="text-[10px] text-[#aaa398]">
                  SHA-256
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-3">
              <Lock className="h-4 w-4 shrink-0 text-[#a67c45]" />

              <div>
                <span className="block text-[11px] font-semibold text-[#3f4847]">
                  Governed Access
                </span>

                <span className="text-[10px] text-[#aaa398]">
                  Limits · Alt Text
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE MEDIA GALLERY */}
      <section className="bg-[#f3f0e8] py-16 lg:py-24">
        <Container size="xl">
          <MediaGalleryView
            initialAssets={assets}
            telemetry={telemetry}
            isAdminMode={false}
          />
        </Container>
      </section>

      {/* 4. ASSET USAGE TERMS & MEDIA CITATION */}
      <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-12">
        <Container size="xl">
          <div className="space-y-3 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 font-mono text-xs text-[#777970] shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#a67c45]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Asset Usage</span>
            </div>

            <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
              Editorial use with attribution. Commercial use requires
              permission.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
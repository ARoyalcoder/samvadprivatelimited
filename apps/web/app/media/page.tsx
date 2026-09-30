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
  title: "Media Library & Digital Assets | SAMVAD Perception Advisory",
  description:
    "Official digital media repository containing 4K editorial photography, broadcast video reels, research monographs, accredited press kits, and governance charters.",
  keywords: [
    "SAMVAD Media Library",
    "Digital Asset Management",
    "Press Kit Download",
    "Editorial Photography",
    "Research PDFs",
  ],
};

export default function MediaLibraryPage() {
  const assets = ObjectStorageService.listAssets();
  const telemetry = ObjectStorageService.getStorageTelemetry();

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-obsidian-800">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 flex flex-col justify-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400"
          >
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">Media Library &amp; Assets</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Digital Asset Repository &amp; CDN Delivery
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
              Media Library &amp; <br />
              <span className="font-normal italic text-gold-300">
                Institutional Digital Assets
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed max-w-2xl">
              High-resolution editorial photography, broadcast video footage, empirical policy
              whitepapers, compliance charters, and accredited press kit packages distributed via global CDN.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. TECHNICAL SPECIFICATIONS BANNER */}
      <section className="border-b border-obsidian-800 bg-obsidian-900/50 py-6">
        <Container size="xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs text-obsidian-400">
            <div className="flex items-center gap-3 p-3 rounded-xs border border-obsidian-800 bg-obsidian-950/60">
              <Globe className="h-4 w-4 text-gold-400 shrink-0" />
              <div>
                <span className="text-sand-200 block text-[11px] font-semibold">Global CDN Edge Delivery</span>
                <span className="text-[10px] text-obsidian-500">&lt;50ms Global TTFB</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xs border border-obsidian-800 bg-obsidian-950/60">
              <Sparkles className="h-4 w-4 text-gold-400 shrink-0" />
              <div>
                <span className="text-sand-200 block text-[11px] font-semibold">Responsive Optimization</span>
                <span className="text-[10px] text-obsidian-500">Auto WebP, AVIF, Lazy Load</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xs border border-obsidian-800 bg-obsidian-950/60">
              <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" />
              <div>
                <span className="text-sand-200 block text-[11px] font-semibold">Cryptographic Integrity</span>
                <span className="text-[10px] text-obsidian-500">SHA-256 Checksum on Ingestion</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xs border border-obsidian-800 bg-obsidian-950/60">
              <Lock className="h-4 w-4 text-gold-400 shrink-0" />
              <div>
                <span className="text-sand-200 block text-[11px] font-semibold">Strict Governance &amp; SLA</span>
                <span className="text-[10px] text-obsidian-500">Enforced Size Limits &amp; Alt Text</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE MEDIA GALLERY */}
      <section className="py-16 lg:py-24">
        <Container size="xl">
          <MediaGalleryView
            initialAssets={assets}
            telemetry={telemetry}
            isAdminMode={false}
          />
        </Container>
      </section>

      {/* 4. ASSET USAGE TERMS & MEDIA CITATION */}
      <section className="border-t border-obsidian-800 bg-obsidian-950 py-12">
        <Container size="xl">
          <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/40 p-6 sm:p-8 space-y-3 font-mono text-xs text-obsidian-400">
            <div className="flex items-center gap-2 text-gold-400 text-[10px] uppercase tracking-widest font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Asset License &amp; Accreditation Notice</span>
            </div>
            <p className="font-sans text-xs text-sand-400 font-light leading-relaxed">
              All visual assets, video footage, research monographs, and press kit packages hosted in the SAMVAD Media Library are property of SAMVAD Perception Advisory Private Limited. Accredited journalists and media outlets are authorized to utilize these assets for editorial coverage referencing the firm with attribution: &ldquo;Source: SAMVAD Perception Advisory&rdquo;. Commercial reproduction without explicit license is strictly prohibited.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

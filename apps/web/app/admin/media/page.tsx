import * as React from "react";

import type { Metadata } from "next";

import Link from "next/link";

import { Container, Badge } from "@samvad/ui";

import { ObjectStorageService } from "@/lib/media/storage-service";

import { MediaGalleryView } from "@/components/media/media-gallery-view";

import {
  ChevronRight,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Media CMS | SAMVAD Admin",
  description:
    "Administrative media asset and storage management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminMediaCMSPage() {
  const assets = ObjectStorageService.listAssets();

  const telemetry = ObjectStorageService.getStorageTelemetry();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. ADMIN HEADER */}
      <section className="relative overflow-hidden border-b border-[#d8d1c5] bg-[#ebe7de] pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="pointer-events-none absolute -top-32 right-1/4 h-[400px] w-[600px] rounded-full bg-[#a67c45]/5 blur-[140px]" />

        <Container size="xl" className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
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

              <span>Admin</span>

              <ChevronRight className="h-3 w-3" />

              <span className="text-[#a67c45]">
                Media CMS
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-[#a67c45]/40 bg-[#a67c45]/10 font-mono text-[9px] uppercase tracking-wider text-[#8d683d]"
              >
                Communications Directorate
              </Badge>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                <Terminal className="h-3.5 w-3.5" />
                <span>Storage Admin</span>
              </div>

              <h1 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
                Media Asset Management
              </h1>

              <p className="text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                Manage imagery, research assets, CDN delivery, metadata,
                and file controls.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/media"
                className="flex items-center gap-1.5 rounded-xs border border-[#c9c2b6] bg-[#f3f0e8] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#626760] transition-all hover:border-[#a67c45]/40 hover:text-[#8d683d]"
              >
                <span>Public Gallery</span>

                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. MEDIA MANAGEMENT & GALLERY */}
      <section className="flex-1 py-12 lg:py-16">
        <Container size="xl">
          <MediaGalleryView
            initialAssets={assets}
            telemetry={telemetry}
            isAdminMode={true}
          />
        </Container>
      </section>
    </div>
  );
}
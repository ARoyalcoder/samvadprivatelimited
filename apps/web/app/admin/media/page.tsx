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
  title: "Media Asset Management CMS | SAMVAD Admin",
  description:
    "Administrative media asset management, object-storage ingestion, and CDN distribution control.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminMediaCMSPage() {
  const assets = ObjectStorageService.listAssets();
  const telemetry = ObjectStorageService.getStorageTelemetry();

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100 min-h-screen">
      {/* 1. ADMIN HEADER */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32 lg:pb-16 border-b border-obsidian-800 bg-obsidian-900/60">
        <Container size="xl" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-mono text-[11px] text-obsidian-400"
            >
              <Link href="/" className="hover:text-sand-300">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-sand-400">Admin</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gold-400">Media Management CMS</span>
            </nav>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-gold-500/40 bg-gold-500/10 font-mono text-[9px] uppercase tracking-wider text-gold-300"
              >
                RBAC Level: Communications Directorate
              </Badge>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                <Terminal className="h-3.5 w-3.5" />
                <span>Object Storage Admin Node</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
                Media Asset Management CMS
              </h1>
              <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                Ingest high-resolution imagery, broadcast footage, and accredited research dossiers. Manage CDN delivery URLs, accessibility alt text, and enforce strict file size limits.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/media"
                className="font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border border-obsidian-750 bg-obsidian-950 text-sand-300 hover:text-gold-300 hover:border-gold-500/40 transition-all flex items-center gap-1.5"
              >
                <span>View Public Gallery</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. MEDIA MANAGEMENT & GALLERY COMPONENT */}
      <section className="py-12 lg:py-16 flex-1">
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

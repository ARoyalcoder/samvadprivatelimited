import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@samvad/ui";
import { UploadCloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Asset Management | SAMVAD Admin",
  description:
    "Object Storage Management, CDN Ingestion, and Digital Asset Library for Authorized Directors.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminMediaManagementPage() {
  const mediaTypes = [
    { type: "IMAGE", label: "Images", limit: "15 MB", formats: "JPEG, PNG, WEBP, SVG" },
    { type: "VIDEO", label: "Videos", limit: "250 MB", formats: "MP4, WEBM" },
    { type: "PDF", label: "PDFs", limit: "50 MB", formats: "PDF" },
    { type: "PRESS_KIT", label: "Press Kits", limit: "100 MB", formats: "ZIP, PDF" },
    { type: "DOCUMENT", label: "Documents", limit: "50 MB", formats: "DOCX, XLS, TXT" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 lg:p-10 space-y-8">
      {/* 1. TOP MASTHEAD */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              Storage Engine: S3/R2 + Edge CDN
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
            Media Asset Ingestion &amp; Governance CMS
          </h1>
          <p className="text-xs text-zinc-400 font-light">
            Authorized repository for multi-region media assets, cryptographic verification, and CDN deployment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="gold">RBAC: DIRECTOR</Badge>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
          >
            Command Portal
          </Link>
        </div>
      </header>

      {/* 2. STORAGE QUOTA & PROTOCOL CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {mediaTypes.map((mt) => (
          <div
            key={mt.type}
            className="rounded-sm border border-zinc-800 bg-zinc-900/60 p-4 space-y-2 font-mono text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-zinc-200 font-semibold">{mt.label}</span>
              <span className="text-[10px] text-zinc-500 uppercase">Max {mt.limit}</span>
            </div>
            <div className="text-[10px] text-zinc-400">
              {mt.formats}
            </div>
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-emerald-400">
              <span>Security SLA</span>
              <span>Enforced</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. UPLOAD NOTICE & REPOSITORY CONSOLE */}
      <div className="rounded-sm border border-zinc-800 bg-zinc-900/40 p-8 text-center space-y-4 max-w-2xl mx-auto">
        <UploadCloud className="h-12 w-12 text-zinc-500 mx-auto" />
        <div className="space-y-1">
          <h2 className="font-serif text-lg font-bold text-zinc-200">
            Object Storage Media Console
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Assets uploaded through this node are automatically processed with SHA-256 integrity hashes, responsive thumbnails, and distributed to edge caching layers.
          </p>
        </div>
        <div className="pt-2 font-mono text-[11px] text-zinc-500">
          Direct uploads and gallery synchronization are operational on the primary web cluster at <code className="text-gold-400">/admin/media</code> and <code className="text-gold-400">/media</code>.
        </div>
      </div>
    </div>
  );
}

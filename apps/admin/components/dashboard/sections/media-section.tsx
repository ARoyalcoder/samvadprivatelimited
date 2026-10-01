"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  Image as ImageIcon,
  Film,
  FileCheck,
  ExternalLink,
  HardDrive,
} from "lucide-react";
import { Badge } from "@samvad/ui";

export function MediaSection() {
  const mediaTypes = [
    { type: "IMAGE", label: "Images", limit: "15 MB", formats: "JPEG, PNG, WEBP, SVG", count: 24, icon: ImageIcon },
    { type: "VIDEO", label: "Videos", limit: "250 MB", formats: "MP4, WEBM", count: 4, icon: Film },
    { type: "PDF", label: "PDFs", limit: "50 MB", formats: "PDF", count: 12, icon: FileText },
    { type: "PRESS_KIT", label: "Press Kits", limit: "100 MB", formats: "ZIP, PDF", count: 6, icon: FileCheck },
    { type: "DOCUMENT", label: "Documents", limit: "50 MB", formats: "DOCX, XLS, TXT", count: 8, icon: HardDrive },
  ];

  const recentAssets = [
    {
      id: "med_01",
      title: "SAMVAD Sovereign Perception Index 2026 Briefing PDF",
      filename: "sovereign-index-2026.pdf",
      type: "PDF",
      size: "4.2 MB",
      dimensions: "Document / Vector",
      cdnUrl: "https://cdn.samvadadvisory.com/assets/sovereign-index-2026.pdf",
      uploadedAt: "2 hours ago",
    },
    {
      id: "med_02",
      title: "Singapore Advisory Loft - Architectural Header",
      filename: "singapore-loft-editorial.webp",
      type: "IMAGE",
      size: "1.8 MB",
      dimensions: "2400 x 1350 (16:9)",
      cdnUrl: "https://cdn.samvadadvisory.com/assets/singapore-loft-editorial.webp",
      uploadedAt: "Yesterday",
    },
    {
      id: "med_03",
      title: "Executive Press Kit - Senior Partner Appointment",
      filename: "press-kit-jurist-appointment.zip",
      type: "PRESS_KIT",
      size: "24.5 MB",
      dimensions: "Compressed Archive",
      cdnUrl: "https://cdn.samvadadvisory.com/assets/press-kit-jurist-appointment.zip",
      uploadedAt: "3 days ago",
    },
    {
      id: "med_04",
      title: "De-escalation Case Study Infographic Visual",
      filename: "fintech-deescalation-metrics.png",
      type: "IMAGE",
      size: "840 KB",
      dimensions: "1920 x 1080 (16:9)",
      cdnUrl: "https://cdn.samvadadvisory.com/assets/fintech-deescalation-metrics.png",
      uploadedAt: "5 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-zinc-100">
            Object Storage &amp; Media Asset Pipeline
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            Cloudflare R2 / S3 storage layer with global edge caching and cryptographic file integrity
          </p>
        </div>

        <Link
          href="/media"
          className="flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-gold-400 hover:border-gold-500/50 hover:bg-zinc-800 transition-colors"
        >
          <span>Open Full Ingestion Console</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 2. Media Type Quota Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {mediaTypes.map((mt) => {
          const Icon = mt.icon;
          return (
            <div
              key={mt.type}
              className="rounded border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-2 font-mono text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                  <Icon className="h-4 w-4 text-gold-400" />
                  <span>{mt.label}</span>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase">{mt.limit}</span>
              </div>
              <div className="text-[10px] text-zinc-400 truncate">{mt.formats}</div>
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
                <span className="text-zinc-500">{mt.count} Assets</span>
                <span className="text-emerald-400 font-medium">Edge Synchronized</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Recent Media Assets Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-semibold text-zinc-200">
            Recent Ingested Media Assets
          </h3>
          <span className="font-mono text-xs text-zinc-500">54 Total Objects</span>
        </div>

        <div className="overflow-x-auto rounded border border-zinc-800 bg-zinc-900/60">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-zinc-800/80 bg-zinc-950/80 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Asset Name &amp; Key</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Dimensions / Scope</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Ingestion Time</th>
                <th className="py-3 px-4 text-right">CDN URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {recentAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-zinc-950/40 transition-colors">
                  <td className="py-3 px-4 max-w-xs">
                    <div className="space-y-0.5">
                      <span className="font-serif text-sm font-medium text-zinc-100 truncate block">
                        {asset.title}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 block truncate">
                        {asset.filename}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px]">
                    <Badge variant="outline">{asset.type}</Badge>
                  </td>

                  <td className="py-3 px-4 text-zinc-400 font-mono text-[11px]">
                    {asset.dimensions}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-300">
                    {asset.size}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-500">
                    {asset.uploadedAt}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <a
                      href={asset.cdnUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-gold-400 hover:text-gold-300 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Direct CDN</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

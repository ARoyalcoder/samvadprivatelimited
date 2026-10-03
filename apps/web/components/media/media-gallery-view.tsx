"use client";

import * as React from "react";
import { Badge, SamvadImage, Button } from "@samvad/ui";
import type {
  MediaAssetItem,
  StorageQuotaSummary,
} from "@/lib/media/storage-service";
import { MediaUploadModal } from "./media-upload-modal";
import {
  Search,
  X,
  SlidersHorizontal,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Package,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Eye,
  Plus,
  Play,
  HardDrive,
  Info,
} from "lucide-react";

interface MediaGalleryViewProps {
  initialAssets: MediaAssetItem[];
  telemetry: StorageQuotaSummary;
  isAdminMode?: boolean;
}

export function MediaGalleryView({
  initialAssets,
  telemetry: initialTelemetry,
  isAdminMode = false,
}: MediaGalleryViewProps) {
  const [assets, setAssets] = React.useState<MediaAssetItem[]>(initialAssets);
  const [selectedType, setSelectedType] = React.useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Lightbox / Detail Modal
  const [activeAsset, setActiveAsset] =
    React.useState<MediaAssetItem | null>(null);
  const [copiedUrl, setCopiedUrl] = React.useState(false);
  const [copiedHash, setCopiedHash] = React.useState(false);

  // Upload Modal
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);

  // Derive unique categories
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    assets.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [assets]);

  // Counts by type
  const typeCounts = React.useMemo(() => {
    const counts: Record<string, number> = {
      ALL: assets.length,
      IMAGE: 0,
      VIDEO: 0,
      PDF: 0,
      PRESS_KIT: 0,
      DOCUMENT: 0,
    };

    assets.forEach((a) => {
      counts[a.mediaType] = (counts[a.mediaType] || 0) + 1;
    });

    return counts;
  }, [assets]);

  // Filtered assets
  const filteredAssets = React.useMemo(() => {
    return assets.filter((asset) => {
      if (selectedType !== "ALL" && asset.mediaType !== selectedType) {
        return false;
      }

      if (
        selectedCategory !== "ALL" &&
        asset.category !== selectedCategory
      ) {
        return false;
      }

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = asset.title.toLowerCase().includes(q);
        const matchesDesc = asset.description?.toLowerCase().includes(q);
        const matchesFile = asset.filename.toLowerCase().includes(q);
        const matchesTags = asset.tags.some((t) =>
          t.toLowerCase().includes(q)
        );

        if (!matchesTitle && !matchesDesc && !matchesFile && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [assets, selectedType, selectedCategory, searchQuery]);

  const handleCopy = async (text: string, type: "url" | "hash") => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);

        if (type === "url") {
          setCopiedUrl(true);
          setTimeout(() => setCopiedUrl(false), 2000);
        } else {
          setCopiedHash(true);
          setTimeout(() => setCopiedHash(false), 2000);
        }
      }
    } catch {
      // fallback
    }
  };

  const handleAssetUploaded = (newAsset: MediaAssetItem) => {
    setAssets((prev) => [newAsset, ...prev]);
    setActiveAsset(newAsset);
  };

  return (
    <div className="space-y-12">
      {/* 1. STORAGE TELEMETRY & UPLOAD ACTION BAR */}
      <div className="rounded-xs border border-[#c5beb2] bg-[#ebe7de] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Telemetry info */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8a6437]">
              <HardDrive className="h-3.5 w-3.5" />
              <span>Multi-Region CDN &amp; Object Storage: Nominal</span>

              {isAdminMode && (
                <Badge
                  variant="outline"
                  className="ml-2 border-[#a67c45]/40 bg-[#a67c45]/10 font-mono text-[9px] uppercase tracking-wider text-[#8a6437]"
                >
                  CMS Admin Active
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#626a6d]">
              <span>
                Total Assets:{" "}
                <strong className="text-[#1d2529]">{assets.length}</strong>
              </span>

              <span>·</span>

              <span>
                Storage Ingested:{" "}
                <strong className="text-[#1d2529]">
                  {(
                    initialTelemetry.totalUsedBytes /
                    (1024 * 1024)
                  ).toFixed(1)}{" "}
                  MB
                </strong>
              </span>

              <span>·</span>

              <span>
                Images:{" "}
                <strong className="text-[#a67c45]">
                  {typeCounts["IMAGE"]}
                </strong>
              </span>

              <span>·</span>

              <span>
                Videos:{" "}
                <strong className="text-[#a67c45]">
                  {typeCounts["VIDEO"]}
                </strong>
              </span>

              <span>·</span>

              <span>
                PDFs:{" "}
                <strong className="text-[#a67c45]">
                  {typeCounts["PDF"]}
                </strong>
              </span>

              <span>·</span>

              <span>
                Press Kits:{" "}
                <strong className="text-[#a67c45]">
                  {typeCounts["PRESS_KIT"]}
                </strong>
              </span>
            </div>
          </div>

          {/* Upload Button */}
          {isAdminMode && (
            <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto">
              <Button
                variant="gold"
                size="sm"
                onClick={() => setIsUploadOpen(true)}
                className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 flex items-center gap-2"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Upload New Asset</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <div className="space-y-6">
        {/* Search & Category row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-[#d0c9bd] pb-6">
          <div className="relative w-full lg:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8b918f]">
              <Search className="h-4 w-4" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets by title, filename, tags, or format..."
              className="w-full rounded-xs border border-[#c5beb2] bg-[#ebe7de] py-2.5 pl-10 pr-9 font-sans text-xs text-[#1d2529] placeholder-[#9a9f9d] focus:border-[#a67c45] focus:outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8b918f] hover:text-[#1d2529]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7a807f]">
              Category:
            </span>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xs border border-[#c5beb2] bg-[#ebe7de] px-3 py-2 font-mono text-xs text-[#394247] focus:border-[#a67c45] focus:outline-none"
            >
              <option value="ALL">All Categories</option>

              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Media Type Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: "ALL", label: "All Media", icon: SlidersHorizontal },
            { key: "IMAGE", label: "Images", icon: ImageIcon },
            { key: "VIDEO", label: "Videos", icon: VideoIcon },
            { key: "PDF", label: "PDFs & Monograph", icon: FileText },
            { key: "PRESS_KIT", label: "Press Kits", icon: Package },
            { key: "DOCUMENT", label: "Documents", icon: FileSpreadsheet },
          ].map((tab) => {
            const Icon = tab.icon;
            const count = typeCounts[tab.key] || 0;
            const isSelected = selectedType === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedType(tab.key)}
                className={`font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded-xs border transition-all flex items-center gap-2 ${
                  isSelected
                    ? "border-[#a67c45]/50 bg-[#a67c45]/10 text-[#8a6437] shadow-sm"
                    : "border-[#c5beb2] bg-[#ebe7de] text-[#7a807f] hover:text-[#394247] hover:border-[#a67c45]/40"
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-[#a67c45]" />
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MEDIA GALLERY GRID */}
      {filteredAssets.length === 0 ? (
        <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-12 text-center space-y-4">
          <Info className="h-8 w-8 text-[#9a9f9d] mx-auto" />

          <h3 className="font-serif text-xl text-[#1d2529] font-light">
            No media assets found
          </h3>

          <p className="text-xs text-[#626a6d] font-light max-w-md mx-auto">
            Try adjusting your search query, selecting another media type, or
            resetting filters.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedType("ALL");
              setSelectedCategory("ALL");
            }}
            className="font-mono text-xs uppercase tracking-wider text-[#8a6437] hover:text-[#a67c45] underline underline-offset-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <article
              key={asset.id}
              onClick={() => setActiveAsset(asset)}
              className="group cursor-pointer rounded-xs border border-[#d0c9bd] bg-[#ebe7de] overflow-hidden transition-all duration-300 hover:border-[#a67c45]/50 hover:bg-[#e7e2d9] shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ded8cd] border-b border-[#d0c9bd]">
                  {asset.mediaType === "IMAGE" && (
                    <SamvadImage
                      assetId={
                        asset.filename.includes("press-podium") ||
                        asset.filename.includes("podium")
                          ? "corp-comm-press-podium"
                          : asset.filename.includes("skyline")
                          ? "leadership-skyline-silhouette"
                          : asset.filename.includes("atrium")
                          ? "finance-atrium-architecture"
                          : "tech-datacenter-optical-core"
                      }
                      aspectRatio="16:9"
                      zoomOnHover
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      caption={asset.title}
                    />
                  )}

                  {asset.mediaType === "VIDEO" && (
                    <div className="relative h-full w-full bg-[#ded8cd] flex items-center justify-center">
                      <SamvadImage
                        assetId={
                          asset.id === "media-vid-01"
                            ? "reputation-crisis-monitoring"
                            : "media-press-briefing-room"
                        }
                        aspectRatio="16:9"
                        className="h-full w-full object-cover opacity-65"
                        caption={asset.title}
                      />

                      <div className="absolute inset-0 bg-[#1d2529]/35 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full border border-[#a67c45]/70 bg-[#1d2529]/75 flex items-center justify-center text-[#d4aa70] group-hover:scale-110 transition-transform">
                          <Play className="h-5 w-5 fill-[#d4aa70] ml-0.5" />
                        </div>
                      </div>

                      {asset.videoDurationSeconds && (
                        <div className="absolute bottom-2.5 right-2.5 font-mono text-[10px] bg-[#1d2529]/85 text-[#ead6b8] border border-[#c5beb2]/40 px-2 py-0.5 rounded-xs">
                          {Math.floor(
                            asset.videoDurationSeconds / 60
                          )}
                          :
                          {String(
                            Math.floor(asset.videoDurationSeconds % 60)
                          ).padStart(2, "0")}
                        </div>
                      )}
                    </div>
                  )}

                  {asset.mediaType === "PDF" && (
                    <div className="relative h-full w-full bg-[#ded8cd] flex items-center justify-center p-6 text-center">
                      <SamvadImage
                        assetId={
                          asset.id === "media-pdf-01"
                            ? "case-study-briefing-binder"
                            : "meetings-briefing-table"
                        }
                        aspectRatio="16:9"
                        className="h-full w-full object-cover opacity-45"
                        caption={asset.title}
                      />

                      <div className="absolute inset-0 bg-[#1d2529]/65 flex flex-col items-center justify-center space-y-2 p-4">
                        <FileText className="h-10 w-10 text-[#d4aa70]" />

                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#f3f0e8]">
                          PDF Monograph
                        </span>
                      </div>
                    </div>
                  )}

                  {asset.mediaType === "PRESS_KIT" && (
                    <div className="relative h-full w-full bg-[#ded8cd] flex items-center justify-center p-6">
                      <SamvadImage
                        assetId="case-study-briefing-binder"
                        aspectRatio="16:9"
                        className="h-full w-full object-cover opacity-35"
                        caption={asset.title}
                      />

                      <div className="absolute inset-0 bg-[#1d2529]/70 flex flex-col items-center justify-center space-y-2 p-4 text-center">
                        <Package className="h-10 w-10 text-[#d4aa70]" />

                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#ead6b8]">
                          Accredited Media Kit
                        </span>

                        <span className="font-mono text-[9px] text-[#c8cbc8]">
                          5 Core Assets Included
                        </span>
                      </div>
                    </div>
                  )}

                  {asset.mediaType === "DOCUMENT" && (
                    <div className="relative h-full w-full bg-[#ded8cd] flex items-center justify-center p-6">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <FileSpreadsheet className="h-10 w-10 text-[#a67c45]" />

                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#394247]">
                          Compliance Charter
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Type Badge Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-wider bg-[#1d2529]/85 text-[#ead6b8] px-2 py-0.5 rounded-xs border border-[#a67c45]/30 backdrop-blur-md">
                      {asset.mediaType.replace("_", " ")}
                    </span>
                  </div>

                  {/* Format & Size Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 font-mono text-[9px] bg-[#1d2529]/85 text-[#f3f0e8] px-2 py-0.5 rounded-xs border border-[#c5beb2]/30">
                    {asset.formattedSize}
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base sm:text-lg font-light text-[#1d2529] group-hover:text-[#8a6437] transition-colors line-clamp-1">
                      {asset.title}
                    </h3>

                    <p className="font-sans text-xs text-[#626a6d] font-light line-clamp-2 leading-relaxed">
                      {asset.description || asset.altText}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {asset.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-[#626a6d] bg-[#f3f0e8] px-2 py-0.5 rounded-xs border border-[#d0c9bd]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 border-t border-[#d0c9bd] flex items-center justify-between font-mono text-[10px] text-[#7a807f]">
                <span className="truncate max-w-[150px]">
                  {asset.filename}
                </span>

                <span className="text-[#8a6437] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <Eye className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 4. ASSET DETAIL & LIGHTBOX MODAL */}
      {activeAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1d2529]/75 backdrop-blur-lg">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-xs border border-[#c5beb2] bg-[#f3f0e8] shadow-2xl max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#d0c9bd] p-5 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-[#a67c45]/10 text-[#8a6437] px-2.5 py-1 rounded-xs border border-[#a67c45]/30">
                  {activeAsset.mediaType.replace("_", " ")}
                </span>

                <h2 className="font-serif text-lg sm:text-xl font-light text-[#1d2529] truncate max-w-md">
                  {activeAsset.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveAsset(null)}
                className="rounded-xs p-1 text-[#7a807f] hover:text-[#1d2529] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
              {/* Left Media Preview Pane */}
              <div className="lg:col-span-7 bg-[#e7e2d9] p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#d0c9bd] min-h-[300px]">
                {activeAsset.mediaType === "IMAGE" && (
                  <div className="space-y-3 w-full">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-[#c5beb2]">
                      <SamvadImage
                        assetId={
                          activeAsset.filename.includes("press-podium") ||
                          activeAsset.filename.includes("podium")
                            ? "corp-comm-press-podium"
                            : activeAsset.filename.includes("skyline")
                            ? "leadership-skyline-silhouette"
                            : activeAsset.filename.includes("atrium")
                            ? "finance-atrium-architecture"
                            : "tech-datacenter-optical-core"
                        }
                        aspectRatio="16:9"
                        priority
                        className="h-full w-full object-cover"
                        caption={activeAsset.title}
                      />
                    </div>

                    {activeAsset.altText && (
                      <p className="font-sans text-xs text-[#7a807f] italic text-center">
                        Alt Text: &ldquo;{activeAsset.altText}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                {activeAsset.mediaType === "VIDEO" && (
                  <div className="space-y-4 w-full">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-[#c5beb2] bg-[#ded8cd] flex items-center justify-center">
                      <SamvadImage
                        assetId={
                          activeAsset.id === "media-vid-01"
                            ? "reputation-crisis-monitoring"
                            : "media-press-briefing-room"
                        }
                        aspectRatio="16:9"
                        className="h-full w-full object-cover opacity-60"
                        caption={activeAsset.title}
                      />

                      <div className="absolute inset-0 bg-[#1d2529]/35 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full border border-[#a67c45] bg-[#1d2529]/75 flex items-center justify-center text-[#d4aa70]">
                          <Play className="h-7 w-7 fill-[#d4aa70] ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs text-[#7a807f]">
                      <span>Stream: Adaptive 4K HLS / MP4</span>
                      <span>
                        Duration: {activeAsset.videoDurationSeconds}s
                      </span>
                    </div>
                  </div>
                )}

                {activeAsset.mediaType === "PDF" && (
                  <div className="text-center space-y-4 p-6">
                    <FileText className="h-16 w-16 text-[#a67c45] mx-auto" />

                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-[#1d2529]">
                        {activeAsset.title}
                      </h4>

                      <p className="font-mono text-xs text-[#7a807f]">
                        {activeAsset.filename} · {activeAsset.formattedSize}
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href={activeAsset.cdnUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-xs bg-[#a67c45] text-[#f3f0e8] font-semibold hover:bg-[#8f693d]"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>
                )}

                {activeAsset.mediaType === "PRESS_KIT" && (
                  <div className="w-full space-y-4 p-4">
                    <div className="flex items-center gap-3 border-b border-[#d0c9bd] pb-3">
                      <Package className="h-8 w-8 text-[#a67c45]" />

                      <div>
                        <div className="font-serif text-base text-[#1d2529]">
                          Accredited Media Bundle
                        </div>

                        <div className="font-mono text-[10px] text-[#7a807f]">
                          ZIP Archive · {activeAsset.formattedSize}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-4 space-y-2">
                      <span className="font-mono text-[10px] uppercase text-[#8a6437] tracking-wider block">
                        Included Assets:
                      </span>

                      <ul className="space-y-1.5 font-mono text-xs text-[#4f595d]">
                        {activeAsset.pressKitContents?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#a67c45]">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeAsset.mediaType === "DOCUMENT" && (
                  <div className="text-center space-y-4 p-6">
                    <FileSpreadsheet className="h-16 w-16 text-[#a67c45] mx-auto" />

                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-[#1d2529]">
                        {activeAsset.title}
                      </h4>

                      <p className="font-mono text-xs text-[#7a807f]">
                        {activeAsset.filename}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Technical Metadata Drawer */}
              <div className="lg:col-span-5 p-6 space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8a6437]">
                    Object Storage &amp; CDN Metadata
                  </span>

                  <h3 className="font-serif text-lg font-light text-[#1d2529]">
                    Asset Technical Telemetry
                  </h3>
                </div>

                {/* Metadata List */}
                <div className="space-y-3 font-mono text-xs border-y border-[#d0c9bd] py-4">
                  <div>
                    <span className="text-[10px] text-[#8b918f] uppercase block">
                      CDN Delivery URL
                    </span>

                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        readOnly
                        value={activeAsset.cdnUrl}
                        className="w-full bg-[#ebe7de] px-2 py-1 text-[11px] text-[#394247] border border-[#d0c9bd] rounded-xs select-all"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(activeAsset.cdnUrl, "url")
                        }
                        className="px-2.5 py-1 rounded-xs border border-[#c5beb2] bg-[#ebe7de] hover:text-[#8a6437] text-[#7a807f] text-[10px] shrink-0"
                      >
                        {copiedUrl ? (
                          <Check className="h-3 w-3 text-[#a67c45]" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <span className="text-[10px] text-[#8b918f] uppercase block">
                        File Size
                      </span>
                      <span className="text-[#394247]">
                        {activeAsset.formattedSize}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#8b918f] uppercase block">
                        MIME Type
                      </span>
                      <span className="text-[#394247] truncate block">
                        {activeAsset.mimeType}
                      </span>
                    </div>
                  </div>

                  {activeAsset.dimensions && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-[#8b918f] uppercase block">
                          Resolution
                        </span>

                        <span className="text-[#394247]">
                          {activeAsset.dimensions.width} ×{" "}
                          {activeAsset.dimensions.height}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#8b918f] uppercase block">
                          Aspect Ratio
                        </span>

                        <span className="text-[#394247]">
                          {activeAsset.dimensions.aspectRatio}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] text-[#8b918f] uppercase block">
                      Storage Key
                    </span>

                    <span className="text-[#626a6d] text-[10px] break-all">
                      {activeAsset.storageKey}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8b918f] uppercase block">
                      SHA-256 Checksum
                    </span>

                    <div className="flex items-center justify-between text-[10px] text-[#7a807f] pt-0.5">
                      <span className="truncate max-w-[200px]">
                        {activeAsset.checksumSha256}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(activeAsset.checksumSha256, "hash")
                        }
                        className="hover:text-[#8a6437] text-[10px]"
                      >
                        {copiedHash ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags & Category */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase text-[#7a807f] block">
                    Taxonomy Tags:
                  </span>

                  <div className="flex flex-wrap gap-1.5">
                    {activeAsset.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] text-[#626a6d] bg-[#ebe7de] px-2 py-0.5 rounded-xs border border-[#d0c9bd]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={activeAsset.cdnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-mono text-xs uppercase tracking-wider py-2.5 rounded-xs bg-[#a67c45] text-[#f3f0e8] font-semibold hover:bg-[#8f693d] transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download File</span>
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(activeAsset.cdnUrl, "url")
                    }
                    className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs border border-[#c5beb2] bg-[#ebe7de] text-[#394247] hover:text-[#8a6437]"
                  >
                    {copiedUrl ? "Copied CDN Link" : "Copy CDN Link"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. UPLOAD MODAL */}
      <MediaUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAssetUploaded={handleAssetUploaded}
      />
    </div>
  );
}
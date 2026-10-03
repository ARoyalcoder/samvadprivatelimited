"use client";

import * as React from "react";
import {
  MediaType,
  validateMediaFile,
} from "@samvad/validation";
import type { MediaAssetItem } from "@/lib/media/storage-service";
import { formatBytes } from "@/lib/media/storage-service";
import {
  UploadCloud,
  X,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Lock,
  Loader2,
} from "lucide-react";

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetUploaded: (asset: MediaAssetItem) => void;
}

export function MediaUploadModal({
  isOpen,
  onClose,
  onAssetUploaded,
}: MediaUploadModalProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [detectedType, setDetectedType] = React.useState<MediaType>("IMAGE");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [altText, setAltText] = React.useState("");
  const [category, setCategory] = React.useState("Corporate Disclosures");
  const [tagsInput, setTagsInput] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(true);

  const [validationError, setValidationError] = React.useState<string | null>(
    null
  );
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  if (!isOpen) return null;

  const handleFileSelect = (selectedFile: File) => {
    setValidationError(null);

    // Run client validation
    const validation = validateMediaFile(selectedFile.type, selectedFile.size);
    if (!validation.valid) {
      setValidationError(
        validation.error || "File does not meet media library criteria."
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
    if (validation.detectedType) {
      setDetectedType(validation.detectedType);
    }

    // Default title from filename without extension
    if (!title) {
      const cleanTitle = selectedFile.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setTitle(cleanTitle);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]!);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setValidationError("Please select a file to upload.");
      return;
    }

    // Image accessibility alt text enforcement
    if (detectedType === "IMAGE" && (!altText || altText.trim().length < 5)) {
      setValidationError(
        "Accessibility Compliance: Descriptive Alt Text (min 5 characters) is required for all image assets."
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("mediaType", detectedType);
      formData.append("title", title || file.name);
      formData.append("description", description);
      formData.append("altText", altText);
      formData.append("category", category);
      formData.append("tags", tags.join(","));
      formData.append("isPublic", isPublic ? "true" : "false");

      setUploadProgress(60);

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploadProgress(100);

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Upload failed.");
      }

      onAssetUploaded(data.asset);
      onClose();
    } catch (err) {
      setValidationError(
        err instanceof Error ? err.message : "Failed to upload asset."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1d2529]/70 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xs border border-[#c5beb2] bg-[#f3f0e8] shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d0c9bd] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8a6437]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>CMS Asset Ingestion</span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-light text-[#1d2529]">
              Upload Media Asset
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xs p-1 text-[#7a807f] hover:text-[#1d2529] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error Notification */}
        {validationError && (
          <div className="rounded-xs border border-red-700/30 bg-red-50 p-4 flex items-start gap-3 text-xs text-[#4f3434]">
            <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <p>{validationError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`relative rounded-xs border-2 border-dashed p-6 text-center transition-all ${
              file
                ? "border-[#a67c45]/60 bg-[#a67c45]/5"
                : "border-[#c5beb2] bg-[#ebe7de] hover:border-[#a67c45]/50"
            }`}
          >
            <input
              type="file"
              id="file-upload"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {file ? (
              <div className="space-y-2">
                <FileCheck className="h-8 w-8 text-[#a67c45] mx-auto" />

                <div className="font-mono text-xs text-[#1d2529] font-semibold truncate max-w-sm mx-auto">
                  {file.name}
                </div>

                <div className="font-mono text-[10px] text-[#7a807f]">
                  {formatBytes(file.size)} · Type: {detectedType} · MIME:{" "}
                  {file.type || "unknown"}
                </div>

                <div className="text-[10px] text-[#8a6437] font-mono">
                  Click or drag another file to replace
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <UploadCloud className="h-8 w-8 text-[#8b918f] mx-auto" />

                <div className="text-xs text-[#4f595d] font-light">
                  <strong className="text-[#8a6437] font-normal">
                    Click to browse
                  </strong>{" "}
                  or drag &amp; drop media asset
                </div>

                <div className="font-mono text-[10px] text-[#8b918f]">
                  Images (up to 15MB) · Videos (up to 250MB) · PDFs &amp; Docs
                  (up to 50MB) · Press Kits (up to 100MB)
                </div>
              </div>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#7a807f] block">
                Asset Title *
              </label>

              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Executive Press Podium & Chamber"
                className="w-full rounded-xs border border-[#c5beb2] bg-[#ebe7de] px-3 py-2 font-sans text-xs text-[#1d2529] placeholder-[#9a9f9d] focus:border-[#a67c45] focus:outline-none"
              />
            </div>

            {/* Media Type Override / Select */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#7a807f] block">
                Classification *
              </label>

              <select
                value={detectedType}
                onChange={(e) =>
                  setDetectedType(e.target.value as MediaType)
                }
                className="w-full rounded-xs border border-[#c5beb2] bg-[#ebe7de] px-3 py-2 font-mono text-xs text-[#1d2529] focus:border-[#a67c45] focus:outline-none"
              >
                <option value="IMAGE">
                  Image Asset (PNG, JPG, WEBP, SVG)
                </option>
                <option value="VIDEO">Video Asset (MP4, WEBM)</option>
                <option value="PDF">PDF Publication / Monograph</option>
                <option value="PRESS_KIT">Press Kit (ZIP Bundle)</option>
                <option value="DOCUMENT">Document (DOCX, PDF, XLS)</option>
              </select>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#7a807f] block">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Corporate Disclosures"
                className="w-full rounded-xs border border-[#c5beb2] bg-[#ebe7de] px-3 py-2 font-sans text-xs text-[#1d2529] placeholder-[#9a9f9d] focus:border-[#a67c45] focus:outline-none"
              />
            </div>

            {/* Alt Text (Required for Images) */}
            <div className="space-y-1.5 sm:col-span-2">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <label className="uppercase tracking-wider text-[#7a807f]">
                  Accessibility Alt Text{" "}
                  {detectedType === "IMAGE" && (
                    <span className="text-[#a67c45]">*</span>
                  )}
                </label>

                <span className="text-[#8b918f]">
                  Screen Readers &amp; SEO
                </span>
              </div>

              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Descriptive explanation of the visual for accessibility compliance..."
                className="w-full rounded-xs border border-[#c5beb2] bg-[#ebe7de] px-3 py-2 font-sans text-xs text-[#1d2529] placeholder-[#9a9f9d] focus:border-[#a67c45] focus:outline-none"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#7a807f] block">
                Tags (Comma-Separated)
              </label>

              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. Press, Governance, 4K, Monograph"
                className="w-full rounded-xs border border-[#c5beb2] bg-[#ebe7de] px-3 py-2 font-sans text-xs text-[#1d2529] placeholder-[#9a9f9d] focus:border-[#a67c45] focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#7a807f] block">
                Description (Optional)
              </label>

              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Institutional context, archival notes, or release scope..."
                className="w-full rounded-xs border border-[#c5beb2] bg-[#ebe7de] px-3 py-2 font-sans text-xs text-[#1d2529] placeholder-[#9a9f9d] focus:border-[#a67c45] focus:outline-none resize-none"
              />
            </div>

            {/* Public Visibility Toggle */}
            <div className="flex items-center gap-2 sm:col-span-2 pt-1">
              <input
                type="checkbox"
                id="is-public"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded-xs border-[#c5beb2] bg-[#ebe7de] text-[#a67c45] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />

              <label
                htmlFor="is-public"
                className="font-mono text-xs text-[#4f595d] cursor-pointer select-none"
              >
                Publish immediately to Public Media Gallery
              </label>
            </div>
          </div>

          {/* Upload Progress Bar if active */}
          {isUploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-[10px] text-[#7a807f]">
                <span>Ingesting into Object Storage...</span>
                <span>{uploadProgress}%</span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-[#d0c9bd] overflow-hidden">
                <div
                  className="h-full bg-[#a67c45] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#d0c9bd]">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#7a807f]">
              <Lock className="h-3 w-3 text-[#a67c45]" />
              <span>SHA-256 Checksum Computed on Ingestion</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-xs border border-[#c5beb2] bg-[#ebe7de] text-[#4f595d] hover:text-[#1d2529]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUploading || !file}
                className="font-mono text-xs uppercase tracking-wider px-5 py-2 rounded-xs bg-[#a67c45] text-[#f3f0e8] font-semibold hover:bg-[#8f693d] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Publish to CDN</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
import { z } from "zod";
import crypto from "crypto";
import {
  MediaType,
  mediaTypeEnum,
  validateMediaFile,
  MediaUploadMetadataInput,
} from "@samvad/validation";

/**
 * Technical Dimensions Schema for Visual Media
 */
export const MediaDimensionsSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  aspectRatio: z.string(), // "16:9", "4:3", "1:1", etc.
});

export interface MediaDimensions {
  width: number;
  height: number;
  aspectRatio: string;
}

/**
 * Unified Media Asset Interface
 */
export interface MediaAssetItem {
  id: string;
  title: string;
  description?: string;
  altText?: string;
  filename: string;
  storageKey: string;
  cdnUrl: string;
  thumbnailUrl: string;
  mediaType: MediaType;
  mimeType: string;
  fileSizeBytes: number;
  formattedSize: string;
  dimensions?: MediaDimensions;
  videoDurationSeconds?: number;
  checksumSha256: string;
  tags: string[];
  category: string;
  isPublic: boolean;
  uploadedBy: string;
  uploadedAt: string; // ISO String
  pressKitContents?: string[];
  downloadUrl: string;
}

/**
 * Unified Media Asset Schema for runtime parsing
 */
export const MediaAssetItemSchema: z.ZodType<MediaAssetItem> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  altText: z.string().optional(),
  filename: z.string(),
  storageKey: z.string(),
  cdnUrl: z.string(),
  thumbnailUrl: z.string(),
  mediaType: mediaTypeEnum,
  mimeType: z.string(),
  fileSizeBytes: z.number().int().positive(),
  formattedSize: z.string(),
  dimensions: MediaDimensionsSchema.optional(),
  videoDurationSeconds: z.number().positive().optional(),
  checksumSha256: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  isPublic: z.boolean(),
  uploadedBy: z.string(),
  uploadedAt: z.string(),
  pressKitContents: z.array(z.string()).optional(),
  downloadUrl: z.string(),
});

/**
 * Magic Bytes signatures for rigorous binary payload validation
 */
const MAGIC_SIGNATURES: Record<string, number[][]> = {
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png": [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  "image/webp": [
    // RIFF....WEBP
    [0x52, 0x49, 0x46, 0x46],
  ],
  "image/gif": [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
  ],
  "application/pdf": [[0x25, 0x50, 0x44, 0x46]], // %PDF
  "application/zip": [
    [0x50, 0x4b, 0x03, 0x04], // PK..
    [0x50, 0x4b, 0x05, 0x06],
  ],
  "video/mp4": [
    // ....ftyp
    [0x66, 0x74, 0x79, 0x70],
  ],
};

/**
 * Format bytes into human-readable metric string
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Sanitize filename to prevent directory traversal and special character injection
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/\.{2,}/g, ".")
    .toLowerCase();
}

/**
 * Verify leading bytes against declared MIME type to reject spoofed extensions
 */
export function verifyMagicBytes(buffer: Uint8Array, mimeType: string): boolean {
  // SVG, plain text, and webm are text-based or containerized with variable offsets
  if (
    mimeType === "image/svg+xml" ||
    mimeType === "text/plain" ||
    mimeType === "video/webm"
  ) {
    return true;
  }

  const signatures = MAGIC_SIGNATURES[mimeType];
  if (!signatures) return true; // allow unknown if mime is in whitelist

  if (mimeType === "video/mp4") {
    // ftyp can appear at offset 4
    if (buffer.length < 8) return false;
    const isFtyp =
      buffer[4] === 0x66 &&
      buffer[5] === 0x74 &&
      buffer[6] === 0x79 &&
      buffer[7] === 0x70;
    return isFtyp;
  }

  return signatures.some((sig) => {
    if (buffer.length < sig.length) return false;
    return sig.every((byte, idx) => buffer[idx] === byte);
  });
}

/**
 * Default CDN Base URL
 */
const CDN_BASE_URL =
  process.env.NEXT_PUBLIC_CDN_URL || "https://cdn.samvad.advisory/media";

/**
 * Master In-Memory & Seeded Media Asset Repository
 * Pre-populated with verified assets across all 5 required types:
 * 1. Images (Editorial 4K)
 * 2. Videos (Broadcast clips)
 * 3. PDFs (Strategic monographs & dossiers)
 * 4. Press Kits (Accredited media bundles)
 * 5. Documents (Statutory governance charters)
 */
export const SEED_MEDIA_ASSETS: MediaAssetItem[] = [
  // 1. IMAGES
  {
    id: "media-img-01",
    title: "Executive Press Podium & Briefing Chamber",
    description:
      "Acoustic timber and glass executive press podium set up in the New Delhi briefing hall with warm directional lighting.",
    altText:
      "Acoustic timber and glass press podium with dual microphones on an illuminated auditorium stage.",
    filename: "samvad_press_podium_4k.jpg",
    storageKey: "media/images/2026/samvad_press_podium_4k.jpg",
    cdnUrl: `${CDN_BASE_URL}/images/corporate-communication/press-podium.jpg`,
    thumbnailUrl: `${CDN_BASE_URL}/images/corporate-communication/press-podium.jpg`,
    mediaType: "IMAGE",
    mimeType: "image/jpeg",
    fileSizeBytes: 2450000,
    formattedSize: "2.3 MB",
    dimensions: { width: 3840, height: 2160, aspectRatio: "16:9" },
    checksumSha256: "7b4c9e8f12a3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
    tags: ["Press Conference", "Briefing Podium", "Corporate Communications", "4K"],
    category: "Corporate Disclosures",
    isPublic: true,
    uploadedBy: "Press Secretary Desk",
    uploadedAt: "2026-09-18T10:30:00Z",
    downloadUrl: "/images/corporate-communication/press-podium.jpg",
  },
  {
    id: "media-img-02",
    title: "Executive Horizon at Blue Hour",
    description:
      "Silhouette of senior corporate leadership overlooking prime commercial skyline at twilight from high-rise suite.",
    altText:
      "Contemplative corporate leader silhouette looking out floor-to-ceiling windows at city skyline at dusk.",
    filename: "leadership_horizon_skyline.jpg",
    storageKey: "media/images/2026/leadership_horizon_skyline.jpg",
    cdnUrl: `${CDN_BASE_URL}/images/leadership/skyline-silhouette.jpg`,
    thumbnailUrl: `${CDN_BASE_URL}/images/leadership/skyline-silhouette.jpg`,
    mediaType: "IMAGE",
    mimeType: "image/jpeg",
    fileSizeBytes: 3120000,
    formattedSize: "3.0 MB",
    dimensions: { width: 3840, height: 2160, aspectRatio: "16:9" },
    checksumSha256: "4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b",
    tags: ["Leadership", "Governance", "Skyline", "Editorial Photography"],
    category: "Leadership & Governance",
    isPublic: true,
    uploadedBy: "Managing Partner Desk",
    uploadedAt: "2026-09-12T14:15:00Z",
    downloadUrl: "/images/leadership/skyline-silhouette.jpg",
  },
  {
    id: "media-img-03",
    title: "Financial Atrium & Capital Flow Gallery",
    description:
      "Multi-story timber and glass atrium gallery inside prime institutional banking center with architectural symmetry.",
    altText:
      "Expansive modern multi-story financial atrium with glass bridges, marble flooring, and natural skylight.",
    filename: "financial_center_atrium.jpg",
    storageKey: "media/images/2026/financial_center_atrium.jpg",
    cdnUrl: `${CDN_BASE_URL}/images/finance/financial-center-atrium.jpg`,
    thumbnailUrl: `${CDN_BASE_URL}/images/finance/financial-center-atrium.jpg`,
    mediaType: "IMAGE",
    mimeType: "image/jpeg",
    fileSizeBytes: 2890000,
    formattedSize: "2.8 MB",
    dimensions: { width: 3840, height: 2160, aspectRatio: "16:9" },
    checksumSha256: "1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e",
    tags: ["Capital Markets", "Financial Services", "Architecture", "Atrium"],
    category: "Institutional Finance",
    isPublic: true,
    uploadedBy: "Communications Directorate",
    uploadedAt: "2026-08-25T09:00:00Z",
    downloadUrl: "/images/finance/financial-center-atrium.jpg",
  },
  {
    id: "media-img-04",
    title: "High-Integrity Datacenter Optical Core",
    description:
      "Symmetrical enterprise tier-4 optical network exchange with status indicator telemetry and reflective access floor.",
    altText:
      "Corridor of dark server racks in an enterprise data center with subtle amber and optical blue illumination.",
    filename: "datacenter_optical_core.jpg",
    storageKey: "media/images/2026/datacenter_optical_core.jpg",
    cdnUrl: `${CDN_BASE_URL}/images/technology/datacenter-optical-core.jpg`,
    thumbnailUrl: `${CDN_BASE_URL}/images/technology/datacenter-optical-core.jpg`,
    mediaType: "IMAGE",
    mimeType: "image/jpeg",
    fileSizeBytes: 4100000,
    formattedSize: "3.9 MB",
    dimensions: { width: 3840, height: 2160, aspectRatio: "16:9" },
    checksumSha256: "9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
    tags: ["Technology", "Datacenter", "Cybersecurity", "Optical Core"],
    category: "Technology & DeepTech",
    isPublic: true,
    uploadedBy: "Intelligence & Telemetry Unit",
    uploadedAt: "2026-08-10T16:45:00Z",
    downloadUrl: "/images/technology/datacenter-optical-core.jpg",
  },

  // 2. VIDEOS
  {
    id: "media-vid-01",
    title: "SAMVAD Perception Architecture: The Documentary Reel",
    description:
      "Cinematic 4K introduction to narrative physics, real-time sentiment mapping, and crisis defense command center operations.",
    altText:
      "Video reel preview displaying dark glass war room screens and strategic deliberation table.",
    filename: "samvad_perception_architecture_4k.mp4",
    storageKey: "media/videos/2026/samvad_perception_architecture_4k.mp4",
    cdnUrl: `${CDN_BASE_URL}/videos/samvad-architecture-reel.mp4`,
    thumbnailUrl: `${CDN_BASE_URL}/images/reputation/crisis-monitoring-center.jpg`,
    mediaType: "VIDEO",
    mimeType: "video/mp4",
    fileSizeBytes: 84200000,
    formattedSize: "80.3 MB",
    dimensions: { width: 3840, height: 2160, aspectRatio: "16:9" },
    videoDurationSeconds: 194.5, // 3 min 14 sec
    checksumSha256: "2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    tags: ["Brand Film", "Documentary", "4K Video", "War Room", "Perception Architecture"],
    category: "Brand & Corporate Films",
    isPublic: true,
    uploadedBy: "Media Production Unit",
    uploadedAt: "2026-09-01T12:00:00Z",
    downloadUrl: "#",
  },
  {
    id: "media-vid-02",
    title: "Algorithmic Disinformation Defense: Keynote Address",
    description:
      "Managing Principal Vikramaditya Sharma keynoting on synthetic search knowledge-graph manipulation at the Indo-Pacific Security Summit.",
    altText:
      "Video snapshot showing keynote address speaker before illuminated presentation display.",
    filename: "keynote_algorithmic_defense_2026.mp4",
    storageKey: "media/videos/2026/keynote_algorithmic_defense_2026.mp4",
    cdnUrl: `${CDN_BASE_URL}/videos/keynote-algorithmic-defense.mp4`,
    thumbnailUrl: `${CDN_BASE_URL}/images/media-interaction/press-briefing-room.jpg`,
    mediaType: "VIDEO",
    mimeType: "video/mp4",
    fileSizeBytes: 145000000,
    formattedSize: "138.3 MB",
    dimensions: { width: 1920, height: 1080, aspectRatio: "16:9" },
    videoDurationSeconds: 780.0, // 13 minutes
    checksumSha256: "8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b",
    tags: ["Keynote", "Disinformation", "Conference Video", "Key Address"],
    category: "Keynotes & Addresses",
    isPublic: true,
    uploadedBy: "Communications Directorate",
    uploadedAt: "2026-07-20T11:30:00Z",
    downloadUrl: "#",
  },

  // 3. PDFS
  {
    id: "media-pdf-01",
    title: "2026 Sovereign Perception Index: Flagship Benchmark Report",
    description:
      "Comprehensive 74-page empirical research survey across 250 global executive boards examining disinformation vectors and algorithmic liabilities.",
    filename: "samvad_sovereign_perception_index_2026.pdf",
    storageKey: "media/pdfs/2026/samvad_sovereign_perception_index_2026.pdf",
    cdnUrl: `${CDN_BASE_URL}/pdfs/sovereign-perception-index-2026.pdf`,
    thumbnailUrl: `${CDN_BASE_URL}/images/case-study-placeholders/confidential-briefing-binder.jpg`,
    mediaType: "PDF",
    mimeType: "application/pdf",
    fileSizeBytes: 18400000,
    formattedSize: "17.5 MB",
    checksumSha256: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    tags: ["Survey Report", "Benchmark Index", "Board Governance", "PDF Publication"],
    category: "Research Monograph",
    isPublic: true,
    uploadedBy: "Research & Policy Group",
    uploadedAt: "2026-08-28T09:00:00Z",
    downloadUrl: "#",
  },
  {
    id: "media-pdf-02",
    title: "Cross-Border M&A Valuation Preservation Framework",
    description:
      "Strategic advisory paper outlining bilateral legislative diplomacy and perception restructuring protocols during foreign investment audits.",
    filename: "samvad_cross_border_ma_framework.pdf",
    storageKey: "media/pdfs/2026/samvad_cross_border_ma_framework.pdf",
    cdnUrl: `${CDN_BASE_URL}/pdfs/cross-border-ma-framework.pdf`,
    thumbnailUrl: `${CDN_BASE_URL}/images/business-meetings/briefing-table.jpg`,
    mediaType: "PDF",
    mimeType: "application/pdf",
    fileSizeBytes: 8900000,
    formattedSize: "8.5 MB",
    checksumSha256: "3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a",
    tags: ["M&A Advisory", "Valuation Defense", "Whitepaper", "Regulatory Clearance"],
    category: "Strategic Whitepaper",
    isPublic: true,
    uploadedBy: "M&A Advisory Practice",
    uploadedAt: "2026-04-12T10:00:00Z",
    downloadUrl: "#",
  },

  // 4. PRESS KITS
  {
    id: "media-pk-01",
    title: "SAMVAD Official Media Kit 2026 (Institutional Package)",
    description:
      "Complete accredited media bundle containing primary vector brand marks, senior partner 4K portrait headshots, firm history monograph, and official boilerplate statement.",
    filename: "samvad_official_media_kit_2026.zip",
    storageKey: "media/press-kits/2026/samvad_official_media_kit_2026.zip",
    cdnUrl: `${CDN_BASE_URL}/press-kits/samvad-media-kit-2026.zip`,
    thumbnailUrl: `${CDN_BASE_URL}/images/case-study-placeholders/confidential-briefing-binder.jpg`,
    mediaType: "PRESS_KIT",
    mimeType: "application/zip",
    fileSizeBytes: 42100000,
    formattedSize: "40.1 MB",
    checksumSha256: "e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1",
    pressKitContents: [
      "SAMVAD Vector Logo Suite (SVG, EPS, PNG in Obsidian, Sand, Gold)",
      "Senior Managing Partners 4K Portraits & Official Biographies",
      "SAMVAD Corporate Fact Sheet (2026 Edition)",
      "Institutional Boilerplate & Attribution Guidelines",
      "Verified PGP Security Key File (ASC)",
    ],
    tags: ["Press Kit", "Brand Assets", "Vector Logos", "Headshots", "Fact Sheet"],
    category: "Accredited Press Assets",
    isPublic: true,
    uploadedBy: "Office of the Press Secretary",
    uploadedAt: "2026-09-01T08:00:00Z",
    downloadUrl: "#",
  },

  // 5. DOCUMENTS
  {
    id: "media-doc-01",
    title: "Chatham House Media Protocol & Non-Attribution Charter",
    description:
      "Formal institutional policy governing background press briefings, off-the-record consultations, and evidentiary non-attribution covenants.",
    filename: "samvad_chatham_house_protocol.docx",
    storageKey: "media/documents/2026/samvad_chatham_house_protocol.docx",
    cdnUrl: `${CDN_BASE_URL}/documents/chatham-house-protocol.docx`,
    thumbnailUrl: `${CDN_BASE_URL}/images/editorial-backgrounds/limestone-monolith-light.jpg`,
    mediaType: "DOCUMENT",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileSizeBytes: 1450000,
    formattedSize: "1.4 MB",
    checksumSha256: "b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
    tags: ["Policy Charter", "Chatham House", "Media Relations", "Compliance"],
    category: "Governance Charters",
    isPublic: true,
    uploadedBy: "Legal & Compliance Directorate",
    uploadedAt: "2026-05-15T15:00:00Z",
    downloadUrl: "#",
  },
  {
    id: "media-doc-02",
    title: "Crisis Defense Command Desk Operational Protocol",
    description:
      "Detailed operational manual for mobilizing 24/7 air-gapped crisis war rooms during regulatory raids or short-seller attacks.",
    filename: "samvad_crisis_warroom_protocol.pdf",
    storageKey: "media/documents/2026/samvad_crisis_warroom_protocol.pdf",
    cdnUrl: `${CDN_BASE_URL}/documents/crisis-warroom-protocol.pdf`,
    thumbnailUrl: `${CDN_BASE_URL}/images/reputation/crisis-monitoring-center.jpg`,
    mediaType: "DOCUMENT",
    mimeType: "application/pdf",
    fileSizeBytes: 3200000,
    formattedSize: "3.1 MB",
    checksumSha256: "f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
    tags: ["War Room", "Crisis Protocol", "Operational Manual", "Emergency Defense"],
    category: "Operational Manuals",
    isPublic: true,
    uploadedBy: "Crisis Defense Practice",
    uploadedAt: "2026-06-30T10:30:00Z",
    downloadUrl: "#",
  },
];

/**
 * Storage Quota Telemetry Summary
 */
export interface StorageQuotaSummary {
  totalCapacityBytes: number;
  totalUsedBytes: number;
  totalAssetsCount: number;
  byType: Record<
    MediaType,
    { count: number; usedBytes: number; formattedSize: string }
  >;
}

/**
 * In-memory state store for runtime uploads, edits, and deletions
 */
let liveAssets: MediaAssetItem[] = [...SEED_MEDIA_ASSETS];

/**
 * Object Storage Service Implementation
 */
export class ObjectStorageService {
  /**
   * List all media assets with optional filtering
   */
  static listAssets(options?: {
    type?: MediaType | "ALL";
    category?: string;
    search?: string;
    tag?: string;
  }): MediaAssetItem[] {
    let result = [...liveAssets];

    if (options?.type && options.type !== "ALL") {
      result = result.filter((a) => a.mediaType === options.type);
    }

    if (options?.category && options.category !== "ALL") {
      result = result.filter((a) => a.category === options.category);
    }

    if (options?.tag) {
      result = result.filter((a) => a.tags.includes(options.tag!));
    }

    if (options?.search && options.search.trim() !== "") {
      const q = options.search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.description && a.description.toLowerCase().includes(q)) ||
          a.filename.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Default sort newest first
    return result.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }

  /**
   * Get single asset by ID
   */
  static getAssetById(id: string): MediaAssetItem | undefined {
    return liveAssets.find((a) => a.id === id);
  }

  /**
   * Upload / Ingest a media asset with strict security validation
   */
  static async uploadAsset(params: {
    fileBuffer: Uint8Array;
    filename: string;
    mimeType: string;
    metadata: MediaUploadMetadataInput;
    dimensions?: MediaDimensions;
    videoDurationSeconds?: number;
    uploadedBy?: string;
  }): Promise<{ success: boolean; asset?: MediaAssetItem; error?: string }> {
    const {
      fileBuffer,
      filename,
      mimeType,
      metadata,
      dimensions,
      videoDurationSeconds,
      uploadedBy = "Admin Console User",
    } = params;

    // 1. Validate MIME type and size limit
    const validation = validateMediaFile(
      mimeType,
      fileBuffer.length,
      metadata.mediaType
    );
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // 2. Binary signature / magic bytes verification
    const isMagicValid = verifyMagicBytes(fileBuffer, mimeType);
    if (!isMagicValid) {
      return {
        success: false,
        error: `Security Alert: File magic byte header mismatch. Declared "${mimeType}" does not correspond to binary file signature. Upload aborted.`,
      };
    }

    // 3. Compute SHA-256 Checksum
    const hash = crypto.createHash("sha256");
    hash.update(fileBuffer);
    const checksumSha256 = hash.digest("hex");

    // 4. Sanitize filename and create storage key
    const safeName = sanitizeFilename(filename);
    const assetId = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const currentYear = new Date().getFullYear();
    const storageKey = `media/${metadata.mediaType.toLowerCase()}s/${currentYear}/${assetId}-${safeName}`;
    const cdnUrl = `${CDN_BASE_URL}/${storageKey}`;

    // 5. Default thumbnail URL
    let thumbnailUrl = cdnUrl;
    if (metadata.mediaType === "IMAGE") {
      thumbnailUrl = cdnUrl;
    } else if (metadata.mediaType === "VIDEO") {
      thumbnailUrl = `${CDN_BASE_URL}/images/reputation/crisis-monitoring-center.jpg`;
    } else if (metadata.mediaType === "PDF") {
      thumbnailUrl = `${CDN_BASE_URL}/images/case-study-placeholders/confidential-briefing-binder.jpg`;
    } else {
      thumbnailUrl = `${CDN_BASE_URL}/images/editorial-backgrounds/limestone-monolith-light.jpg`;
    }

    const newAsset: MediaAssetItem = {
      id: assetId,
      title: metadata.title,
      description: metadata.description || undefined,
      altText: metadata.altText || undefined,
      filename: safeName,
      storageKey,
      cdnUrl,
      thumbnailUrl,
      mediaType: metadata.mediaType,
      mimeType,
      fileSizeBytes: fileBuffer.length,
      formattedSize: formatBytes(fileBuffer.length),
      dimensions: dimensions,
      videoDurationSeconds: videoDurationSeconds,
      checksumSha256,
      tags: metadata.tags || [],
      category: metadata.category || "General Corporate",
      isPublic: metadata.isPublic,
      uploadedBy,
      uploadedAt: new Date().toISOString(),
      downloadUrl: cdnUrl,
    };

    // Prepend to live store
    liveAssets = [newAsset, ...liveAssets];

    return { success: true, asset: newAsset };
  }

  /**
   * Update metadata on an existing asset
   */
  static updateAsset(
    id: string,
    updates: Partial<Pick<MediaAssetItem, "title" | "description" | "altText" | "category" | "tags" | "isPublic">>
  ): MediaAssetItem | undefined {
    const index = liveAssets.findIndex((a) => a.id === id);
    if (index === -1) return undefined;

    const existing = liveAssets[index]!;
    const updated: MediaAssetItem = {
      ...existing,
      ...updates,
      title: updates.title ?? existing.title,
      description: updates.description ?? existing.description,
      altText: updates.altText ?? existing.altText,
      category: updates.category ?? existing.category,
      tags: updates.tags ?? existing.tags,
      isPublic: updates.isPublic ?? existing.isPublic,
    };

    liveAssets[index] = updated;
    return updated;
  }

  /**
   * Delete asset from storage
   */
  static deleteAsset(id: string): boolean {
    const initialLen = liveAssets.length;
    liveAssets = liveAssets.filter((a) => a.id !== id);
    return liveAssets.length < initialLen;
  }

  /**
   * Reset store to seeds (useful in tests)
   */
  static resetToSeeds(): void {
    liveAssets = [...SEED_MEDIA_ASSETS];
  }

  /**
   * Compute comprehensive storage quota telemetry
   */
  static getStorageTelemetry(): StorageQuotaSummary {
    const totalCapacityBytes = 100 * 1024 * 1024 * 1024; // 100 GB institutional cloud quota
    let totalUsedBytes = 0;

    const byType: Record<
      MediaType,
      { count: number; usedBytes: number; formattedSize: string }
    > = {
      IMAGE: { count: 0, usedBytes: 0, formattedSize: "0 MB" },
      VIDEO: { count: 0, usedBytes: 0, formattedSize: "0 MB" },
      PDF: { count: 0, usedBytes: 0, formattedSize: "0 MB" },
      PRESS_KIT: { count: 0, usedBytes: 0, formattedSize: "0 MB" },
      DOCUMENT: { count: 0, usedBytes: 0, formattedSize: "0 MB" },
    };

    liveAssets.forEach((asset) => {
      totalUsedBytes += asset.fileSizeBytes;
      const typeBucket = byType[asset.mediaType];
      if (typeBucket) {
        typeBucket.count += 1;
        typeBucket.usedBytes += asset.fileSizeBytes;
      }
    });

    (Object.keys(byType) as MediaType[]).forEach((type) => {
      const bucket = byType[type];
      if (bucket) {
        bucket.formattedSize = formatBytes(bucket.usedBytes);
      }
    });

    return {
      totalCapacityBytes,
      totalUsedBytes,
      totalAssetsCount: liveAssets.length,
      byType,
    };
  }
}

import { describe, it, expect, beforeEach } from "vitest";
import {
  validateMediaFile,
  MEDIA_SIZE_LIMITS,
  ALLOWED_MIME_TYPES,
  MediaType,
  mediaUploadMetadataSchema,
} from "@samvad/validation";
import {
  ObjectStorageService,
  SEED_MEDIA_ASSETS,
  MediaAssetItemSchema,
  verifyMagicBytes,
  sanitizeFilename,
  formatBytes,
} from "../../apps/web/lib/media/storage-service";

describe("SAMVAD Media Library & Object Storage Architecture", () => {
  const requiredTypes: MediaType[] = [
    "IMAGE",
    "VIDEO",
    "PDF",
    "PRESS_KIT",
    "DOCUMENT",
  ];

  beforeEach(() => {
    ObjectStorageService.resetToSeeds();
  });

  describe("1. MIME Type & Size Limits Validation (Client & Server Gateway)", () => {
    it("should cover all 5 required media types in configuration", () => {
      requiredTypes.forEach((type) => {
        expect(ALLOWED_MIME_TYPES[type]).toBeDefined();
        expect(ALLOWED_MIME_TYPES[type].length).toBeGreaterThan(0);
        expect(MEDIA_SIZE_LIMITS[type]).toBeGreaterThan(0);
      });
    });

    it("should accept valid file MIME and size for each of the 5 media types", () => {
      // 1. IMAGE: 5MB JPEG
      const imageResult = validateMediaFile("image/jpeg", 5 * 1024 * 1024, "IMAGE");
      expect(imageResult.valid).toBe(true);
      expect(imageResult.detectedType).toBe("IMAGE");

      // 2. VIDEO: 100MB MP4
      const videoResult = validateMediaFile("video/mp4", 100 * 1024 * 1024, "VIDEO");
      expect(videoResult.valid).toBe(true);
      expect(videoResult.detectedType).toBe("VIDEO");

      // 3. PDF: 20MB PDF
      const pdfResult = validateMediaFile("application/pdf", 20 * 1024 * 1024, "PDF");
      expect(pdfResult.valid).toBe(true);
      expect(pdfResult.detectedType).toBe("PDF");

      // 4. PRESS_KIT: 40MB ZIP
      const kitResult = validateMediaFile("application/zip", 40 * 1024 * 1024, "PRESS_KIT");
      expect(kitResult.valid).toBe(true);
      expect(kitResult.detectedType).toBe("PRESS_KIT");

      // 5. DOCUMENT: 10MB Word DOCX
      const docResult = validateMediaFile(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        10 * 1024 * 1024,
        "DOCUMENT"
      );
      expect(docResult.valid).toBe(true);
      expect(docResult.detectedType).toBe("DOCUMENT");
    });

    it("should reject uploads exceeding strict size thresholds for each type", () => {
      // IMAGE max: 15MB -> 16MB should fail
      const imgOver = validateMediaFile("image/png", 16 * 1024 * 1024, "IMAGE");
      expect(imgOver.valid).toBe(false);
      expect(imgOver.error).toContain("exceeds maximum permitted limit");

      // VIDEO max: 250MB -> 260MB should fail
      const videoOver = validateMediaFile("video/mp4", 260 * 1024 * 1024, "VIDEO");
      expect(videoOver.valid).toBe(false);
      expect(videoOver.error).toContain("exceeds maximum permitted limit");

      // PDF max: 50MB -> 55MB should fail
      const pdfOver = validateMediaFile("application/pdf", 55 * 1024 * 1024, "PDF");
      expect(pdfOver.valid).toBe(false);
      expect(pdfOver.error).toContain("exceeds maximum permitted limit");

      // PRESS_KIT max: 100MB -> 105MB should fail
      const kitOver = validateMediaFile("application/zip", 105 * 1024 * 1024, "PRESS_KIT");
      expect(kitOver.valid).toBe(false);
      expect(kitOver.error).toContain("exceeds maximum permitted limit");

      // DOCUMENT max: 50MB -> 52MB should fail
      const docOver = validateMediaFile("text/plain", 52 * 1024 * 1024, "DOCUMENT");
      expect(docOver.valid).toBe(false);
      expect(docOver.error).toContain("exceeds maximum permitted limit");
    });

    it("should reject unpermitted or dangerous executable MIME types", () => {
      const dangerousMimes = [
        "application/x-msdownload",
        "application/x-sh",
        "application/javascript",
        "text/html",
        "application/octet-stream",
      ];

      dangerousMimes.forEach((mime) => {
        const result = validateMediaFile(mime, 1024);
        expect(result.valid).toBe(false);
        expect(result.error).toContain("Unsupported MIME type");
      });
    });

    it("should reject type mismatch between declared mediaType and MIME type", () => {
      // Trying to upload video/mp4 as an IMAGE asset
      const mismatch = validateMediaFile("video/mp4", 1024 * 1024, "IMAGE");
      expect(mismatch.valid).toBe(false);
      expect(mismatch.error).toContain("Invalid file format for IMAGE");
    });
  });

  describe("2. Security: Binary Magic Bytes Inspection & Path Sanitization", () => {
    it("should accept valid binary headers for JPEG, PNG, PDF, ZIP, and MP4", () => {
      // JPEG: FF D8 FF
      const jpegHeader = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
      expect(verifyMagicBytes(jpegHeader, "image/jpeg")).toBe(true);

      // PNG: 89 50 4E 47 0D 0A 1A 0A
      const pngHeader = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      expect(verifyMagicBytes(pngHeader, "image/png")).toBe(true);

      // PDF: %PDF (25 50 44 46)
      const pdfHeader = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]);
      expect(verifyMagicBytes(pdfHeader, "application/pdf")).toBe(true);

      // ZIP: PK\x03\x04 (50 4B 03 04)
      const zipHeader = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00]);
      expect(verifyMagicBytes(zipHeader, "application/zip")).toBe(true);

      // MP4: offset 4 ftyp (66 74 79 70)
      const mp4Header = new Uint8Array([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]);
      expect(verifyMagicBytes(mp4Header, "video/mp4")).toBe(true);
    });

    it("should reject forged or spoofed extensions when binary magic bytes do not match", () => {
      // File has extension .jpg, but body is pure text / fake binary
      const fakeJpeg = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]); // actually GIF
      expect(verifyMagicBytes(fakeJpeg, "image/jpeg")).toBe(false);

      // Fake PNG (starts with random characters)
      const fakePng = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
      expect(verifyMagicBytes(fakePng, "image/png")).toBe(false);

      // Fake PDF
      const fakePdf = new Uint8Array([0x00, 0x00, 0x00, 0x00]);
      expect(verifyMagicBytes(fakePdf, "application/pdf")).toBe(false);
    });

    it("should sanitize filenames to prevent path traversal and shell injection", () => {
      expect(sanitizeFilename("../../../etc/passwd.jpg")).toBe("._._._etc_passwd.jpg");
      expect(sanitizeFilename("Briefing Document (Confidential) #1!.pdf")).toBe(
        "briefing_document__confidential___1_.pdf"
      );
      expect(sanitizeFilename("..\\..\\malicious.png")).toBe("._._malicious.png");
    });

    it("should format bytes into institutional metric representations", () => {
      expect(formatBytes(0)).toBe("0 Bytes");
      expect(formatBytes(1024)).toBe("1 KB");
      expect(formatBytes(2.5 * 1024 * 1024)).toBe("2.5 MB");
      expect(formatBytes(1.2 * 1024 * 1024 * 1024)).toBe("1.2 GB");
    });
  });

  describe("3. ObjectStorageService Engine & CRUD Operations", () => {
    it("should list all pre-seeded assets and provide search/filtering", () => {
      const all = ObjectStorageService.listAssets();
      expect(all.length).toBe(SEED_MEDIA_ASSETS.length);

      // Filter by type: IMAGE
      const imagesOnly = ObjectStorageService.listAssets({ type: "IMAGE" });
      expect(imagesOnly.every((a) => a.mediaType === "IMAGE")).toBe(true);

      // Filter by type: PDF
      const pdfsOnly = ObjectStorageService.listAssets({ type: "PDF" });
      expect(pdfsOnly.every((a) => a.mediaType === "PDF")).toBe(true);

      // Search query
      const searchResult = ObjectStorageService.listAssets({ search: "Podium" });
      expect(searchResult.length).toBeGreaterThan(0);
      expect(searchResult[0]?.title).toContain("Podium");
    });

    it("should retrieve single asset by ID", () => {
      const first = SEED_MEDIA_ASSETS[0]!;
      const found = ObjectStorageService.getAssetById(first.id);
      expect(found).toBeDefined();
      expect(found?.title).toBe(first.title);
      expect(found?.checksumSha256).toBe(first.checksumSha256);

      const notFound = ObjectStorageService.getAssetById("non-existent-id");
      expect(notFound).toBeUndefined();
    });

    it("should successfully upload a valid asset with SHA-256 calculation and storage key", async () => {
      // Create valid JPEG buffer (starts with FF D8 FF)
      const validJpegBuffer = new Uint8Array([
        0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
      ]);

      const uploadResult = await ObjectStorageService.uploadAsset({
        fileBuffer: validJpegBuffer,
        filename: "executive_summit_2026.jpg",
        mimeType: "image/jpeg",
        metadata: {
          title: "Executive Summit Plenary Hall",
          description: "High resolution capture of plenary proceedings.",
          altText: "Plenary hall illuminated in warm gold lighting.",
          mediaType: "IMAGE",
          category: "Summits & Briefings",
          tags: ["Summit", "Executive", "2026"],
          isPublic: true,
        },
        dimensions: { width: 3840, height: 2160, aspectRatio: "16:9" },
        uploadedBy: "Senior Communications Director",
      });

      expect(uploadResult.success).toBe(true);
      expect(uploadResult.asset).toBeDefined();

      const created = uploadResult.asset!;
      expect(created.title).toBe("Executive Summit Plenary Hall");
      expect(created.mediaType).toBe("IMAGE");
      expect(created.checksumSha256.length).toBe(64); // 64-char SHA256 hex string
      expect(created.storageKey).toMatch(/^media\/images\/\d{4}\//);
      expect(created.cdnUrl).toContain("cdn.samvad.advisory");
      expect(created.dimensions?.width).toBe(3840);

      // Verify asset exists in list
      const retrieved = ObjectStorageService.getAssetById(created.id);
      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(created.id);
    });

    it("should reject upload when magic bytes do not match declared MIME", async () => {
      // Fake PNG buffer (incorrect header)
      const corruptedPng = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04]);

      const uploadResult = await ObjectStorageService.uploadAsset({
        fileBuffer: corruptedPng,
        filename: "corrupted.png",
        mimeType: "image/png",
        metadata: {
          title: "Corrupted Asset Test",
          mediaType: "IMAGE",
          tags: ["test"],
          isPublic: true,
        },
      });

      expect(uploadResult.success).toBe(false);
      expect(uploadResult.error).toContain("Security Alert");
      expect(uploadResult.error).toContain("header mismatch");
    });

    it("should update asset metadata", () => {
      const target = SEED_MEDIA_ASSETS[0]!;
      const updated = ObjectStorageService.updateAsset(target.id, {
        title: "Revised Title for Testing",
        altText: "Updated accessibility alt text",
        isPublic: false,
      });

      expect(updated).toBeDefined();
      expect(updated?.title).toBe("Revised Title for Testing");
      expect(updated?.altText).toBe("Updated accessibility alt text");
      expect(updated?.isPublic).toBe(false);

      // Check that non-existent returns undefined
      const failed = ObjectStorageService.updateAsset("non-existent-id", {
        title: "Should Fail",
      });
      expect(failed).toBeUndefined();
    });

    it("should delete an asset by ID", () => {
      const target = SEED_MEDIA_ASSETS[SEED_MEDIA_ASSETS.length - 1]!;
      const beforeCount = ObjectStorageService.listAssets().length;

      const deleted = ObjectStorageService.deleteAsset(target.id);
      expect(deleted).toBe(true);

      const afterCount = ObjectStorageService.listAssets().length;
      expect(afterCount).toBe(beforeCount - 1);

      expect(ObjectStorageService.getAssetById(target.id)).toBeUndefined();
    });

    it("should calculate accurate storage quota telemetry across all media categories", () => {
      const telemetry = ObjectStorageService.getStorageTelemetry();

      expect(telemetry.totalCapacityBytes).toBe(100 * 1024 * 1024 * 1024);
      expect(telemetry.totalUsedBytes).toBeGreaterThan(0);
      expect(telemetry.totalAssetsCount).toBe(SEED_MEDIA_ASSETS.length);

      // Verify every category has breakdown
      requiredTypes.forEach((type) => {
        expect(telemetry.byType[type]).toBeDefined();
        expect(telemetry.byType[type].count).toBeGreaterThanOrEqual(1);
        expect(telemetry.byType[type].usedBytes).toBeGreaterThan(0);
        expect(telemetry.byType[type].formattedSize).toBeTruthy();
      });
    });
  });

  describe("4. Seed Data Integrity & Schema Validation", () => {
    it("should strictly validate all seed assets against MediaAssetItemSchema", () => {
      SEED_MEDIA_ASSETS.forEach((asset) => {
        const parseResult = MediaAssetItemSchema.safeParse(asset);
        expect(parseResult.success).toBe(true);
      });
    });

    it("should contain representative assets for all 5 media categories", () => {
      const presentTypes = new Set(SEED_MEDIA_ASSETS.map((a) => a.mediaType));
      expect(presentTypes.has("IMAGE")).toBe(true);
      expect(presentTypes.has("VIDEO")).toBe(true);
      expect(presentTypes.has("PDF")).toBe(true);
      expect(presentTypes.has("PRESS_KIT")).toBe(true);
      expect(presentTypes.has("DOCUMENT")).toBe(true);
    });

    it("should mandate descriptive alt text for all image assets for WCAG AAA accessibility", () => {
      const images = SEED_MEDIA_ASSETS.filter((a) => a.mediaType === "IMAGE");
      expect(images.length).toBeGreaterThanOrEqual(3);

      images.forEach((img) => {
        expect(img.altText).toBeDefined();
        expect(img.altText?.length).toBeGreaterThan(15);
      });
    });

    it("should guarantee valid SHA-256 checksums and CDN URLs for all assets", () => {
      SEED_MEDIA_ASSETS.forEach((asset) => {
        expect(asset.checksumSha256).toMatch(/^[a-f0-9]{64}$/);
        expect(asset.cdnUrl).toMatch(/^https?:\/\//);
        expect(asset.downloadUrl).toBeTruthy();
        expect(asset.fileSizeBytes).toBeGreaterThan(0);
      });
    });

    it("should validate media upload metadata form schema", () => {
      const validMetadata = {
        title: "Annual Governance Report 2026",
        description: "Official statutory report and audited disclosures.",
        altText: "Cover of the annual report featuring gold typography.",
        mediaType: "PDF" as const,
        category: "Financial Disclosures",
        tags: ["Annual Report", "Governance", "2026"],
        isPublic: true,
      };

      const result = mediaUploadMetadataSchema.safeParse(validMetadata);
      expect(result.success).toBe(true);

      // Title too short (< 2 chars)
      const invalidShort = mediaUploadMetadataSchema.safeParse({
        ...validMetadata,
        title: "A",
      });
      expect(invalidShort.success).toBe(false);
    });
  });
});

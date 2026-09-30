import { NextRequest, NextResponse } from "next/server";
import {
  ObjectStorageService,
} from "@/lib/media/storage-service";
import {
  mediaUploadMetadataSchema,
  validateMediaFile,
  MediaType,
} from "@samvad/validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") || "ALL") as MediaType | "ALL";
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const tag = searchParams.get("tag") || undefined;

    const assets = ObjectStorageService.listAssets({
      type,
      category,
      search,
      tag,
    });

    const telemetry = ObjectStorageService.getStorageTelemetry();

    return NextResponse.json({
      success: true,
      total: assets.length,
      assets,
      telemetry,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to retrieve media library assets.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // 1. JSON Payload (pre-signed upload or direct registration)
    if (contentType.includes("application/json")) {
      const body = await request.json();

      // Validate metadata
      const parsedMeta = mediaUploadMetadataSchema.safeParse(body);
      if (!parsedMeta.success) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed for media asset metadata.",
            details: parsedMeta.error.flatten(),
          },
          { status: 400 }
        );
      }

      // Check file size and mime
      const mimeType = body.mimeType || "application/octet-stream";
      const sizeBytes = Number(body.fileSizeBytes) || 1024;

      const fileValidation = validateMediaFile(
        mimeType,
        sizeBytes,
        parsedMeta.data.mediaType
      );
      if (!fileValidation.valid) {
        return NextResponse.json(
          { success: false, error: fileValidation.error },
          { status: 413 }
        );
      }

      // Create synthetic binary buffer for registration if raw bytes not sent
      const buffer = new Uint8Array(
        body.fileBase64
          ? Buffer.from(body.fileBase64, "base64")
          : [0xff, 0xd8, 0xff, 0xe0] // Default header
      );

      const uploadResult = await ObjectStorageService.uploadAsset({
        fileBuffer: buffer,
        filename: body.filename || `asset_${Date.now()}.bin`,
        mimeType,
        metadata: parsedMeta.data,
        dimensions: body.dimensions,
        videoDurationSeconds: body.videoDurationSeconds,
        uploadedBy: body.uploadedBy || "Institutional Administrator",
      });

      if (!uploadResult.success) {
        return NextResponse.json(
          { success: false, error: uploadResult.error },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: true, asset: uploadResult.asset },
        { status: 201 }
      );
    }

    // 2. Multipart Form-Data Upload
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No file payload detected in form data." },
          { status: 400 }
        );
      }

      const mediaType = (formData.get("mediaType") || "IMAGE") as MediaType;
      const title = (formData.get("title") || file.name) as string;
      const description = (formData.get("description") || "") as string;
      const altText = (formData.get("altText") || "") as string;
      const category = (formData.get("category") || "General") as string;
      const tagsRaw = formData.get("tags");
      const tags = tagsRaw
        ? typeof tagsRaw === "string"
          ? tagsRaw.split(",").map((t) => t.trim())
          : []
        : [];

      // Validate
      const metadataInput = {
        title,
        description,
        altText,
        mediaType,
        category,
        tags,
        isPublic: true,
      };

      const parsedMeta = mediaUploadMetadataSchema.safeParse(metadataInput);
      if (!parsedMeta.success) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid upload metadata.",
            details: parsedMeta.error.flatten(),
          },
          { status: 400 }
        );
      }

      const fileBuffer = new Uint8Array(await file.arrayBuffer());

      const uploadResult = await ObjectStorageService.uploadAsset({
        fileBuffer,
        filename: file.name,
        mimeType: file.type || "application/octet-stream",
        metadata: parsedMeta.data,
        uploadedBy: "Media Console Admin",
      });

      if (!uploadResult.success) {
        return NextResponse.json(
          { success: false, error: uploadResult.error },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: true, asset: uploadResult.asset },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Unsupported Content-Type header." },
      { status: 415 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Media upload encountered an unexpected failure.",
      },
      { status: 500 }
    );
  }
}

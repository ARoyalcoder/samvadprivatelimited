import { NextRequest, NextResponse } from "next/server";
import { ObjectStorageService } from "@/lib/media/storage-service";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const asset = ObjectStorageService.getAssetById(id);

    if (!asset) {
      return NextResponse.json(
        { success: false, error: `Media asset "${id}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, asset });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to retrieve media asset.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = ObjectStorageService.updateAsset(id, {
      title: body.title,
      description: body.description,
      altText: body.altText,
      category: body.category,
      tags: body.tags,
      isPublic: body.isPublic,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Media asset "${id}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, asset: updated });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update media asset.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = ObjectStorageService.deleteAsset(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `Media asset "${id}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Asset "${id}" successfully removed from object storage and registry.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete media asset.",
      },
      { status: 500 }
    );
  }
}

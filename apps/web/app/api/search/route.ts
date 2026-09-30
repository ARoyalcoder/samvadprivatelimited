import { NextRequest, NextResponse } from "next/server";
import { searchQuerySchema } from "@samvad/validation";
import { searchEngine } from "@/lib/search/search-service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Check if query is specifically asking for suggestions only
    const suggestOnly = searchParams.get("suggest") === "true";
    const rawQuery = searchParams.get("q") ?? "";

    if (suggestOnly) {
      const suggestions = await searchEngine.getSuggestions(rawQuery);
      return NextResponse.json({
        query: rawQuery,
        suggestions,
      });
    }

    const parseResult = searchQuerySchema.safeParse({
      q: rawQuery,
      type: searchParams.get("type") ?? "ALL",
      page: searchParams.get("page") ?? 1,
      limit: searchParams.get("limit") ?? 10,
    });

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid search query parameters",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { q, type, page, limit } = parseResult.data;

    const payload = await searchEngine.search({
      query: q,
      domain: type,
      page,
      limit,
    });

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("[Search API Error]:", error);
    return NextResponse.json(
      {
        error: "Failed to execute global website search",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

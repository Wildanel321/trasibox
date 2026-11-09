import { NextResponse } from "next/server";
import { getTopAnime, getSeasonalAnime, searchAnimeJikan } from "@/lib/jikan";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "top";
    const q = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    if (q && q.trim().length > 0) {
      const results = await searchAnimeJikan(q.trim(), page, limit);
      return NextResponse.json({
        success: true,
        source: "jikan-api-v4",
        category: "search",
        query: q,
        count: results.length,
        data: results,
      });
    }

    if (category === "seasonal") {
      const results = await getSeasonalAnime(page, limit);
      return NextResponse.json({
        success: true,
        source: "jikan-api-v4",
        category: "seasonal",
        count: results.length,
        data: results,
      });
    }

    // Default top / popular
    const results = await getTopAnime(page, limit);
    return NextResponse.json({
      success: true,
      source: "jikan-api-v4",
      category: "top",
      count: results.length,
      data: results,
    });
  } catch (error: any) {
    console.error("API /api/v1/anime error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch anime data",
      },
      { status: 500 }
    );
  }
}

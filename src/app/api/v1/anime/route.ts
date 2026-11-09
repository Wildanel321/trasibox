import { NextResponse } from "next/server";
import { getTopAnime, getSeasonalAnime, searchAnimeJikan } from "@/lib/jikan";
import { searchConsumetAnime } from "@/lib/consumet";
import { AnimeItem } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "top";
    const q = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "24", 10);

    if (q && q.trim().length > 0) {
      let results: AnimeItem[] = await searchAnimeJikan(q.trim(), page, limit);

      // Consumet Scraper fallback if Jikan/AniList returns 0
      if (results.length === 0) {
        try {
          const consumetResults = await searchConsumetAnime(q.trim());
          if (consumetResults.length > 0) {
            results = consumetResults.map((c, idx) => ({
              id: c.id,
              malId: 99000 + idx,
              consumetId: c.id,
              title: c.title,
              englishTitle: c.title,
              synopsis: "Anime dari katalog streaming Consumet Engine. Siap ditonton dalam resolusi Full HD.",
              episodesCount: null,
              score: 8.5,
              status: "Available",
              year: c.releaseDate ? parseInt(c.releaseDate, 10) : 2024,
              posterUrl: c.image || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
              backdropUrl: c.image || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=80",
              genres: ["Anime", "Streaming"],
              studios: ["Consumet Studio"],
              type: "TV",
            }));
          }
        } catch (consumetErr) {
          console.warn("Consumet search fallback error:", consumetErr);
        }
      }

      return NextResponse.json({
        success: true,
        source: results.length > 0 ? "hybrid-anime-engine" : "empty",
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
        source: "hybrid-anime-engine",
        category: "seasonal",
        count: results.length,
        data: results,
      });
    }

    // Default top / popular
    const results = await getTopAnime(page, limit);
    return NextResponse.json({
      success: true,
      source: "hybrid-anime-engine",
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

import { NextResponse } from "next/server";
import { getAnimeById } from "@/lib/jikan";
import { getConsumetAnimeInfo, matchConsumetAnimeId } from "@/lib/consumet";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const anime = await getAnimeById(id);

    if (!anime) {
      return NextResponse.json(
        { success: false, error: "Anime tidak ditemukan" },
        { status: 404 }
      );
    }

    // Attempt to match with Consumet episodes for streaming playback
    let consumetInfo = null;
    try {
      const consumetId =
        anime.consumetId ||
        (await matchConsumetAnimeId(anime.title, anime.englishTitle));
      consumetInfo = await getConsumetAnimeInfo(consumetId);

      if (consumetInfo?.episodes && consumetInfo.episodes.length > 0) {
        anime.consumetId = consumetInfo.id;
        anime.episodes = consumetInfo.episodes.map((ep) => ({
          id: ep.id,
          episodeNumber: ep.number,
          title: `Episode ${ep.number}`,
          url: ep.url,
        }));
      }
    } catch {
      // Keep existing episodes from Jikan / fallback
    }

    return NextResponse.json({
      success: true,
      source: "jikan-and-consumet",
      data: anime,
      consumetInfo: consumetInfo
        ? {
            id: consumetInfo.id,
            totalEpisodes: consumetInfo.totalEpisodes,
          }
        : null,
    });
  } catch (error: any) {
    console.error("API /api/v1/anime/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch anime details",
      },
      { status: 500 }
    );
  }
}

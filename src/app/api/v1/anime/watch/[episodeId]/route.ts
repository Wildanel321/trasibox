import { NextResponse } from "next/server";
import { getConsumetEpisodeStream } from "@/lib/consumet";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ episodeId: string }> }
) {
  try {
    const { episodeId } = await params;
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider") || "gogoanime";
    const server = searchParams.get("server") || undefined;

    const streamData = await getConsumetEpisodeStream(episodeId, provider, server);

    return NextResponse.json({
      success: true,
      source: "consumet-stream-extractor",
      episodeId,
      provider,
      data: streamData,
    });
  } catch (error: any) {
    console.error("API /api/v1/anime/watch/[episodeId] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to extract anime stream",
      },
      { status: 500 }
    );
  }
}

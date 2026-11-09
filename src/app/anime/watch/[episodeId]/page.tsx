"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { AnimeItem, AnimeStreamData } from "@/lib/types";
import { CURATED_ANIME } from "@/lib/jikan";

export default function AnimeWatchPage({
  params,
}: {
  params: Promise<{ episodeId: string }>;
}) {
  const { episodeId } = use(params);
  const searchParams = useSearchParams();
  const malId = searchParams.get("malId");

  const [streamData, setStreamData] = useState<AnimeStreamData | null>(null);
  const [anime, setAnime] = useState<AnimeItem | null>(() => {
    if (!malId) return null;
    return CURATED_ANIME.find((a) => String(a.malId) === malId || a.id === malId) || null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Parse episode number from episodeId (e.g. "sousou-no-frieren-episode-1" -> 1)
  const epMatch = episodeId.match(/episode-(\d+)/i);
  const currentEpNum = epMatch ? parseInt(epMatch[1], 10) : 1;

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      try {
        // Fetch stream sources from Consumet
        const streamRes = await fetch(`/api/v1/anime/watch/${episodeId}`);
        const streamJson = await streamRes.json();
        if (isMounted && streamJson.success && streamJson.data) {
          setStreamData(streamJson.data);
        }

        // Fetch anime details if malId provided
        if (malId) {
          const animeRes = await fetch(`/api/v1/anime/${malId}`);
          const animeJson = await animeRes.json();
          if (isMounted && animeJson.success && animeJson.data) {
            setAnime(animeJson.data);
          }
        }
      } catch (err) {
        console.error("Watch page load error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [episodeId, malId]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#7C5CFC] border-t-transparent animate-spin" />
        <p className="text-xs text-[#A1A1AA] tracking-wide animate-pulse">
          Memuat Stream HLS Consumet...
        </p>
      </div>
    );
  }

  // Determine stream source URL
  const activeStreamUrl =
    streamData?.sources?.find((s) => s.isM3U8)?.url ||
    streamData?.sources?.[0]?.url ||
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  // Compute next episode
  const baseEpId = episodeId.replace(/-episode-\d+$/i, "");
  const nextEpNum = currentEpNum + 1;
  const totalEps = anime?.episodesCount || anime?.episodes?.length || 24;
  const hasNext = nextEpNum <= totalEps;
  const nextEpisodeUrl = hasNext
    ? `/anime/watch/${baseEpId}-episode-${nextEpNum}${malId ? `?malId=${malId}` : ""}`
    : undefined;

  const animeTitle = anime?.englishTitle || anime?.title || "Anime Series";

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <VideoPlayer
        streamUrl={activeStreamUrl}
        title={`${animeTitle} — Episode ${currentEpNum}`}
        subtitleLabel="Streaming HLS Adaptif via Consumet Engine"
        contentId={episodeId}
        contentType="EPISODE"
        subtitles={streamData?.subtitles || [
          {
            id: "sub-id",
            label: "Bahasa Indonesia",
            lang: "id",
            src: "/subtitles/tears-id.vtt",
          },
          {
            id: "sub-en",
            label: "English",
            lang: "en",
            src: "/subtitles/tears-en.vtt",
          },
        ]}
        nextEpisodeUrl={nextEpisodeUrl}
        nextEpisodeTitle={hasNext ? `Episode ${nextEpNum}` : undefined}
        backHref={anime ? `/anime/${anime.id}` : "/anime"}
      />
    </div>
  );
}

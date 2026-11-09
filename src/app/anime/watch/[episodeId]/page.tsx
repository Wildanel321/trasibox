"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, SkipForward, Server, Sparkles, Tv, RefreshCw } from "lucide-react";
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
  const malIdParam = searchParams.get("malId");

  const [streamData, setStreamData] = useState<AnimeStreamData | null>(null);
  const [anime, setAnime] = useState<AnimeItem | null>(() => {
    if (!malIdParam) return null;
    return (
      CURATED_ANIME.find(
        (a) => String(a.malId) === malIdParam || a.id === malIdParam
      ) || null
    );
  });
  const [activeServer, setActiveServer] = useState<"server-1" | "server-2" | "server-hls">("server-1");
  const [isLoading, setIsLoading] = useState(true);

  // Parse episode number from episodeId (e.g. "sousou-no-frieren-episode-1" -> 1)
  const epMatch = episodeId.match(/episode-(\d+)/i);
  const currentEpNum = epMatch ? parseInt(epMatch[1], 10) : 1;

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      try {
        // 1. Fetch anime details
        const queryId = malIdParam || episodeId.replace(/-episode-\d+$/i, "");
        const animeRes = await fetch(`/api/v1/anime/${queryId}`);
        const animeJson = await animeRes.json();
        if (isMounted && animeJson.success && animeJson.data) {
          setAnime(animeJson.data);
        }

        // 2. Fetch Consumet stream sources for HLS mode
        const streamRes = await fetch(`/api/v1/anime/watch/${episodeId}`);
        const streamJson = await streamRes.json();
        if (isMounted && streamJson.success && streamJson.data) {
          setStreamData(streamJson.data);
        }
      } catch (err) {
        console.error("Anime watch load error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [episodeId, malIdParam]);

  // Save watch progress to localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_history") || "{}");
      stored[episodeId] = {
        contentId: episodeId,
        contentType: "EPISODE",
        progressSeconds: 120,
        durationSeconds: 1440,
        completed: false,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("trasibox_history", JSON.stringify(stored));
    } catch {}
  }, [episodeId]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#7C5CFC] border-t-transparent animate-spin" />
        <p className="text-xs text-[#A1A1AA] tracking-wide animate-pulse">
          Menghubungkan ke Server Anime...
        </p>
      </div>
    );
  }

  const effectiveMalId = anime?.malId || malIdParam || "52991";
  const animeTitle = anime?.englishTitle || anime?.title || "Anime Series";

  // Navigation to next episode
  const baseEpId = episodeId.replace(/-episode-\d+$/i, "");
  const nextEpNum = currentEpNum + 1;
  const totalEps = anime?.episodesCount || anime?.episodes?.length || 24;
  const hasNext = nextEpNum <= totalEps;
  const nextEpisodeUrl = hasNext
    ? `/anime/watch/${baseEpId}-episode-${nextEpNum}?malId=${effectiveMalId}`
    : undefined;

  // Real anime streaming URLs
  const server1Url = `https://justplay.boo/embed/?mal=${effectiveMalId}&ep=${currentEpNum}&lang=sub&accent=7c5cfc`;
  const server2Url = `https://www.animeembed.com/embed/ani/${anime?.id || effectiveMalId}/${currentEpNum}?track=sub`;

  const activeStreamUrl =
    streamData?.sources?.find((s) => s.isM3U8)?.url ||
    streamData?.sources?.[0]?.url ||
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Top Controls Header Bar */}
      <div className="h-14 sm:h-16 bg-[#09090B]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href={anime ? `/anime/${anime.id}` : "/anime"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>

          <div className="flex flex-col">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {animeTitle}
            </h1>
            <span className="text-[10px] text-[#A78BFA] font-medium">
              Episode {currentEpNum}
            </span>
          </div>
        </div>

        {/* Server Switcher */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-[11px] text-zinc-400 mr-2">
            <Server className="w-3.5 h-3.5 text-[#7C5CFC]" />
            <span>Pilih Server:</span>
          </div>

          <button
            onClick={() => setActiveServer("server-1")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
              activeServer === "server-1"
                ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/30"
                : "bg-[#18181B] text-zinc-400 hover:text-white"
            }`}
          >
            Server 1 (HD)
          </button>

          <button
            onClick={() => setActiveServer("server-2")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
              activeServer === "server-2"
                ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/30"
                : "bg-[#18181B] text-zinc-400 hover:text-white"
            }`}
          >
            Server 2 (Mirror)
          </button>

          <button
            onClick={() => setActiveServer("server-hls")}
            className={`hidden sm:inline-flex px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
              activeServer === "server-hls"
                ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/30"
                : "bg-[#18181B] text-zinc-400 hover:text-white"
            }`}
          >
            Server HLS
          </button>

          {/* Next Episode Button */}
          {hasNext && nextEpisodeUrl && (
            <Link
              href={nextEpisodeUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7C5CFC] hover:bg-[#6A49F5] text-white text-xs font-semibold shadow-md shadow-[#7C5CFC]/20 transition-transform active:scale-95 ml-2"
            >
              <span className="hidden sm:inline">Episode Selanjutnya</span>
              <span className="sm:hidden">Ep {nextEpNum}</span>
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Player Container */}
      <div className="flex-1 w-full h-full relative bg-black flex items-center justify-center">
        {activeServer === "server-1" && (
          <iframe
            src={server1Url}
            title={`${animeTitle} Episode ${currentEpNum}`}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        )}

        {activeServer === "server-2" && (
          <iframe
            src={server2Url}
            title={`${animeTitle} Episode ${currentEpNum}`}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        )}

        {activeServer === "server-hls" && (
          <VideoPlayer
            streamUrl={activeStreamUrl}
            title={`${animeTitle} — Episode ${currentEpNum}`}
            subtitleLabel="Streaming HLS Adaptif"
            contentId={episodeId}
            contentType="EPISODE"
            subtitles={streamData?.subtitles || []}
            nextEpisodeUrl={nextEpisodeUrl}
            nextEpisodeTitle={hasNext ? `Episode ${nextEpNum}` : undefined}
            backHref={anime ? `/anime/${anime.id}` : "/anime"}
          />
        )}
      </div>
    </div>
  );
}

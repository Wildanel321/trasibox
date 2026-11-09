"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Play,
  Star,
  Sparkles,
  Calendar,
  Tv,
  Film,
  Layers,
  ChevronLeft,
  ExternalLink,
  Search,
} from "lucide-react";
import { AnimeItem, AnimeEpisode } from "@/lib/types";
import { CURATED_ANIME } from "@/lib/jikan";
import { Button } from "@/components/ui/Button";

export default function AnimeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [anime, setAnime] = useState<AnimeItem | null>(() => {
    return (
      CURATED_ANIME.find(
        (a) => a.id === id || String(a.malId) === id || a.consumetId === id
      ) || null
    );
  });
  const [isLoading, setIsLoading] = useState(!anime);
  const [episodeFilter, setEpisodeFilter] = useState("");

  useEffect(() => {
    fetch(`/api/v1/anime/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setAnime(json.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#7C5CFC] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!anime) {
    notFound();
  }

  const episodes = anime.episodes || [];
  const filteredEpisodes = episodeFilter.trim()
    ? episodes.filter((ep) =>
        String(ep.episodeNumber).includes(episodeFilter.trim()) ||
        ep.title.toLowerCase().includes(episodeFilter.toLowerCase())
      )
    : episodes;

  const firstEpisode = episodes[0];

  return (
    <div className="min-h-screen bg-[#09090B] pb-24 text-white">
      {/* Cinematic Hero Backdrop Banner */}
      <div className="relative w-full h-[50vh] sm:h-[65vh] lg:h-[75vh]">
        <Image
          src={anime.backdropUrl}
          alt={anime.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/50 to-transparent" />

        {/* Back navigation button */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 z-20">
          <Link
            href="/anime"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-medium border border-white/10 backdrop-blur-md transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Anime</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-36 sm:-mt-52 lg:-mt-64 relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* 2:3 Poster Frame */}
          <div className="w-48 sm:w-64 lg:w-72 flex-shrink-0 mx-auto md:mx-0 shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-[#18181B] aspect-[2/3] relative">
            <Image
              src={anime.posterUrl}
              alt={anime.title}
              fill
              sizes="(max-width: 768px) 250px, 300px"
              priority
              className="object-cover"
            />
          </div>

          {/* Anime Meta Details */}
          <div className="flex-1 space-y-5 text-left">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] text-xs font-semibold border border-[#7C5CFC]/30">
                  {anime.type || "TV Series"}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-semibold border border-amber-400/30">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>MAL {anime.score}</span>
                </span>
                {anime.rank && (
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-xs font-medium">
                    Peringkat #{anime.rank}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  {anime.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FAFAFA]">
                {anime.englishTitle || anime.title}
              </h1>

              {anime.japaneseTitle && (
                <p className="text-sm sm:text-base text-[#A1A1AA] font-normal">
                  {anime.japaneseTitle}
                </p>
              )}
            </div>

            {/* Quick Meta Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#A1A1AA] border-y border-white/8 py-3">
              <div>
                <span className="text-zinc-500">Musim: </span>
                <span className="text-white font-medium">
                  {anime.season || anime.year || "N/A"}
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div>
                <span className="text-zinc-500">Total Episode: </span>
                <span className="text-white font-medium">
                  {anime.episodesCount ?? episodes.length} Episode
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div>
                <span className="text-zinc-500">Studio: </span>
                <span className="text-white font-medium">
                  {anime.studios.join(", ") || "Animasi"}
                </span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-[#D4D4D8]"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div className="space-y-1.5">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#A1A1AA]">
                Sinopsis Anime
              </h3>
              <p className="text-sm text-[#D4D4D8] leading-relaxed">
                {anime.synopsis}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {firstEpisode ? (
                <Link
                  href={`/anime/watch/${firstEpisode.id}?malId=${anime.malId}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7C5CFC] hover:bg-[#6A49F5] text-white text-sm font-semibold shadow-lg shadow-[#7C5CFC]/30 transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>Tonton Sekarang (Ep 1)</span>
                </Link>
              ) : (
                <Button disabled className="gap-2">
                  <Play className="w-4 h-4" />
                  <span>Episode Belum Tersedia</span>
                </Button>
              )}

              {anime.trailerYoutubeId && (
                <a
                  href={`https://www.youtube.com/watch?v=${anime.trailerYoutubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 backdrop-blur-md transition-colors"
                >
                  <Film className="w-4 h-4" />
                  <span>Lihat Trailer</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Consumet Streaming Episode Selector */}
        <div className="space-y-6 pt-6 border-t border-white/8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Tv className="w-5 h-5 text-[#7C5CFC]" />
                <span>Daftar Episode Anime</span>
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Streaming otomatis diolah via Consumet Engine (Multi-bitrate HLS 1080p).
              </p>
            </div>

            {episodes.length > 8 && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={episodeFilter}
                  onChange={(e) => setEpisodeFilter(e.target.value)}
                  placeholder="Cari nomor episode..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#18181B] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC]"
                />
              </div>
            )}
          </div>

          {filteredEpisodes.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-[#111114] border border-white/8 text-zinc-500 text-sm">
              Tidak ada episode yang sesuai.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredEpisodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/anime/watch/${ep.id}?malId=${anime.malId}`}
                  className="group p-3 rounded-xl bg-[#111114] hover:bg-[#18181B] border border-white/8 hover:border-[#7C5CFC]/40 transition-all flex flex-col items-center justify-center text-center space-y-1 hover:shadow-lg hover:shadow-[#7C5CFC]/10"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#7C5CFC] flex items-center justify-center text-[#A1A1AA] group-hover:text-white transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span className="text-xs font-semibold text-white group-hover:text-[#A78BFA] transition-colors">
                    Ep {ep.episodeNumber}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    HD Stream
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

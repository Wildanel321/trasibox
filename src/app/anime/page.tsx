"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Play,
  Search,
  Star,
  Tv,
  Calendar,
  Flame,
  Film,
  Info,
  Layers,
} from "lucide-react";
import { AnimeItem } from "@/lib/types";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { CURATED_ANIME } from "@/lib/jikan";
import { Button } from "@/components/ui/Button";

export default function AnimePage() {
  const [topAnime, setTopAnime] = useState<AnimeItem[]>(CURATED_ANIME);
  const [seasonalAnime, setSeasonalAnime] = useState<AnimeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AnimeItem[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<"top" | "seasonal" | "action">("top");

  // Hero anime
  const heroAnime = topAnime[0] || CURATED_ANIME[0];

  useEffect(() => {
    // Fetch Top Anime
    fetch("/api/v1/anime?category=top&limit=24")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length > 0) {
          setTopAnime(json.data);
        }
      })
      .catch(() => {});

    // Fetch Seasonal Anime
    fetch("/api/v1/anime?category=seasonal&limit=12")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length > 0) {
          setSeasonalAnime(json.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/v1/anime?q=${encodeURIComponent(searchQuery.trim())}`
      );
      const json = await res.json();
      if (json.success) {
        setSearchResults(json.data);
      }
    } catch {
      // ignore
    } finally {
      setIsSearching(false);
    }
  };

  const actionAnime = topAnime.filter((a) =>
    a.genres.some((g) => g.toLowerCase().includes("action"))
  );

  return (
    <div className="min-h-screen bg-[#09090B] pb-24 text-white">
      {/* Cinematic Hero Spotlight */}
      {heroAnime && (
        <section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden">
          <Image
            src={heroAnime.backdropUrl}
            alt={heroAnime.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/70 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20 z-10">
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] text-xs font-semibold border border-[#7C5CFC]/40 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Jikan & Consumet Hub</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-amber-300 text-xs font-semibold border border-amber-400/30 backdrop-blur-md">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>MAL {heroAnime.score}</span>
                </span>
                <span className="text-xs text-[#A1A1AA]">
                  {heroAnime.season || heroAnime.year} • {heroAnime.episodesCount} Episode
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {heroAnime.englishTitle || heroAnime.title}
              </h1>

              {heroAnime.japaneseTitle && (
                <p className="text-sm sm:text-base text-[#A1A1AA] font-medium tracking-wide">
                  {heroAnime.japaneseTitle}
                </p>
              )}

              <p className="text-xs sm:text-sm text-[#D4D4D8] line-clamp-3 leading-relaxed max-w-xl">
                {heroAnime.synopsis}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={
                    heroAnime.episodes && heroAnime.episodes.length > 0
                      ? `/anime/watch/${heroAnime.episodes[0].id}?malId=${heroAnime.malId}`
                      : `/anime/${heroAnime.id}`
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7C5CFC] hover:bg-[#6A49F5] text-white text-sm font-semibold shadow-lg shadow-[#7C5CFC]/30 transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>Mulai Tonton Ep 1</span>
                </Link>

                <Link
                  href={`/anime/${heroAnime.id}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 backdrop-blur-md transition-colors"
                >
                  <Info className="w-4 h-4" />
                  <span>Detail Anime</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 space-y-12">
        {/* Search & Provider Info Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#111114] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === "") setSearchResults(null);
                }}
                placeholder="Cari ribuan judul anime (Jikan MAL API)... contoh: Frieren, Bleach, Naruto"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>
            <Button type="submit" isLoading={isSearching} className="gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Cari</span>
            </Button>
          </form>

          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] shrink-0 border-t md:border-t-0 md:border-l border-white/8 pt-3 md:pt-0 md:pl-5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Streaming HLS: <strong>Consumet API</strong></span>
            <span className="text-white/20">•</span>
            <span>Metadata: <strong>Jikan v4</strong></span>
          </div>
        </div>

        {/* Search Results if active */}
        {searchResults !== null && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/8 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-[#7C5CFC]" />
                <span>Hasil Pencarian: &ldquo;{searchQuery}&rdquo;</span>
                <span className="text-xs text-[#A1A1AA] font-normal">
                  ({searchResults.length} anime)
                </span>
              </h2>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults(null);
                }}
                className="text-xs text-[#A78BFA] hover:underline"
              >
                Reset Pencarian
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#111114] border border-white/8">
                <p className="text-sm text-[#A1A1AA]">
                  Tidak ada anime yang sesuai dengan pencarian &ldquo;{searchQuery}&rdquo;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                {searchResults.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/8 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("top")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === "top"
                ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/30"
                : "bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10"
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Peringkat Teratas (Top Anime)</span>
          </button>

          <button
            onClick={() => setActiveTab("seasonal")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === "seasonal"
                ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/30"
                : "bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Sedang Tayang Musim Ini</span>
          </button>

          <button
            onClick={() => setActiveTab("action")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === "action"
                ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/30"
                : "bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Aksi & Petualangan Populer</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "top" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Anime Terbaik Sepanjang Masa (MyAnimeList)
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">
                  Kurasi mahakarya anime dengan skor penonton tertinggi dari database Jikan v4.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {topAnime.map((anime, idx) => (
                <AnimeCard key={anime.id} anime={anime} priority={idx < 6} />
              ))}
            </div>
          </section>
        )}

        {activeTab === "seasonal" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Sedang Tayang Musim Ini (Currently Airing)
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">
                Episode mingguan terbaru yang sedang aktif tayang di televisi Jepang.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {(seasonalAnime.length > 0 ? seasonalAnime : topAnime.slice(0, 12)).map(
                (anime, idx) => (
                  <AnimeCard key={anime.id} anime={anime} priority={idx < 6} />
                )
              )}
            </div>
          </section>
        )}

        {activeTab === "action" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Aksi & Pertarungan Paling Epik
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">
                Koleksi anime aksi dengan animasi memukau dan pertempuran intensitas tinggi.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {(actionAnime.length > 0 ? actionAnime : topAnime).map((anime, idx) => (
                <AnimeCard key={anime.id} anime={anime} priority={idx < 6} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

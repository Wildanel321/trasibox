"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Film, Tv, Clock, X, Sparkles } from "lucide-react";
import { SAMPLE_MOVIES, SAMPLE_SERIES } from "@/lib/data";
import { MovieCard } from "@/components/cards/MovieCard";
import { SeriesCard } from "@/components/cards/SeriesCard";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnimeItem } from "@/lib/types";
import { CURATED_ANIME } from "@/lib/jikan";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "MOVIES" | "SERIES" | "ANIME">("ALL");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [animeResults, setAnimeResults] = useState<AnimeItem[]>([]);
  const [isSearchingAnime, setIsSearchingAnime] = useState(false);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim().length > 1) {
        setRecentSearches((prev) => {
          const updated = [query.trim(), ...prev.filter((q) => q.toLowerCase() !== query.trim().toLowerCase())].slice(0, 5);
          try {
            localStorage.setItem("trasibox_recent_searches", JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [query]);

  // Load recent searches
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_recent_searches") || "[]");
      setRecentSearches(stored);
    } catch {}
  }, []);

  // Search Anime using Jikan / fallback API
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setAnimeResults([]);
      return;
    }

    let isMounted = true;
    setIsSearchingAnime(true);

    fetch(`/api/v1/anime?q=${encodeURIComponent(debouncedQuery.trim())}`)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success && Array.isArray(json.data)) {
          setAnimeResults(json.data);
        }
      })
      .catch(() => {
        if (isMounted) {
          const q = debouncedQuery.toLowerCase();
          setAnimeResults(
            CURATED_ANIME.filter(
              (a) =>
                a.title.toLowerCase().includes(q) ||
                (a.englishTitle && a.englishTitle.toLowerCase().includes(q)) ||
                a.genres.some((g) => g.toLowerCase().includes(q))
            )
          );
        }
      })
      .finally(() => {
        if (isMounted) setIsSearchingAnime(false);
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const removeRecent = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter((t) => t !== term);
    setRecentSearches(updated);
    try {
      localStorage.setItem("trasibox_recent_searches", JSON.stringify(updated));
    } catch {}
  };

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return { movies: [], series: [] };
    const q = debouncedQuery.toLowerCase();

    const movies = SAMPLE_MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.synopsis.toLowerCase().includes(q) ||
        m.genres.some((g) => g.name.toLowerCase().includes(q))
    );

    const series = SAMPLE_SERIES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.synopsis.toLowerCase().includes(q) ||
        s.genres.some((g) => g.name.toLowerCase().includes(q))
    );

    return { movies, series };
  }, [debouncedQuery]);

  const totalResults =
    (filterType === "SERIES" || filterType === "ANIME" ? 0 : results.movies.length) +
    (filterType === "MOVIES" || filterType === "ANIME" ? 0 : results.series.length) +
    (filterType === "MOVIES" || filterType === "SERIES" ? 0 : animeResults.length);

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Header Input */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pencarian Cerdas
          </h1>
          <p className="text-sm text-[#A1A1AA]">
            Temukan film layar lebar, serial TV, dan anime favorit dari database TMDB & Jikan v4.
          </p>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C5CFC]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik judul film, serial, atau anime (cth: Frieren, Solo Leveling, Sintel)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#18181B] border border-white/10 text-base text-white placeholder-[#71717A] focus:outline-none focus:border-[#7C5CFC] shadow-xl shadow-black/50 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Recent Searches Chips */}
          {recentSearches.length > 0 && !debouncedQuery && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-xs text-[#71717A] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Riwayat:
              </span>
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] border border-white/5 text-xs text-zinc-300 hover:text-white hover:border-[#7C5CFC]/30 transition-colors"
                >
                  <span>{term}</span>
                  <X
                    className="w-3 h-3 text-zinc-500 hover:text-rose-400"
                    onClick={(e) => removeRecent(term, e)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Type Tabs */}
        {debouncedQuery && (
          <div className="flex items-center justify-between border-b border-white/8 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {(["ALL", "MOVIES", "SERIES", "ANIME"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilterType(t)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterType === t
                      ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/20"
                      : "bg-[#18181B] text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  {t === "ALL"
                    ? "Semua Hasil"
                    : t === "MOVIES"
                    ? "Hanya Film"
                    : t === "SERIES"
                    ? "Hanya Serial"
                    : "Hanya Anime"}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#A1A1AA]">
              Ditemukan <strong className="text-white">{totalResults}</strong> judul
            </span>
          </div>
        )}

        {/* Results Sections */}
        {debouncedQuery ? (
          totalResults > 0 ? (
            <div className="space-y-10">
              {/* Anime Results */}
              {(filterType === "ALL" || filterType === "ANIME") && animeResults.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#7C5CFC]" />
                      <span>Anime ({animeResults.length})</span>
                    </h3>
                    <span className="text-[11px] text-zinc-400">
                      Didukung Jikan (MAL) & Consumet
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                    {animeResults.map((a) => (
                      <AnimeCard key={a.id} anime={a} />
                    ))}
                  </div>
                </div>
              )}

              {/* Movies Results */}
              {(filterType === "ALL" || filterType === "MOVIES") && results.movies.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Film className="w-5 h-5 text-[#7C5CFC]" />
                    <span>Film ({results.movies.length})</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {results.movies.map((m) => (
                      <MovieCard key={m.id} movie={m} />
                    ))}
                  </div>
                </div>
              )}

              {/* Series Results */}
              {(filterType === "ALL" || filterType === "SERIES") && results.series.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Tv className="w-5 h-5 text-[#7C5CFC]" />
                    <span>Serial TV ({results.series.length})</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {results.series.map((s) => (
                      <SeriesCard key={s.id} series={s} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              title={`Tidak ada hasil untuk "${debouncedQuery}"`}
              description="Periksa kembali ejaan kata kunci Anda atau coba cari anime seperti Frieren atau Solo Leveling."
              actionLabel="Hapus Kata Kunci"
              onAction={() => setQuery("")}
            />
          )
        ) : (
          <div className="pt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111114] border border-white/5 text-xs text-zinc-400">
              <Sparkles className="w-4 h-4 text-[#7C5CFC]" />
              <span>Coba cari: Frieren, Solo Leveling, Jujutsu Kaisen, Sintel, Tears of Steel</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

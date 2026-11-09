"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Film, Tv, Sparkles } from "lucide-react";
import { SAMPLE_MOVIES, SAMPLE_SERIES } from "@/lib/data";
import { CURATED_ANIME } from "@/lib/jikan";
import { MovieCard } from "@/components/cards/MovieCard";
import { SeriesCard } from "@/components/cards/SeriesCard";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnimeItem } from "@/lib/types";

export default function MyListPage() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [savedAnimeList, setSavedAnimeList] = useState<AnimeItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_watchlist") || "[]");
      // If user has not added any yet, seed with 3 favorite titles including an anime
      if (stored.length === 0) {
        const initial = ["mov-tears-of-steel", "mov-sintel", "52991"];
        localStorage.setItem("trasibox_watchlist", JSON.stringify(initial));
        setWatchlistIds(initial);
      } else {
        setWatchlistIds(stored);
      }
    } catch {
      setWatchlistIds(["mov-tears-of-steel", "mov-sintel", "52991"]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Fetch anime items that are saved in watchlist
  useEffect(() => {
    if (watchlistIds.length === 0) {
      setSavedAnimeList([]);
      return;
    }

    const matchedAnime: AnimeItem[] = [];
    const idsToFetch: string[] = [];

    watchlistIds.forEach((id) => {
      const match = CURATED_ANIME.find(
        (a) => a.id === id || String(a.malId) === id || a.consumetId === id
      );
      if (match) {
        matchedAnime.push(match);
      } else if (!id.startsWith("mov-") && !id.startsWith("ser-")) {
        idsToFetch.push(id);
      }
    });

    setSavedAnimeList(matchedAnime);

    // Fetch any dynamic anime saved by user that is not in local curated
    if (idsToFetch.length > 0) {
      Promise.all(
        idsToFetch.map((id) =>
          fetch(`/api/v1/anime/${id}`)
            .then((r) => r.json())
            .then((j) => (j.success && j.data ? j.data : null))
            .catch(() => null)
        )
      ).then((results) => {
        const valid = results.filter((r): r is AnimeItem => r !== null);
        if (valid.length > 0) {
          setSavedAnimeList((prev) => [...prev, ...valid]);
        }
      });
    }
  }, [watchlistIds]);

  const savedMovies = SAMPLE_MOVIES.filter((m) => watchlistIds.includes(m.id));
  const savedSeries = SAMPLE_SERIES.filter((s) => watchlistIds.includes(s.id));
  const totalSaved = savedMovies.length + savedSeries.length + savedAnimeList.length;

  return (
    <div className="min-h-screen bg-[#09090B] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/8 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Bookmark className="w-7 h-7 text-[#7C5CFC]" />
              <span>Daftar Tontonan Saya</span>
            </h1>
            <p className="text-sm text-[#A1A1AA] mt-1">
              Koleksi film, serial TV, dan anime favorit yang Anda tandai untuk ditonton nanti.
            </p>
          </div>

          <span className="text-xs text-[#A1A1AA] hidden sm:block">
            {totalSaved} judul tersimpan
          </span>
        </div>

        {isLoaded && totalSaved > 0 ? (
          <div className="space-y-10">
            {/* Anime Watchlist */}
            {savedAnimeList.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7C5CFC]" />
                  <span>Anime ({savedAnimeList.length})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                  {savedAnimeList.map((a) => (
                    <AnimeCard key={a.id} anime={a} />
                  ))}
                </div>
              </div>
            )}

            {/* Movies Watchlist */}
            {savedMovies.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#7C5CFC]" />
                  <span>Film ({savedMovies.length})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {savedMovies.map((m) => (
                    <MovieCard key={m.id} movie={m} />
                  ))}
                </div>
              </div>
            )}

            {/* Series Watchlist */}
            {savedSeries.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Tv className="w-4 h-4 text-[#7C5CFC]" />
                  <span>Serial TV ({savedSeries.length})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {savedSeries.map((s) => (
                    <SeriesCard key={s.id} series={s} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            title="Daftar Tontonan Kosong"
            description="Anda belum menambahkan judul apa pun ke daftar tontonan. Jelajahi katalog anime atau film dan klik Tambah ke List untuk menyimpannya di sini."
            actionLabel="Jelajahi Anime"
            onAction={() => {
              window.location.href = "/anime";
            }}
          />
        )}
      </div>
    </div>
  );
}

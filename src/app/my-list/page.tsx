"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Film } from "lucide-react";
import { SAMPLE_MOVIES, SAMPLE_SERIES } from "@/lib/data";
import { MovieCard } from "@/components/cards/MovieCard";
import { SeriesCard } from "@/components/cards/SeriesCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function MyListPage() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_watchlist") || "[]");
      // If user has not added any yet, seed with 2 favorite titles
      if (stored.length === 0) {
        const initial = ["mov-tears-of-steel", "mov-sintel"];
        localStorage.setItem("trasibox_watchlist", JSON.stringify(initial));
        setWatchlistIds(initial);
      } else {
        setWatchlistIds(stored);
      }
    } catch {
      setWatchlistIds(["mov-tears-of-steel", "mov-sintel"]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const savedMovies = SAMPLE_MOVIES.filter((m) => watchlistIds.includes(m.id));
  const savedSeries = SAMPLE_SERIES.filter((s) => watchlistIds.includes(s.id));

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
              Koleksi film dan serial TV yang Anda tandai untuk ditonton nanti.
            </p>
          </div>

          <span className="text-xs text-[#A1A1AA] hidden sm:block">
            {savedMovies.length + savedSeries.length} judul tersimpan
          </span>
        </div>

        {isLoaded && (savedMovies.length > 0 || savedSeries.length > 0) ? (
          <div className="space-y-10">
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

            {savedSeries.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Serial TV ({savedSeries.length})</h3>
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
            description="Anda belum menambahkan judul apa pun ke daftar tontonan. Klik tombol Tambah ke List pada poster film untuk menyimpannya di sini."
            actionLabel="Jelajahi Film"
            onAction={() => {
              window.location.href = "/movies";
            }}
          />
        )}
      </div>
    </div>
  );
}


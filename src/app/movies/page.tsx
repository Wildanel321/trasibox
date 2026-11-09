"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { MovieCard } from "@/components/cards/MovieCard";
import { SAMPLE_MOVIES, GENRES } from "@/lib/data";
import { EmptyState } from "@/components/ui/EmptyState";
import { GenreBadge } from "@/components/ui/Badge";

function MoviesContent() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre") || "all";
  const initialSort = searchParams.get("sort") || "popular";

  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const availableYears = ["all", "2024", "2015", "2012", "2010", "2008", "2006", "1946"];

  const filteredMovies = useMemo(() => {
    return SAMPLE_MOVIES.filter((movie) => {
      // Genre filter
      const matchesGenre =
        selectedGenre === "all" ||
        movie.genres.some((g) => g.slug === selectedGenre || g.name.toLowerCase() === selectedGenre.toLowerCase());

      // Year filter
      const matchesYear = selectedYear === "all" || movie.releaseYear.toString() === selectedYear;

      // Search query
      const matchesSearch =
        searchQuery.trim() === "" ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesGenre && matchesYear && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.releaseYear - a.releaseYear;
      return b.viewCount - a.viewCount; // default popular
    });
  }, [selectedGenre, selectedYear, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-[#09090B] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/8 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Katalog Film
            </h1>
            <p className="text-sm text-[#A1A1AA] mt-1">
              Jelajahi seluruh film berkualitas sinematik dengan lisensi distribusi resmi.
            </p>
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <input
              type="text"
              placeholder="Cari judul film..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#18181B] border border-white/8 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#7C5CFC] transition-colors"
            />
          </div>
        </div>

        {/* Filters and Sorting Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Genre Badges Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <GenreBadge
              label="Semua Genre"
              active={selectedGenre === "all"}
              onClick={() => setSelectedGenre("all")}
            />
            {GENRES.map((g) => (
              <GenreBadge
                key={g.id}
                label={g.name}
                active={selectedGenre === g.slug}
                onClick={() => setSelectedGenre(g.slug)}
              />
            ))}
          </div>

          {/* Year & Sort Selectors */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Year Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
              <span>Tahun:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filter berdasarkan tahun"
                className="bg-[#18181B] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#7C5CFC]"
              >
                <option value="all">Semua Tahun</option>
                {availableYears.filter((y) => y !== "all").map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Urutkan film"
                className="bg-[#18181B] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#7C5CFC]"
              >
                <option value="popular">Terpopuler</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="year">Tahun Rilis</option>
              </select>
            </div>
          </div>
        </div>

        {/* Movie Grid: 5-7 col desktop, 3-5 col tablet, 2-3 col mobile */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Tidak Ada Film Ditemukan"
            description="Tidak ada judul film yang cocok dengan filter atau kata kunci pencarian Anda."
            actionLabel="Reset Filter"
            onAction={() => {
              setSelectedGenre("all");
              setSelectedYear("all");
              setSearchQuery("");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090B] pt-32 text-center text-zinc-500">Memuat katalog film...</div>}>
      <MoviesContent />
    </Suspense>
  );
}


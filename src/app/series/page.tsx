"use client";

import React, { useState, useMemo, Suspense } from "react";
import { Search } from "lucide-react";
import { SeriesCard } from "@/components/cards/SeriesCard";
import { SAMPLE_SERIES, GENRES } from "@/lib/data";
import { EmptyState } from "@/components/ui/EmptyState";
import { GenreBadge } from "@/components/ui/Badge";

function SeriesContent() {
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSeries = useMemo(() => {
    return SAMPLE_SERIES.filter((s) => {
      const matchesGenre =
        selectedGenre === "all" ||
        s.genres.some((g) => g.slug === selectedGenre || g.name.toLowerCase() === selectedGenre.toLowerCase());

      const matchesSearch =
        searchQuery.trim() === "" ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesGenre && matchesSearch;
    });
  }, [selectedGenre, searchQuery]);

  return (
    <div className="min-h-screen bg-[#09090B] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/8 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Serial TV
            </h1>
            <p className="text-sm text-[#A1A1AA] mt-1">
              Nikmati serial multi-episode dengan alur cerita mendalam dan kualitas sinematik.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <input
              type="text"
              placeholder="Cari serial TV..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#18181B] border border-white/8 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#7C5CFC] transition-colors"
            />
          </div>
        </div>

        {/* Genre Badges */}
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

        {/* Series Grid */}
        {filteredSeries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredSeries.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Tidak Ada Serial Ditemukan"
            description="Tidak ada serial TV yang cocok dengan filter atau kata kunci pencarian Anda."
            actionLabel="Reset Pencarian"
            onAction={() => {
              setSelectedGenre("all");
              setSearchQuery("");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function SeriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090B] pt-32 text-center text-zinc-500">Memuat katalog serial...</div>}>
      <SeriesContent />
    </Suspense>
  );
}

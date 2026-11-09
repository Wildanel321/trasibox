"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FeaturedHero } from "@/components/home/FeaturedHero";
import { ContentCarousel } from "@/components/home/ContentCarousel";
import { MovieCard } from "@/components/cards/MovieCard";
import { SeriesCard } from "@/components/cards/SeriesCard";
import { ContinueWatchingCard } from "@/components/cards/ContinueWatchingCard";
import { SAMPLE_MOVIES, SAMPLE_SERIES, GENRES } from "@/lib/data";
import { Movie, Series } from "@/lib/types";
import { Sparkles, Compass } from "lucide-react";

interface SavedHistoryEntry {
  contentId: string;
  contentType: "MOVIE" | "EPISODE";
  progressSeconds: number;
  durationSeconds: number;
  completed: boolean;
  updatedAt: string;
}

export default function HomePage() {
  const [continueWatchingList, setContinueWatchingList] = useState<
    {
      id: string;
      title: string;
      subtitle: string;
      thumbnailUrl: string;
      watchUrl: string;
      progressSeconds: number;
      durationSeconds: number;
    }[]
  >([]);

  // Featured premiere
  const heroMovie = SAMPLE_MOVIES[0]; // Tears of Steel

  // Trending Movies
  const trendingMovies = [...SAMPLE_MOVIES].sort((a, b) => b.viewCount - a.viewCount);

  // Popular Series
  const popularSeries = [...SAMPLE_SERIES];

  // Recently Added
  const recentlyAdded = [...SAMPLE_MOVIES].sort((a, b) => b.releaseYear - a.releaseYear);

  // Recommended for You (Curated high-rated titles)
  const recommendedMovies = [...SAMPLE_MOVIES].filter((m) => m.rating >= 8.5);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_history") || "{}");
      const list: typeof continueWatchingList = [];

      Object.values(stored).forEach((entry: any) => {
        if (!entry.completed && entry.progressSeconds > 10) {
          const movie = SAMPLE_MOVIES.find((m) => m.id === entry.contentId);
          if (movie) {
            list.push({
              id: movie.id,
              title: movie.title,
              subtitle: "Film",
              thumbnailUrl: movie.backdropUrl,
              watchUrl: `/watch/${movie.id}`,
              progressSeconds: entry.progressSeconds,
              durationSeconds: entry.durationSeconds || movie.durationMinutes * 60,
            });
          }
        }
      });

      // Default mock continue watching item if history is fresh
      if (list.length === 0) {
        list.push({
          id: "mov-sintel",
          title: "Sintel",
          subtitle: "15m • Fantasi",
          thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
          watchUrl: "/watch/mov-sintel",
          progressSeconds: 320,
          durationSeconds: 900,
        });
      }

      setContinueWatchingList(list);
    } catch {
      // localStorage fallback
    }
  }, []);

  const removeHistoryItem = (id: string) => {
    setContinueWatchingList((prev) => prev.filter((item) => item.id !== id));
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_history") || "{}");
      delete stored[id];
      localStorage.setItem("trasibox_history", JSON.stringify(stored));
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#09090B] pb-12">
      {/* 1. Cinematic Hero Section */}
      <FeaturedHero movie={heroMovie} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20 space-y-12">
        {/* 2. Continue Watching (if exists) */}
        {continueWatchingList.length > 0 && (
          <ContentCarousel title="Lanjutkan Menonton" seeAllHref="/history">
            {continueWatchingList.map((item) => (
              <div key={item.id} className="w-[260px] sm:w-[320px] flex-shrink-0">
                <ContinueWatchingCard
                  id={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  thumbnailUrl={item.thumbnailUrl}
                  watchUrl={item.watchUrl}
                  progressSeconds={item.progressSeconds}
                  durationSeconds={item.durationSeconds}
                  onRemove={() => removeHistoryItem(item.id)}
                />
              </div>
            ))}
          </ContentCarousel>
        )}

        {/* 3. Trending Movies */}
        <ContentCarousel title="Trending Sekarang" seeAllHref="/movies">
          {trendingMovies.map((movie, idx) => (
            <div key={movie.id} className="w-[150px] sm:w-[185px] lg:w-[210px] flex-shrink-0">
              <MovieCard movie={movie} priority={idx < 4} />
            </div>
          ))}
        </ContentCarousel>

        {/* 4. Popular TV Series */}
        <ContentCarousel title="Serial TV Pilihan" seeAllHref="/series">
          {popularSeries.map((series) => (
            <div key={series.id} className="w-[150px] sm:w-[185px] lg:w-[210px] flex-shrink-0">
              <SeriesCard series={series} />
            </div>
          ))}
        </ContentCarousel>

        {/* 5. Recommended For You */}
        <ContentCarousel title="Rekomendasi Terbaik" seeAllHref="/movies?sort=rating">
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className="w-[150px] sm:w-[185px] lg:w-[210px] flex-shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </ContentCarousel>

        {/* 6. Genre Collections */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#7C5CFC]" />
              <span>Jelajahi Genre</span>
            </h2>
            <Link
              href="/movies"
              className="text-xs sm:text-sm font-medium text-[#7C5CFC] hover:text-[#A78BFA] transition-colors"
            >
              Semua Genre
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {GENRES.map((g) => (
              <Link
                key={g.id}
                href={`/movies?genre=${g.slug}`}
                className="group p-4 rounded-xl bg-[#111114] hover:bg-[#18181B] border border-white/5 hover:border-[#7C5CFC]/40 text-center transition-all duration-200"
              >
                <div className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#A78BFA] transition-colors">
                  {g.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 7. Recently Added */}
        <ContentCarousel title="Baru Ditambahkan" seeAllHref="/movies?sort=year">
          {recentlyAdded.map((movie) => (
            <div key={movie.id} className="w-[150px] sm:w-[185px] lg:w-[210px] flex-shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </ContentCarousel>
      </div>
    </div>
  );
}

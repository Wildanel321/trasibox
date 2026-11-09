"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, Calendar, Film, ShieldCheck, User } from "lucide-react";
import { SAMPLE_SERIES } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { RatingBadge } from "@/components/ui/Badge";
import { formatDuration } from "@/lib/utils";

export default function SeriesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const series = SAMPLE_SERIES.find((s) => s.id === id || s.slug === id);

  const [activeSeasonIndex, setActiveSeasonIndex] = useState(0);

  if (!series) {
    notFound();
  }

  const currentSeason = series.seasons[activeSeasonIndex] || series.seasons[0];
  const firstEpisode = currentSeason?.episodes[0];

  return (
    <div className="min-h-screen bg-[#09090B] pb-24">
      {/* Cinematic Hero Backdrop Banner */}
      <div className="relative w-full h-[50vh] sm:h-[65vh] lg:h-[75vh]">
        <Image
          src={series.backdropUrl}
          alt={series.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-36 sm:-mt-52 lg:-mt-64 relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* 2:3 Poster Frame */}
          <div className="w-48 sm:w-64 lg:w-72 flex-shrink-0 mx-auto md:mx-0 shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-[#18181B] aspect-[2/3] relative">
            <Image
              src={series.posterUrl}
              alt={series.title}
              fill
              sizes="(max-width: 768px) 250px, 300px"
              priority
              className="object-cover"
            />
          </div>

          {/* Series Meta */}
          <div className="flex-1 space-y-5 text-left">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] text-xs font-semibold border border-[#7C5CFC]/30">
                  TV Series
                </span>
                <RatingBadge rating={series.rating} />
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Hak Siar Terverifikasi</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {series.title}
              </h1>

              {series.originalTitle && series.originalTitle !== series.title && (
                <p className="text-sm text-[#A1A1AA] italic">
                  Judul Asli: {series.originalTitle}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#A1A1AA]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#7C5CFC]" />
                <span>Rilis: {series.firstAirYear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#7C5CFC]" />
                <span>{series.genres.map((g) => g.name).join(", ")}</span>
              </div>
              <div>
                <span>{series.seasons.length} Season</span>
              </div>
            </div>

            {/* Start watching button */}
            {firstEpisode && (
              <div className="pt-2">
                <Link href={`/watch/${firstEpisode.id}?seriesId=${series.id}`}>
                  <Button size="lg" className="gap-2 px-7 shadow-xl shadow-[#7C5CFC]/30">
                    <Play className="w-5 h-5 fill-white" />
                    <span>Mulai Nonton Ep 1</span>
                  </Button>
                </Link>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Sinopsis Serial
              </h3>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-3xl">
                {series.synopsis}
              </p>
            </div>
          </div>
        </div>

        {/* Season Selector Tabs & Episode List */}
        <section className="space-y-6 pt-6 border-t border-white/8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Daftar Episode
            </h3>

            {/* Season Selector Buttons */}
            <div className="flex items-center gap-2">
              {series.seasons.map((season, idx) => (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setActiveSeasonIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeSeasonIndex === idx
                      ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/25"
                      : "bg-[#18181B] text-[#A1A1AA] hover:text-white border border-white/5"
                  }`}
                >
                  Season {season.seasonNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Episode Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSeason?.episodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/watch/${ep.id}?seriesId=${series.id}`}
                className="group flex flex-col rounded-xl overflow-hidden bg-[#111114] border border-white/5 hover:border-[#7C5CFC]/40 transition-all duration-200"
              >
                {/* 16:9 Episode Thumbnail */}
                <div className="relative aspect-video w-full bg-[#18181B] overflow-hidden">
                  <Image
                    src={ep.thumbnailUrl}
                    alt={ep.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] font-medium text-white">
                    {ep.durationMinutes}m
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <div className="text-xs text-[#7C5CFC] font-semibold">
                    Episode {ep.episodeNumber}
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors truncate">
                    {ep.title}
                  </h4>
                  {ep.synopsis && (
                    <p className="text-xs text-[#71717A] line-clamp-2 leading-relaxed">
                      {ep.synopsis}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


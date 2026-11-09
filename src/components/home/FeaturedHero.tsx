"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Plus, Check, Info, Volume2, VolumeX } from "lucide-react";
import { Movie } from "@/lib/types";
import { RatingBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDuration } from "@/lib/utils";

interface FeaturedHeroProps {
  movie: Movie;
}

export function FeaturedHero({ movie }: FeaturedHeroProps) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [muted, setMuted] = useState(true);

  const toggleWatchlist = () => {
    setInWatchlist(!inWatchlist);
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_watchlist") || "[]");
      if (inWatchlist) {
        const filtered = stored.filter((id: string) => id !== movie.id);
        localStorage.setItem("trasibox_watchlist", JSON.stringify(filtered));
      } else {
        stored.push(movie.id);
        localStorage.setItem("trasibox_watchlist", JSON.stringify(stored));
      }
    } catch {
      // storage fallback
    }
  };

  return (
    <section className="relative w-full min-h-[65vh] sm:min-h-[75vh] lg:min-h-[82vh] flex items-end pb-12 sm:pb-16 pt-32 overflow-hidden">
      {/* High-res Backdrop Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 transition-transform duration-1000"
        />
        {/* Cinematic Multi-layered Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/70 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-2xl space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#A1A1AA]">
            <span className="px-2.5 py-1 rounded bg-[#7C5CFC]/20 text-[#A78BFA] font-semibold tracking-wider uppercase border border-[#7C5CFC]/30">
              Featured Premiere
            </span>
            <RatingBadge rating={movie.rating} />
            <span>{movie.releaseYear}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{formatDuration(movie.durationMinutes)}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <div className="flex gap-1.5">
              {movie.genres.map((g) => (
                <span key={g.id} className="text-zinc-300">
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {/* Cinematic Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans drop-shadow-md">
            {movie.title}
          </h1>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-[#A1A1AA] line-clamp-3 leading-relaxed max-w-xl font-normal">
            {movie.synopsis}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`/watch/${movie.id}`}>
              <Button size="lg" className="gap-2.5 px-6 shadow-xl shadow-[#7C5CFC]/30">
                <Play className="w-5 h-5 fill-white" />
                <span>Nonton Sekarang</span>
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="lg"
              onClick={toggleWatchlist}
              className="gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/10"
            >
              {inWatchlist ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>Di Daftar Tontonan</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Tambah ke List</span>
                </>
              )}
            </Button>

            <Link href={`/movies/${movie.id}`}>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent hover:bg-white/10 border-white/20"
              >
                <Info className="w-5 h-5" />
                <span>Detail</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


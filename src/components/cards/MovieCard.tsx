"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Plus, Check } from "lucide-react";
import { Movie } from "@/lib/types";
import { RatingBadge } from "@/components/ui/Badge";
import { formatDuration } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [imgError, setImgError] = useState(false);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      // local storage fallback
    }
  };

  const fallbackPoster = "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80";

  return (
    <div className="group relative flex flex-col w-full text-left">
      {/* 2:3 Poster Frame */}
      <Link
        href={`/movies/${movie.id}`}
        className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-[#18181B] border border-white/8 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-black/70 group-hover:border-white/20"
      >
        <Image
          src={imgError ? fallbackPoster : movie.posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
          priority={priority}
          onError={() => setImgError(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating overlay badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <RatingBadge rating={movie.rating} />
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <Link
              href={`/watch/${movie.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#7C5CFC] hover:bg-[#6A49F5] text-white text-xs font-semibold shadow-lg shadow-[#7C5CFC]/30 transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Nonton</span>
            </Link>
            <button
              type="button"
              onClick={toggleWatchlist}
              title={inWatchlist ? "Hapus dari List" : "Tambah ke List"}
              className="p-2 rounded-lg bg-black/60 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              {inWatchlist ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </Link>

      {/* Movie Metadata below poster */}
      <div className="pt-2.5 flex flex-col gap-0.5">
        <Link
          href={`/movies/${movie.id}`}
          className="text-sm font-medium text-[#FAFAFA] group-hover:text-[#A78BFA] transition-colors truncate"
        >
          {movie.title}
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
          <span>{movie.releaseYear}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>{formatDuration(movie.durationMinutes)}</span>
        </div>
      </div>
    </div>
  );
}


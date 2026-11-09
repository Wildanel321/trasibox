"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Star, Sparkles } from "lucide-react";
import { AnimeItem } from "@/lib/types";

interface AnimeCardProps {
  anime: AnimeItem;
  priority?: boolean;
}

export function AnimeCard({ anime, priority = false }: AnimeCardProps) {
  const [imgError, setImgError] = useState(false);
  const fallbackPoster =
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80";

  return (
    <div className="group relative flex flex-col w-full text-left">
      <Link
        href={`/anime/${anime.id}`}
        className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-[#18181B] border border-white/8 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-[#7C5CFC]/20 group-hover:border-[#7C5CFC]/40"
      >
        <Image
          src={imgError ? fallbackPoster : anime.posterUrl}
          alt={anime.title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
          priority={priority}
          onError={() => setImgError(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating Score Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-semibold shadow-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{anime.score ? anime.score.toFixed(1) : "N/A"}</span>
          </div>
        </div>

        {/* Type / Episode count badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#7C5CFC]/90 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="w-2.5 h-2.5" />
            <span>MAL #{anime.rank || anime.malId}</span>
          </div>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 sm:p-4">
          <p className="text-[11px] text-[#D4D4D8] line-clamp-2 mb-2">
            {anime.synopsis}
          </p>
          <div className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#7C5CFC] hover:bg-[#6A49F5] text-white text-xs font-semibold shadow-lg shadow-[#7C5CFC]/30 transition-transform active:scale-95">
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>Lihat Episode</span>
          </div>
        </div>
      </Link>

      <div className="pt-2.5 flex flex-col gap-0.5">
        <Link
          href={`/anime/${anime.id}`}
          className="text-sm font-medium text-[#FAFAFA] group-hover:text-[#A78BFA] transition-colors truncate"
          title={anime.englishTitle || anime.title}
        >
          {anime.englishTitle || anime.title}
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
          <span>{anime.year || anime.season || "TV"}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>
            {anime.episodesCount ? `${anime.episodesCount} Ep` : "Airing"}
          </span>
          {anime.studios && anime.studios.length > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="truncate max-w-[80px]">{anime.studios[0]}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { Series } from "@/lib/types";
import { RatingBadge } from "@/components/ui/Badge";

interface SeriesCardProps {
  series: Series;
  priority?: boolean;
}

export function SeriesCard({ series, priority = false }: SeriesCardProps) {
  const [imgError, setImgError] = useState(false);
  const fallbackPoster = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80";
  const totalEpisodes = series.seasons.reduce((acc, s) => acc + s.episodes.length, 0);

  return (
    <div className="group relative flex flex-col w-full text-left">
      <Link
        href={`/series/${series.id}`}
        className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-[#18181B] border border-white/8 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-black/70 group-hover:border-white/20"
      >
        <Image
          src={imgError ? fallbackPoster : series.posterUrl}
          alt={series.title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
          priority={priority}
          onError={() => setImgError(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-2.5 right-2.5 z-10">
          <RatingBadge rating={series.rating} />
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 sm:p-4">
          <Link
            href={`/series/${series.id}`}
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#7C5CFC] hover:bg-[#6A49F5] text-white text-xs font-semibold shadow-lg shadow-[#7C5CFC]/30 transition-transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>Lihat Episode</span>
          </Link>
        </div>
      </Link>

      <div className="pt-2.5 flex flex-col gap-0.5">
        <Link
          href={`/series/${series.id}`}
          className="text-sm font-medium text-[#FAFAFA] group-hover:text-[#A78BFA] transition-colors truncate"
        >
          {series.title}
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
          <span>{series.firstAirYear}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>{series.seasons.length} Season ({totalEpisodes} Ep)</span>
        </div>
      </div>
    </div>
  );
}

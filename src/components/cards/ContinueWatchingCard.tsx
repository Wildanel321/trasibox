"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { formatSeconds } from "@/lib/utils";

interface ContinueWatchingCardProps {
  id: string;
  title: string;
  subtitle?: string;
  thumbnailUrl: string;
  watchUrl: string;
  progressSeconds: number;
  durationSeconds: number;
  onRemove?: () => void;
}

export function ContinueWatchingCard({
  id,
  title,
  subtitle,
  thumbnailUrl,
  watchUrl,
  progressSeconds,
  durationSeconds,
  onRemove,
}: ContinueWatchingCardProps) {
  const [imgError, setImgError] = useState(false);
  const percentage = durationSeconds > 0 ? Math.min(100, Math.round((progressSeconds / durationSeconds) * 100)) : 0;
  const remaining = Math.max(0, durationSeconds - progressSeconds);

  const fallback = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80";

  return (
    <div className="group relative flex flex-col w-full text-left">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#18181B] border border-white/8 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:border-white/20">
        <Image
          src={imgError ? fallback : thumbnailUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 25vw"
          onError={() => setImgError(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Center play button */}
        <Link
          href={watchUrl}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <div className="w-12 h-12 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center shadow-lg shadow-[#7C5CFC]/40 transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </Link>

        {/* Quick remove button */}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            title="Hapus dari riwayat"
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Progress Bar overlay at bottom of thumbnail */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
          <div
            className="h-full bg-[#7C5CFC] rounded-r transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-0.5">
        <Link href={watchUrl} className="text-sm font-medium text-[#FAFAFA] group-hover:text-[#A78BFA] transition-colors truncate">
          {title}
        </Link>
        <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
          <span className="truncate">{subtitle || `${percentage}% selesai`}</span>
          <span>Sisa {formatSeconds(remaining)}</span>
        </div>
      </div>
    </div>
  );
}


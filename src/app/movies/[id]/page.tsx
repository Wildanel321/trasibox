"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, Plus, Check, Star, Clock, Calendar, ShieldCheck, Film, User } from "lucide-react";
import { SAMPLE_MOVIES } from "@/lib/data";
import { MovieCard } from "@/components/cards/MovieCard";
import { Button } from "@/components/ui/Button";
import { RatingBadge } from "@/components/ui/Badge";
import { formatDuration } from "@/lib/utils";

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const movie = SAMPLE_MOVIES.find((m) => m.id === id || m.slug === id);

  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    if (!movie) return;
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_watchlist") || "[]");
      setInWatchlist(stored.includes(movie.id));
    } catch {}
  }, [movie]);

  if (!movie) {
    notFound();
  }

  const toggleWatchlist = () => {
    const nextState = !inWatchlist;
    setInWatchlist(nextState);
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_watchlist") || "[]");
      if (nextState) {
        if (!stored.includes(movie.id)) stored.push(movie.id);
      } else {
        const idx = stored.indexOf(movie.id);
        if (idx > -1) stored.splice(idx, 1);
      }
      localStorage.setItem("trasibox_watchlist", JSON.stringify(stored));
    } catch {}
  };

  // Find similar movies based on genres
  const similarMovies = SAMPLE_MOVIES.filter(
    (m) => m.id !== movie.id && m.genres.some((g) => movie.genres.some((mg) => mg.id === g.id))
  );

  return (
    <div className="min-h-screen bg-[#09090B] pb-24">
      {/* Cinematic Hero Backdrop Banner */}
      <div className="relative w-full h-[50vh] sm:h-[65vh] lg:h-[75vh]">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-36 sm:-mt-52 lg:-mt-64 relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* 2:3 Poster Frame */}
          <div className="w-48 sm:w-64 lg:w-72 flex-shrink-0 mx-auto md:mx-0 shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-[#18181B] aspect-[2/3] relative">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 250px, 300px"
              priority
              className="object-cover"
            />
          </div>

          {/* Details Column */}
          <div className="flex-1 space-y-5 text-left">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] text-xs font-semibold border border-[#7C5CFC]/30">
                  Feature Film
                </span>
                <RatingBadge rating={movie.rating} />
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Hak Siar Terverifikasi</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {movie.title}
              </h1>

              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-sm text-[#A1A1AA] italic">
                  Judul Asli: {movie.originalTitle}
                </p>
              )}
            </div>

            {/* Quick Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#A1A1AA]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#7C5CFC]" />
                <span>{movie.releaseYear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#7C5CFC]" />
                <span>{formatDuration(movie.durationMinutes)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#7C5CFC]" />
                <span>{movie.genres.map((g) => g.name).join(", ")}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href={`/watch/${movie.id}`}>
                <Button size="lg" className="gap-2 px-7 shadow-xl shadow-[#7C5CFC]/30">
                  <Play className="w-5 h-5 fill-white" />
                  <span>Putar Film</span>
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="lg"
                onClick={toggleWatchlist}
                className="gap-2 bg-[#18181B] hover:bg-[#222228] border-white/10"
              >
                {inWatchlist ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Tersimpan di My List</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Tambah ke My List</span>
                  </>
                )}
              </Button>
            </div>

            {/* Synopsis */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Sinopsis
              </h3>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-3xl">
                {movie.synopsis}
              </p>
            </div>

            {/* Directors & Cast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/8">
              {movie.directors && movie.directors.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#71717A] uppercase mb-1">Sutradara</h4>
                  <p className="text-sm text-white font-medium">{movie.directors.join(", ")}</p>
                </div>
              )}
              {movie.qualityLevels && (
                <div>
                  <h4 className="text-xs font-semibold text-[#71717A] uppercase mb-1">Resolusi Streaming</h4>
                  <p className="text-sm text-[#A78BFA] font-medium">HLS Adaptif (1080p, 720p, 480p)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cast & Crew Section */}
        {movie.cast && movie.cast.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-white/8">
            <h3 className="text-xl font-bold text-white tracking-tight">Pemeran & Kru</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {movie.cast.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#111114] border border-white/5 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center text-[#7C5CFC] mb-2">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-medium text-white truncate">{c.name}</div>
                  <div className="text-xs text-[#71717A] truncate">
                    {c.character ? `sebagai ${c.character}` : c.role}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-white/8">
            <h3 className="text-xl font-bold text-white tracking-tight">Film Terkait</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similarMovies.map((sm) => (
                <MovieCard key={sm.id} movie={sm} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}


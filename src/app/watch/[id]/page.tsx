"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { SAMPLE_MOVIES, SAMPLE_SERIES } from "@/lib/data";
import { VideoPlayer } from "@/components/player/VideoPlayer";

export default function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Check if content is a movie
  const movie = SAMPLE_MOVIES.find((m) => m.id === id || m.slug === id);

  if (movie) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <VideoPlayer
          streamUrl={movie.hlsStreamUrl}
          title={movie.title}
          subtitleLabel={`${movie.releaseYear} • ${movie.genres.map((g) => g.name).join(", ")}`}
          contentId={movie.id}
          contentType="MOVIE"
          subtitles={movie.subtitles}
          backHref={`/movies/${movie.id}`}
        />
      </div>
    );
  }

  // Check if content is an episode
  let matchedEpisode = null;
  let matchedSeries = null;
  let nextEp = null;

  for (const s of SAMPLE_SERIES) {
    for (const season of s.seasons) {
      const epIndex = season.episodes.findIndex((e) => e.id === id);
      if (epIndex > -1) {
        matchedEpisode = season.episodes[epIndex];
        matchedSeries = s;
        if (epIndex + 1 < season.episodes.length) {
          nextEp = season.episodes[epIndex + 1];
        }
        break;
      }
    }
    if (matchedEpisode) break;
  }

  if (matchedEpisode && matchedSeries) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <VideoPlayer
          streamUrl={matchedEpisode.hlsStreamUrl}
          title={`${matchedSeries.title} — Ep ${matchedEpisode.episodeNumber}: ${matchedEpisode.title}`}
          subtitleLabel={matchedEpisode.synopsis}
          contentId={matchedEpisode.id}
          contentType="EPISODE"
          nextEpisodeUrl={nextEp ? `/watch/${nextEp.id}` : undefined}
          nextEpisodeTitle={nextEp ? `Ep ${nextEp.episodeNumber}: ${nextEp.title}` : undefined}
          backHref={`/series/${matchedSeries.id}`}
        />
      </div>
    );
  }

  // Fallback test stream if user opens custom id
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <VideoPlayer
        streamUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        title="Streaming Preview"
        subtitleLabel="TREASIBOX High Definition HLS Stream"
        contentId={id}
        contentType="MOVIE"
        backHref="/"
      />
    </div>
  );
}


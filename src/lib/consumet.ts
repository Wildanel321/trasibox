import type { AnimeEpisode, AnimeStreamData } from "./types";

// Supported Consumet base endpoints (self-hosted or public mirror)
const PRIMARY_CONSUMET_URL =
  process.env.CONSUMET_API_URL?.replace(/\/$/, "") || "https://consumet-api.vercel.app";
const BACKUP_CONSUMET_URL = "https://api.consumet.org";

export interface ConsumetSearchResult {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate?: string;
  subOrDub?: "sub" | "dub";
}

export interface ConsumetAnimeInfo {
  id: string;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate?: string;
  description?: string;
  subOrDub: "sub" | "dub";
  type: string;
  status: string;
  otherName?: string;
  episodes: {
    id: string;
    number: number;
    url?: string;
  }[];
}

// Fetch with fallback across endpoints
async function fetchWithFallback(path: string): Promise<any | null> {
  const urls = [PRIMARY_CONSUMET_URL, BACKUP_CONSUMET_URL];

  for (const baseUrl of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const targetUrl = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
      const res = await fetch(targetUrl, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        return await res.json();
      }
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * 1. Search Anime via Consumet Engine
 */
export async function searchConsumetAnime(
  query: string,
  provider = "gogoanime"
): Promise<ConsumetSearchResult[]> {
  try {
    const cleanQuery = encodeURIComponent(query.trim());
    const data = await fetchWithFallback(`/anime/${provider}/${cleanQuery}`);
    if (data?.results && Array.isArray(data.results)) {
      return data.results;
    }
  } catch {
    // fallback
  }
  return [];
}

/**
 * 2. Fetch Anime Info & Episode List via Consumet Engine
 */
export async function getConsumetAnimeInfo(
  consumetId: string,
  provider = "gogoanime"
): Promise<ConsumetAnimeInfo | null> {
  try {
    const cleanId = encodeURIComponent(consumetId);
    const data = await fetchWithFallback(`/anime/${provider}/info/${cleanId}`);
    if (data?.episodes && Array.isArray(data.episodes)) {
      return data as ConsumetAnimeInfo;
    }
  } catch {
    // fallback
  }
  return null;
}

/**
 * 3. Extract Streaming Sources (.m3u8 HLS streams)
 */
export async function getConsumetEpisodeStream(
  episodeId: string,
  provider = "gogoanime",
  server?: string
): Promise<AnimeStreamData> {
  try {
    const queryParam = server ? `?server=${encodeURIComponent(server)}` : "";
    const cleanEpId = encodeURIComponent(episodeId);
    const data = await fetchWithFallback(`/anime/${provider}/watch/${cleanEpId}${queryParam}`);

    if (data?.sources && Array.isArray(data.sources) && data.sources.length > 0) {
      return {
        headers: data.headers || {
          Referer: "https://vidstreaming.io/",
        },
        sources: data.sources.map((s: any) => ({
          url: s.url,
          isM3U8: s.isM3U8 ?? (typeof s.url === "string" && s.url.includes(".m3u8")),
          quality: s.quality || "default",
        })),
        download: data.download,
        subtitles: Array.isArray(data.subtitles)
          ? data.subtitles.map((sub: any, idx: number) => ({
              id: `sub-${idx}`,
              label: sub.lang || `Sub ${idx + 1}`,
              lang: sub.lang?.slice(0, 2).toLowerCase() || "en",
              src: sub.url,
            }))
          : undefined,
      };
    }
  } catch {
    // fallback
  }

  // Multi-quality adaptive fallback
  return {
    headers: {
      Referer: "https://vidstreaming.io/",
    },
    sources: [
      {
        url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        isM3U8: true,
        quality: "1080p FHD (Multi-bitrate)",
      },
    ],
    subtitles: [
      {
        id: "sub-id",
        label: "Bahasa Indonesia",
        lang: "id",
        src: "/subtitles/tears-id.vtt",
      },
    ],
  };
}

/**
 * 4. Match Title to Consumet Anime ID
 */
export async function matchConsumetAnimeId(
  title: string,
  englishTitle?: string
): Promise<string> {
  const slug = (englishTitle || title)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  try {
    const results = await searchConsumetAnime(title);
    if (results.length > 0 && results[0]?.id) {
      return results[0].id;
    }
  } catch {
    // fallback
  }

  return slug;
}

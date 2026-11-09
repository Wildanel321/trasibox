import type { AnimeItem, AnimeEpisode } from "./types";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";
const ANILIST_GRAPHQL_URL = "https://graphql.anilist.co";

// High quality curated fallback anime dataset
export const CURATED_ANIME: AnimeItem[] = [
  {
    id: "20",
    malId: 20,
    consumetId: "naruto",
    title: "Naruto",
    englishTitle: "Naruto",
    japaneseTitle: "NARUTO -ナルト-",
    synopsis: "Naruto Uzumaki adalah seorang ninja muda yang hiperaktif dan sering dijauhi oleh penduduk desa Konoha karena di dalam tubuhnya tersegel monster Rubah Ekor Sembilan (Kyuubi). Bertekad untuk diakui oleh semua orang dan melindungi desanya, Naruto berjuang melewati berbagai rintangan untuk meraih cita-citanya menjadi Hokage terhebat.",
    episodesCount: 220,
    score: 8.0,
    rank: 600,
    popularity: 8,
    status: "Finished Airing",
    season: "Fall 2002",
    year: 2002,
    posterUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-dE6UHbFFg1A5.jpg",
    backdropUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20-HHxhPj5JD13a.jpg",
    trailerYoutubeId: "-G9BqkgZXRA",
    genres: ["Action", "Adventure", "Fantasy", "Martial Arts"],
    studios: ["Studio Pierrot"],
    type: "TV",
    episodes: Array.from({ length: 220 }, (_, i) => ({
      id: `naruto-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
  {
    id: "1735",
    malId: 1735,
    consumetId: "naruto-shippuuden",
    title: "Naruto: Shippuuden",
    englishTitle: "Naruto Shippuden",
    japaneseTitle: "NARUTO -ナルト- 疾風伝",
    synopsis: "Setelah dua setengah tahun berlatih intensif bersama Jiraiya, Naruto Uzumaki kembali ke Desa Konoha dalam usia remaja. Namun ancaman besar dari organisasi misterius Akatsuki yang memburu para Jinchuuriki mulai bergerak dan memicu perang dunia ninja terbesar.",
    episodesCount: 500,
    score: 8.28,
    rank: 310,
    popularity: 15,
    status: "Finished Airing",
    season: "Winter 2007",
    year: 2007,
    posterUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1735-F5584iERx2Er.jpg",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: "1nydxb4I4nc",
    genres: ["Action", "Adventure", "Fantasy"],
    studios: ["Studio Pierrot"],
    type: "TV",
    episodes: Array.from({ length: 500 }, (_, i) => ({
      id: `naruto-shippuuden-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
  {
    id: "52991",
    malId: 52991,
    consumetId: "sousou-no-frieren",
    title: "Sousou no Frieren",
    englishTitle: "Frieren: Beyond Journey's End",
    japaneseTitle: "葬送のフリーレン",
    synopsis: "Setelah kelompok pahlawan berhasil mengalahkan Raja Iblis dan membawa perdamaian ke dunia, penyihir elf Frieren berpisah dengan rekan-rekannya. Karena umur bangsa elf yang hampir abadi, 50 tahun kemudian dia kembali dan menyaksikan kematian rekannya karena usia tua. Menyadari keterbatasan waktu manusia, Frieren memulai perjalanan baru untuk memahami arti ikatan manusia.",
    episodesCount: 28,
    score: 9.35,
    rank: 1,
    popularity: 180,
    status: "Finished Airing",
    season: "Fall 2023",
    year: 2023,
    posterUrl: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: "qgQunxD0qMo",
    genres: ["Adventure", "Drama", "Fantasy"],
    studios: ["Madhouse"],
    type: "TV",
    episodes: Array.from({ length: 28 }, (_, i) => ({
      id: `sousou-no-frieren-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
  {
    id: "52299",
    malId: 52299,
    consumetId: "ore-dake-level-up-na-ken",
    title: "Ore dake Level Up na Ken",
    englishTitle: "Solo Leveling",
    japaneseTitle: "俺だけレベルアップな件",
    synopsis: "Di dunia di mana monster bermunculan dari gerbang dimensi dan para hunter bertarung melawan mereka, Sung Jin-Woo dikenal sebagai 'Hunter Terlemah di Dunia'. Setelah terjebak dalam dungeon ganda yang mematikan dan nyaris tewas, sebuah layar quest misterius muncul hanya di hadapannya, memberinya kekuatan unik untuk terus naik level tanpa batas.",
    episodesCount: 12,
    score: 8.42,
    rank: 145,
    popularity: 88,
    status: "Finished Airing",
    season: "Winter 2024",
    year: 2024,
    posterUrl: "https://cdn.myanimelist.net/images/anime/1540/141444l.jpg",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: "K9s_m_s2VHQ",
    genres: ["Action", "Fantasy"],
    studios: ["A-1 Pictures"],
    type: "TV",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      id: `ore-dake-level-up-na-ken-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
  {
    id: "51009",
    malId: 51009,
    consumetId: "jujutsu-kaisen-2nd-season",
    title: "Jujutsu Kaisen Season 2",
    englishTitle: "Jujutsu Kaisen Season 2 (Shibuya Incident)",
    japaneseTitle: "呪術廻戦 懐玉・玉折／渋谷事変",
    synopsis: "Masa lalu Satoru Gojo dan Suguru Geto di masa sekolah terungkap saat mereka mengawal Star Plasma Vessel. Beberapa tahun kemudian di Shibuya, perang kutukan terbesar meletus dalam malam Halloween ketika rencana jahat untuk menyegel Gojo mulai dilancarkan.",
    episodesCount: 23,
    score: 8.82,
    rank: 30,
    popularity: 42,
    status: "Finished Airing",
    season: "Summer 2023",
    year: 2023,
    posterUrl: "https://cdn.myanimelist.net/images/anime/1792/138022l.jpg",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: "ayTnvVvhyNc",
    genres: ["Action", "Fantasy", "Supernatural"],
    studios: ["MAPPA"],
    type: "TV",
    episodes: Array.from({ length: 23 }, (_, i) => ({
      id: `jujutsu-kaisen-2nd-season-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
  {
    id: "269",
    malId: 269,
    consumetId: "bleach",
    title: "BLEACH",
    englishTitle: "Bleach",
    japaneseTitle: "BLEACH -ブリーチ-",
    synopsis: "Ichigo Kurosaki adalah seorang siswa SMA yang dapat melihat roh. Ketika keluarganya diserang oleh Hollow, ia mendapatkan kekuatan Shinigami dari Rukia Kuchiki dan memulai perjalanannya melindungi dunia manusia dan Soul Society.",
    episodesCount: 366,
    score: 7.92,
    rank: 650,
    popularity: 11,
    status: "Finished Airing",
    season: "Fall 2004",
    year: 2004,
    posterUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx269-eQxRmWvBlnH3.png",
    backdropUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/269.jpg",
    trailerYoutubeId: "oZ67d++v4hg",
    genres: ["Action", "Adventure", "Supernatural"],
    studios: ["Studio Pierrot"],
    type: "TV",
    episodes: Array.from({ length: 366 }, (_, i) => ({
      id: `bleach-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
  {
    id: "21",
    malId: 21,
    consumetId: "one-piece",
    title: "One Piece",
    englishTitle: "One Piece",
    japaneseTitle: "ONE PIECE",
    synopsis: "Monkey D. Luffy, seorang pemuda yang memperoleh tubuh elastis dari Buah Iblis, berlayar melintasi Grand Line bersama kru Bajak Laut Topi Jerami untuk menemukan harta karun legendaris 'One Piece' dan menjadi Raja Bajak Laut berikutnya.",
    episodesCount: 1100,
    score: 8.73,
    rank: 45,
    popularity: 18,
    status: "Currently Airing",
    season: "Fall 1999",
    year: 1999,
    posterUrl: "https://cdn.myanimelist.net/images/anime/1244/138851l.jpg",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: "MCb13lbK6CE",
    genres: ["Action", "Adventure", "Fantasy"],
    studios: ["Toei Animation"],
    type: "TV",
    episodes: Array.from({ length: 1100 }, (_, i) => ({
      id: `one-piece-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
];

// Helper to format Jikan raw response to clean AnimeItem
export function formatJikanAnime(item: any): AnimeItem {
  const malId = item.mal_id;
  const title = item.title || item.title_english || "Untitled Anime";
  const englishTitle = item.title_english || undefined;
  const japaneseTitle = item.title_japanese || undefined;

  const slug = (item.title_english || item.title || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const totalEp = item.episodes || 12;

  return {
    id: String(malId),
    malId,
    consumetId: slug,
    title,
    englishTitle,
    japaneseTitle,
    synopsis: item.synopsis || "Sinopsis anime belum tersedia.",
    episodesCount: item.episodes ?? null,
    score: item.score ? parseFloat(item.score.toFixed(2)) : 8.0,
    rank: item.rank || undefined,
    popularity: item.popularity || undefined,
    status: item.status || "Unknown",
    season: item.season ? `${item.season} ${item.year || ""}`.trim() : undefined,
    year: item.year || (item.aired?.from ? new Date(item.aired.from).getFullYear() : undefined),
    posterUrl:
      item.images?.webp?.large_image_url ||
      item.images?.jpg?.large_image_url ||
      item.images?.jpg?.image_url ||
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    backdropUrl:
      item.trailer?.images?.maximum_image_url ||
      item.images?.jpg?.large_image_url ||
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: item.trailer?.youtube_id || undefined,
    genres: item.genres?.map((g: any) => g.name) || ["Animation", "Action"],
    studios: item.studios?.map((s: any) => s.name) || ["Studio Anime"],
    type: item.type || "TV",
    episodes: Array.from({ length: Math.min(totalEp, 1200) }, (_, i) => ({
      id: `${slug}-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  };
}

// Helper to format AniList raw response to AnimeItem
function formatAniListMedia(media: any): AnimeItem {
  const malId = media.idMal || media.id;
  const title = media.title?.romaji || media.title?.english || "Untitled Anime";
  const englishTitle = media.title?.english || undefined;
  const japaneseTitle = media.title?.native || undefined;

  const slug = (media.title?.english || media.title?.romaji || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const cleanDesc = (media.description || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const totalEp = media.episodes || 12;

  return {
    id: String(malId),
    malId,
    consumetId: slug,
    title,
    englishTitle,
    japaneseTitle,
    synopsis: cleanDesc || "Sinopsis anime belum tersedia.",
    episodesCount: media.episodes || null,
    score: media.averageScore ? parseFloat((media.averageScore / 10).toFixed(1)) : 8.0,
    popularity: media.popularity,
    status: media.status === "FINISHED" ? "Finished Airing" : media.status === "RELEASING" ? "Currently Airing" : media.status || "Unknown",
    season: media.seasonYear ? `${media.season || ""} ${media.seasonYear}`.trim() : undefined,
    year: media.seasonYear || media.startDate?.year,
    posterUrl:
      media.coverImage?.extraLarge ||
      media.coverImage?.large ||
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    backdropUrl:
      media.bannerImage ||
      media.coverImage?.extraLarge ||
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: media.trailer?.site === "youtube" ? media.trailer?.id : undefined,
    genres: media.genres || ["Animation", "Action"],
    studios: media.studios?.nodes?.map((s: any) => s.name) || ["Studio Anime"],
    type: media.format || "TV",
    episodes: Array.from({ length: Math.min(totalEp, 1200) }, (_, i) => ({
      id: `${slug}-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  };
}

// Fetch with strict timeout helper
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 2500): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Search AniList GraphQL (Fast, reliable, covers all anime)
async function searchAniList(query: string, limit = 24): Promise<AnimeItem[]> {
  const gql = `
    query ($search: String, $perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          idMal
          title { romaji english native }
          coverImage { extraLarge large }
          bannerImage
          averageScore
          episodes
          status
          genres
          season
          seasonYear
          studios(isMain: true) { nodes { name } }
          description
          trailer { id site }
        }
      }
    }
  `;

  try {
    const res = await fetchWithTimeout(ANILIST_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: gql, variables: { search: query, perPage: limit } }),
    }, 4000);

    if (res.ok) {
      const json = await res.json();
      const mediaList = json.data?.Page?.media;
      if (Array.isArray(mediaList) && mediaList.length > 0) {
        return mediaList.map(formatAniListMedia);
      }
    }
  } catch (err) {
    console.warn("AniList search failed:", err);
  }
  return [];
}

// Get Popular / Top from AniList
async function getAniListPopular(limit = 24): Promise<AnimeItem[]> {
  const gql = `
    query ($perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(type: ANIME, sort: SCORE_DESC) {
          id
          idMal
          title { romaji english native }
          coverImage { extraLarge large }
          bannerImage
          averageScore
          episodes
          status
          genres
          season
          seasonYear
          studios(isMain: true) { nodes { name } }
          description
          trailer { id site }
        }
      }
    }
  `;

  try {
    const res = await fetchWithTimeout(ANILIST_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: gql, variables: { perPage: limit } }),
    }, 4000);

    if (res.ok) {
      const json = await res.json();
      const mediaList = json.data?.Page?.media;
      if (Array.isArray(mediaList) && mediaList.length > 0) {
        return mediaList.map(formatAniListMedia);
      }
    }
  } catch (err) {
    console.warn("AniList popular failed:", err);
  }
  return [];
}

// Get Seasonal from AniList
async function getAniListSeasonal(limit = 24): Promise<AnimeItem[]> {
  const gql = `
    query ($perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
          id
          idMal
          title { romaji english native }
          coverImage { extraLarge large }
          bannerImage
          averageScore
          episodes
          status
          genres
          season
          seasonYear
          studios(isMain: true) { nodes { name } }
          description
          trailer { id site }
        }
      }
    }
  `;

  try {
    const res = await fetchWithTimeout(ANILIST_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: gql, variables: { perPage: limit } }),
    }, 4000);

    if (res.ok) {
      const json = await res.json();
      const mediaList = json.data?.Page?.media;
      if (Array.isArray(mediaList) && mediaList.length > 0) {
        return mediaList.map(formatAniListMedia);
      }
    }
  } catch (err) {
    console.warn("AniList seasonal failed:", err);
  }
  return [];
}

// 1. Fetch Top Anime across all anime
export async function getTopAnime(page = 1, limit = 24): Promise<AnimeItem[]> {
  // 1. Fast unblocked AniList
  const anilistData = await getAniListPopular(limit);
  if (anilistData.length > 0) {
    return anilistData;
  }

  // 2. Try Jikan if AniList had an error
  try {
    const res = await fetchWithTimeout(`${JIKAN_BASE_URL}/top/anime?page=${page}&limit=${limit}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    }, 2000);

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map(formatJikanAnime);
      }
    }
  } catch {
    // ignore
  }

  return CURATED_ANIME;
}

// 2. Fetch Seasonal Anime across all current anime
export async function getSeasonalAnime(page = 1, limit = 24): Promise<AnimeItem[]> {
  // 1. Fast unblocked AniList
  const anilistData = await getAniListSeasonal(limit);
  if (anilistData.length > 0) {
    return anilistData;
  }

  // 2. Try Jikan if AniList had an error
  try {
    const res = await fetchWithTimeout(`${JIKAN_BASE_URL}/seasons/now?page=${page}&limit=${limit}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    }, 2000);

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map(formatJikanAnime);
      }
    }
  } catch {
    // ignore
  }

  return CURATED_ANIME;
}

// 3. Search Anime across ALL anime in the world
export async function searchAnimeJikan(query: string, page = 1, limit = 24): Promise<AnimeItem[]> {
  if (!query || query.trim().length === 0) {
    return CURATED_ANIME;
  }

  // 1. Fast unblocked AniList (Instant 150ms, covers all anime ever made)
  const anilistResults = await searchAniList(query.trim(), limit);
  if (anilistResults.length > 0) {
    return anilistResults;
  }

  // 2. Try Jikan
  try {
    const encoded = encodeURIComponent(query.trim());
    const res = await fetchWithTimeout(`${JIKAN_BASE_URL}/anime?q=${encoded}&page=${page}&limit=${limit}&order_by=popularity`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    }, 2000);

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map(formatJikanAnime);
      }
    }
  } catch {
    // ignore
  }

  // 3. Local Curated search
  const q = query.toLowerCase();
  return CURATED_ANIME.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      (a.englishTitle && a.englishTitle.toLowerCase().includes(q)) ||
      a.genres.some((g) => g.toLowerCase().includes(q))
  );
}

// 4. Fetch Anime by ID (Accepts MAL ID, AniList ID, or slug)
export async function getAnimeById(malId: string | number): Promise<AnimeItem | null> {
  const idStr = String(malId);
  const localMatch = CURATED_ANIME.find(
    (a) => a.id === idStr || String(a.malId) === idStr || a.consumetId === idStr
  );

  // 1. Fast AniList lookup by ID or Search
  const isNum = /^\d+$/.test(idStr);
  const gql = isNum
    ? `
      query ($idMal: Int) {
        Media(idMal: $idMal, type: ANIME) {
          id
          idMal
          title { romaji english native }
          coverImage { extraLarge large }
          bannerImage
          averageScore
          episodes
          status
          genres
          season
          seasonYear
          studios(isMain: true) { nodes { name } }
          description
          trailer { id site }
        }
      }
    `
    : `
      query ($search: String) {
        Media(search: $search, type: ANIME) {
          id
          idMal
          title { romaji english native }
          coverImage { extraLarge large }
          bannerImage
          averageScore
          episodes
          status
          genres
          season
          seasonYear
          studios(isMain: true) { nodes { name } }
          description
          trailer { id site }
        }
      }
    `;

  try {
    const res = await fetchWithTimeout(ANILIST_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        query: gql,
        variables: isNum ? { idMal: parseInt(idStr, 10) } : { search: idStr },
      }),
    }, 4000);

    if (res.ok) {
      const json = await res.json();
      if (json.data?.Media) {
        const item = formatAniListMedia(json.data.Media);
        if (localMatch?.consumetId) {
          item.consumetId = localMatch.consumetId;
        }
        return item;
      }
    }
  } catch {
    // ignore
  }

  // 2. Try Jikan if AniList missed
  try {
    const res = await fetchWithTimeout(`${JIKAN_BASE_URL}/anime/${idStr}/full`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    }, 2000);

    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        const parsed = formatJikanAnime(json.data);
        if (localMatch?.consumetId) {
          parsed.consumetId = localMatch.consumetId;
        }
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return localMatch || null;
}

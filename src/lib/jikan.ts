import { AnimeItem, AnimeEpisode } from "./types";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

// High quality curated fallback anime dataset
export const CURATED_ANIME: AnimeItem[] = [
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
    id: "54234",
    malId: 54234,
    consumetId: "kimetsu-no-yaiba-hashira-geiko-hen",
    title: "Kimetsu no Yaiba: Hashira Geiko-hen",
    englishTitle: "Demon Slayer: Hashira Training Arc",
    japaneseTitle: "鬼滅の刃 柱稽古編",
    synopsis: "Tanjiro dan para pembasmi iblis menjalani latihan fisik dan spiritual intensif di bawah bimbingan para Hashira untuk bersiap menghadapi perang akhir melawan Muzan Kibutsuji dan iblis bulan atas.",
    episodesCount: 8,
    score: 8.21,
    rank: 210,
    popularity: 95,
    status: "Finished Airing",
    season: "Spring 2024",
    year: 2024,
    posterUrl: "https://cdn.myanimelist.net/images/anime/1065/141973l.jpg",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: "c_fI_8mUfBg",
    genres: ["Action", "Fantasy"],
    studios: ["ufotable"],
    type: "TV",
    episodes: Array.from({ length: 8 }, (_, i) => ({
      id: `kimetsu-no-yaiba-hashira-geiko-hen-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
  {
    id: "16498",
    malId: 16498,
    consumetId: "shingeki-no-kyojin",
    title: "Shingeki no Kyojin",
    englishTitle: "Attack on Titan",
    japaneseTitle: "進撃の巨人",
    synopsis: "Setelah dinding raksasa pelindung umat manusia dihancurkan oleh Titan Kolosal, Eren Yeager bersumpah memusnahkan seluruh Titan dari muka bumi setelah menyaksikan ibunya dimangsa di depan matanya.",
    episodesCount: 25,
    score: 8.54,
    rank: 110,
    popularity: 1,
    status: "Finished Airing",
    season: "Spring 2013",
    year: 2013,
    posterUrl: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: "LHtdKWJgev4",
    genres: ["Action", "Drama", "Suspense"],
    studios: ["Wit Studio"],
    type: "TV",
    episodes: Array.from({ length: 25 }, (_, i) => ({
      id: `shingeki-no-kyojin-episode-${i + 1}`,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
    })),
  },
  {
    id: "50265",
    malId: 50265,
    consumetId: "spy-x-family",
    title: "Spy x Family",
    englishTitle: "SPY x FAMILY",
    japaneseTitle: "SPY×FAMILY",
    synopsis: "Demi menjaga perdamaian antara Westalis dan Ostania, mata-mata nomor satu bersandi 'Twilight' harus membangun keluarga samaran dalam Operasi Strix. Tanpa ia sadari, istri yang ia pilih adalah pembunuh bayaran ulung, dan anak adopsinya adalah cenayang pembaca pikiran.",
    episodesCount: 12,
    score: 8.48,
    rank: 130,
    popularity: 38,
    status: "Finished Airing",
    season: "Spring 2022",
    year: 2022,
    posterUrl: "https://cdn.myanimelist.net/images/anime/1441/122795l.jpg",
    backdropUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1920&auto=format&fit=crop&q=80",
    trailerYoutubeId: "ofXigq9aIpo",
    genres: ["Action", "Comedy"],
    studios: ["Wit Studio", "CloverWorks"],
    type: "TV",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      id: `spy-x-family-episode-${i + 1}`,
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
    episodes: Array.from({ length: 50 }, (_, i) => ({
      id: `one-piece-episode-${1070 + i}`,
      episodeNumber: 1070 + i,
      title: `Episode ${1070 + i}`,
    })),
  },
];

// Map Jikan raw response to clean AnimeItem
export function formatJikanAnime(item: any): AnimeItem {
  const malId = item.mal_id;
  const title = item.title || item.title_english || "Untitled Anime";
  const englishTitle = item.title_english || undefined;
  const japaneseTitle = item.title_japanese || undefined;

  // Auto-slugify for Consumet matching
  const slug = (item.title_english || item.title || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

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
    episodes: item.episodes
      ? Array.from({ length: Math.min(item.episodes, 24) }, (_, i) => ({
          id: `${slug}-episode-${i + 1}`,
          episodeNumber: i + 1,
          title: `Episode ${i + 1}`,
        }))
      : undefined,
  };
}

// Fetch Top Anime from Jikan API v4
export async function getTopAnime(page = 1, limit = 20): Promise<AnimeItem[]> {
  try {
    const res = await fetch(`${JIKAN_BASE_URL}/top/anime?page=${page}&limit=${limit}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map(formatJikanAnime);
      }
    }
  } catch (error) {
    console.warn("Jikan getTopAnime failed, returning curated fallback:", error);
  }
  return CURATED_ANIME;
}

// Fetch Seasonal Anime from Jikan API v4
export async function getSeasonalAnime(page = 1, limit = 20): Promise<AnimeItem[]> {
  try {
    const res = await fetch(`${JIKAN_BASE_URL}/seasons/now?page=${page}&limit=${limit}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map(formatJikanAnime);
      }
    }
  } catch (error) {
    console.warn("Jikan getSeasonalAnime failed, returning curated fallback:", error);
  }
  return CURATED_ANIME.slice(0, 5);
}

// Search Anime from Jikan API v4
export async function searchAnimeJikan(query: string, page = 1, limit = 20): Promise<AnimeItem[]> {
  if (!query || query.trim().length === 0) {
    return CURATED_ANIME;
  }

  try {
    const encoded = encodeURIComponent(query.trim());
    const res = await fetch(`${JIKAN_BASE_URL}/anime?q=${encoded}&page=${page}&limit=${limit}&order_by=popularity`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map(formatJikanAnime);
      }
    }
  } catch (error) {
    console.warn("Jikan searchAnime failed, filtering curated fallback:", error);
  }

  // Fallback search over curated
  const q = query.toLowerCase();
  return CURATED_ANIME.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      (a.englishTitle && a.englishTitle.toLowerCase().includes(q)) ||
      a.genres.some((g) => g.toLowerCase().includes(q))
  );
}

// Fetch Single Anime details by MAL ID from Jikan API v4
export async function getAnimeById(malId: string | number): Promise<AnimeItem | null> {
  const idStr = String(malId);
  const localMatch = CURATED_ANIME.find((a) => a.id === idStr || String(a.malId) === idStr || a.consumetId === idStr);

  try {
    const res = await fetch(`${JIKAN_BASE_URL}/anime/${idStr}/full`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

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
  } catch (error) {
    console.warn(`Jikan getAnimeById(${idStr}) failed:`, error);
  }

  return localMatch || null;
}

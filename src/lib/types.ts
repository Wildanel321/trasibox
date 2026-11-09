export type Role = "USER" | "ADMIN";
export type ContentStatus = "DRAFT" | "IN_REVIEW" | "PUBLISHED";
export type RightsStatus = "PENDING" | "APPROVED" | "REJECTED";
export type LicenseType = "PUBLIC_DOMAIN" | "CREATIVE_COMMONS" | "DIRECT_DISTRIBUTOR" | "OPEN_CINEMA";

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface CastMember {
  name: string;
  role: string;
  character?: string;
  avatarUrl?: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  slug: string;
  synopsis: string;
  releaseYear: number;
  durationMinutes: number;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  viewCount: number;
  status: ContentStatus;
  rightsVerified: boolean;
  hlsStreamUrl: string;
  genres: Genre[];
  cast?: CastMember[];
  directors?: string[];
  subtitles?: { id: string; label: string; lang: string; src: string }[];
  qualityLevels?: { label: string; resolution: string }[];
}

export interface Episode {
  id: string;
  seasonId: string;
  episodeNumber: number;
  title: string;
  synopsis?: string;
  durationMinutes: number;
  thumbnailUrl: string;
  hlsStreamUrl: string;
  progressSeconds?: number;
}

export interface Season {
  id: string;
  seriesId: string;
  seasonNumber: number;
  title: string;
  synopsis?: string;
  posterUrl?: string;
  episodes: Episode[];
}

export interface Series {
  id: string;
  title: string;
  originalTitle?: string;
  slug: string;
  synopsis: string;
  firstAirYear: number;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  status: ContentStatus;
  rightsVerified: boolean;
  genres: Genre[];
  seasons: Season[];
  cast?: CastMember[];
  creators?: string[];
}

export interface WatchHistoryItem {
  id: string;
  userId: string;
  movieId?: string;
  episodeId?: string;
  movie?: Movie;
  episode?: Episode;
  series?: Series;
  progressSeconds: number;
  durationSeconds: number;
  completed: boolean;
  updatedAt: string;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  movieId?: string;
  seriesId?: string;
  movie?: Movie;
  series?: Series;
  createdAt: string;
}

export interface ProcessingJob {
  id: string;
  sourceFileName: string;
  targetFormat: string;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  progress: number;
  durationSeconds: number;
  fileSizeMb: number;
  errorMessage?: string;
  createdAt: string;
}

export interface RightsRecord {
  id: string;
  contentTitle: string;
  contentType: "MOVIE" | "SERIES";
  contentId: string;
  distributorName: string;
  licenseType: LicenseType;
  proofDocumentUrl: string;
  expiryDate?: string;
  status: RightsStatus;
  notes?: string;
  verifiedBy?: string;
  createdAt: string;
}

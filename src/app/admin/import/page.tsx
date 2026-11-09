"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DownloadCloud,
  Search,
  Check,
  AlertCircle,
  Plus,
  Star,
  Film,
  Sparkles,
  Tv,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminImportPage() {
  const [importerMode, setImporterMode] = useState<"tmdb" | "anime">("anime");
  const [idOrQuery, setIdOrQuery] = useState("52991");
  const [isLoading, setIsLoading] = useState(false);
  const [importedData, setImportedData] = useState<any | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    setImportedData(null);

    try {
      const res = await fetch("/api/v1/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId: idOrQuery,
          query: idOrQuery,
          provider: importerMode === "anime" ? "jikan" : "tmdb",
          type: importerMode === "anime" ? "anime" : "movie",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setImportedData(json.data);
      } else {
        setErrorMsg(json.error || "Gagal menarik data");
      }
    } catch {
      setErrorMsg("Koneksi gagal saat menghubungi server metadata");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToCatalog = () => {
    setSuccessMsg(
      importerMode === "anime"
        ? "Metadata Anime & Pemetaan Consumet berhasil disimpan ke antrean katalog TREASIBOX!"
        : "Metadata TMDB berhasil disimpan ke antrean katalog TREASIBOX."
    );
    setTimeout(() => {
      setImportedData(null);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-white">
      <div className="border-b border-white/8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <DownloadCloud className="w-7 h-7 text-[#7C5CFC]" />
          <span>Universal Content Metadata Importer</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
          Tarik metadata film bioskop via TMDB atau katalog anime lengkap via Jikan API v4 & Consumet Streaming Engine.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setImporterMode("anime");
            setIdOrQuery("52991");
            setImportedData(null);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            importerMode === "anime"
              ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/30"
              : "bg-[#18181B] text-[#A1A1AA] hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Jikan (MAL) & Consumet (Anime)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setImporterMode("tmdb");
            setIdOrQuery("290098");
            setImportedData(null);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            importerMode === "tmdb"
              ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/30"
              : "bg-[#18181B] text-[#A1A1AA] hover:text-white"
          }`}
        >
          <Film className="w-4 h-4" />
          <span>TMDB (Film & TV Series)</span>
        </button>
      </div>

      {/* Input Search Form */}
      <div className="p-6 rounded-2xl bg-[#111114] border border-white/8 space-y-4">
        <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              required
              value={idOrQuery}
              onChange={(e) => setIdOrQuery(e.target.value)}
              placeholder={
                importerMode === "anime"
                  ? "Masukkan MAL ID atau Judul Anime (contoh: 52991, Solo Leveling, One Piece)..."
                  : "Masukkan TMDB ID film (contoh: 290098, 45745)..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC]"
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="gap-2">
            <DownloadCloud className="w-4 h-4" />
            <span>Tarik Metadata</span>
          </Button>
        </form>

        {/* Preset suggestions */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#A1A1AA]">
          <span>Preset Rekomendasi:</span>
          {importerMode === "anime" ? (
            <>
              <button
                type="button"
                onClick={() => setIdOrQuery("52991")}
                className="px-2 py-0.5 rounded bg-[#18181B] hover:text-white border border-white/5"
              >
                52991 (Sousou no Frieren)
              </button>
              <button
                type="button"
                onClick={() => setIdOrQuery("52299")}
                className="px-2 py-0.5 rounded bg-[#18181B] hover:text-white border border-white/5"
              >
                52299 (Solo Leveling)
              </button>
              <button
                type="button"
                onClick={() => setIdOrQuery("51009")}
                className="px-2 py-0.5 rounded bg-[#18181B] hover:text-white border border-white/5"
              >
                51009 (Jujutsu Kaisen S2)
              </button>
              <button
                type="button"
                onClick={() => setIdOrQuery("21")}
                className="px-2 py-0.5 rounded bg-[#18181B] hover:text-white border border-white/5"
              >
                21 (One Piece)
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIdOrQuery("290098")}
                className="px-2 py-0.5 rounded bg-[#18181B] hover:text-white border border-white/5"
              >
                290098 (Tears of Steel)
              </button>
              <button
                type="button"
                onClick={() => setIdOrQuery("45745")}
                className="px-2 py-0.5 rounded bg-[#18181B] hover:text-white border border-white/5"
              >
                45745 (Sintel)
              </button>
            </>
          )}
        </div>
      </div>

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Imported Preview Card */}
      {importedData && (
        <div className="p-6 rounded-2xl bg-[#111114] border border-[#7C5CFC]/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/8 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Check className="w-4 h-4" />
              <span>Metadata Terverifikasi dari {importerMode === "anime" ? "Jikan v4 & Consumet" : "TMDB"}</span>
            </div>
            <span className="text-[11px] text-[#A1A1AA]">
              {importerMode === "anime" ? `MAL #${importedData.malId}` : `TMDB #${importedData.tmdbId}`}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster Preview */}
            <div className="w-36 sm:w-44 aspect-[2/3] relative rounded-xl overflow-hidden border border-white/10 shrink-0 bg-[#18181B]">
              <Image
                src={importedData.posterUrl}
                alt={importedData.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Info Preview */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {importedData.englishTitle || importedData.title}
                </h3>
                {importedData.japaneseTitle && (
                  <p className="text-xs text-[#A1A1AA]">{importedData.japaneseTitle}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
                <span className="inline-flex items-center gap-1 text-amber-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {importedData.rating}
                </span>
                <span>•</span>
                <span>{importedData.releaseYear}</span>
                {importedData.totalEpisodes && (
                  <>
                    <span>•</span>
                    <span className="text-[#A78BFA] font-medium">
                      {importedData.totalEpisodes} Episode (Consumet Ready)
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {importedData.genres?.map((g: string) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#A1A1AA] line-clamp-3 leading-relaxed">
                {importedData.synopsis}
              </p>

              <div className="pt-2">
                <Button onClick={handleSaveToCatalog} className="gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Simpan ke Database TREASIBOX</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DownloadCloud, Search, Check, AlertCircle, Plus, Star, Film } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminImportPage() {
  const [tmdbId, setTmdbId] = useState("290098");
  const [isLoading, setIsLoading] = useState(false);
  const [importedData, setImportedData] = useState<any | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFetchTMDB = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg("");
    setImportedData(null);

    try {
      const res = await fetch("/api/v1/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId, type: "movie" }),
      });
      const json = await res.json();
      if (json.success) {
        setImportedData(json.data);
      }
    } catch {
      // error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToCatalog = () => {
    setSuccessMsg("Metadata TMDB berhasil disimpan ke antrean katalog TREASIBOX.");
    setTimeout(() => {
      setImportedData(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-white/8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <DownloadCloud className="w-7 h-7 text-[#7C5CFC]" />
          <span>TMDB Metadata Importer</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
          Tarik metadata film, poster berkualitas 2:3, backdrop 16:9, dan deskripsi sinopsis langsung dari database TMDB secara terstandarisasi.
        </p>
      </div>

      {/* Input Search Form */}
      <div className="p-6 rounded-2xl bg-[#111114] border border-white/8 space-y-4">
        <form onSubmit={handleFetchTMDB} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              required
              value={tmdbId}
              onChange={(e) => setTmdbId(e.target.value)}
              placeholder="Masukkan TMDB ID film (contoh: 290098, 45745)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC]"
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="gap-2">
            <DownloadCloud className="w-4 h-4" />
            <span>Tarik Metadata</span>
          </Button>
        </form>

        <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
          <span>Preset ID Film:</span>
          <button
            type="button"
            onClick={() => setTmdbId("290098")}
            className="px-2 py-0.5 rounded bg-[#18181B] hover:text-white border border-white/5"
          >
            290098 (Tears of Steel)
          </button>
          <button
            type="button"
            onClick={() => setTmdbId("45745")}
            className="px-2 py-0.5 rounded bg-[#18181B] hover:text-white border border-white/5"
          >
            45745 (Sintel)
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Preview Card */}
      {importedData && (
        <div className="p-6 rounded-2xl bg-[#111114] border border-white/8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/8 pb-4">
            <span className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider">
              Pratinjau Metadata Terverifikasi
            </span>
            <Button size="sm" onClick={handleSaveToCatalog} className="gap-2">
              <Plus className="w-4 h-4" />
              <span>Simpan ke Database</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-36 aspect-[2/3] rounded-xl overflow-hidden bg-[#18181B] border border-white/10 flex-shrink-0">
              <Image
                src={importedData.posterUrl}
                alt={importedData.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 flex-1 text-xs">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{importedData.title}</h3>
                <p className="text-zinc-400 italic">{importedData.originalTitle}</p>
              </div>

              <div className="flex items-center gap-3 text-zinc-300">
                <span>{importedData.releaseYear}</span>
                <span>•</span>
                <span>{importedData.durationMinutes} Menit</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {importedData.rating}
                </span>
                <span>•</span>
                <span>{importedData.genres.join(", ")}</span>
              </div>

              <p className="text-zinc-300 leading-relaxed text-sm">
                {importedData.synopsis}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Tv, CheckCircle2 } from "lucide-react";
import { SAMPLE_SERIES } from "@/lib/data";
import { Series } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { StatusBadge, RatingBadge } from "@/components/ui/Badge";

export default function AdminSeriesPage() {
  const [seriesList, setSeriesList] = useState<Series[]>(SAMPLE_SERIES);

  const handleDelete = (id: string) => {
    if (confirm("Hapus serial TV ini dari database?")) {
      setSeriesList((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Tv className="w-7 h-7 text-sky-400" />
            <span>Katalog Serial TV</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Kelola serial TV multi-season, daftar episode, dan episode stream links.
          </p>
        </div>

        <Button className="gap-2 self-start shadow-lg shadow-[#7C5CFC]/25">
          <Plus className="w-4 h-4" />
          <span>Tambah Serial</span>
        </Button>
      </div>

      <div className="bg-[#111114] border border-white/8 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18181B] text-[#A1A1AA] uppercase border-b border-white/8 text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Serial & Poster</th>
                <th className="py-3.5 px-4">Tahun Rilis</th>
                <th className="py-3.5 px-4">Season & Episode</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {seriesList.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-[#18181B] flex-shrink-0 border border-white/10">
                      <Image
                        src={s.posterUrl}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{s.title}</div>
                      <div className="text-[11px] text-[#A1A1AA]">
                        {s.genres.map((g) => g.name).join(", ")}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">{s.firstAirYear}</td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-white">{s.seasons.length} Season</span>
                    <span className="text-zinc-500 text-[11px] block">
                      {s.seasons.reduce((acc, sea) => acc + sea.episodes.length, 0)} Episode
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <RatingBadge rating={s.rating} />
                  </td>

                  <td className="py-3 px-4">
                    <StatusBadge status={s.status} />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/series/${s.id}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded-lg bg-[#18181B] hover:bg-white/10 text-white text-[11px] border border-white/10"
                      >
                        Lihat Halaman
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg bg-[#18181B] hover:bg-rose-600 text-white border border-white/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

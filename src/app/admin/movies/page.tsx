"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Edit2, Play, CheckCircle2, AlertCircle, Eye } from "lucide-react";
import { SAMPLE_MOVIES } from "@/lib/data";
import { Movie } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { StatusBadge, RatingBadge } from "@/components/ui/Badge";
import { formatDuration } from "@/lib/utils";

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>(SAMPLE_MOVIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newYear, setNewYear] = useState("2024");
  const [newDuration, setNewDuration] = useState("90");
  const [newSynopsis, setNewSynopsis] = useState("");
  const [newStreamUrl, setNewStreamUrl] = useState("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");

  const handleDelete = (id: string) => {
    if (confirm("Hapus judul film ini dari database?")) {
      setMovies((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleTogglePublish = (id: string) => {
    setMovies((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          if (!m.rightsVerified && m.status !== "PUBLISHED") {
            alert("PERINGATAN: Film ini belum memiliki status verifikasi hak siar (APPROVED). Anda harus menyetujui hak siar di menu 'Verifikasi Hak Siar' sebelum publikasi.");
            return m;
          }
          return {
            ...m,
            status: m.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
          };
        }
        return m;
      })
    );
  };

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    const movie: Movie = {
      id: `mov-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      synopsis: newSynopsis || "Sinopsis film belum ditambahkan.",
      releaseYear: parseInt(newYear) || 2024,
      durationMinutes: parseInt(newDuration) || 90,
      posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80",
      backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&auto=format&fit=crop&q=80",
      rating: 8.0,
      viewCount: 0,
      status: "DRAFT",
      rightsVerified: false,
      hlsStreamUrl: newStreamUrl,
      genres: [{ id: "g-drama", name: "Drama", slug: "drama" }],
    };

    setMovies([movie, ...movies]);
    setShowAddModal(false);
    setNewTitle("");
    setNewSynopsis("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Katalog Film
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Kelola judul film, status publikasi, dan tautan stream HLS.
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="gap-2 self-start shadow-lg shadow-[#7C5CFC]/25"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Film</span>
        </Button>
      </div>

      {/* Movies Table */}
      <div className="bg-[#111114] border border-white/8 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18181B] text-[#A1A1AA] uppercase border-b border-white/8 text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Film & Poster</th>
                <th className="py-3.5 px-4">Tahun / Durasi</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Status Hak Siar</th>
                <th className="py-3.5 px-4">Status Publikasi</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {movies.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-[#18181B] flex-shrink-0 border border-white/10">
                      <Image
                        src={m.posterUrl}
                        alt={m.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{m.title}</div>
                      <div className="text-[11px] text-[#A1A1AA]">
                        {m.genres.map((g) => g.name).join(", ")}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div>{m.releaseYear}</div>
                    <div className="text-[#A1A1AA] text-[11px]">{formatDuration(m.durationMinutes)}</div>
                  </td>

                  <td className="py-3 px-4">
                    <RatingBadge rating={m.rating} />
                  </td>

                  <td className="py-3 px-4">
                    {m.rightsVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" /> Menunggu Review
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(m.id)}
                      className="cursor-pointer"
                    >
                      <StatusBadge status={m.status} />
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/watch/${m.id}`}
                        target="_blank"
                        title="Preview Stream"
                        className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#7C5CFC] text-white border border-white/10 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(m.id)}
                        title="Hapus Film"
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

      {/* Add Movie Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#111114] border border-white/15 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Tambah Film Baru</h3>

            <form onSubmit={handleAddMovie} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-300 font-medium">Judul Film</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Interstellar Horizons"
                  className="w-full px-3 py-2 mt-1 rounded-xl bg-[#18181B] border border-white/10 text-white focus:outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-medium">Tahun Rilis</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full px-3 py-2 mt-1 rounded-xl bg-[#18181B] border border-white/10 text-white focus:outline-none focus:border-[#7C5CFC]"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-medium">Durasi (Menit)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 mt-1 rounded-xl bg-[#18181B] border border-white/10 text-white focus:outline-none focus:border-[#7C5CFC]"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-300 font-medium">URL Stream HLS (.m3u8)</label>
                <input
                  type="url"
                  required
                  value={newStreamUrl}
                  onChange={(e) => setNewStreamUrl(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded-xl bg-[#18181B] border border-white/10 text-white focus:outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-medium">Sinopsis Singkat</label>
                <textarea
                  rows={3}
                  value={newSynopsis}
                  onChange={(e) => setNewSynopsis(e.target.value)}
                  placeholder="Deskripsikan jalan cerita film..."
                  className="w-full px-3 py-2 mt-1 rounded-xl bg-[#18181B] border border-white/10 text-white focus:outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAddModal(false)}
                >
                  Batal
                </Button>
                <Button type="submit">Simpan Film</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


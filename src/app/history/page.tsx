"use client";

import React, { useState, useEffect } from "react";
import { History, Trash2 } from "lucide-react";
import { SAMPLE_MOVIES, SAMPLE_SERIES } from "@/lib/data";
import { ContinueWatchingCard } from "@/components/cards/ContinueWatchingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

interface HistoryItem {
  id: string;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
  watchUrl: string;
  progressSeconds: number;
  durationSeconds: number;
  updatedAt: string;
}

export default function HistoryPage() {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_history") || "{}");
      const list: HistoryItem[] = [];

      Object.values(stored).forEach((entry: any) => {
        const movie = SAMPLE_MOVIES.find((m) => m.id === entry.contentId);
        if (movie) {
          list.push({
            id: movie.id,
            title: movie.title,
            subtitle: "Film",
            thumbnailUrl: movie.backdropUrl,
            watchUrl: `/watch/${movie.id}`,
            progressSeconds: entry.progressSeconds,
            durationSeconds: entry.durationSeconds || movie.durationMinutes * 60,
            updatedAt: entry.updatedAt || new Date().toISOString(),
          });
        }
      });

      // Default sample items if user is new
      if (list.length === 0) {
        list.push(
          {
            id: "mov-tears-of-steel",
            title: "Tears of Steel",
            subtitle: "Film • Sci-Fi",
            thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
            watchUrl: "/watch/mov-tears-of-steel",
            progressSeconds: 420,
            durationSeconds: 720,
            updatedAt: "2026-11-09T07:15:00Z",
          },
          {
            id: "mov-sintel",
            title: "Sintel",
            subtitle: "Film • Fantasi",
            thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
            watchUrl: "/watch/mov-sintel",
            progressSeconds: 610,
            durationSeconds: 900,
            updatedAt: "2026-11-08T20:30:00Z",
          }
        );
      }

      setHistoryList(list);
    } catch {
      // storage fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const removeHistoryItem = (id: string) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
    try {
      const stored = JSON.parse(localStorage.getItem("trasibox_history") || "{}");
      delete stored[id];
      localStorage.setItem("trasibox_history", JSON.stringify(stored));
    } catch {}
  };

  const clearAllHistory = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat tontonan?")) {
      setHistoryList([]);
      try {
        localStorage.removeItem("trasibox_history");
      } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/8 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <History className="w-7 h-7 text-[#7C5CFC]" />
              <span>Riwayat Tontonan</span>
            </h1>
            <p className="text-sm text-[#A1A1AA] mt-1">
              Lanjutkan pemutaran video dari detik terakhir Anda berhenti.
            </p>
          </div>

          {historyList.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllHistory}
              className="gap-2 text-rose-400 border-rose-500/20 hover:bg-rose-500/10"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Semua</span>
            </Button>
          )}
        </div>

        {isLoaded && historyList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {historyList.map((item) => (
              <ContinueWatchingCard
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                thumbnailUrl={item.thumbnailUrl}
                watchUrl={item.watchUrl}
                progressSeconds={item.progressSeconds}
                durationSeconds={item.durationSeconds}
                onRemove={() => removeHistoryItem(item.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Riwayat Tontonan Masih Kosong"
            description="Setiap film atau episode serial yang Anda putar akan tercatat secara otomatis di sini agar Anda bisa melanjutkan kapan saja."
            actionLabel="Mulai Menonton"
            onAction={() => {
              window.location.href = "/movies";
            }}
          />
        )}
      </div>
    </div>
  );
}

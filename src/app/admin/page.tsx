"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Film,
  Tv,
  Users,
  CheckCircle2,
  Cpu,
  AlertTriangle,
  HardDrive,
  Scale,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardData {
  stats: {
    totalMovies: number;
    totalSeries: number;
    publishedCount: number;
    processingCount: number;
    failedCount: number;
    pendingRights: number;
    totalStorageGb: string;
    totalUsers: number;
  };
  recentJobs: any[];
  recentRights: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/admin/dashboard");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dashboard Operasional
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Pantau status katalog, pipeline transkoding HLS, utilisasi penyimpanan, dan hak cipta siar.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={fetchStats}
          disabled={isLoading}
          className="gap-2 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </Button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-[#111114] border border-white/8 space-y-2">
          <div className="flex items-center justify-between text-[#A1A1AA]">
            <span className="text-xs font-semibold">Total Katalog Film</span>
            <div className="w-8 h-8 rounded-lg bg-[#7C5CFC]/15 text-[#A78BFA] flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {data?.stats.totalMovies ?? 6}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Semua siap streaming</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-[#111114] border border-white/8 space-y-2">
          <div className="flex items-center justify-between text-[#A1A1AA]">
            <span className="text-xs font-semibold">Serial TV & Episode</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center">
              <Tv className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {data?.stats.totalSeries ?? 2}
          </div>
          <div className="text-[11px] text-[#A1A1AA]">
            <span>4 episode berdurasi penuh</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-[#111114] border border-white/8 space-y-2">
          <div className="flex items-center justify-between text-[#A1A1AA]">
            <span className="text-xs font-semibold">Pengguna Terdaftar</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {data?.stats.totalUsers ?? 148}
          </div>
          <div className="text-[11px] text-[#A1A1AA]">
            <span>Hak akses setara tanpa paywall</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-[#111114] border border-white/8 space-y-2">
          <div className="flex items-center justify-between text-[#A1A1AA]">
            <span className="text-xs font-semibold">Utilisasi Media Storage</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {data?.stats.totalStorageGb ?? "7.58"} GB
          </div>
          <div className="text-[11px] text-zinc-400">
            <span>Supabase / Object Storage</span>
          </div>
        </div>
      </div>

      {/* Secondary Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#111114] border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">Antrean Encoding Aktif</div>
            <div className="text-lg font-bold text-white">
              {data?.stats.processingCount ?? 1} Berjalan
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111114] border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">Encoding Gagal (Retry)</div>
            <div className="text-lg font-bold text-white">
              {data?.stats.failedCount ?? 1} Gagal
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111114] border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-[#A78BFA] flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">Review Hak Siar Tertunda</div>
            <div className="text-lg font-bold text-white">
              {data?.stats.pendingRights ?? 1} Menunggu Review
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Tables: Recent Processing Jobs & Rights Review Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Jobs */}
        <div className="p-6 rounded-2xl bg-[#111114] border border-white/8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#7C5CFC]" />
              <span>Antrean Transkoding HLS</span>
            </h3>
            <Link
              href="/admin/processing"
              className="text-xs text-[#7C5CFC] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Semua Job</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentJobs.map((job) => (
              <div
                key={job.id}
                className="p-3.5 rounded-xl bg-[#18181B] border border-white/5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white truncate max-w-[220px]">
                    {job.sourceFileName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      job.status === "COMPLETED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : job.status === "PROCESSING"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#A1A1AA]">
                  <span>{job.fileSizeMb} MB</span>
                  <span>Progres: {job.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full ${
                      job.status === "FAILED" ? "bg-rose-500" : "bg-[#7C5CFC]"
                    }`}
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rights Review Queue */}
        <div className="p-6 rounded-2xl bg-[#111114] border border-white/8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Verifikasi Hak Siar & Lisensi</span>
            </h3>
            <Link
              href="/admin/rights"
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              <span>Review Antrean</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentRights.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#18181B] border border-white/5 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{item.contentTitle}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-[11px] text-[#A1A1AA]">
                  Distributor: {item.distributorName}
                </div>
                <div className="text-[10px] text-zinc-500">
                  Lisensi: {item.licenseType}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


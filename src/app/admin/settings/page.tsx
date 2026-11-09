"use client";

import React, { useState } from "react";
import { Settings, Database, Server, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [dbStatus, setDbStatus] = useState("Connected (Supabase PostgreSQL via Prisma)");
  const [streamOrigin, setStreamOrigin] = useState("https://test-streams.mux.dev");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-white/8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-[#7C5CFC]" />
          <span>Pengaturan Platform TREASIBOX</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
          Konfigurasi koneksi database Supabase, origin streaming HLS, dan kebijakan akses konten.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Pengaturan sistem berhasil disimpan.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Database Section */}
        <div className="p-6 rounded-2xl bg-[#111114] border border-white/8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Database className="w-4 h-4 text-[#7C5CFC]" />
            <span>Koneksi Supabase PostgreSQL</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Status Database</label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#18181B] border border-white/10 text-emerald-400 font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{dbStatus}</span>
              </div>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Prisma Connection String (Pooler)</label>
              <input
                type="text"
                readOnly
                value="postgresql://postgres.[REF]:[KEY]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
                className="w-full p-2.5 rounded-xl bg-[#18181B] border border-white/10 text-zinc-400 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Streaming Origin Section */}
        <div className="p-6 rounded-2xl bg-[#111114] border border-white/8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Server className="w-4 h-4 text-sky-400" />
            <span>HLS Video Streaming & CDN</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Default HLS Media CDN Origin</label>
              <input
                type="text"
                value={streamOrigin}
                onChange={(e) => setStreamOrigin(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#18181B] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Adaptive Bitrate (ABR) dan segmentasi CORS otomatis diaktifkan.</span>
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="shadow-lg shadow-[#7C5CFC]/25">
          Simpan Seluruh Pengaturan
        </Button>
      </form>
    </div>
  );
}

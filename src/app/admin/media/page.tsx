"use client";

import React, { useState } from "react";
import { FileVideo, Upload, HardDrive, CheckCircle2, Cloud, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminMediaPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedList, setUploadedList] = useState([
    {
      name: "tears_of_steel_1080p_master.mov",
      size: "1,240.5 MB",
      format: "Apple ProRes 422",
      bucket: "supabase-storage://media-masters/",
      date: "2026-11-08",
    },
    {
      name: "sintel_master_raw.mkv",
      size: "2,180.0 MB",
      format: "Lossless H.264",
      bucket: "supabase-storage://media-masters/",
      date: "2026-11-07",
    },
    {
      name: "big_buck_bunny_surround.mov",
      size: "890.1 MB",
      format: "QuickTime H.264",
      bucket: "supabase-storage://media-masters/",
      date: "2026-11-06",
    },
  ]);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedList([
        {
          name: "cosmos_laundromat_4k_hdr.mov",
          size: "3,450.0 MB",
          format: "ProRes Master",
          bucket: "supabase-storage://media-masters/",
          date: new Date().toISOString().split("T")[0],
        },
        ...uploadedList,
      ]);
      alert("Berkas media master berhasil diunggah ke Supabase Storage Bucket dan didaftarkan ke antrean transkoding HLS!");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-white/8 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileVideo className="w-7 h-7 text-[#7C5CFC]" />
            <span>Penyimpanan Media & Master Assets</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Kelola file master video, segmen chunk HLS, subtitle WebVTT, dan thumbnail yang tersimpan di bucket Supabase Storage.
          </p>
        </div>

        <Button
          onClick={handleSimulateUpload}
          isLoading={isUploading}
          className="gap-2 self-start shadow-lg shadow-[#7C5CFC]/25"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Video Master</span>
        </Button>
      </div>

      {/* Storage info card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#111114] border border-white/8 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Penyimpanan Digunakan</span>
            <HardDrive className="w-4 h-4 text-[#7C5CFC]" />
          </div>
          <div className="text-2xl font-bold text-white">7.76 GB</div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[#7C5CFC]" style={{ width: "15%" }} />
          </div>
          <span className="text-[10px] text-zinc-500">15% dari kuota 50 GB Supabase Pro</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111114] border border-white/8 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Bucket Status</span>
            <Cloud className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">Aktif & Terhubung</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CDN Edge Cache Aktif</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111114] border border-white/8 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Total Aset Media</span>
            <FileVideo className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">{uploadedList.length} Berkas Master</div>
          <span className="text-[10px] text-zinc-500">HLS ABR (1080p, 720p, 480p)</span>
        </div>
      </div>

      {/* Media Files Table */}
      <div className="bg-[#111114] border border-white/8 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/8 text-xs font-semibold text-white">
          Daftar Berkas Master Video
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18181B] text-[#A1A1AA] uppercase border-b border-white/8 text-[11px]">
              <tr>
                <th className="py-3 px-4">Nama File</th>
                <th className="py-3 px-4">Format Asli</th>
                <th className="py-3 px-4">Ukuran Berkas</th>
                <th className="py-3 px-4">Lokasi Supabase Bucket</th>
                <th className="py-3 px-4">Tanggal Unggah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {uploadedList.map((f, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-mono font-medium text-white">{f.name}</td>
                  <td className="py-3 px-4 text-zinc-400">{f.format}</td>
                  <td className="py-3 px-4 text-zinc-300 font-semibold">{f.size}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#A78BFA]">{f.bucket}</td>
                  <td className="py-3 px-4 text-zinc-400">{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

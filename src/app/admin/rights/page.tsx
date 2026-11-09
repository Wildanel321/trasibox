"use client";

import React, { useState, useEffect } from "react";
import { Scale, CheckCircle2, XCircle, ExternalLink, ShieldCheck, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RightsRecord } from "@/lib/types";

export default function AdminRightsPage() {
  const [records, setRecords] = useState<RightsRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<RightsRecord | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/v1/admin/rights");
      const json = await res.json();
      if (json.success) setRecords(json.data);
    } catch {}
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleUpdateStatus = async (status: "APPROVED" | "REJECTED") => {
    if (!selectedRecord) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/v1/admin/rights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedRecord.id,
          status,
          notes: reviewNotes || selectedRecord.notes,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSelectedRecord(null);
        setReviewNotes("");
        fetchRecords();
      }
    } catch {
      // error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-white/8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Scale className="w-7 h-7 text-emerald-400" />
          <span>Verifikasi & Kepatuhan Hak Distribusi Konten</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
          Pemeriksaan legalitas lisensi film (Public Domain, Creative Commons, Kontrak Distributor). Konten berstatus DRAFT hanya dapat dipublikasikan setelah disetujui di sini.
        </p>
      </div>

      <div className="bg-[#111114] border border-white/8 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18181B] text-[#A1A1AA] uppercase border-b border-white/8 text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Judul Konten</th>
                <th className="py-3.5 px-4">Pemberi Lisensi / Distributor</th>
                <th className="py-3.5 px-4">Jenis Lisensi</th>
                <th className="py-3.5 px-4">Dokumen Bukti</th>
                <th className="py-3.5 px-4">Status Verifikasi</th>
                <th className="py-3.5 px-4 text-right">Tindakan Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {r.contentTitle}
                  </td>
                  <td className="py-3.5 px-4 text-[#A1A1AA]">{r.distributorName}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">
                      {r.licenseType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <a
                      href={r.proofDocumentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7C5CFC] hover:underline flex items-center gap-1 font-medium"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Lihat Lisensi Resmi</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.status === "APPROVED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : r.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setSelectedRecord(r);
                        setReviewNotes(r.notes || "");
                      }}
                      className="text-xs"
                    >
                      Audit Berkas
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#111114] border border-white/15 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold text-[#A78BFA] uppercase tracking-wider block">
                  Pemeriksaan Legalitas Siar
                </span>
                <h3 className="text-lg font-bold text-white">{selectedRecord.contentTitle}</h3>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  selectedRecord.status === "APPROVED"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {selectedRecord.status}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#18181B] border border-white/5 space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">Distributor:</span>
                <span className="font-medium text-white">{selectedRecord.distributorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Tipe Lisensi:</span>
                <span className="font-medium text-white">{selectedRecord.licenseType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Dokumen Lisensi:</span>
                <a
                  href={selectedRecord.proofDocumentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C5CFC] hover:underline flex items-center gap-1"
                >
                  <span>Buka Dokumen Resmi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Catatan Verifikator Legal
              </label>
              <textarea
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Tuliskan catatan verifikasi bukti lisensi..."
                className="w-full px-3 py-2 rounded-xl bg-[#18181B] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRecord(null)}
              >
                Tutup
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  isLoading={isSubmitting}
                  onClick={() => handleUpdateStatus("REJECTED")}
                >
                  <XCircle className="w-4 h-4 mr-1.5" />
                  Tolak Lisensi
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={isSubmitting}
                  onClick={() => handleUpdateStatus("APPROVED")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Setujui & Izinkan Siar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

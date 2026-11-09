"use client";

import React, { useState, useEffect } from "react";
import { Cpu, RotateCcw, AlertTriangle, CheckCircle2, Clock, HardDrive, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProcessingJob } from "@/lib/types";

export default function AdminProcessingPage() {
  const [jobs, setJobs] = useState<ProcessingJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/admin/processing");
      const json = await res.json();
      if (json.success) setJobs(json.data);
    } catch {
      // error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleRetry = async (jobId: string) => {
    try {
      const res = await fetch("/api/v1/admin/processing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry", jobId }),
      });
      const json = await res.json();
      if (json.success) {
        fetchJobs();
      }
    } catch {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Cpu className="w-7 h-7 text-[#7C5CFC]" />
            <span>Antrean Pemrosesan Media (HLS Encoder)</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Pantau status encoding video master menjadi playlist HLS adaptif (1080p, 720p, 480p) dan segmentasi .ts/.m4s.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={fetchJobs}
          disabled={isLoading}
          className="gap-2 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Antrean</span>
        </Button>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl bg-[#111114] border border-white/8 space-y-4 shadow-lg text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-[10px] text-[#A78BFA] uppercase block">
                  JOB #{job.id}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {job.sourceFileName}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    job.status === "COMPLETED"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : job.status === "PROCESSING"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}
                >
                  {job.status}
                </span>

                {job.status === "FAILED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRetry(job.id)}
                    className="gap-1.5 text-xs text-rose-300 border-rose-500/30 hover:bg-rose-500/15"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Transcode</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Error Message if Failed */}
            {job.errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/25 text-rose-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{job.errorMessage}</span>
              </div>
            )}

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[#A1A1AA]">
                <span>Format Target: {job.targetFormat}</span>
                <span className="font-mono">{job.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    job.status === "FAILED"
                      ? "bg-rose-500"
                      : job.status === "COMPLETED"
                      ? "bg-emerald-500"
                      : "bg-[#7C5CFC]"
                  }`}
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>

            {/* Info details */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-400 pt-1 border-t border-white/5">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-zinc-500" />
                <span>Ukuran Berkas: {job.fileSizeMb} MB</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>Durasi Encoding: {job.durationSeconds} detik</span>
              </span>
              <span>Dibuat: {new Date(job.createdAt).toLocaleString("id-ID")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


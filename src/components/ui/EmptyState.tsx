import React from "react";
import { Film, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "Belum Ada Konten",
  description = "Konten untuk kategori atau pencarian ini belum tersedia.",
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl bg-[#111114] border border-white/5 my-8">
      <div className="w-14 h-14 rounded-2xl bg-[#18181B] border border-white/10 flex items-center justify-center text-[#A1A1AA] mb-4">
        {icon || <Film className="w-7 h-7 text-[#7C5CFC]" />}
      </div>
      <h3 className="text-lg font-semibold text-[#FAFAFA] mb-1">{title}</h3>
      <p className="text-sm text-[#A1A1AA] max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Terjadi Kesalahan",
  message = "Gagal memuat data dari server. Silakan coba lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-4 rounded-2xl bg-rose-950/10 border border-rose-500/20 my-8">
      <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-md mb-5">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Coba Lagi
        </Button>
      )}
    </div>
  );
}

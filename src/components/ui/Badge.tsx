import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface GenreBadgeProps {
  label: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export function GenreBadge({ label, className, active, onClick }: GenreBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-default",
        active
          ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/25"
          : "bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#222228] border border-white/5",
        onClick && "cursor-pointer hover:border-[#7C5CFC]/40",
        className
      )}
    >
      {label}
    </button>
  );
}

export function RatingBadge({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-400",
        className
      )}
    >
      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      <span>{rating > 0 ? rating.toFixed(1) : "NR"}</span>
    </div>
  );
}

export function StatusBadge({ status }: { status: "DRAFT" | "IN_REVIEW" | "PUBLISHED" }) {
  const styles = {
    PUBLISHED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    IN_REVIEW: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    DRAFT: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  const labels = {
    PUBLISHED: "Published",
    IN_REVIEW: "In Review",
    DRAFT: "Draft",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}


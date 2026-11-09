"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Tv,
  DownloadCloud,
  FileVideo,
  Cpu,
  Scale,
  Users,
  Settings,
  ArrowLeft,
  Play,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Film (Movies)", href: "/admin/movies", icon: Film },
    { label: "Serial TV", href: "/admin/series", icon: Tv },
    { label: "TMDB Ingest", href: "/admin/import", icon: DownloadCloud },
    { label: "Media Storage", href: "/admin/media", icon: FileVideo },
    { label: "Processing Queue", href: "/admin/processing", icon: Cpu },
    { label: "Verifikasi Hak Siar", href: "/admin/rights", icon: Scale },
    { label: "Pengguna", href: "/admin/users", icon: Users },
    { label: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#111114] border-r border-white/8 min-h-screen flex flex-col justify-between flex-shrink-0 z-20">
      <div>
        {/* Admin Brand Header */}
        <div className="p-6 border-b border-white/8 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#5132d4] flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-wider text-white">
                TREASI<span className="text-[#7C5CFC]">BOX</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-[#A78BFA] uppercase -mt-0.5">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors",
                  isActive
                    ? "bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/20 font-semibold"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-[#71717A]")} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Back to Public Portal link */}
      <div className="p-4 border-t border-white/8 space-y-2">
        <div className="p-3 rounded-xl bg-[#18181B] border border-white/5 text-[11px] text-[#A1A1AA]">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Hak Tayang Legal</span>
          </div>
          <p className="text-[10px] leading-tight text-[#71717A]">
            Hanya konten berstatus APPROVED yang dapat disiarkan publik.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website</span>
        </Link>
      </div>
    </aside>
  );
}

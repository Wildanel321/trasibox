"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/watch")) return null;

  return (
    <footer className="border-t border-white/8 bg-[#09090B] mt-24 pb-24 md:pb-12 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#5132d4] flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              <span className="text-lg font-bold tracking-wider text-[#FAFAFA]">
                TREASI<span className="text-[#7C5CFC]">BOX</span>
              </span>
            </Link>
            <p className="text-sm text-[#A1A1AA] max-w-sm leading-relaxed">
              Platform streaming film dan serial TV sinematik bebas langganan. Seluruh pengguna terdaftar memperoleh akses penuh ke seluruh katalog yang telah diverifikasi hak distribusinya.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Hak Distribusi Terverifikasi & Bebas Paywall</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-[#A1A1AA]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-white transition-colors">Katalog Film</Link>
              </li>
              <li>
                <Link href="/series" className="hover:text-white transition-colors">Serial TV</Link>
              </li>
              <li>
                <Link href="/my-list" className="hover:text-white transition-colors">Daftar Tontonan</Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white transition-colors">Riwayat Nonton</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] mb-4">Informasi & Lisensi</h4>
            <ul className="space-y-2 text-sm text-[#A1A1AA]">
              <li>
                <Link href="/admin/rights" className="hover:text-white transition-colors">Verifikasi Hak Siar</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">Admin Gateway</Link>
              </li>
              <li>
                <span className="text-[#71717A]">Lisensi: Public Domain & CC</span>
              </li>
              <li>
                <span className="text-[#71717A]">Teknologi: Next.js + HLS.js</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717A] gap-4">
          <p>© {new Date().getFullYear()} TREASIBOX. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-[#7C5CFC] fill-[#7C5CFC]" /> for cinema lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}


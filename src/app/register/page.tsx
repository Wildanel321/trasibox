"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      try {
        localStorage.setItem(
          "trasibox_auth",
          JSON.stringify({
            name,
            email,
            role: "USER",
            signedInAt: new Date().toISOString(),
          })
        );
      } catch {}

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md space-y-8 bg-[#111114] p-8 sm:p-10 rounded-2xl border border-white/8 shadow-2xl relative">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#5132d4] flex items-center justify-center shadow-lg shadow-[#7C5CFC]/30">
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              TREASI<span className="text-[#7C5CFC]">BOX</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Buat Akun Gratis</h1>
          <p className="text-xs text-[#A1A1AA]">
            Satu akun untuk akses tak terbatas ke seluruh film & serial TV.
          </p>
        </div>

        {/* Value Proposition Alert */}
        <div className="p-3.5 rounded-xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/25 flex items-start gap-2.5 text-xs text-[#A78BFA] text-left">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#7C5CFC]" />
          <span>
            TREASIBOX tidak memiliki paket berlangganan atau biaya tersembunyi. Semua pengguna mendapatkan hak akses kualitas tertinggi yang sama.
          </span>
        </div>

        {success ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-center text-sm font-medium">
            Pendaftaran berhasil! Mengalihkan ke beranda...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-zinc-300">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alexander Cinema"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-zinc-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-zinc-300">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC] transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              size="lg"
              className="w-full gap-2 mt-2 shadow-lg shadow-[#7C5CFC]/25"
            >
              <span>Daftar Akun</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-zinc-400">
          Sudah memiliki akun?{" "}
          <Link href="/login" className="text-[#7C5CFC] hover:underline font-semibold">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}

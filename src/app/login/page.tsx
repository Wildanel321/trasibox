"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Silakan masukkan email dan kata sandi Anda.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful login
      try {
        localStorage.setItem(
          "trasibox_auth",
          JSON.stringify({
            email,
            name: email.split("@")[0],
            role: email.includes("admin") ? "ADMIN" : "USER",
            signedInAt: new Date().toISOString(),
          })
        );
      } catch {}

      if (email.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md space-y-8 bg-[#111114] p-8 sm:p-10 rounded-2xl border border-white/8 shadow-2xl relative">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#5132d4] flex items-center justify-center shadow-lg shadow-[#7C5CFC]/30">
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              TREASI<span className="text-[#7C5CFC]">BOX</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Masuk ke Akun</h1>
          <p className="text-xs text-[#A1A1AA]">
            Nikmati seluruh katalog film dan serial tanpa batas biaya langganan.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
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

          {/* Password input */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300">Kata Sandi</label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#7C5CFC] hover:text-[#A78BFA] transition-colors"
              >
                Lupa sandi?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#18181B] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C5CFC] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            isLoading={isLoading}
            size="lg"
            className="w-full gap-2 mt-2 shadow-lg shadow-[#7C5CFC]/25"
          >
            <span>Masuk</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-zinc-400">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#7C5CFC] hover:underline font-semibold">
            Daftar Sekarang
          </Link>
        </div>

        {/* Demo Hint */}
        <div className="p-3 rounded-xl bg-[#18181B] border border-white/5 text-[11px] text-zinc-400 space-y-1 text-left">
          <p className="font-semibold text-zinc-300">Akses Cepat (Demo):</p>
          <p>• User: user@trasibox.tv (bebas sandi)</p>
          <p>• Admin: admin@trasibox.tv (masuk ke panel admin)</p>
        </div>
      </div>
    </div>
  );
}

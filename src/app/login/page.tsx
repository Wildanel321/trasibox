"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrorMessage("");
    try {
      const profile = await signInWithGoogle();
      if (profile.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Gagal masuk dengan Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Silakan masukkan email dan kata sandi Anda.");
      return;
    }

    setIsLoading(true);

    try {
      const profile = await signInWithEmail(email, password);
      if (profile.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Email atau kata sandi tidak sesuai.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md space-y-7 bg-[#111114] p-8 sm:p-10 rounded-2xl border border-white/8 shadow-2xl relative">
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
            Satu akun untuk seluruh film & serial TV tanpa biaya langganan.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Google One-Click Login */}
        <Button
          type="button"
          variant="secondary"
          size="lg"
          isLoading={isGoogleLoading}
          onClick={handleGoogleSignIn}
          className="w-full gap-3 bg-white/5 hover:bg-white/10 border-white/10 text-white font-medium shadow-md"
        >
          {!isGoogleLoading && <GoogleIcon />}
          <span>Masuk dengan Google</span>
        </Button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#111114] px-3 text-[11px] text-zinc-500 uppercase tracking-wider">
            atau via email
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

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

        <div className="pt-1 text-center text-xs text-zinc-400">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#7C5CFC] hover:underline font-semibold">
            Daftar Sekarang
          </Link>
        </div>

        {/* Single Admin Rule Notice */}
        <div className="p-3 rounded-xl bg-[#18181B] border border-white/5 text-[11px] text-zinc-400 text-left space-y-1">
          <p className="font-semibold text-amber-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Single Admin Guarantee:</span>
          </p>
          <p className="text-[10px] leading-relaxed text-zinc-400">
            Akun Google pertama yang berhasil login akan otomatis ditetapkan sebagai <strong>1 dan hanya 1 Admin</strong> pengelola platform. Seluruh akun setelahnya adalah pengguna biasa.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { GoogleIcon } from "@/app/login/page";

export default function RegisterPage() {
  const router = useRouter();
  const { signInWithGoogle, signUpWithEmail } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setErrorMsg("");
    try {
      const profile = await signInWithGoogle();
      if (profile.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal mendaftar dengan Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const profile = await signUpWithEmail(name, email, password);
      if (profile.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Pendaftaran gagal. Periksa kembali email dan sandi Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md space-y-7 bg-[#111114] p-8 sm:p-10 rounded-2xl border border-white/8 shadow-2xl relative">
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

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Google Signup */}
        <Button
          type="button"
          variant="secondary"
          size="lg"
          isLoading={isGoogleLoading}
          onClick={handleGoogleSignUp}
          className="w-full gap-3 bg-white/5 hover:bg-white/10 border-white/10 text-white font-medium shadow-md"
        >
          {!isGoogleLoading && <GoogleIcon />}
          <span>Daftar Cepat dengan Google</span>
        </Button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#111114] px-3 text-[11px] text-zinc-500 uppercase tracking-wider">
            atau gunakan email
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

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
                placeholder="Minimal 6 karakter"
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

        <div className="pt-1 text-center text-xs text-zinc-400">
          Sudah memiliki akun?{" "}
          <Link href="/login" className="text-[#7C5CFC] hover:underline font-semibold">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}

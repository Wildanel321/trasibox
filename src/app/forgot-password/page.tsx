"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Atur Ulang Sandi</h1>
          <p className="text-xs text-[#A1A1AA]">
            Masukkan email terdaftar untuk menerima tautan pemulihan kata sandi.
          </p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-[#18181B] border border-white/10 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-semibold text-white">Tautan Terkirim</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Jika alamat <strong className="text-white">{email}</strong> terdaftar, instruksi pemulihan telah dikirimkan ke kotak masuk Anda.
            </p>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="secondary" size="sm" className="w-full">
                  Kembali ke Halaman Masuk
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-zinc-300">Email Terdaftar</label>
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

            <Button
              type="submit"
              isLoading={isLoading}
              size="lg"
              className="w-full gap-2 mt-2 shadow-lg shadow-[#7C5CFC]/25"
            >
              <span>Kirim Tautan Pemulihan</span>
            </Button>

            <div className="pt-2 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Batal dan kembali masuk</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


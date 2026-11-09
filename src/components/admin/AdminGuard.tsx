"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin) {
        const timer = setTimeout(() => {
          router.replace("/");
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-zinc-400 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#7C5CFC]" />
        <span className="text-sm">Memverifikasi hak akses administrator...</span>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Akses Terbatas (Admin Only)</h2>
        <p className="text-sm text-zinc-400 max-w-md mb-4 leading-relaxed">
          Akun Anda ({user?.email || "Tamu"}) tidak memiliki hak akses administrator. Mengalihkan ke halaman utama...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}


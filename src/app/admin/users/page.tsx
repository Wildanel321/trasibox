"use client";

import React from "react";
import { Users, Shield, User, Clock } from "lucide-react";

export default function AdminUsersPage() {
  const users = [
    {
      id: "usr-001",
      name: "Willcuy Administrator",
      email: "admin@trasibox.tv",
      role: "ADMIN",
      joined: "2026-11-01",
      lastActive: "Sedang Aktif",
    },
    {
      id: "usr-002",
      name: "Budi Pratama",
      email: "budi.pratama@gmail.com",
      role: "USER",
      joined: "2026-11-03",
      lastActive: "2 jam yang lalu",
    },
    {
      id: "usr-003",
      name: "Siti Rahma",
      email: "siti.rahma@yahoo.com",
      role: "USER",
      joined: "2026-11-05",
      lastActive: "1 hari yang lalu",
    },
    {
      id: "usr-004",
      name: "Eko Nugroho",
      email: "eko.nugroho@outlook.com",
      role: "USER",
      joined: "2026-11-07",
      lastActive: "Kemarin",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-white/8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Users className="w-7 h-7 text-[#7C5CFC]" />
          <span>Pengelolaan Pengguna</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
          Daftar seluruh pengguna terdaftar TREASIBOX. Seluruh pengguna memiliki hak akses tontonan yang setara tanpa pembagian tier akun.
        </p>
      </div>

      <div className="bg-[#111114] border border-white/8 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18181B] text-[#A1A1AA] uppercase border-b border-white/8 text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Pengguna</th>
                <th className="py-3.5 px-4">Role Akses</th>
                <th className="py-3.5 px-4">Tanggal Bergabung</th>
                <th className="py-3.5 px-4">Aktivitas Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center text-[#7C5CFC]">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{u.name}</div>
                      <div className="text-zinc-500 text-[11px]">{u.email}</div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        u.role === "ADMIN"
                          ? "bg-purple-500/10 text-[#A78BFA] border border-purple-500/20"
                          : "bg-white/5 text-zinc-300 border border-white/10"
                      }`}
                    >
                      {u.role === "ADMIN" && <Shield className="w-3 h-3 text-[#7C5CFC]" />}
                      {u.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-zinc-400">{u.joined}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{u.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

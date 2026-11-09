import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminGuard } from "@/components/admin/AdminGuard";

export const metadata = {
  title: "Admin Console — TREASIBOX",
  description: "Panel administrasi, pemrosesan media, dan manajemen hak cipta siar.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#09090B] flex flex-col md:flex-row text-[#FAFAFA]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto min-h-screen p-6 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}

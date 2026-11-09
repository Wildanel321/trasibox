import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileBottomNavigation } from "@/components/navigation/MobileBottomNavigation";
import { Footer } from "@/components/navigation/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "TREASIBOX — Cinematic Streaming Platform",
  description: "Platform streaming film dan serial TV dengan pengalaman visual sinematik tanpa biaya langganan.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#09090B] text-[#FAFAFA] font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <MobileBottomNavigation />
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileBottomNavigation } from "@/components/navigation/MobileBottomNavigation";
import { Footer } from "@/components/navigation/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090B] text-[#FAFAFA] font-sans">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <MobileBottomNavigation />
      </body>
    </html>
  );
}

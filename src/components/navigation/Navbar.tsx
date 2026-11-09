"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, Film, Bookmark, History, Shield, User, Menu, X, Play, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "TV Series", href: "/series" },
    { label: "Anime", href: "/anime" },
    { label: "My List", href: "/my-list" },
    { label: "History", href: "/history" },
  ];

  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) return null;

  const handleLogout = async () => {
    await logout();
    setProfileDropdownOpen(false);
    router.push("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#09090B]/90 backdrop-blur-md border-b border-white/8 py-3.5 shadow-2xl"
          : "bg-gradient-to-b from-[#09090B]/80 via-[#09090B]/40 to-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#5132d4] flex items-center justify-center shadow-lg shadow-[#7C5CFC]/30 group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            </div>
            <span className="text-xl font-bold tracking-wider text-[#FAFAFA] font-sans">
              TREASI<span className="text-[#7C5CFC]">BOX</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "text-white bg-white/10 font-semibold"
                      : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Link
            href="/search"
            aria-label="Cari Film dan Serial"
            className={cn(
              "p-2 rounded-lg text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5 transition-colors",
              pathname === "/search" && "text-[#7C5CFC] bg-[#7C5CFC]/10"
            )}
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Admin Gateway link (ONLY visible if user is the 1 registered ADMIN) */}
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/25 hover:bg-amber-500/20 transition-colors shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Console</span>
            </Link>
          )}

          {/* User Profile or Login */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#18181B] hover:bg-[#222228] border border-white/8 transition-colors text-xs text-[#FAFAFA]"
              >
                {user.photoURL ? (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] flex items-center justify-center font-bold">
                    {(user.displayName || "U")[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline font-medium max-w-[120px] truncate">
                  {user.displayName}
                </span>
                {user.role === "ADMIN" && (
                  <span className="hidden md:inline px-1.5 py-0.2 rounded bg-[#7C5CFC]/20 text-[#A78BFA] text-[9px] font-bold">
                    ADMIN
                  </span>
                )}
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#111114] border border-white/10 shadow-2xl p-2 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-white/5 space-y-0.5 mb-1">
                    <p className="font-semibold text-white truncate">{user.displayName}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#7C5CFC]/20 text-[#A78BFA] mt-1">
                      {user.role === "ADMIN" ? "★ Super Administrator" : "Pengguna Terdaftar"}
                    </span>
                  </div>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-amber-400 hover:bg-amber-500/10 font-semibold transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Panel Administrator</span>
                    </Link>
                  )}

                  <Link
                    href="/my-list"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Daftar Tontonan</span>
                  </Link>

                  <Link
                    href="/history"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <History className="w-4 h-4" />
                    <span>Riwayat Nonton</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors mt-1 border-t border-white/5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar (Sign Out)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#18181B] hover:bg-[#222228] border border-white/8 transition-colors text-xs text-[#FAFAFA] font-medium"
            >
              <div className="w-6 h-6 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] flex items-center justify-center">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090B] border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "text-[#FAFAFA] bg-[#7C5CFC]/20 font-semibold text-[#7C5CFC]"
                    : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {isAdmin && (
            <div className="pt-2 mt-2 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Panel</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

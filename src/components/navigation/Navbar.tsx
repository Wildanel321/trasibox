"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Film, Bookmark, History, Shield, User, Menu, X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: "My List", href: "/my-list" },
    { label: "History", href: "/history" },
  ];

  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) return null; // Admin has its own dedicated shell

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

          {/* Admin Gateway link */}
          <Link
            href="/admin"
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-[#A1A1AA] hover:text-[#FAFAFA] px-2.5 py-1.5 rounded-lg border border-white/8 hover:border-white/20 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#7C5CFC]" />
            <span>Admin</span>
          </Link>

          {/* User Profile / Login */}
          <Link
            href="/login"
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#18181B] hover:bg-[#222228] border border-white/8 transition-colors text-xs text-[#FAFAFA] font-medium"
          >
            <div className="w-6 h-6 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">Sign In</span>
          </Link>

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
        </div>
      )}
    </header>
  );
}


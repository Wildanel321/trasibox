"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Film, Bookmark, History, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomNavigation() {
  const pathname = usePathname();

  // Don't show inside admin or video playback fullscreen
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/watch")) {
    return null;
  }

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Movies", href: "/movies", icon: Film },
    { label: "My List", href: "/my-list", icon: Bookmark },
    { label: "History", href: "/history", icon: History },
    { label: "Profile", href: "/login", icon: User },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09090B]/95 backdrop-blur-lg border-t border-white/8 px-3 py-2"
      aria-label="Mobile Navigation Bar"
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[44px] rounded-lg transition-colors",
                isActive
                  ? "text-[#7C5CFC]"
                  : "text-[#71717A] hover:text-[#FAFAFA]"
              )}
            >
              <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
              <span className={cn("text-[10px] mt-1 font-medium", isActive && "font-semibold")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


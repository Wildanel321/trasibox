"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContentCarouselProps {
  title: string;
  seeAllHref?: string;
  children: React.ReactNode;
}

export function ContentCarousel({ title, seeAllHref, children }: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const offset = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollRef.current.scrollTo({
      left: scrollLeft + offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-3.5 my-8 sm:my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          {title}
        </h2>

        <div className="flex items-center gap-2">
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className="text-xs sm:text-sm font-medium text-[#7C5CFC] hover:text-[#A78BFA] transition-colors mr-2"
            >
              Lihat Semua
            </Link>
          )}

          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-1.5 sm:p-2 rounded-full bg-[#18181B] hover:bg-[#222228] text-[#A1A1AA] hover:text-white border border-white/8 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-1.5 sm:p-2 rounded-full bg-[#18181B] hover:bg-[#222228] text-[#A1A1AA] hover:text-white border border-white/8 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {children}
      </div>
    </section>
  );
}


import { NextResponse } from "next/server";
import { SAMPLE_MOVIES } from "@/lib/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");
    const year = searchParams.get("year");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "popular";

    let results = [...SAMPLE_MOVIES];

    if (genre && genre !== "all") {
      results = results.filter((m) => m.genres.some((g) => g.slug === genre || g.name.toLowerCase() === genre.toLowerCase()));
    }

    if (year && year !== "all") {
      results = results.filter((m) => m.releaseYear.toString() === year);
    }

    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      results = results.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.synopsis.toLowerCase().includes(q) ||
          m.genres.some((g) => g.name.toLowerCase().includes(q))
      );
    }

    if (sort === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sort === "year") {
      results.sort((a, b) => b.releaseYear - a.releaseYear);
    } else {
      results.sort((a, b) => b.viewCount - a.viewCount);
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data film." },
      { status: 500 }
    );
  }
}

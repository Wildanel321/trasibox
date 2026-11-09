import { NextResponse } from "next/server";
import { SAMPLE_SERIES } from "@/lib/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");
    const search = searchParams.get("search");

    let results = [...SAMPLE_SERIES];

    if (genre && genre !== "all") {
      results = results.filter((s) => s.genres.some((g) => g.slug === genre || g.name.toLowerCase() === genre.toLowerCase()));
    }

    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.synopsis.toLowerCase().includes(q) ||
          s.genres.some((g) => g.name.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data serial TV." },
      { status: 500 }
    );
  }
}


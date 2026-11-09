import { NextResponse } from "next/server";
import { SAMPLE_MOVIES } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movie = SAMPLE_MOVIES.find((m) => m.id === id || m.slug === id);

    if (!movie) {
      return NextResponse.json(
        { success: false, error: "Film tidak ditemukan." },
        { status: 404 }
      );
    }

    // Similar movies based on shared genres
    const similar = SAMPLE_MOVIES.filter(
      (m) => m.id !== movie.id && m.genres.some((g) => movie.genres.some((mg) => mg.id === g.id))
    ).slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        ...movie,
        similar,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal memuat detail film." },
      { status: 500 }
    );
  }
}


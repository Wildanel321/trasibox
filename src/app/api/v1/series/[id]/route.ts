import { NextResponse } from "next/server";
import { SAMPLE_SERIES } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const series = SAMPLE_SERIES.find((s) => s.id === id || s.slug === id);

    if (!series) {
      return NextResponse.json(
        { success: false, error: "Serial TV tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: series,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal memuat detail serial." },
      { status: 500 }
    );
  }
}

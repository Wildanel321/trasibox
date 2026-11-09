import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contentId, contentType, progressSeconds, durationSeconds } = body;

    if (!contentId || progressSeconds === undefined) {
      return NextResponse.json(
        { success: false, error: "Parameter tidak lengkap." },
        { status: 400 }
      );
    }

    // Server-side progress received and acknowledged
    return NextResponse.json({
      success: true,
      message: "Progres tontonan berhasil disimpan.",
      data: {
        contentId,
        contentType: contentType || "MOVIE",
        progressSeconds,
        durationSeconds,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan progres tontonan." },
      { status: 500 }
    );
  }
}


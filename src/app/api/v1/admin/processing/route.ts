import { NextResponse } from "next/server";
import { INITIAL_PROCESSING_JOBS } from "@/lib/data";

let jobs = [...INITIAL_PROCESSING_JOBS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: jobs,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, jobId } = body;

    if (action === "retry" && jobId) {
      jobs = jobs.map((j) =>
        j.id === jobId ? { ...j, status: "PROCESSING", progress: 15, errorMessage: undefined } : j
      );
      return NextResponse.json({ success: true, message: "Job antrean berhasil di-restart." });
    }

    if (action === "create") {
      const newJob = {
        id: `job-${Date.now()}`,
        sourceFileName: body.sourceFileName || "uploaded_media.mp4",
        targetFormat: "HLS / Adaptive ABR",
        status: "QUEUED" as const,
        progress: 0,
        durationSeconds: 0,
        fileSizeMb: body.fileSizeMb || 450.0,
        createdAt: new Date().toISOString(),
      };
      jobs.unshift(newJob);
      return NextResponse.json({ success: true, data: newJob });
    }

    return NextResponse.json({ success: false, error: "Aksi tidak dikenali." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal memproses job." }, { status: 500 });
  }
}


import { NextResponse } from "next/server";
import { INITIAL_RIGHTS_RECORDS } from "@/lib/data";

let rightsList = [...INITIAL_RIGHTS_RECORDS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: rightsList,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes, verifiedBy } = body;

    if (!id || !["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Parameter status atau id tidak valid." },
        { status: 400 }
      );
    }

    rightsList = rightsList.map((r) =>
      r.id === id
        ? {
            ...r,
            status,
            notes: notes || r.notes,
            verifiedBy: verifiedBy || "Admin / Legal Lead",
          }
        : r
    );

    return NextResponse.json({
      success: true,
      message: `Status hak distribusi berhasil diubah menjadi ${status}.`,
      data: rightsList.find((r) => r.id === id),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui status hak distribusi." },
      { status: 500 }
    );
  }
}


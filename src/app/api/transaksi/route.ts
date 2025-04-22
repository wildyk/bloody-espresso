import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM transaksi`; // Hapus ORDER BY dulu
    console.log("Hasil query transaksi:", rows); // Debug log
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Query transaksi error:", error); // Cek log detail
    return NextResponse.json({ error: "Gagal mengambil data transaksi." }, { status: 500 });
  }
}


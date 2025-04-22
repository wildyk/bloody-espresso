import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { total_price, items } = body;

    // Validasi input
    if (!total_price || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Data transaksi tidak lengkap!" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO transactions (total_price, items)
      VALUES (${total_price}, ${JSON.stringify(items)})
    `;

    return NextResponse.json({ message: "Transaksi berhasil disimpan!" });
  } catch (error: any) {
    console.error("Error saat menyimpan transaksi:", error.message);
    return NextResponse.json(
      { error: "Gagal menyimpan transaksi." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, total_price, items, created_at 
      FROM transactions 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Error saat mengambil data:", error.message);
    return NextResponse.json(
      { error: "Gagal mengambil data." },
      { status: 500 }
    );
  }
}

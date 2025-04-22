import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// POST: Simpan transaksi
export async function POST(req: Request) {
  const body = await req.json();
  console.log("Body diterima:", body); // Debug log

  const { product_name, quantity, total_price } = body;

  if (!product_name || !quantity || !total_price) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO transaksi (product_name, quantity, total_price)
      VALUES (${product_name}, ${quantity}, ${total_price})
    `;
    return NextResponse.json({ message: "Transaksi berhasil disimpan!" });
  } catch (error) {
    console.error("Insert transaksi error:", error);
    return NextResponse.json({ error: "Gagal menyimpan transaksi" }, { status: 500 });
  }
}

// GET: Ambil semua transaksi
export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM transaksi ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Query transaksi error:", error);
    return NextResponse.json({ error: "Gagal mengambil data transaksi." }, { status: 500 });
  }
}

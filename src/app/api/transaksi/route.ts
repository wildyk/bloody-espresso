import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// POST: Simpan transaksi
export async function POST(req: Request) {
  const body = await req.json();
  const { product_name, quantity, total_price } = body;

  try {
    await sql`
      INSERT INTO menu_items (product_name, quantity, total_price)
      VALUES (${product_name}, ${quantity}, ${total_price})
    `;
    return NextResponse.json({ message: "Transaksi berhasil disimpan!" });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Gagal menyimpan transaksi" }, { status: 500 });
  }
}

// GET: Ambil semua transaksi
export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM menu_items ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json({ error: "Gagal mengambil data transaksi." }, { status: 500 });
  }
}

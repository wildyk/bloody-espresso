import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM menu_items ORDER BY id ASC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json({ error: "Gagal mengambil data menu." }, { status: 500 });
  }
}

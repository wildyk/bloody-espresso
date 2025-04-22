import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM products ORDER BY id ASC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetch menu:", error);
    return NextResponse.json({ error: "Gagal mengambil data menu." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { name, price } = await req.json();

  try {
    const result = await sql`
      INSERT INTO products (name, price)
      VALUES (${name}, ${price})
      RETURNING *;
    `;
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error tambah menu:", error);
    return NextResponse.json({ error: "Gagal menambah menu." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { name, price } = await req.json();

  try {
    await sql`
      UPDATE products
      SET name = ${name}, price = ${price}
      WHERE id = ${params.id};
    `;
    return NextResponse.json({ message: "Menu berhasil diupdate." });
  } catch (error) {
    console.error("Error update menu:", error);
    return NextResponse.json({ error: "Gagal update menu." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await sql`DELETE FROM products WHERE id = ${params.id};`;
    return NextResponse.json({ message: "Menu berhasil dihapus." });
  } catch (error) {
    console.error("Error hapus menu:", error);
    return NextResponse.json({ error: "Gagal hapus menu." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
  const result = await sql`SELECT * FROM products ORDER BY id DESC`;
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, image_url } = body;

  await sql`
    INSERT INTO products (name, description, image_url)
    VALUES (${name}, ${description}, ${image_url})
  `;
  return NextResponse.json({ message: "Produk ditambahkan!" });
}
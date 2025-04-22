import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // ambil ID dari URL terakhir

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  try {
    await sql`DELETE FROM products WHERE id = ${Number(id)}`;
    return NextResponse.json({ message: `Produk ${id} berhasil dihapus` });
  } catch (error: any) {
    console.error("❌ Gagal hapus produk:", error);
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}

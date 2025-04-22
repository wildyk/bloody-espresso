// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // koneksi database

export async function POST(req: Request) {
  try {
    const { transaksi } = await req.json();

    const query = `
      INSERT INTO riwayat_transaksi (nama_pelanggan, produk, jumlah, total_harga)
      VALUES ($1, $2, $3, $4)
    `;

    // Simpan setiap item di cart ke database
    for (const item of transaksi) {
      await pool.query(query, [
        item.nama_pelanggan,
        item.produk,
        item.qty,
        item.total,
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan transaksi' }, { status: 500 });
  }
}

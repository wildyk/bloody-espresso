// /app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkoutCart } from '@/app/lib/data'; // kamu buat fungsi ini

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama_pembeli, items, total } = body;

    if (!nama_pembeli || !items || items.length === 0) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const results = [];
    for (const item of items) {
      const { produk_id, quantity, price } = item;
      const res = await checkoutCart(nama_pembeli, produk_id, quantity, price, total);
      results.push(res);
    }

    return NextResponse.json({ message: 'Transaksi berhasil', data: results }, { status: 200 });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Gagal memproses transaksi' }, { status: 500 });
  }
}

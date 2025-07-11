import { NextRequest, NextResponse } from 'next/server';
import { createTransaksi } from '@/app/lib/data';
import { verifyToken } from '@/app/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Token tidak ditemukan' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Token tidak valid' }, { status: 401 });
    }

    const nama_pembeli = decoded.name || decoded.email || "Guest";

    const body = await request.json();
    const { id_produk, quantity, total_harga } = body;

    if (!id_produk || !quantity || !total_harga) {
      return NextResponse.json(
        { error: 'id_produk, quantity, dan total_harga wajib diisi' },
        { status: 400 }
      );
    }

    const result = await createTransaksi({
      id_produk,
      nama_pembeli,
      quantity,
      total_harga
    });

    return NextResponse.json(
      {
        message: 'Transaksi berhasil dibuat',
        id_transaksi: result.id_transaksi,
        data: result
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Server error', detail: error.message }, { status: 500 });
  }
}

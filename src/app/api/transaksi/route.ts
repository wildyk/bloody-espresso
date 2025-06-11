import { NextRequest, NextResponse } from 'next/server';
import { createTransaksi } from '@/app/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      id_produk,
      nama_produk, // saat ini belum dipakai, bisa dihapus jika tidak digunakan
      quantity,
      harga_produk, // belum dipakai juga
      total_harga,
      nama_pembeli
    } = body;

    // Validasi input
    if (!id_produk || !quantity || !total_harga) {
      return NextResponse.json(
        { error: 'id_produk, quantity, dan total_harga wajib diisi' },
        { status: 400 }
      );
    }

    // Buat transaksi baru
    const result = await createTransaksi({
      id_produk,
      nama_pembeli: nama_pembeli || 'Guest',
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
    // Jika error dari Prisma atau DB
    const isKnownError =
      typeof error === 'object' &&
      (error.code || error.message || error.name);

    console.error('Error creating transaction:', error);

    return NextResponse.json(
      {
        error: 'Gagal membuat transaksi',
        detail: isKnownError ? error.message || error.name : undefined
      },
      { status: 500 }
    );
  }
}

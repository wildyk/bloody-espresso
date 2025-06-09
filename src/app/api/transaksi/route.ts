import { NextRequest, NextResponse } from 'next/server';
import { createTransaksi } from '@/app/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_produk, nama_produk, quantity, harga_produk, total_harga, nama_pembeli } = body;

    // Validasi input
    if (!id_produk || !quantity || !total_harga) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
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

  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Gagal membuat transaksi' },
      { status: 500 }
    );
  }
}
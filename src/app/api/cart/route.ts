import { NextRequest, NextResponse } from 'next/server';
import { addToCart, fetchCartItems } from '@/app/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_produk, nama_produk, quantity, harga_produk, total_harga } = body;

    // Validasi input
    if (!id_produk || !nama_produk || !quantity || !harga_produk || !total_harga) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    if (quantity < 1 || quantity > 99) {
      return NextResponse.json(
        { error: 'Jumlah harus antara 1-99' },
        { status: 400 }
      );
    }

    // Tambahkan ke database cart
    const result = await addToCart({
      id_produk,
      nama_produk,
      quantity,
      harga_produk,
      total_harga
    });

    return NextResponse.json(
      { 
        message: 'Berhasil ditambahkan ke keranjang',
        data: result 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan ke keranjang' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cartItems = await fetchCartItems();
    return NextResponse.json({ data: cartItems }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data keranjang' },
      { status: 500 }
    );
  }
}
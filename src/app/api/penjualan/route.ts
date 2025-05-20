import { NextResponse } from 'next/server';
import { fetchPenjualanProduk } from '@/app/lib/data';

export async function GET() {
  const data = await fetchPenjualanProduk();
  return NextResponse.json(data);
}

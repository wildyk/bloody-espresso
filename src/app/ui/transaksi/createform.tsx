'use client';

import Link from 'next/link';
import { 
  UserIcon, 
  ShoppingCartIcon, 
  CreditCardIcon,
  CalendarDaysIcon,
  HashtagIcon 
} from '@heroicons/react/24/outline';
import { createTransaksi } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function TransaksiForm() {
  return (
    <form action={createTransaksi}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* ID Produk */}
        <div className="mb-4">
          <label htmlFor="id_produk" className="mb-2 block text-sm font-medium">
            ID Produk
          </label>
          <div className="relative">
            <input
              id="id_produk"
              name="id_produk"
              type="number"
              required
              placeholder="Masukkan ID produk"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Nama Pembeli */}
        <div className="mb-4">
          <label htmlFor="nama_pembeli" className="mb-2 block text-sm font-medium">
            Nama Pembeli
          </label>
          <div className="relative">
            <input
              id="nama_pembeli"
              name="nama_pembeli"
              type="text"
              required
              placeholder="Masukkan nama pembeli"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Jumlah Produk */}
        <div className="mb-4">
          <label htmlFor="jumlah_produk" className="mb-2 block text-sm font-medium">
            Jumlah Produk
          </label>
          <div className="relative">
            <input
              id="jumlah_produk"
              name="jumlah_produk"
              type="number"
              min="1"
              required
              placeholder="Contoh: 2"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <ShoppingCartIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Total Harga */}
        <div className="mb-4">
          <label htmlFor="total_harga" className="mb-2 block text-sm font-medium">
            Total Harga
          </label>
          <div className="relative">
            <input
              id="total_harga"
              name="total_harga"
              type="number"
              step="0.01"
              required
              placeholder="Contoh: 50000"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CreditCardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Tanggal Transaksi */}
        <div className="mb-4">
          <label htmlFor="tanggal_transaksi" className="mb-2 block text-sm font-medium">
            Tanggal Transaksi
          </label>
          <div className="relative">
            <input
              id="tanggal_transaksi"
              name="tanggal_transaksi"
              type="date"
              required
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/dashboard/transaksi"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Batal
        </Link>
        <Button type="submit">Simpan Transaksi</Button>
      </div>
    </form>
  );
}
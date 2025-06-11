'use client';

import { updateMenu } from '@/app/lib/actions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditMenuForm({
  produk,
}: {
  produk: {
    id_produk: number;
    nama_produk: string;
    harga_produk: number;
  } | null; // Tambahkan null untuk menangani kasus dari Page
}) {
  if (!produk) {
    return <div>Produk tidak ditemukan.</div>; // Atau redirect/error handling lain
  }

  const updateMenuWithId = updateMenu.bind(null, produk.id_produk.toString());

  return (
    <form action={updateMenuWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nama Produk */}
        <div className="mb-4">
          <label htmlFor="nama_produk" className="mb-2 block text-sm font-medium">
            Nama Produk
          </label>
          <input
            id="nama_produk"
            name="nama_produk"
            type="text"
            defaultValue={produk.nama_produk}
            placeholder="Masukkan nama produk"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>

        {/* Harga Produk */}
        <div className="mb-4">
          <label htmlFor="harga_produk" className="mb-2 block text-sm font-medium">
            Harga Produk
          </label>
          <input
            id="harga_produk"
            name="harga_produk"
            type="number"
            step="0.01"
            defaultValue={produk.harga_produk}
            placeholder="Masukkan harga produk"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/dashboard/menu"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Menu</Button>
      </div>
    </form>
  );
}
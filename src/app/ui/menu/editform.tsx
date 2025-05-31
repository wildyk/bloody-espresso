'use client';

import Link from 'next/link';
import { TagIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateMenu } from '@/app/lib/actions';

export default function EditMenuForm({
  menu,
}: {
  menu: { id_produk: string; nama_produk: string; harga_produk: number };
}) {
  const updateMenuWithId = updateMenu.bind(null, menu.id_produk);

  return (
    <form action={updateMenuWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nama Produk */}
        <div className="mb-4">
          <label htmlFor="nama_produk" className="mb-2 block text-sm font-medium">
            Nama Produk
          </label>
          <div className="relative">
            <input
              id="nama_produk"
              name="nama_produk"
              type="text"
              required
              defaultValue={menu.nama_produk}
              placeholder="Masukkan nama produk"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Harga Produk */}
        <div className="mb-4">
          <label htmlFor="harga_produk" className="mb-2 block text-sm font-medium">
            Harga Produk
          </label>
          <div className="relative">
            <input
              id="harga_produk"
              name="harga_produk"
              type="number"
              step="0.01"
              required
              defaultValue={menu.harga_produk}
              placeholder="Contoh: 12000"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/dashboard/menu"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Batal
        </Link>
        <Button type="submit">Simpan Perubahan</Button>
      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
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
  } | null;
}) {
  const [errors, setErrors] = useState<{
    nama_produk?: string;
    harga_produk?: string;
  }>({});

  const [namaProduk, setNamaProduk] = useState(produk?.nama_produk ?? '');
  const [hargaProduk, setHargaProduk] = useState(produk?.harga_produk.toString() ?? '');

  if (!produk) {
    return <div>Produk tidak ditemukan.</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { nama_produk?: string; harga_produk?: string } = {};

    // Validasi nama produk
    if (!namaProduk.trim()) {
      newErrors.nama_produk = 'Nama produk wajib diisi';
    } else if (!/^[a-zA-Z\s]+$/.test(namaProduk)) {
      newErrors.nama_produk = 'Nama produk hanya boleh huruf';
    }

    // Validasi harga produk
    if (!hargaProduk.trim()) {
      newErrors.harga_produk = 'Harga produk wajib diisi';
    } else if (isNaN(Number(hargaProduk)) || Number(hargaProduk) <= 0) {
      newErrors.harga_produk = 'Harga harus berupa angka positif';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('nama_produk', namaProduk);
    formData.append('harga_produk', hargaProduk);

    await updateMenu(produk.id_produk.toString(), formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            value={namaProduk}
            onChange={(e) => setNamaProduk(e.target.value)}
            placeholder="Masukkan nama produk"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
          />
          {errors.nama_produk && (
            <p className="mt-1 text-sm text-red-600">{errors.nama_produk}</p>
          )}
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
            value={hargaProduk}
            onChange={(e) => setHargaProduk(e.target.value)}
            placeholder="Masukkan harga produk"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
          />
          {errors.harga_produk && (
            <p className="mt-1 text-sm text-red-600">{errors.harga_produk}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/dashboard/menu"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Batal
        </Link>
        <Button type="submit">Edit Menu</Button>
      </div>
    </form>
  );
}

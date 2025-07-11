'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, TagIcon } from '@heroicons/react/24/outline';
import { createMenu } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { alegreya } from '@/app/ui/fonts';

export default function MenuForm() {
  const [namaProduk, setNamaProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const [errors, setErrors] = useState<{
    nama_produk?: string;
    harga_produk?: string;
  }>({});

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
      newErrors.harga_produk = 'Harga produk harus berupa angka positif';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('nama_produk', namaProduk);
    formData.append('harga_produk', hargaProduk);

    const result = await createMenu(formData);

    if (result?.errors) {
      setErrors(result.errors);
    } else {
      setNamaProduk('');
      setHargaProduk('');
      setErrors({});
    }
  };

  const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNamaProduk(value);

    if (/\d/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        nama_produk: 'Nama produk hanya boleh huruf',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        nama_produk: undefined,
      }));
    }
  };

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHargaProduk(value);

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        harga_produk: 'Harga produk wajib diisi',
      }));
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      setErrors((prev) => ({
        ...prev,
        harga_produk: 'Harga produk harus berupa angka positif',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        harga_produk: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={alegreya.className}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nama Produk */}
        <div className="mb-4">
          <label htmlFor="nama_produk" className="mb-2 block text-xl font-medium">
            Nama Produk
          </label>
          <div className="relative">
            <input
              id="nama_produk"
              name="nama_produk"
              type="text"
              value={namaProduk}
              onChange={handleNamaChange}
              placeholder="Masukkan nama produk"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
            />
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {errors.nama_produk && (
            <p className="mt-1 text-sm text-red-600">{errors.nama_produk}</p>
          )}
        </div>

        {/* Harga Produk */}
        <div className="mb-4">
          <label htmlFor="harga_produk" className="mb-2 block text-xl font-medium">
            Harga Produk
          </label>
          <div className="relative">
            <input
              id="harga_produk"
              name="harga_produk"
              type="number"
              step="0.01"
              value={hargaProduk}
              onChange={handleHargaChange}
              placeholder="Contoh: 12000"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
            />
            <PlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {errors.harga_produk && (
            <p className="mt-1 text-sm text-red-600">{errors.harga_produk}</p>
          )}
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className={`${alegreya.className} mt-6 flex justify-end gap-4`}>
        <Link
          href="/admin/dashboard/menu"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-lg font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Batal
        </Link>
        <Button type="submit">Simpan Produk</Button>
      </div>
    </form>
  );
}

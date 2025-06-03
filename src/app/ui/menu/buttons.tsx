'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteMenu } from '@/app/lib/actions';
import { alegreya } from '@/app/ui/fonts';

export function CreateProduk() {
  return (
    <Link
      href="/admin/dashboard/menu/create"
      className={`flex h-10 items-center rounded-lg bg-red-800 px-4 text-base font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${alegreya.className}`}
    >
      <span className="hidden md:block">Tambah Produk</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProduk({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/menu/${id}/edit`}
      className={`rounded-md border p-2 hover:bg-gray-100 ${alegreya.className}`}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProduk({ id }: { id: string }) {
  const handleSubmit = async (formData: FormData) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      await deleteMenu(id);
    }
  };

  return (
    <form action={handleSubmit} className={alegreya.className}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Hapus</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

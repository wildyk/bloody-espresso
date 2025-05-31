'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteMenu } from '@/app/lib/actions'; // ganti dengan fungsi hapus milikmu

// Tombol Tambah Produk
export function CreateMenu() {
  return (
    <Link
      href="/admin/dashboard/menu/create"
      className="flex h-10 items-center rounded-lg bg-red-900 px-4 text-sm font-medium text-white transition-colors hover:bg-red-950 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Tambah Produk</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

// Tombol Edit Produk
export function UpdateMenu({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/menu/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

// Tombol Hapus Produk
export function DeleteMenu({ id }: { id: string }) {
  const deleteMenuWithId = deleteMenu.bind(null, id);

  return (
    <form action={deleteMenuWithId}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Hapus</span>
        <TrashIcon className="w-5 text-red-600" />
      </button>
    </form>
  );
}

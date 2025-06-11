'use client';

import Link from 'next/link';
import { PlusIcon,TrashIcon } from '@heroicons/react/24/outline';
import { alegreya } from '@/app/ui/fonts';
import { deleteTransaksi } from '@/app/lib/actions';

export function CreateTransaksi() {
  return (
    <Link
      href="/admin/dashboard/transaksi/create"
      className="flex h-10 items-center rounded-lg bg-red-800 px-4 text-base font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      <span className={`${alegreya.className} hidden md:block`}>Tambah Transaksi</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteProduk({ id }: { id: string }) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmed = confirm('Apakah Anda yakin ingin menghapus produk ini?');
    if (!confirmed) {
      e.preventDefault();
    }
  };

  return (
    <form
      action={async (formData: FormData) => {
        const id = formData.get('id') as string;
        await deleteTransaksi(id);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={handleClick}
        className={`${alegreya.className} rounded-md border p-2 hover:bg-gray-100`}
      >
        <span className="sr-only">Hapus</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

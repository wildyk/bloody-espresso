import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export function CreateTransaksi() {
  return (
    <Link
      href="/admin/dashboard/menu/create"
      className="flex h-10 items-center rounded-lg bg-red-800 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      <span className="hidden md:block">Tambah Transaksi</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
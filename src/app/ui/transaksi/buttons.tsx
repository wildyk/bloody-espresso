import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { alegreya } from '@/app/ui/fonts';

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
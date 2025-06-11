import { Suspense } from 'react';
import TransaksiSkeleton from './transaksiskeleton';
import TransaksiTableWrapper from './transaksitablewrapper';
import Search from '@/app/ui/search';
import { CreateTransaksi } from '@/app/ui/transaksi/buttons';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function TransaksiPage({ searchParams }: Props) {
  // Akses searchParams secara langsung
  const query = (searchParams?.query as string) || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Transaksi</h1>
          {query && (
            <p className="mt-1 text-sm text-gray-600">
              Menampilkan hasil pencarian untuk: "{query}"
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div className="sm:w-64">
            <Search placeholder="Cari transaksi..." />
          </div>
          <CreateTransaksi />
        </div>
      </div>

      <Suspense fallback={<TransaksiSkeleton />}>
        <TransaksiTableWrapper searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

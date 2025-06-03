import { Suspense } from 'react';
import ProdukSkeleton from './produkskeleton';
import ProdukTableWrapper from './produktablewrapper';
import Search from '@/app/ui/search';
import { CreateProduk } from '@/app/ui/menu/buttons';

export default function ProdukPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  return (
    <section className="p-6">
      {/* Header: Judul, Search, dan Tombol Tambah */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Katalog Produk</h1>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Search placeholder="Cari produk..." />
          <CreateProduk />
        </div>
      </div>

      <Suspense fallback={<ProdukSkeleton />}>
        <ProdukTableWrapper searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

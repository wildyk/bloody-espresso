import { Suspense } from 'react';
import TransaksiSkeleton from './transaksiskeleton';
import TransaksiTableWrapper from './transaksitablewrapper';
import { CreateTransaksi } from '@/app/ui/transaksi/buttons';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function TransaksiPage({ searchParams }: Props) {
  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Transaksi</h1>
        <CreateTransaksi />
      </div>
      
      <Suspense fallback={<TransaksiSkeleton />}>
        <TransaksiTableWrapper searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
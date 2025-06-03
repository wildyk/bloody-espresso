'use client';

import ProdukTable from '@/app/ui/menu/table';

export default function ProdukClient() {
  return (
    <>
      <ProdukTable searchParams={{
        query: undefined,
        page: undefined
      }} />
    </>
  );
}

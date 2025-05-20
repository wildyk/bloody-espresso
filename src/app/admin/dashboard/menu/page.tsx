import { Suspense } from 'react';
import ProdukSkeleton from './produkskeleton';
import ProdukTableWrapper from './produktablewrapper';

export default function ProdukPage() {
  return (
    <section className="p-6">
      <Suspense fallback={<ProdukSkeleton />}>
        <ProdukTableWrapper />
      </Suspense>
    </section>
  );
}

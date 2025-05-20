import { Suspense } from 'react';
import TransaksiSkeleton from './transaksiskeleton';
import TransaksiTableWrapper from './transaksitablewrapper';

export default function TransaksiPage() {
  return (
    <section className="p-6">
      <Suspense fallback={<TransaksiSkeleton />}>
        <TransaksiTableWrapper />
      </Suspense>
    </section>
  );
}

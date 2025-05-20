import { Suspense } from 'react';
import AnalitikClient from './analitikclient';
import AnalitikSkeleton from './analitikskeleton';

export default function AnalitikPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Analitik</h1>

      <Suspense fallback={<AnalitikSkeleton />}>
        <AnalitikClient />
      </Suspense>
    </section>
  );
}

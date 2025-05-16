import { Suspense } from 'react';
import AnalyticsSection from '@/app/ui/analitik/analitiksection';
import AnalitikSectionSkeleton from '@/app/ui/skeletons';
import GrafikPenjualanSkeleton from '@/app/ui/skeletons';

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Halaman Analitik</h1>
      <Suspense
        fallback={
          <div className="space-y-8">
            <AnalitikSectionSkeleton />
            <GrafikPenjualanSkeleton />
          </div>
        }
      >
        <AnalyticsSection data={{
          totalProduk: 0,
          totalRevenue: 0,
          mostSold: '',
          jumlahTerjual: 0
        }} />
      </Suspense>
    </main>
  );
}

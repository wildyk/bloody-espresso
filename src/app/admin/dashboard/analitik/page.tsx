import { Suspense } from 'react';
import Loading from './loading';
import AnalitikMetricSection from './analitikmetriksection';
import GrafikPenjualanSection from './grafiksection';

export default function AnalitikPage() {
  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Analitik</h1>

      <Suspense fallback={<Loading type="metrics" />}>
        <AnalitikMetricSection />
      </Suspense>

      <Suspense fallback={<Loading type="chart" />}>
        <GrafikPenjualanSection />
      </Suspense>
    </section>
  );
}

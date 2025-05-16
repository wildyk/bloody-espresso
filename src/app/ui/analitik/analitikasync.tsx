'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import AnalyticsSkeleton from '@/app/ui/dashboard/skeleton';

const AnalitikSection = dynamic(() => import('./analitiksection'), {
  ssr: false,
});
const GrafikPenjualan = dynamic(() => import('./grafikpenjualan'), {
  ssr: false,
});

interface Props {
  analyticsPromise: Promise<any>;
  chartDataPromise: Promise<any>;
}

export default function AnalitikAsync({ analyticsPromise, chartDataPromise }: Props) {
  return (
    <div className="space-y-8">
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalitikWrapper promise={analyticsPromise} />
      </Suspense>

      <Suspense fallback={<div className="h-48 bg-gray-200 animate-pulse rounded" />}>
        <GrafikWrapper promise={chartDataPromise} />
      </Suspense>
    </div>
  );
}

async function AnalitikWrapper({ promise }: { promise: Promise<any> }) {
  const analytics = await promise;
  const AnalitikSection = (await import('./analitiksection')).default;
  return <AnalitikSection data={analytics} />;
}

async function GrafikWrapper({ promise }: { promise: Promise<any> }) {
  const chartData = await promise;
  const GrafikPenjualan = (await import('./grafikpenjualan')).default;
  return <GrafikPenjualan data={chartData} />;
}

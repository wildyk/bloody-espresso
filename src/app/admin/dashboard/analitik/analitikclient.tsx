'use client';

import { useEffect, useState } from 'react';
import AnalitikSection from '@/app/ui/analitik/analitiksection';
import GrafikPenjualan from '@/app/ui/analitik/grafikpenjualan';

export default function AnalitikClient() {
  const [analytics, setAnalytics] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resAnalytics = await fetch('/api/analytics');
      const resPenjualan = await fetch('/api/penjualan');
      const dataAnalytics = await resAnalytics.json();
      const dataPenjualan = await resPenjualan.json();
      setAnalytics(dataAnalytics);
      setChartData(dataPenjualan);
    };

    fetchData();

    // Optional: real-time refresh setiap 30 detik
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!analytics || !chartData) return null;

  return (
    <>
      <AnalitikSection data={analytics} />
      <GrafikPenjualan data={chartData} />
    </>
  );
}

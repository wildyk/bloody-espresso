import AnalitikSection from '@/app/ui/analitik/analitik';
import GrafikPenjualan from '@/app/ui/analitik/grafikpenjualan';
import { fetchAnalytics, fetchPenjualanProduk } from '@/app/lib/data';

export default async function AnalitikPage() {
  const chartData = await fetchPenjualanProduk();

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Analitik</h1>
      <AnalitikSection data={[]} />
      <GrafikPenjualan data={chartData} />
    </section>
  );
}

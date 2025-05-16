import AnalitikSection from '@/app/ui/analitik/analitiksection';
import GrafikPenjualan from '@/app/ui/analitik/grafikpenjualan';
import { fetchAnalytics, fetchPenjualanProduk } from '@/app/lib/data';

export default async function AnalitikPage() {
  // Panggil data dari database
  const analytics = await fetchAnalytics();
  const chartData = await fetchPenjualanProduk();

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Analitik</h1>

      {/* Info Box: Total Produk, Total Revenue, Produk Terlaris */}
      <AnalitikSection data={analytics} />

      {/* Grafik Bar Penjualan Produk */}
      <GrafikPenjualan data={chartData} />
    </section>
  );
}

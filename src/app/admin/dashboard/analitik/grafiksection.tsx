import { fetchPenjualanProduk } from '@/app/lib/data';
import GrafikPenjualan from '@/app/ui/analitik/grafikpenjualan';

export default async function GrafikPenjualanSection() {
  const data = await fetchPenjualanProduk();
  return <GrafikPenjualan data={data} />;
}

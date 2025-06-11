import { fetchAllProduk } from '@/app/lib/data';
import ProdukTable from '@/app/ui/menu/table';

export const dynamic = 'force-dynamic';
export default async function ProdukTableWrapper({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const produkList = await fetchAllProduk();

  return <ProdukTable searchParams={searchParams} />;
}

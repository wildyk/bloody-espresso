import ProdukTable from '@/app/ui/menu/table';

export default function ProdukTableWrapper({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  return <ProdukTable searchParams={searchParams} />;
}

import ProdukTable from '@/app/ui/menu/table';

export default async function ProdukTableWrapper() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Katalog Produk</h1>
      <ProdukTable />
    </>
  );
}

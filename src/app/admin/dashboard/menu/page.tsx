import ProdukTable from '@/app/ui/menu/table'; // atau sesuaikan path

export default function ProdukPage() {
  return (
    <section className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Katalog Produk</h1>
      <ProdukTable />
    </section>
  );
}

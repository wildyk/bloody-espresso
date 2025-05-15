import { fetchProduk } from '@/app/lib/data';
import { alegreya } from '@/app/ui/fonts';

export default async function ProdukTable() {
  const produkList = await fetchProduk();

  return (
    <div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-red-800 text-white">
          <tr>
            <th className={`${alegreya.className} not-last:px-4 py-3 text-left font-semibold`}>ID Produk</th>
            <th className={`${alegreya.className}px-4 py-3 text-left font-semibold`}>Nama Produk</th>
            <th className={`${alegreya.className}px-4 py-3 text-left font-semibold`}>Harga</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white text-gray-800">
          {produkList.map((produk) => (
            <tr key={produk.id_produk}>
              <td className="px-4 py-2">{produk.id_produk}</td>
              <td className="px-4 py-2">{produk.nama_produk}</td>
              <td className="px-4 py-2">Rp {produk.harga_produk.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

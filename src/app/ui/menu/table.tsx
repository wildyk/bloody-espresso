import { fetchProduk } from '@/app/lib/data';
import { alegreya } from '@/app/ui/fonts';

export default async function ProdukTable({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams.query?.toLowerCase() || '';
  const currentPage = parseInt(searchParams.page || '1', 10);
  const itemsPerPage = 5;

  const produkList = await fetchProduk('');

  const filtered = produkList.filter((produk) =>
    produk.nama_produk.toLowerCase().includes(query)
  );

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
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
            {paginated.map((produk) => (
              <tr key={produk.id_produk}>
                <td className="px-4 py-2">{produk.id_produk}</td>
                <td className="px-4 py-2">{produk.nama_produk}</td>
                <td className="px-4 py-2">Rp {produk.harga_produk.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<div className="mt-4 flex justify-center gap-2">
  {[...Array(totalPages)].map((_, i) => {
    const page = i + 1;
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') params.set(key, value);
    });

    params.set('page', String(page));
    const href = `?${params.toString()}`;

    return (
      <a
        key={page}
        href={href}
        className={`rounded px-3 py-1 text-sm ${
          page === currentPage ? 'bg-red-900 text-white' : 'border'
        }`}
      >
        {page}
      </a>
    );
  })}
</div>

    </>
  );
}

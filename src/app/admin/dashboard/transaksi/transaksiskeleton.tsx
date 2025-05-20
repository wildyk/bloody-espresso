export default function TransaksiSkeleton() {
  return (
    <section className="p-6 animate-pulse">
      {/* Judul Skeleton */}
      <div className="h-8 w-1/3 bg-gray-300 rounded mb-6"></div>

      {/* Skeleton Tabel */}
      <div className="overflow-x-auto border border-gray-300 rounded-md shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-300 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">ID Transaksi</th>
              <th className="px-4 py-3 text-left font-semibold">ID Produk</th>
              <th className="px-4 py-3 text-left font-semibold">Nama Pembeli</th>
              <th className="px-4 py-3 text-left font-semibold">Tanggal</th>
              <th className="px-4 py-3 text-left font-semibold">Total Harga</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

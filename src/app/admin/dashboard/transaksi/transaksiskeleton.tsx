import { alegreya } from '@/app/ui/fonts';

export default function SkeletonTransaksiTable() {
  return (
    <div className="mt-8 animate-pulse">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Header Skeleton */}
        <div className="border-b border-gray-200 bg-red-900 px-6 py-4">
          <div className="h-6 w-1/3 bg-red-700 rounded mb-2"></div>
          <div className="h-4 w-1/4 bg-red-700 rounded"></div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['ID Transaksi', 'ID Produk', 'Nama Pembeli', 'Tanggal', 'Total Harga'].map((header) => (
                <th
                  key={header}
                  className={`${alegreya.className} px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {[...Array(5)].map((_, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg">
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-10 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

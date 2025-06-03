import { alegreya } from '@/app/ui/fonts';

export default function ProdukSkeleton() {
  return (
    <>
      <div className="mt-8 flow-root animate-pulse">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Table Header Skeleton */}
            <div className="border-b border-gray-200 bg-red-900 px-6 py-4">
              <div className="h-6 w-48 bg-red-800 rounded"></div>
              <div className="h-4 w-32 bg-red-800 rounded mt-1"></div>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className={`${alegreya.className} px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    ID Produk
                  </th>
                  <th scope="col" className={`${alegreya.className} px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    Nama Produk
                  </th>
                  <th scope="col" className={`${alegreya.className} px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
                    {/* ID Produk */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </td>
                    
                    {/* Nama Produk */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </td>
                    
                    {/* Harga dengan badge style */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 border border-green-200">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </div>
                    </td>
                    
                    {/* Aksi Buttons */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-3">
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg animate-pulse">
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
        
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
          
          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded-md"></div>
            ))}
          </div>
          
          {/* Next Button */}
          <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </>
  );
}
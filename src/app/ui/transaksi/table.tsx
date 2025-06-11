import { fetchTransaksi } from "@/app/lib/data";
import { alegreya } from "@/app/ui/fonts";
import { DeleteProduk } from "@/app/ui/transaksi/buttons";

export default async function TransaksiTable({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams.query?.toLowerCase() || "";
  const currentPage = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = 5;

  const transaksiList = await fetchTransaksi();

  const filtered = transaksiList.filter(
    (transaksi) =>
      transaksi.nama_pembeli.toLowerCase().includes(query) ||
      transaksi.id_transaksi.toString().includes(query) ||
      transaksi.id_produk.toString().includes(query)
  );

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="mt-8 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Table Header */}
            <div className="border-b border-gray-200 bg-red-900 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">
                Daftar Transaksi
              </h3>
              <p className="text-white text-lg mt-1">
                Total {totalItems} transaksi ditemukan
              </p>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    scope="col"
                    className={`${alegreya.className} px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    ID Transaksi
                  </th>
                  <th
                    scope="col"
                    className={`${alegreya.className} px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    ID Produk
                  </th>
                  <th
                    scope="col"
                    className={`${alegreya.className} px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    Nama Pembeli
                  </th>
                  <th
                    scope="col"
                    className={`${alegreya.className} px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    Tanggal
                  </th>
                  <th
                    scope="col"
                    className={`${alegreya.className} px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    Total Harga
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginated.map((transaksi) => (
                  <tr
                    key={transaksi.id_transaksi}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xl font-medium text-gray-900">
                        {transaksi.id_transaksi}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xl font-medium text-gray-900">
                        {transaksi.id_produk}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-gray-900">
                        {transaksi.nama_pembeli}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-lg font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {new Date(
                          transaksi.tanggal_transaksi
                        ).toLocaleDateString("id-ID")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-lg font-medium bg-green-100 text-green-800 border border-green-200">
                        Rp {transaksi.total_harga.toLocaleString("id-ID")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-3">
                        <DeleteProduk id={transaksi.id_transaksi.toString()} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {paginated.length === 0 && (
              <div className="text-center py-12 border-t border-gray-200">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Tidak ada transaksi ditemukan
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {query
                    ? `Tidak ada hasil untuk pencarian "${query}"`
                    : "Belum ada transaksi yang dicatat"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-700">
            Menampilkan{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            sampai{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            dari <span className="font-medium">{totalItems}</span> transaksi
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            {currentPage > 1 && (
              <a
                href={`?${new URLSearchParams({
                  ...Object.fromEntries(
                    Object.entries(searchParams).filter(
                      ([key]) => key !== "page"
                    )
                  ),
                  page: String(currentPage - 1),
                }).toString()}`}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-lg font-medium text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors duration-200"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="ml-1 hidden sm:block">Sebelumnya</span>
              </a>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                const params = new URLSearchParams();

                Object.entries(searchParams).forEach(([key, value]) => {
                  if (value && key !== "page") params.set(key, value);
                });

                params.set("page", String(page));
                const href = `?${params.toString()}`;

                return (
                  <a
                    key={page}
                    href={href}
                    className={`relative inline-flex items-center px-4 py-2 text-lg font-medium border transition-colors duration-200 ${
                      page === currentPage
                        ? "z-10 bg-red-900 text-white focus:z-20 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded-md"
                        : "text-gray-900 border-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 rounded-md bg-white"
                    }`}
                  >
                    {page}
                  </a>
                );
              })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages && (
              <a
                href={`?${new URLSearchParams({
                  ...Object.fromEntries(
                    Object.entries(searchParams).filter(
                      ([key]) => key !== "page"
                    )
                  ),
                  page: String(currentPage + 1),
                }).toString()}`}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-lg font-medium text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors duration-200"
              >
                <span className="mr-1 hidden sm:block">Selanjutnya</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import { fetchProdukWithFoto } from "@/app/lib/data";
import { alegreya, nosifer } from "@/app/ui/fonts";
import Navbar from "@/app/verif/navbar";
import MenuClient from "./menu-client";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let produkList: any[] = [];
  let error: string | null = null;

  try {
    produkList = await fetchProdukWithFoto();
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Gagal memuat menu dari database. Silakan coba lagi.";
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className={`${alegreya.className} text-xl text-red-300 mb-4`}>
              {error}
            </p>
            <form>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-[#9b684c] text-white py-2 px-6 rounded-full hover:bg-[#7d543d] transition-colors"
              >
                Coba Lagi
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  const currentPage = parseInt(searchParams.page as string) || 1;
  const itemsPerPage = 8;
  const totalItems = produkList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedProdukList = produkList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white">
      <Navbar />

      <section className="text-center py-20 px-4">
        <h1
          className={`${nosifer.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide text-[#F8E4BE] mb-6`}
        >
          MENU
        </h1>

        <p
          className={`${alegreya.className} text-lg sm:text-xl md:text-2xl text-[#f5deb3]/80 mb-12 max-w-4xl mx-auto`}
        >
          Jelajahi semua rasa kopi bersama kami. Selalu ada secangkir kopi baru
          yang layak dicoba.
        </p>

        {paginatedProdukList.length === 0 ? (
          <p className={`${alegreya.className} text-xl text-[#f5deb3]/60`}>
            Belum ada menu tersedia di database.
          </p>
        ) : (
          <MenuClient produkList={paginatedProdukList} />
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center justify-center">
            <div className="text-sm text-gray-200 mb-2">
              Menampilkan{" "}
              <span className="font-semibold">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              sampai{" "}
              <span className="font-semibold">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{" "}
              dari <span className="font-semibold">{totalItems}</span> menu
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {/* Previous Button */}
              {currentPage > 1 && (
                <a
                  href={`?page=${currentPage - 1}`}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <span className="hidden sm:inline">← Sebelumnya</span>
                </a>
              )}

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                const isActive = page === currentPage;

                return (
                  <a
                    key={page}
                    href={`?page=${page}`}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-red-900 text-white border border-red-900"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </a>
                );
              })}

              {/* Next Button */}
              {currentPage < totalPages && (
                <a
                  href={`?page=${currentPage + 1}`}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <span className="hidden sm:inline">Selanjutnya →</span>
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

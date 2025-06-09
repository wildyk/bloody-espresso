import { fetchProdukWithFoto } from "@/app/lib/data";
import { alegreya, nosifer } from "@/app/ui/fonts";
import Navbar from "@/app/ui/navbar";
import MenuClient from "./menu-client";

export default async function MenuPage() {
  let produkList: any[] = [];
  let error: string | null = null;

  try {
    produkList = await fetchProdukWithFoto();
  } catch (err) {
    console.error('Error fetching products:', err);
    error = 'Gagal memuat menu dari database. Silakan coba lagi.';
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className={`${alegreya.className} text-xl text-red-300 mb-4`}>{error}</p>
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

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white">
      <Navbar />
      
      <section className="text-center py-20 px-4">
        <h1 className={`${nosifer.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide text-[#F8E4BE] mb-6`}>
          MENU
        </h1>
        
        <p className={`${alegreya.className} text-lg sm:text-xl md:text-2xl text-[#f5deb3]/80 mb-12 max-w-4xl mx-auto`}>
          Jelajahi semua rasa kopi bersama kami. Selalu ada secangkir kopi baru
          yang layak dicoba.
        </p>

        {produkList.length === 0 ? (
          <p className={`${alegreya.className} text-xl text-[#f5deb3]/60`}>
            Belum ada menu tersedia di database.
          </p>
        ) : (
          <MenuClient produkList={produkList} />
        )}
      </section>
    </main>
  );
}


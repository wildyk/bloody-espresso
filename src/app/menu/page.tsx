import Image from "next/image";
import { fetchProdukWithFoto } from "@/app/lib/data";
import Link from "next/link";
import { alegreya, nosifer } from "@/app/ui/fonts";
import Navbar from "@/app/ui/navbar"; // pastikan path-nya sesuai!

export default async function MenuPage() {
  const produkList = await fetchProdukWithFoto();

  return (
    <main className="min-h-screen bg-[#300000] text-white">
      <Navbar />
            <section className="text-center py-4 px-10 mb-53">
        <h2
          className={`${nosifer.className} text-7xl font-extrabold tracking-wide text-[#F8E4BE]`}
        >
          MENU
        </h2>
        <p className={`${alegreya.className} mt-4 text-2xl text-gray-300`}>
          Jelajahi semua rasa kopi bersama kami. Selalu ada secangkir kopi baru
          yang layak dicoba.
        </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
        {produkList.map((produk) => (
          <div
            key={produk.id_produk}
            className="bg-[#fcefdc] rounded-lg shadow overflow-hidden text-center"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <img
                src={produk.foto}
                alt={produk.nama_produk}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#300000]">
                {produk.nama_produk}
              </h3>
              <p className="text-xs text-[#300000] mt-1">
                Coffee 50% | Milk 50%
              </p>
              <p className="text-base font-bold text-[#300000] mt-2">
                Rp. {produk.harga_produk.toLocaleString()}
              </p>
              <button className="mt-3 bg-[#9b684c] text-white py-1 px-4 rounded-full hover:bg-[#7d543d] transition">
                ORDER
              </button>
            </div>
          </div>
        ))}
      </div>
      </section>
    </main>
  );
}

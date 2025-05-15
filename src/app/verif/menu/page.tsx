import Image from 'next/image';
import { fetchProdukWithFoto } from '@/app/lib/data';

export default async function MenuPage() {
  const produkList = await fetchProdukWithFoto();

  return (
    <main className="min-h-screen bg-[#300000] text-white">
      <h1 className="text-4xl text-center font-bold mt-8 font-[Nosifer]">MENU</h1>
      <p className="text-center mt-2 text-sm">Jelajahi semua rasa kopi bersama kami. Selalu ada secangkir kopi baru yang layak dicoba.</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
        {produkList.map((produk) => (
          <div key={produk.id_produk} className="bg-[#fcefdc] rounded-lg shadow overflow-hidden text-center">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={produk.foto}
                alt={produk.nama_produk}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#300000]">{produk.nama_produk}</h3>
              <p className="text-xs text-[#300000] mt-1">Coffee 50% | Milk 50%</p>
              <p className="text-base font-bold text-[#300000] mt-2">Rp. {produk.harga_produk.toLocaleString()}</p>
              <button className="mt-3 bg-[#9b684c] text-white py-1 px-4 rounded-full hover:bg-[#7d543d] transition">
                ORDER
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

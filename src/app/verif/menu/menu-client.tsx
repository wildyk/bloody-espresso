"use client";

import { useState, useCallback, useEffect } from "react";
import { alegreya, nosifer } from "@/app/ui/fonts";
import { useCart } from "@/app/ui/cartcontext";

interface MenuItem {
  id_produk: number;
  nama_produk: string;
  harga_produk: number;
  foto: string;
}

interface MenuClientProps {
  produkList: MenuItem[];
}

export default function MenuClient({ produkList }: MenuClientProps) {
  const [selectedProduk, setSelectedProduk] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const openModal = useCallback((produk: MenuItem) => {
    setSelectedProduk(produk);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduk(null);
    document.body.style.overflow = "unset";
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleModalOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal]
  );

  const handleAddToCart = useCallback(() => {
    if (!selectedProduk) return;

    addToCart({
      id: selectedProduk.id_produk.toString(),
      name: selectedProduk.nama_produk,
      price: selectedProduk.harga_produk,
      image: selectedProduk.foto,
      quantity: 1, // selalu 1
    });

    alert(`${selectedProduk.nama_produk} berhasil ditambahkan ke keranjang!`);
    closeModal();
  }, [selectedProduk, addToCart, closeModal]);

  const handleOrder = useCallback((produk: MenuItem) => {
    addToCart({
      id: produk.id_produk.toString(),
      name: produk.nama_produk,
      price: produk.harga_produk,
      image: produk.foto,
      quantity: 1, // selalu 1
    });

    alert(`${produk.nama_produk} ditambahkan ke keranjang. Silakan lanjutkan ke pembayaran.`);
  }, [addToCart]);

  return (
    <>
      <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full mx-auto px-4">
        {produkList.map((produk) => (
          <article
            key={produk.id_produk}
            className="bg-[#fcefdc] rounded-xl shadow-lg overflow-hidden text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[#F8E4BE]"
          >
            <div className="relative w-full h-64 sm:h-72 md:h-80 bg-gray-100">
              <img
                src={produk.foto}
                alt={`Foto produk ${produk.nama_produk}`}
                className="object-cover w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => openModal(produk)}
                onError={(e: any) => {
                  e.currentTarget.src = "/placeholder-coffee.jpg";
                }}
              />
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#300000] mb-3 line-clamp-2">
                {produk.nama_produk}
              </h2>
              <p className="text-sm sm:text-base text-[#300000]/70 mb-4">
                Kopi Premium • Siap Saji
              </p>
              <p className="text-lg sm:text-xl font-bold text-[#300000] mb-6">
                Rp. {produk.harga_produk?.toLocaleString("id-ID") || "0"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openModal(produk)}
                  className="bg-[#6b5b95] text-white py-3 px-4 sm:px-6 rounded-full hover:bg-[#5a4a7a] focus:bg-[#5a4a7a] transition-colors font-medium text-sm sm:text-lg flex-1"
                >
                  DETAIL
                </button>
                <button
                  onClick={() => handleOrder(produk)}
                  className="bg-[#9b684c] text-white py-3 px-4 sm:px-6 rounded-full hover:bg-[#7d543d] focus:bg-[#7d543d] transition-colors font-medium text-sm sm:text-lg flex-1"
                >
                  ORDER
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {isModalOpen && selectedProduk && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleModalOverlayClick}
        >
          <div className="bg-[#fcefdc] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 z-10"
            >
              ✕
            </button>
            <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100">
              <img
                src={selectedProduk.foto}
                alt={`Foto produk ${selectedProduk.nama_produk}`}
                className="object-cover w-full h-full rounded-t-2xl"
                onError={(e: any) => {
                  e.currentTarget.src = "/placeholder-coffee.jpg";
                }}
              />
            </div>

            <div className="p-6 sm:p-8">
              <h2 className={`${nosifer.className} text-2xl sm:text-3xl font-bold text-[#300000] mb-4`}>
                {selectedProduk.nama_produk}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#300000] mb-2">
                    Informasi Produk
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base text-[#300000]/80">
                    <p><span className="font-medium">ID Produk:</span> #{selectedProduk.id_produk}</p>
                    <p><span className="font-medium">Kategori:</span> Kopi Premium</p>
                    <p><span className="font-medium">Ukuran:</span> Regular (350ml)</p>
                    <p><span className="font-medium">Status:</span> Tersedia</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#300000] mb-2">
                    Deskripsi
                  </h3>
                  <p className="text-[#300000]/80 text-sm leading-relaxed">
                    Nikmati cita rasa kopi premium yang dipadukan dengan sempurna. Setiap tegukan memberikan pengalaman yang tak terlupakan dengan aroma yang menggugah selera dan rasa yang kaya.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#300000]/20 pt-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-[#300000]/60 mb-1">Harga</p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#300000]">
                      Rp. {selectedProduk.harga_produk?.toLocaleString("id-ID") || "0"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-400 text-white py-3 px-6 rounded-full hover:bg-gray-500 focus:bg-gray-500 transition-colors font-medium flex-1"
                  >
                    TUTUP
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="bg-[#9b684c] text-white py-3 px-6 rounded-full hover:bg-[#7d543d] focus:bg-[#7d543d] transition-colors font-medium sm:flex-[2]"
                  >
                    TAMBAH KE KERANJANG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

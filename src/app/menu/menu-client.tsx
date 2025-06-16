"use client";

import { useState, useCallback, useEffect } from "react";
import { alegreya, nosifer } from "@/app/ui/fonts";
import { isUserLoggedIn } from "@/app/utils/authclient";
import { useRouter } from "next/navigation";

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
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const openModal = useCallback((produk: MenuItem) => {
    setSelectedProduk(produk);
    setIsModalOpen(true);
    setQuantity(1);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduk(null);
    setQuantity(1);
    document.body.style.overflow = "unset";
  }, []);

  // Handle escape key
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

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!selectedProduk) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_produk: selectedProduk.id_produk,
          nama_produk: selectedProduk.nama_produk,
          quantity,
          harga_produk: selectedProduk.harga_produk,
          total_harga: selectedProduk.harga_produk * quantity,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(
          `${quantity}x ${selectedProduk.nama_produk} berhasil ditambahkan ke keranjang!`
        );
        closeModal();
      } else throw new Error(result.error || "Gagal menambahkan ke keranjang");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Gagal menambahkan ke keranjang. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, [quantity, selectedProduk, closeModal]);

  const handleOrder = useCallback(async (produk: MenuItem) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/transaksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_produk: produk.id_produk,
          nama_produk: produk.nama_produk,
          quantity: 1,
          harga_produk: produk.harga_produk,
          total_harga: produk.harga_produk,
          nama_pembeli: "Guest",
        }),
      });
      const result = await response.json();
      if (response.ok) alert(`Pesanan ${produk.nama_produk} berhasil dibuat!`);
      else throw new Error(result.error || "Gagal membuat pesanan");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Gagal membuat pesanan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, []);

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
                  className="bg-[#6b5b95] text-white py-3 px-4 sm:px-6 rounded-full hover:bg-[#5a4a7a] focus:bg-[#5a4a7a] focus:outline-none focus:ring-2 focus:ring-[#6b5b95] transition-colors font-medium text-sm sm:text-lg flex-1"
                  disabled={isLoading}
                >
                  DETAIL
                </button>
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      alert("Silakan login terlebih dahulu untuk memesan.");
                      router.push("/auth/login"); // redirect opsional
                      return;
                    }
                    handleOrder(produk);
                  }}
                  className="bg-[#9b684c] text-white py-3 px-4 sm:px-6 rounded-full hover:bg-[#7d543d] focus:bg-[#7d543d] focus:outline-none focus:ring-2 focus:ring-[#9b684c] transition-colors font-medium text-sm sm:text-lg flex-1 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "LOADING..." : "ORDER"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
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
              <h2
                className={`${nosifer.className} text-2xl sm:text-3xl font-bold text-[#300000] mb-4`}
              >
                {selectedProduk.nama_produk}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#300000] mb-2">
                    Informasi Produk
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base text-[#300000]/80">
                    <p>
                      <span className="font-medium">ID Produk:</span> #
                      {selectedProduk.id_produk}
                    </p>
                    <p>
                      <span className="font-medium">Kategori:</span> Kopi
                      Premium
                    </p>
                    <p>
                      <span className="font-medium">Ukuran:</span> Regular
                      (350ml)
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> Tersedia
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#300000] mb-2">
                    Deskripsi
                  </h3>
                  <p className="text-[#300000]/80 text-sm leading-relaxed">
                    Nikmati cita rasa kopi premium yang dipadukan dengan
                    sempurna. Setiap tegukan memberikan pengalaman yang tak
                    terlupakan dengan aroma yang menggugah selera dan rasa yang
                    kaya. Diolah dengan bahan-bahan pilihan terbaik untuk
                    memberikan kualitas terbaik.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#300000]/20 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-[#300000]/60 mb-1">Harga</p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#300000]">
                      Rp.{" "}
                      {selectedProduk.harga_produk?.toLocaleString("id-ID") ||
                        "0"}
                    </p>
                    <p className="text-sm text-[#300000]/60 mt-1">
                      Total: Rp.{" "}
                      {(selectedProduk.harga_produk * quantity)?.toLocaleString(
                        "id-ID"
                      ) || "0"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1 || isLoading}
                      className="bg-gray-200 text-[#300000] px-4 py-2 rounded-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Kurangi jumlah"
                    >
                      -
                    </button>
                    <span className="text-xl font-medium text-[#300000] px-4 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= 99 || isLoading}
                      className="bg-gray-200 text-[#300000] px-4 py-2 rounded-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Tambah jumlah"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-400 text-white py-3 px-6 rounded-full hover:bg-gray-500 focus:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 font-medium flex-1"
                    disabled={isLoading}
                  >
                    TUTUP
                  </button>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        alert(
                          "Silakan login terlebih dahulu untuk menambahkan ke keranjang."
                        );
                        router.push("/auth/login"); 
                        return;
                      }
                      handleAddToCart();
                    }}
                    className="bg-[#9b684c] text-white py-3 px-6 rounded-full hover:bg-[#7d543d] focus:bg-[#7d543d] focus:outline-none focus:ring-2 focus:ring-[#9b684c] focus:ring-offset-2 transition-colors duration-200 font-medium sm:flex-[2] disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "MENAMBAHKAN..." : "TAMBAH KE KERANJANG"}
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

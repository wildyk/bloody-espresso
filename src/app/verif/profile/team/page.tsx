"use client";

import { useEffect, useState } from "react";
import { alegreya, nosifer } from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import { ShoppingCart, UserRound } from "lucide-react";
import Navbar from "@/app/verif/navbar";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  qty?: number;
}

const teamMembers = [
  {
    name: "(Silvia Melani - Store manager)",
    role: "The Mistic Manager",
    description:
      "Penjaga keseimbangan antara dunia nyata dan aroma kopi. Dengan ketelitian dan kepemimpinan yang tajam, Silvia memastikan Bloody Espresso berjalan dengan harmonis—menyajikan pelayanan terbaik dengan sentuhan misteri yang menggoda.",
    image: "/orang.png",
  },
  {
    name: "(Rayhan Wildy - Desain Visual & Dekorasi)",
    role: "Head The Phantom Artisan",
    description:
      "Desain dan dekorasi di Bloody Espresso adalah hasil karya tangan Rayhan. Dengan sentuhan estetikanya yang gelap dan elegan, ia menciptakan suasana yang membawa pelanggan masuk ke dunia lain—di mana misteri dan kopi berpadu dalam harmoni.",
    image: "/orang.png",
  },
  {
    name: "(Elsa Dwita - Head of Barista)",
    role: "The Alchemist Barista",
    description:
      "Dengan tangan terampilnya, Elsa meracik kopi layaknya ramuan mistis. Setiap cangkir yang ia sajikan bukan sekadar minuman, tetapi sebuah pengalaman yang menggugah jiwa—meninggalkan jejak rasa yang tak terlupakan.",
    image: "/orang.png",
  },
];

export default function Page() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextButton = document.querySelector(".swiper-button-next-custom");
      const prevButton = document.querySelector(".swiper-button-prev-custom");
      if (nextButton && prevButton) {
        nextButton.classList.remove("swiper-button-disabled");
        prevButton.classList.remove("swiper-button-disabled");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative overflow-y-auto">
              <Navbar />
      <section className="py-16 mb-24 flex flex-col items-center px-8 md:px-20 relative">
        <h1
          className={`${nosifer.className} text-7xl font-extrabold text-center mb-12 text-[#f5deb3] drop-shadow-md`}
        >
          OUR TEAM
        </h1>
        <div className="relative w-full max-w-7xl">
          {/* Navigation Buttons - outside swiper */}
          <div className="absolute -left-12 top-[50%] -translate-y-1/2 z-10 text-[#f5deb3] cursor-pointer text-5xl font-bold hover:scale-125 transition swiper-button-prev-custom">
            ❮
          </div>
          <div className="absolute -right-12 top-[50%] -translate-y-1/2 z-10 text-[#f5deb3] cursor-pointer text-5xl font-bold hover:scale-125 transition swiper-button-next-custom">
            ❯
          </div>

          <Swiper
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            modules={[Navigation, Pagination]}
            className="w-full mx-auto"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="flex flex-row items-center bg-[#5a1919]/50 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-[85vw] h-[600px] p-24 border border-[#8b4513]"
                >
                  <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border-[6px] border-[#8b4513] shadow-md flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-12 text-left flex flex-col justify-center">
                    <h2
                      className={`${alegreya.className} text-4xl font-bold text-[#f5deb3] drop-shadow-lg`}
                    >
                      {member.role}
                    </h2>
                    <h3
                      className={`${alegreya.className} text-3xl font-bold text-[#f5deb3]/80 drop-shadow-lg`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`${alegreya.className} mt-6 text-2xl text-[#f5deb3]/80 leading-relaxed`}
                    >
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Bullets */}
          <div className="swiper-pagination-custom mt-8 flex justify-center"></div>
        </div>
      </section>
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-[500px] h-full bg-[#5c0a0a] text-white z-50 p-6 overflow-y-auto">
          <div className="mb-6 border-b border-white pb-4 relative">
            <h2
              className={`${nosifer.className} text-4xl font-bold text-center w-full text-[#f5deb3] drop-shadow-md my-4`}
            >
              KERANJANG
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-0 right-0 text-white text-2xl font-bold"
            >
              ✕
            </button>
          </div>
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div
                  key={item.name}
                  className={`${alegreya.className} mb-6 border-b border-white pb-4`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="rounded"
                  />
                  <h3 className="text-2xl font-bold mt-2">{item.name}</h3>
                  <p className="text-xl">
                    Rp. {item.price.toLocaleString("id-ID")}
                  </p>
                  <span className="text-xl">Jumlah: {item.qty}</span>
                </div>
              ))}

              {/* Total Harga */}
              <div
                className={`${alegreya.className} text-xl font-bold bg-[#A8715C] text-[#1E1E1E] py-2 mb-4 rounded text-center`}
              >
                TOTAL ・ RP{" "}
                {cart
                  .reduce((acc, item) => acc + item.price * (item.qty || 1), 0)
                  .toLocaleString("id-ID")}
              </div>

              {/* Tombol Bayar */}
              <button
                onClick={() => {
                  alert("Pembayaran berhasil! ☕");
                  setCart([]);
                  setIsCartOpen(false);
                }}
                className={`${alegreya.className} w-full py-4 bg-[#A8715C] text-xl text-[#1E1E1E] font-bold rounded shadow-lg hover:bg-yellow-800 transition cursor-pointer`}
              >
                BAYAR
              </button>
            </>
          ) : (
            <p className="text-center text-lg mt-10">Keranjang kosong ☕</p>
          )}
        </div>
      )}
    </main>
  );
}

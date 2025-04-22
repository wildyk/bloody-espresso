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
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 text-[#FFF8E8] ml-7">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Bloody Espresso Logo"
            width={80}
            height={50}
          />
        </Link>

        <ul
          className={`${alegreya.className} flex gap-5 text-2xl font-bold items-center`}
        >
          <li className="relative mr-10 cursor-pointer hover:text-[#E3CDA2]">
            <Link href="/verif/home">Beranda</Link>
          </li>

          {/* Tentang Kami */}
          <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
            <span onClick={toggleDropdown} className="pb-1 select-none">
              Tentang Kami
            </span>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-60 bg-gray-800 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out z-10">
                <ul className="py-4 text-lg text-white">
                  <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
                    <Link href="/verif/profile/team">Profil Team</Link>
                  </li>
                  <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
                    <Link href="/verif/profile/toko">Profil Toko</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Kontak */}
          <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
            <Link href="/verif/kontak">Kontak</Link>
          </li>

          <li className="relative mr-10 cursor-pointer hover:text-[#E3CDA2]">
            <Link href="/verif/menu">Menu</Link>
          </li>

          <li className="bg-[#7b1e1e] px-6 py-2 rounded-l-full text-center flex space-x-6">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={40} />
              <span className="text-xl">Keranjang</span>
            </div>
            <div className="relative flex flex-col items-center cursor-pointer">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex flex-col items-center"
              >
                <UserRound size={40} />
                <span className="text-xl">Profile</span>
              </div>

              {profileOpen && (
                <div className="absolute top-full mt-2 bg-gray-800 rounded-lg shadow-lg w-40 z-20">
                  <ul className="py-2 text-white text-lg">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      <Link
                        href="/verif/akun"
                        onClick={() => setProfileOpen(false)}
                      >
                        Akun Saya
                      </Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>

      {/* Our Team Section */}
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

      {/* Footer */}
      <footer
        className="relative bg-cover bg-center text-[#E3CDA2] py-12 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center"
        style={{ backgroundImage: "url('/bg-kopi-footer.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#4A2C2C] opacity-80 z-0"></div>
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center pl-12 md:pl-0">
          <div className="mb-6 md:mb-0">
            <Image
              src="/grinder.png"
              width={200}
              height={200}
              alt="Coffee Grinder"
              className="filter invert"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left tracking-widest">
            <div>
              <h4 className="text-2xl font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="ml-32">
              <h4 className="text-2xl font-semibold mb-4">
                Customer Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="ml-32">
              <h4 className="text-2xl font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Refunds & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Limitation of Liability
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mr-15 mt-6 md:mt-0">
            <p className="mb-3 text-lg">📍 12 Jhon Avenue #35 - New York</p>
            <p className="mb-3 text-lg">
              📧{" "}
              <Link
                href="mailto:ElizaCoffee@Coffee.Com"
                className="hover:text-[#F5D29D]"
              >
                ElizaCoffee@Coffee.Com
              </Link>
            </p>
            <p className="mb-3 text-lg">
              📞{" "}
              <Link href="tel:+122-34-ELIZA" className="hover:text-[#F5D29D]">
                +1-222-34-ELIZA
              </Link>
            </p>
            <div className="flex gap-4 mt-4 items-center">
              <span>Social Media:</span>
              <Link href="#">
                <Instagram size={32} className="hover:text-[#F5D29D]" />
              </Link>
              <Link href="#">
                <Facebook size={32} className="hover:text-[#F5D29D]" />
              </Link>
              <Link href="#">
                <Twitter size={32} className="hover:text-[#F5D29D]" />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-[#2A1C1C] text-center py-4 text-lg text-[#E3CDA2]">
        Created by Elinau9 | Copyright 2023 Eliza Coffee. All Rights Reserved.
      </div>
    </main>
  );
}

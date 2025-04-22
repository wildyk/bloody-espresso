"use client";

import { alegreya, nosifer } from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, UserRound } from "lucide-react";
import { useState } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  qty?: number;
}

export default function Page() {
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
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative">
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

      {/* Profile Store Section */}
      <section className="min-h-screen flex flex-col md:flex-row justify-center items-center px-8 md:px-20 pt-12">
        {/* Left Side - Image */}
        <div className="md:w-xl flex justify-center">
          <div className="relative w-[900px] h-[900px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/toko.png"
              alt="Profil Toko"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side - Description */}
        <div className="md:w-1/2 flex flex-col justify-center items-start mt-10 md:mt-0 md:pl-10">
          <h1
            className={`${nosifer.className} text-[50px] font-extrabold text-[#f5deb3] tracking-widest drop-shadow-md mb-6`}
          >
            PROFIL TOKO
          </h1>
          <div className="bg-[#5a1919]/50 backdrop-blur-md rounded-3xl shadow-2xl w-full p-10 border border-[#8b4513] text-left">
            <h2 className="text-3xl font-bold text-[#f5deb3] mb-4">
              📍 Lokasi : Puri Sari No. 10
            </h2>
            <h2 className="text-3xl font-bold text-[#f5deb3] mb-6">
              🕒 Jam Operasional : 16.00 - 00.00 WIB
            </h2>
            <p className="text-xl text-[#f5deb3]/80 leading-relaxed">
              Di Sudut Kota Yang Sepi, Di Mana Bayangan Lebih Pekat Dari Cahaya,
              Berdiri Bloody Espresso— Sebuah Kedai Kopi Yang Menyajikan Lebih
              Dari Sekadar Kafein. Aroma Kopi Yang Menggoda Bercampur Dengan
              Kisah-Kisah Yang Tak Terungkap, Mengundang Mereka Yang Berani
              Untuk Duduk Dan Merasakan Rahasia Di Setiap Tegukan. Jadi, Apakah
              Kamu Cukup Berani Untuk Mencicipinya?
            </p>
          </div>
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
        style={{
          backgroundImage: "url('/bg-kopi-footer.jpg')", // Gambar latar belakang footer
        }}
      >
        <div className="absolute inset-0 bg-[#4A2C2C] opacity-80 z-0"></div>
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center pl-12 md:pl-0">
          <div className="mb-6 md:mb-0">
            <Image
              src="/grinder.png" // Gambar ilustrasi penggiling kopi
              width={200}
              height={200}
              alt="Coffee Grinder Illustration"
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
            <p className="mb-3 text-lg">
              <span className="mr-2">📍</span> 12 Jhon Avenue #35 - New York
            </p>
            <p className="mb-3 text-lg">
              <span className="mr-2">📧</span>{" "}
              <Link
                href="mailto:ElizaCoffee@Coffee.Com"
                className="hover:text-[#F5D29D]"
              >
                ElizaCoffee@Coffee.Com
              </Link>
            </p>
            <p className="mb-3 text-lg">
              <span className="mr-2">📞</span>{" "}
              <Link href="tel:+122-34-ELIZA" className="hover:text-[#F5D29D]">
                +1-222-34-ELIZA
              </Link>
            </p>
            <div className="flex gap-4 mt-4">
              <p className="mb-3 text-lg">
                <span className={`${alegreya.className} mr-2`}></span> Social
                Media:
              </p>
              <Link href="#" aria-label="Instagram">
                <Instagram
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className="bg-[#2A1C1C] text-center py-4 text-lg text-[#E3CDA2]">
        Created by Elinau9 | Copyright 2023 Eliza Coffee. All Rights Reserved.
      </div>
    </main>
  );
}

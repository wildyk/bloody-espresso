"use client";

import { useState } from "react";
import { alegreya, nosifer } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { ShoppingCart, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  qty?: number;
}
export default function Page() {
  const reviews = [
    {
      name: "Aditya",
      role: "Pelajar",
      text: "Aku hanya mampir untuk secangkir kopi, tapi sekarangkan aku merasa seperti sedang mengikuti... apakah itu suara tangis, atau hanya suasana yang bikin merinding?",
      rating: 5,
      avatar: "/image1.png",
    },
    {
      name: "Siti Nurhaliza",
      role: "Pecinta Kopi",
      text: "Tempatnya sangat nyaman dengan suasana horor yang unik. Kopi 'Bloody Brew' rasanya luar biasa, tapi mungkin menu lainnya bisa ditambah variasi.",
      rating: 4,
      avatar: "/image2.jpg",
    },
    {
      name: "Budi Santoso",
      role: "Penggemar Misteri",
      text: "Suasana di sini benar-benar mendebarkan! Kopi hitamnya sangat enak, dan dekorasi horor membuat pengalaman minum kopi jadi tak terlupakan.",
      rating: 5,
      avatar: "/image3.jpg",
    },
    {
      name: "Rina Amelia",
      role: "Penggemar Tema Gelap",
      text: "Pengalaman yang menyeramkan tapi menyenangkan! Setiap sudut kafe ini penuh dengan nuansa horor. Kopi 'Bloody Brew' jadi favoritku, rasanya kaya dan misterius!",
      rating: 5,
      avatar: "/image2.jpg",
    },
  ];

  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, qty: (cartItem.qty || 1) + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
    setIsCartOpen(true);
  };
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    router.push("/auth/login");
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

      {/* Hero Section */}
      <section className="mt-7 flex flex-col md:flex-row items-center px-6 md:px-20">
        <div className="flex flex-col justify-center gap-6 text-center md:text-left md:w-2/5">
          <h2
            className={`${nosifer.className} text-8xl font-extrabold tracking-wide outline-text dripping-text`}
          >
            BLOODY ESPRESSO
          </h2>
          <p
            className={`${alegreya.className} text-xl text-[#F8E4BE] md:text-3xl`}
          >
            Bloody Espresso - Rasa yang Menghantui, Aroma yang Membangunkan
            Jiwa.
          </p>
          <div className="mt-6 flex justify-center md:justify-start">
            <Link
              href="/verif/menu"
              className="flex items-center gap-4 rounded-full border-4 border-[#F8E4BE] px-10 py-4 text-4xl font-bold text-[#F8E4BE] transition-all duration-300 bg-transparent hover:bg-red-900 hover:text-yellow-300 hover:scale-105 hover:shadow-lg md:text-2xl"
            >
              Jelajahi
            </Link>
          </div>
        </div>
        {/* Hero Image */}
        <div className="mt-10 md:mt-0">
          <Image
            src="/kopi.png"
            width={1500}
            height={600}
            className="hidden md:block rounded-lg shadow-xl"
            alt="Illustration of a coffee machine with coffee beans and leaves"
          />
        </div>
      </section>

      {/* Blog Section */}
      <section
        className="relative py-8 px-6 md:px-20 bg-cover bg-center bg-no-repeat pb-30"
        style={{ backgroundImage: "url('/bg-kopi.jpg')" }}
      >
        <div className="text-center">
          <h2
            className={`${nosifer.className} text-7xl font-bold text-[#F5D29D] p-10 mb-10 dripping-text`}
          >
            BLOG
          </h2>
        </div>
        <div className="scroll-container">
          <div className="scroll-content">
            {/* Duplicate content for seamless scrolling */}
            {[...Array(2)].map((_, index) => (
              <div key={index} className="scroll-item">
                <Card className="bg-[#592424] text-[#E3CDA2] p-6 rounded-4xl w-[400px] h-[350px] shadow-lg">
                  <CardContent>
                    <h3
                      className={`${alegreya.className} text-2xl font-semibold mb-4`}
                    >
                      Nuansa Horor yang Kental di Setiap Sudut
                    </h3>
                    <p
                      className={`${alegreya.className} text-xl text-[#F7E5DA] leading-relaxed`}
                    >
                      Saat pertama kali melangkah masuk, suasana suram langsung
                      menyelimuti. Efek glitch pada layar menu digital semakin
                      menambah kesan bahwa tempat ini bukan sekadar kafe biasa.
                    </p>
                    <Link href="#" className="text-sm underline">
                      More
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-[#592424] text-white p-6 rounded-4xl w-[400px] h-[350px] shadow-lg">
                  <CardContent>
                    <h3 className="text-2xl font-semibold mb-4 text-[#E3CDA2]">
                      Mengapa Harus Mengunjungi Bloody Espresso?
                    </h3>
                    <p className="text-xl text-[#F7E5DA] leading-relaxed">
                      ✅ Konsep Horor yang Unik.
                    </p>
                    <p className="text-xl text-[#F7E5DA] leading-relaxed">
                      ✅ Suasana mendebarkan.
                    </p>
                    <Link
                      href="#"
                      className="text-[#E3CDA2] hover:text-[#F5D29D] underline"
                    >
                      More
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-[#592424] text-white p-6 rounded-4xl w-[400px] h-[350px] shadow-lg">
                  <CardContent>
                    <h3 className="text-2xl font-semibold mb-4 text-[#E3CDA2]">
                      Kopi yang Menyimpan Kisah Misteri
                    </h3>
                    <p className="text-xl text-[#F7E5DA] leading-relaxed">
                      Setiap tegukan Bloody Espresso membawa pengalaman rasa
                      yang unik, seakan merasakan kisah tersirat dalam cangkir
                      kopi.
                    </p>
                    <Link
                      href="#"
                      className="text-[#E3CDA2] hover:text-[#F5D29D] underline"
                    >
                      More
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-[#592424] text-white p-6 rounded-4xl w-[400px] h-[350px] shadow-lg">
                  <CardContent>
                    <h3 className="text-2xl font-semibold mb-4 text-[#E3CDA2]">
                      Pengalaman yang Tak Terlupakan
                    </h3>
                    <p className="text-xl text-[#F7E5DA] leading-relaxed">
                      Bloody Espresso bukan hanya tempat minum kopi, tetapi juga
                      pengalaman imersif yang menggugah semua indra dengan
                      atmosfernya.
                    </p>
                    <Link
                      href="#"
                      className="text-[#E3CDA2] hover:text-[#F5D29D] underline"
                    >
                      More
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .scroll-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .scroll-content {
          display: flex;
          flex-wrap: nowrap;
          gap: 24px;
          width: max-content;
          animation: scrollLeft 40s linear infinite;
        }

        .scroll-item {
          display: flex;
          gap: 24px;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-30%);
          }
        }
      `}</style>

      {/* Ulasan Section */}
      <section className="relative py-8 px-6 md:px-20 bg-gradient-to-r from-red-950 to-black mb-10">
        <h2
          className={`${nosifer.className} text-7xl w-full text-center font-bold text-[#F5D29D] p-10 mb-10 dripping-text`}
        >
          Ulasan Pelanggan
        </h2>

        <div className="relative w-full max-w-7xl mx-auto ">
          {/* Navigation Buttons - outside swiper */}
          <div className="absolute -left-12 top-[50%] -translate-y-1/2 z-10 text-[#f5deb3] cursor-pointer text-5xl font-bold hover:scale-125 transition swiper-button-prev-custom">
            ❮
          </div>
          <div className="absolute -right-12 top-[50%] -translate-y-1/2 z-10 text-[#f5deb3] cursor-pointer text-5xl font-bold hover:scale-125 transition swiper-button-next-custom">
            ❯
          </div>
          {/* Swiper Container */}
          <Swiper
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full max-w-6xl mx-auto"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#592424] text-[#E3CDA2] p-8 rounded-[35px] shadow-lg w-full max-w-sm transition-transform duration-300">
                  <div className="flex justify-center mb-4">
                    <Image
                      src={review.avatar}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-[#F8E4BE]"
                      alt={review.name}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-2">
                    {review.name}
                  </h3>
                  <p className="text-sm text-[#F7E5DA] text-center mb-4">
                    {review.role}
                  </p>
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-2xl text-[#F8E4BE]">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-[#F7E5DA] text-center leading-relaxed mb-6">
                    {review.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
            <p className="text-xl">Rp. {item.price.toLocaleString("id-ID")}</p>
            <span className="text-xl">Jumlah: {item.qty}</span>
          </div>
        ))}

        {/* Total Harga */}
        <div
          className={`${alegreya.className} text-xl font-bold bg-[#A8715C] text-[#1E1E1E] py-2 mb-4 rounded text-center`}
        >
          TOTAL ・ RP {cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0).toLocaleString("id-ID")}
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

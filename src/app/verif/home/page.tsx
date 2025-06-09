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

    </main>
  );
}

"use client";

import { useState,useEffect } from "react";
import { alegreya, nosifer } from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, UserRound } from "lucide-react";
import { Instagram, Facebook, Twitter } from "lucide-react";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  qty?: number;
}

export default function Page() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/menu"); 
      const data = await res.json();
      console.log("Data dari API:", data);
      setMenuItems(data);
    };
  
    fetchData();
  }, []);
  

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

  const handleRemoveFromCart = (itemName: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  const handleQtyChange = (itemName: string, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName
          ? { ...item, qty: Math.max((item.qty || 1) + amount, 1) }
          : item
      )
    );
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const submitTransaction = async () => {
    try {
      for (const item of cart) {
        await fetch("/api/transaksi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_name: item.name,
            quantity: item.qty || 1,
            total_price: item.price * (item.qty || 1),
          }),
        });
      }
    } catch (error) {
      console.error("Gagal kirim transaksi:", error);
    }
  };
  
  const handlePayment = async () => {
    setIsPaying(true);
    try {
      await submitTransaction(); 
      alert("Pembayaran berhasil! Terima kasih sudah memesan ☕");
      setCart([]);
      setIsCartOpen(false);
    } catch (err) {
      alert("Gagal memproses pembayaran. Coba lagi ya.");
    } finally {
      setIsPaying(false);
    }
  };
  

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative">
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
            <Link href="/kontak">Kontak</Link>
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
            <div className="flex flex-col items-center">
              <UserRound size={40} />
              <span className="text-xl">Profile</span>
            </div>
          </li>
        </ul>
      </nav>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
  {Array.isArray(menuItems) ? (
    menuItems.map((item, index) => (

            <div
              key={index}
              className="bg-[#FFF4E6] text-center rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 duration-300"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={250}
                className="w-full h-80 object-cover object-top"
              />
              <div className={`${alegreya.className} p-6`}>
                <h3 className="text-[#603809] text-2xl font-extrabold">
                  {item.name}
                </h3>
                <p className="text-[#603809] text-xl mt-2">
                  {item.description}
                </p>
                <p className="text-[#603809] text-2xl font-bold mt-2">
                  Rp. {item.price.toLocaleString("id-ID")}
                </p>
                <button
                  className="mt-6 bg-[#A8715C] text-lg text-[#1E1E1E] px-14 py-4 rounded-full font-bold shadow-[0px_10px_30px_-5px_rgba(255,209,102,0.8)] hover:bg-yellow-800 transition cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  ORDER
                </button>
              </div>
            </div>
    ))
  ) : (
    <p className="col-span-4 text-center text-lg text-white">Loading menu...</p>
  )}
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
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => handleQtyChange(item.name, -1)}
                  className="px-3 py-1 bg-white text-black rounded"
                >
                  -
                </button>
                <span className="text-xl">{item.qty}</span>
                <button
                  onClick={() => handleQtyChange(item.name, 1)}
                  className="px-3 py-1 bg-white text-black rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item.name)}
                  className="ml-auto text-xl text-white uppercase"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          <div className="text-center mt-8">
            <div
              className={`${alegreya.className} text-xl font-bold bg-[#A8715C] text-[#1E1E1E] py-2 mb-4 rounded`}
            >
              TOTAL ・ RP {total.toLocaleString("id-ID")}
            </div>
            <button
              onClick={handlePayment}
              disabled={isPaying}
              className={`${alegreya.className} w-full py-4 bg-[#A8715C] text-xl text-[#1E1E1E] font-bold rounded shadow-lg hover:bg-yellow-800 transition cursor-pointer`}
            >
              {isPaying ? "Memproses Pembayaran..." : "BAYAR"}
            </button>
          </div>
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

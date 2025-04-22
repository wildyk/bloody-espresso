"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nosifer, alegreya } from "@/app/ui/fonts";
import { ShoppingCart, UserRound } from "lucide-react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItem {
    name: string;
    description: string;
    price: number;
    image: string;
    qty?: number;
  }
export default function AkunPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Elsa Dwita");
  const [email, setEmail] = useState("elsa@bloodyespresso.com");
  const [profilePic, setProfilePic] = useState("/image2.jpg");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };  
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
  const handleSave = () => {
    setIsEditing(false);
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

      {/* Akun Saya Section */}
      <div className="flex flex-col items-center justify-center mt-16 px-4 mb-65">
        <h1 className={`${nosifer.className} text-6xl font-extrabold mb-10 text-[#F8E4BE] drop-shadow-lg`}>Akun Saya</h1>

        <div className="bg-[#3B0A0A] p-12 rounded-2xl shadow-2xl w-full max-w-xl text-xl space-y-8">
          <div className="flex flex-col items-center">
            <Image src={profilePic} alt="Profile" width={180} height={180} className="rounded-full border-4 border-[#E5C1A5] shadow-lg" />
            {isEditing && (
              <input type="file" accept="image/*" onChange={handleProfilePicChange} className="mt-4 text-sm text-gray-300 text-left w-full" />
            )}
          </div>
          <div className="flex justify-between border-b border-[#E3CDA2] pb-4">
            <span>Nama:</span>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-b  focus:outline-none text-right"
              />
            ) : (
              <span>{name}</span>
            )}
          </div>
          <div className="flex justify-between border-b border-[#E3CDA2] pb-4">
            <span>Email:</span>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b  focus:outline-none text-right"
              />
            ) : (
              <span>{email}</span>
            )}
          </div>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="w-full mt-6 bg-[#A8715C] text-[#1E1E1E] hover:bg-yellow-800 cursor-pointer py-3 rounded-2xl text-xl font-bold transition"
          >
            {isEditing ? "Simpan" : "Edit Profil"}
          </button>
        </div>
      </div>
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

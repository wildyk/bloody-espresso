"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { alegreya } from "@/app/ui/fonts";
import { ShoppingCart, UserRound } from "lucide-react";
import { useCart } from "@/app/ui/cartcontext";
import CartClient from "@/app/ui/cartclient"; // Pastikan path ini sesuai

export default function AuthenticatedNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { cartItems } = useCart();

  const dropdownRef = useRef<HTMLLIElement>(null);
  const profileRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageError = () => setImageError(true);

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Implement logout logic here
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-gradient-to-r from-red-950 to-black p-6 text-[#FFF8E8] border-b-2 border-[#4a2c17] shadow-lg">
        {/* Logo */}
        <Link
          href="/verif/home"
          className="transition-transform hover:scale-105 ml-7"
        >
          {!imageError ? (
            <Image
              src="/logo.png"
              alt="Bloody Espresso Logo"
              width={80}
              height={50}
              priority
              className="object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center w-20 h-12 bg-[#8B4513] text-[#FFF8E8] font-bold text-sm rounded">
              BLOODY
            </div>
          )}
        </Link>

        {/* Navigation */}
        <ul className={`${alegreya.className} flex gap-5 text-2xl font-bold items-center`}>
          <li className="mr-16 hover:text-[#E3CDA2]">
            <Link href="/verif/home">Beranda</Link>
          </li>

          {/* Tentang Kami Dropdown */}
          <li className="relative mr-16" ref={dropdownRef}>
            <span
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center cursor-pointer hover:text-[#E3CDA2] select-none"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                }
              }}
            >
              Tentang Kami
              <svg
                className={`ml-2 w-4 h-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-60 bg-gray-800 rounded-lg shadow-lg z-50">
                <ul className="py-4 text-lg text-white">
                  <li className="px-6 py-3 hover:bg-gray-700 transition-colors">
                    <Link href="/verif/profile/team" onClick={handleLinkClick}>
                      Profil Team
                    </Link>
                  </li>
                  <li className="px-6 py-3 hover:bg-gray-700 transition-colors">
                    <Link href="/verif/profile/toko" onClick={handleLinkClick}>
                      Profil Toko
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li className="mr-16 hover:text-[#E3CDA2]">
            <Link href="/verif/kontak">Kontak</Link>
          </li>

          <li className="mr-16 hover:text-[#E3CDA2]">
            <Link href="/verif/menu">Menu</Link>
          </li>

          {/* Cart & Profile */}
          <li className="relative mr-16" ref={profileRef}>
            <div className="bg-[#7b1e1e] px-6 py-2 rounded-l-full flex gap-6 items-center">
              {/* Cart */}
              <div
                onClick={() => setCartOpen(!cartOpen)}
                className="relative flex flex-col items-center cursor-pointer hover:text-[#E3CDA2]"
              >
                <ShoppingCart size={30} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
                <span className="text-lg">Keranjang</span>
              </div>

              {/* Profile */}
              <div
                className="flex flex-col items-center cursor-pointer hover:text-[#E3CDA2]"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <UserRound size={30} />
                <span className="text-lg">Profile</span>

                {profileOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-gray-800 rounded-lg shadow-lg w-40 z-50">
                    <ul className="py-2 text-white text-lg">
                      <li className="px-4 py-2 hover:bg-gray-700">
                        <Link href="/verif/akun" onClick={handleLinkClick}>
                          Akun Saya
                        </Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-700"
                        onClick={() => {
                          handleLogout();
                          handleLinkClick();
                        }}
                      >
                        <Link href="/auth/login">Logout</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </nav>

      {/* Sidebar Cart Panel */}
      {cartOpen && (
        <div className="fixed top-0 right-0 h-full w-96 bg-[#1e1e1e] text-white shadow-lg z-50 p-6 overflow-y-auto transition-transform duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Keranjang</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-red-400 hover:text-red-600 text-xl"
            >
              ✕
            </button>
          </div>
          <CartClient />
        </div>
      )}
    </>
  );
}

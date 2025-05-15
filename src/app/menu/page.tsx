'use client';
import Image from "next/image";
import { fetchProdukWithFoto } from "@/app/lib/data";
import Link from "next/link";
import { alegreya } from "@/app/ui/fonts";
import { useState } from 'react';

export default async function MenuPage() {
  const produkList = await fetchProdukWithFoto();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  return (
        <><nav className="flex justify-between items-center p-6 text-[#FFF8E8] ml-7">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Bloody Espresso Logo"
          width={80}
          height={50} />
      </Link>

      <ul className={`${alegreya.className} flex gap-5 text-2xl font-bold`}>
        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
          <Link href="/">Beranda</Link>
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
                  <Link href="/profile/team">Profil Team</Link>
                </li>
                <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
                  <Link href="/profile/toko">Profil Toko</Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
          <Link href="/kontak">Kontak</Link>
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
          <Link href="/menu">Menu</Link>
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
          <Link href="/auth/login">Masuk</Link>
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] flex items-center">
          <Link href="/auth/register">Daftar</Link>
        </li>
      </ul>
    </nav><main className="min-h-screen bg-[#300000] text-white">
        <h1 className="text-4xl text-center font-bold mt-8 font-[Nosifer]">
          MENU
        </h1>
        <p className="text-center mt-2 text-sm">
          Jelajahi semua rasa kopi bersama kami. Selalu ada secangkir kopi baru
          yang layak dicoba.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
          {produkList.map((produk) => (
            <div
              key={produk.id_produk}
              className="bg-[#fcefdc] rounded-lg shadow overflow-hidden text-center"
            >
              <div className="relative w-full h-48 bg-gray-100">
                <img src={produk.foto} alt={produk.nama_produk} className="w-full h-48 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#300000]">
                  {produk.nama_produk}
                </h3>
                <p className="text-xs text-[#300000] mt-1">
                  Coffee 50% | Milk 50%
                </p>
                <p className="text-base font-bold text-[#300000] mt-2">
                  Rp. {produk.harga_produk.toLocaleString()}
                </p>
                <button className="mt-3 bg-[#9b684c] text-white py-1 px-4 rounded-full hover:bg-[#7d543d] transition">
                  ORDER
                </button>
              </div>
            </div>
          ))}
        </div>
      </main></>
  );
}

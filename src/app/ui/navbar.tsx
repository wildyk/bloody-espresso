'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { alegreya } from '@/app/ui/fonts';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-between items-center p-6 text-[#FFF8E8] ml-7">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Bloody Espresso Logo"
          width={80}
          height={50}
        />
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
    </nav>
  );
}

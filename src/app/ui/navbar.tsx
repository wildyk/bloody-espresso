'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { alegreya } from '@/app/ui/fonts';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-gradient-to-r from-red-950 to-black p-6 text-[#FFF8E8] border-b-2 border-[#4a2c17] shadow-lg">
      {/* Logo */}
      <Link href="/" className="transition-transform hover:scale-105 ml-7">
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

      {/* Navigation Links */}
      <ul className={`${alegreya.className} flex gap-5 text-2xl font-bold`}>
        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200">
          <Link href="/" className="block py-2">Beranda</Link>
        </li>

        {/* Tentang Kami Dropdown */}
        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200" ref={dropdownRef}>
          <span 
            onClick={toggleDropdown} 
            className="pb-1 select-none py-2 flex items-center"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown();
              }
            }}
          >
            Tentang Kami
            <svg 
              className={`ml-2 w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-60 bg-gray-800 rounded-lg shadow-lg z-50">
              <ul className="py-4 text-lg text-white">
                <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                  <Link href="/profile/team" onClick={handleLinkClick} className="block w-full">
                    Profil Team
                  </Link>
                </li>
                <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                  <Link href="/profile/toko" onClick={handleLinkClick} className="block w-full">
                    Profil Toko
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200">
          <Link href="/kontak" className="block py-2">Kontak</Link>
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200">
          <Link href="/menu" className="block py-2">Menu</Link>
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200">
          <Link href="/auth/login" className="block py-2">Masuk</Link>
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200">
          <Link href="/auth/register" className="block py-2">Daftar</Link>
        </li>
      </ul>
    </nav>
  );
}
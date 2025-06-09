'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { alegreya } from '@/app/ui/fonts';
import { ShoppingCart, UserRound } from 'lucide-react';

export default function AuthenticatedNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const profileRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setProfileOpen(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

    function setIsCartOpen(arg0: boolean): void {
        throw new Error('Function not implemented.');
    }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-gradient-to-r from-red-950 to-black p-6 text-[#FFF8E8] border-b-2 border-[#4a2c17] shadow-lg">
      {/* Logo */}
      <Link href="/verif/home" className="transition-transform hover:scale-105 ml-7">
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
          <Link href="/verif/home" className="block py-2">Beranda</Link>
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
                  <Link href="/verif/profile/team" onClick={handleLinkClick} className="block w-full">
                    Profil Team
                  </Link>
                </li>
                <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                  <Link href="/verif/profile/toko" onClick={handleLinkClick} className="block w-full">
                    Profil Toko
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200">
          <Link href="/verif/kontak" className="block py-2">Kontak</Link>
        </li>

        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200">
          <Link href="/verif/menu" className="block py-2">Menu</Link>
        </li>

        {/* Cart and Profile */}
        <li className="relative mr-16 cursor-pointer" ref={profileRef}>
          <div className="bg-[#7b1e1e] px-6 py-2 rounded-l-full flex space-x-6 items-center">
            <div
              className="flex flex-col items-center cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={30} />
              <span className="text-lg">Keranjang</span>
            </div>
            
            <div className="flex flex-col items-center cursor-pointer hover:text-[#E3CDA2] transition-colors duration-200">
              <div
                onClick={toggleProfile}
                className="flex flex-col items-center"
              >
                <UserRound size={30} />
                <span className="text-lg">Profile</span>
              </div>

              {profileOpen && (
                <div className="absolute top-full right-0 mt-2 bg-gray-800 rounded-lg shadow-lg w-40 z-50">
                  <ul className="py-2 text-white text-lg">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                      <Link
                        href="/verif/akun"
                        onClick={handleLinkClick}
                        className="block w-full"
                      >
                        Akun Saya
                      </Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                      onClick={() => {
                        handleLogout();
                        handleLinkClick();
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
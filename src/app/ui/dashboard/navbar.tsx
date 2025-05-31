"use client";

import { useRef, useState } from "react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  return (
    <>
      <nav className="relative z-50 flex items-center justify-between bg-red-900 px-4 py-3 text-white shadow-md">
        {/* Ikon kanan: Notifikasi + Akun */}
        <div className="flex items-center gap-6 ml-4">
          {/* Notifikasi */}
          <div className="relative">
            <button onClick={toggleNotifications} className="relative">
              <BellIcon className="w-7 h-7 hover:text-gray-300" />
              <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                3
              </span>
            </button>
          </div>

          {/* Akun */}
          <div className="flex items-center gap-2">
            <Image
              src="/customers/evil-rabbit.png" // ganti dengan path fotomu
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div className="hidden md:block leading-tight">
              <p className="text-sm font-semibold">Elsa Dwita</p>
              <p className="text-xs text-gray-300">Administrator</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Panel Notifikasi */}
      {showNotifications && (
        <div
          ref={panelRef}
          className="fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-lg p-4 text-black transition-transform duration-300 ease-in-out"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Notifikasi</h2>
            <button onClick={toggleNotifications}>
              <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-black" />
            </button>
          </div>
          <ul className="space-y-3">
            <li className="p-2 rounded-md bg-red-50">Pesanan baru masuk</li>
            <li className="p-2 rounded-md bg-red-50">Stok kopi hampir habis</li>
            <li className="p-2 rounded-md bg-red-50">Transaksi berhasil</li>
          </ul>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nosifer, alegreya } from "@/app/ui/fonts";
import { ShoppingCart, UserRound } from "lucide-react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/verif/navbar";

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
      <Navbar />
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
    </main>
  );
}

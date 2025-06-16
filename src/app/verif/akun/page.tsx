"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/verif/navbar";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  qty?: number;
}

interface DecodedToken {
  id: string;
  email: string;
  name?: string;
}

export default function AkunPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setName(data.name);
      setEmail(data.email);
    };
    fetchProfile();
  }
}, []);
const handleSave = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  await fetch("/api/profile", {
    method: "PUT", // atau POST tergantung implementasi backend
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  });

  setIsEditing(false);
};


  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative overflow-y-auto">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-16 px-4 mb-65">
        <h1 className="text-6xl font-extrabold mb-10 text-[#F8E4BE] drop-shadow-lg">
          Akun Saya
        </h1>
        <div className="bg-[#3B0A0A] p-12 rounded-2xl shadow-2xl w-full max-w-xl text-xl space-y-8">
          <div className="flex justify-between border-b border-[#E3CDA2] pb-4">
            <span>Nama:</span>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-b text-right"
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
                className="bg-transparent border-b text-right"
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

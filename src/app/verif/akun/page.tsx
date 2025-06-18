"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/verif/navbar";
import { nosifer, alegreya } from "@/app/ui/fonts";

export default function AkunPage() {
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Fetch failed:", res.status);
          return;
        }

        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        console.error("Update failed:", res.status);
        return;
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-r from-red-950 to-black text-white ${alegreya.className}`}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center px-8 py-20">
        <h1
          className={`text-6xl mb-10 text-[#F8E4BE] drop-shadow-lg ${nosifer.className}`}
        >
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
                className="bg-transparent border-b text-right outline-none"
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
                className="bg-transparent border-b text-right outline-none"
              />
            ) : (
              <span>{email}</span>
            )}
          </div>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="w-full mt-6 bg-[#A8715C] text-[#1E1E1E] hover:bg-yellow-800 py-3 rounded-2xl text-xl font-bold transition"
          >
            {isEditing ? "Simpan" : "Edit Profil"}
          </button>
        </div>
      </div>
    </main>
  );
}

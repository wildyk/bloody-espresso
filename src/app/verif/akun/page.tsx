"use client";

import { useRouter } from "next/navigation";
import { nosifer } from "@/app/ui/fonts";

export default function AkunPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Contoh hapus token/session
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0D0D] to-[#750E0E] flex flex-col items-center justify-center text-white">
      <h1 className={`${nosifer.className} text-5xl mb-8`}>Akun Saya</h1>

      {/* Info Akun */}
      <div className="bg-[#3B0A0A] p-8 rounded-lg shadow-lg w-80 space-y-4 text-lg">
        <div className="flex justify-between">
          <span>Nama:</span>
          <span>Elsa Dwita</span> {/* Ganti dinamis kalau pakai auth */}
        </div>
        <div className="flex justify-between">
          <span>Email:</span>
          <span>elsa@bloodyespresso.com</span>
        </div>
        <div className="flex justify-between">
          <span>Role:</span>
          <span>Admin</span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-800 hover:bg-red-700 px-6 py-2 rounded-full text-xl"
      >
        Logout
      </button>
    </div>
  );
}

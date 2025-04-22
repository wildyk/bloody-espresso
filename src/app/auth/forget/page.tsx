"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password || !confirmPassword) {
      setError("Semua field wajib diisi.");
      setSuccess("");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Password tidak cocok.");
      setSuccess("");
      return;
    }
  
    // Simulasi berhasil
    setError("");
    setSuccess("Password berhasil diubah.");
  
    // Redirect ke halaman login setelah delay 2 detik
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };
  

  return (
    <main className="relative flex items-center justify-center w-full h-screen bg-gradient-to-t from-red-950 to-black p-10">
      <div className="relative flex w-full max-w-7xl items-center gap-20 bg-transparent">
        <div className="absolute w-[1102px] h-[1102px] left-[-584px] top-[-571px] bg-[#3F2F2A] blur-[210px]" />

        <div className="relative z-10 flex-1 text-center md:text-left">
          <Image
            src="/orang.png"
            width={500}
            height={500}
            alt="Bloody Espresso"
            className="mx-auto md:mx-0 mt-6"
          />
          <h2
            className={`${nosifer.className} text-[60px] text-[#F8E4BE] font-extrabold tracking-wider mt-6`}
          >
            BLOODY ESPRESSO
          </h2>
          <p
            className={`${alegreya.className} text-[24px] text-[#DABB9E] tracking-wide font-light mt-4 leading-[1.9]`}
          >
            Bloody Espresso - Rasa yang Menghantui, Aroma yang Membangunkan
            Jiwa.
          </p>
        </div>

        <div className="relative z-10 flex-1 max-w-xl p-14 bg-white shadow-2xl rounded-2xl border border-red-700 text-center">
          <h1
            className={`${frijole.className} text-[40px] font-bold text-[#550014] mb-2`}
          >
            FORGOT PASSWORD
          </h1>
          <p
            className={`${alegreya.className} text-md text-gray-600 mb-6 leading-relaxed`}
          >
            Enter your email address, and <br />
            change your new password
          </p>

          {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
          {success && (
            <p className="text-green-600 font-semibold mb-4">{success}</p>
          )}

          <form onSubmit={handleReset} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 rounded-md border border-gray-400 px-3 py-2 text-sm shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Password Baru
              </label>
              <input
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 rounded-md border border-gray-400 px-3 py-2 text-sm shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Konfirmasi Password
              </label>
              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 rounded-md border border-gray-400 px-3 py-2 text-sm shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#550014] text-white font-bold rounded-lg hover:bg-red-800 transition cursor-pointer shadow-md hover:shadow-lg"
            >
              Buat Password Baru
            </button>
          </form>

          <p className="mt-10 text-lg text-center text-[#550014]/70">
            Back to{" "}
            <Link
              href="/auth/login"
              className="font-bold underline hover:text-[#550014]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

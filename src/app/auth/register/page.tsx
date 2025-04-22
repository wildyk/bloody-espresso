"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    // Simulasi penyimpanan user
    alert("Registrasi berhasil! Silakan login.");
    router.push("/auth/login");
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
            Bloody Espresso - Rasa yang Menghantui, Aroma yang Membangunkan Jiwa.
          </p>
        </div>

        <div className="relative z-10 flex-1 max-w-xl p-14 bg-white shadow-2xl rounded-2xl border border-red-700">
          <h1 className={`${frijole.className} text-[64px] font-bold text-[#550014] text-center mb-10`}>
            REGISTER
          </h1>
          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <p className="text-red-600 text-center font-bold">{error}</p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-900" htmlFor="name">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer block w-full rounded-md border border-gray-500 py-2 pl-2 text-sm placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer block w-full rounded-md border border-gray-500 py-2 pl-2 text-sm placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer block w-full rounded-md border border-gray-500 py-2 pl-2 text-sm placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900" htmlFor="confirmPassword">
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="peer block w-full rounded-md border border-gray-500 py-2 pl-2 text-sm placeholder:text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 px-6 font-bold text-white bg-[#550014] rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Register
            </button>
          </form>
          <p className="mt-10 text-lg text-center text-[#550014]/70">
            Sudah punya akun?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-extrabold text-[#550014] hover:underline transition cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

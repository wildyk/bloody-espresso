"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    if (username === "admin123" && password === "12345") {
      router.push("/admin/dashboard");
    } else if (username.includes("user123") && password === "12345") {
      router.push("/verif/home");
    } else {
      setError("Email atau password salah");
    }
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

        <div className="relative z-10 flex-1 max-w-xl p-14 bg-white shadow-2xl rounded-2xl border border-red-700">
          <h1
            className={`${frijole.className} text-[64px] font-bold text-[#550014] text-center mb-10`}
          >
            LOGIN
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <p className="text-red-600 text-center font-bold">{error}</p>
            )}
            <div>
              <label
                className="block text-sm font-medium text-gray-900"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="peer block w-full rounded-md border border-gray-500 py-2 pl-2 text-sm placeholder:text-gray-500"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-900"
                htmlFor="password"
              >
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
            <div className="text-right">
              <Link
                href="/auth/forget"
                className="font-extrabold text-[#550014] underline hover:text-red-800 transition"
              >
                Lupa Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-4 px-6 font-bold text-white bg-[#550014] rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Log in
            </button>
          </form>
          <p className="mt-10 text-lg text-center text-[#550014]/70">
            Belum punya akun?{" "}
            <button
              onClick={() => router.push("/auth/register")}
              className="font-extrabold text-[#550014] hover:underline transition cursor-pointer"
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

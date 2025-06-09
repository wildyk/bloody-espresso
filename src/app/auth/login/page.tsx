"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";
import { Instagram, Facebook, Twitter } from "lucide-react";

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
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative overflow-y-auto">
      {/* Navbar */}
      {/* Login Form */}
      <div className="relative flex items-center justify-center w-full min-h-[80vh] p-10 mb-5">
        <div className="relative flex w-full max-w-7xl items-center gap-20 bg-transparent">
          <div className="absolute w-[1102px] h-[1102px] left-[-584px] top-[-571px] bg-[#3F2F2A] blur-[210px]" />
          <div className="relative z-10 flex-1 text-center md:text-left">
            <Image src="/orang.png" width={500} height={500} alt="Bloody Espresso" className="mx-auto md:mx-0 mt-6" />
            <h2 className={`${nosifer.className} text-[60px] text-[#F8E4BE] font-extrabold tracking-wider mt-6`}>BLOODY ESPRESSO</h2>
            <p className={`${alegreya.className} text-[24px] text-[#DABB9E] tracking-wide font-light mt-4 leading-[1.9]`}>
              Bloody Espresso - Rasa yang Menghantui, Aroma yang Membangunkan Jiwa.
            </p>
          </div>

          <div className="relative z-10 flex-1 max-w-xl p-14 bg-white shadow-2xl rounded-2xl border border-red-700">
            <h1 className={`${frijole.className} text-[64px] font-bold text-[#550014] text-center mb-10`}>LOGIN</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && <p className="text-red-600 text-center font-bold">{error}</p>}
              <div>
                <label className="block text-sm font-medium text-gray-900">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <div className="text-right">
                <Link href="/auth/forget" className="font-extrabold text-[#550014] underline hover:text-red-800 transition">Lupa Password?</Link>
              </div>
              <button type="submit" className="w-full py-4 px-6 font-bold text-white bg-[#550014] rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg cursor-pointer">Log in</button>
            </form>
            <p className="mt-10 text-lg text-center text-[#550014]/70">
              Belum punya akun?{' '}
              <button onClick={() => router.push('/auth/register')} className="font-extrabold text-[#550014] hover:underline transition cursor-pointer">Daftar</button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-cover bg-center text-[#E3CDA2] py-12 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center" style={{ backgroundImage: "url('/bg-kopi-footer.jpg')" }}>
        <div className="absolute inset-0 bg-[#4A2C2C] opacity-80 z-0"></div>
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center pl-12 md:pl-0">
          <div className="mb-6 md:mb-0">
            <Image src="/grinder.png" width={200} height={200} alt="Coffee Grinder Illustration" className="filter invert" />
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left tracking-widest">
            <div>
              <h4 className="text-2xl font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">Our Story</Link></li>
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">FAQ</Link></li>
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">Careers</Link></li>
              </ul>
            </div>
            <div className="ml-32">
              <h4 className="text-2xl font-semibold mb-4">Customer Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">Menu</Link></li>
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">Locations</Link></li>
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">Support</Link></li>
              </ul>
            </div>
            <div className="ml-32">
              <h4 className="text-2xl font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">Payment Options</Link></li>
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">Refunds & Exchanges</Link></li>
                <li><Link href="#" className="text-lg hover:text-[#F5D29D]">Limitation of Liability</Link></li>
              </ul>
            </div>
          </div>
          <div className="mr-15 mt-6 md:mt-0">
            <p className="mb-3 text-lg"><span className="mr-2">📍</span> 12 Jhon Avenue #35 - New York</p>
            <p className="mb-3 text-lg"><span className="mr-2">📧</span> <Link href="mailto:ElizaCoffee@Coffee.Com" className="hover:text-[#F5D29D]">ElizaCoffee@Coffee.Com</Link></p>
            <p className="mb-3 text-lg"><span className="mr-2">📞</span> <Link href="tel:+122-34-ELIZA" className="hover:text-[#F5D29D]">+1-222-34-ELIZA</Link></p>
            <div className="flex gap-4 mt-4">
              <p className="mb-3 text-lg"><span className={`${alegreya.className} mr-2`}></span> Social Media:</p>
              <Link href="#" aria-label="Instagram"><Instagram size={32} className="text-[#E3CDA2] hover:text-[#F5D29D]" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook size={32} className="text-[#E3CDA2] hover:text-[#F5D29D]" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter size={32} className="text-[#E3CDA2] hover:text-[#F5D29D]" /></Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-[#2A1C1C] text-center py-4 text-lg text-[#E3CDA2]">
        Created by Elinau9 | Copyright 2023 Eliza Coffee. All Rights Reserved.
      </div>
    </main>
  );
}

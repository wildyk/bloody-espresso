"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

    setError("");
    setSuccess("Password berhasil diubah.");

    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative overflow-y-auto">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 text-[#FFF8E8] ml-7">
        <Link href="/">
          <Image src="/logo.png" alt="Bloody Espresso Logo" width={80} height={50} />
        </Link>
        <ul className={`${alegreya.className} flex gap-5 text-2xl font-bold`}>
          <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
            <Link href="/">Beranda</Link>
          </li>
          <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
            <span onClick={toggleDropdown} className="pb-1 select-none">Tentang Kami</span>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-60 bg-gray-800 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out z-10">
                <ul className="py-4 text-lg text-white">
                  <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
                    <Link href="/profile/team">Profil Team</Link>
                  </li>
                  <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
                    <Link href="/profile/toko">Profil Toko</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
            <Link href="/kontak">Kontak</Link>
          </li>
          <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
            <Link href="/menu">Menu</Link>
          </li>
          <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
            <Link href="/auth/login">Masuk</Link>
          </li>
          <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2] flex items-center">
            <Link href="/auth/register">Daftar</Link>
          </li>
        </ul>
      </nav>

      {/* Forgot Password Form */}
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

          <div className="relative z-10 flex-1 max-w-xl p-14 bg-white shadow-2xl rounded-2xl border border-red-700 text-center">
            <h1 className={`${frijole.className} text-[40px] font-bold text-[#550014] mb-2`}>FORGOT PASSWORD</h1>
            <p className={`${alegreya.className} text-md text-gray-600 mb-6 leading-relaxed`}>
              Enter your email address, and <br /> change your new password
            </p>

            {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
            {success && <p className="text-green-600 font-semibold mb-4">{success}</p>}

            <form onSubmit={handleReset} className="space-y-5 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Password Baru</label>
                <input
                  type="password"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Konfirmasi Password</label>
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-[#550014] text-white font-bold rounded-lg hover:bg-red-800 transition cursor-pointer shadow-md hover:shadow-lg">
                Buat Password Baru
              </button>
            </form>

            <p className="mt-10 text-lg text-center text-[#550014]/70">
              Back to <Link href="/auth/login" className="font-bold underline hover:text-[#550014]">Login</Link>
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer
        className="relative bg-cover bg-center text-[#E3CDA2] py-12 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center"
        style={{
          backgroundImage: "url('/bg-kopi-footer.jpg')", // Gambar latar belakang footer
        }}
      >
        <div className="absolute inset-0 bg-[#4A2C2C] opacity-80 z-0"></div>
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center pl-12 md:pl-0">
          <div className="mb-6 md:mb-0">
            <Image
              src="/grinder.png" // Gambar ilustrasi penggiling kopi
              width={200}
              height={200}
              alt="Coffee Grinder Illustration"
              className="filter invert"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left tracking-widest">
            <div>
              <h4 className="text-2xl font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="ml-32">
              <h4 className="text-2xl font-semibold mb-4">
                Customer Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="ml-32">
              <h4 className="text-2xl font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Refunds & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-lg hover:text-[#F5D29D]">
                    Limitation of Liability
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mr-15 mt-6 md:mt-0">
            <p className="mb-3 text-lg">
              <span className="mr-2">📍</span> 12 Jhon Avenue #35 - New York
            </p>
            <p className="mb-3 text-lg">
              <span className="mr-2">📧</span>{" "}
              <Link
                href="mailto:ElizaCoffee@Coffee.Com"
                className="hover:text-[#F5D29D]"
              >
                ElizaCoffee@Coffee.Com
              </Link>
            </p>
            <p className="mb-3 text-lg">
              <span className="mr-2">📞</span>{" "}
              <Link href="tel:+122-34-ELIZA" className="hover:text-[#F5D29D]">
                +1-222-34-ELIZA
              </Link>
            </p>
            <div className="flex gap-4 mt-4">
              <p className="mb-3 text-lg">
                <span className={`${alegreya.className} mr-2`}></span> Social
                Media:
              </p>
              <Link href="#" aria-label="Instagram">
                <Instagram
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <footer className="mt-32 bg-[#2A1C1C] text-[#E3CDA2] py-8 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg">&copy; 2025 Bloody Espresso. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}

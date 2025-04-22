"use client";

import { useState } from "react";
import { alegreya, nosifer } from "@/app/ui/fonts";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function ContactPage() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
  
    const toggleDropdown = () => {
      setDropdownOpen(prev => !prev)
    }
  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white">
      {/* Navbar (optional jika kamu ingin full page) */}
      <nav className="flex justify-between items-center p-6 text-[#FFF8E8] ml-7">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Bloody Espresso Logo"
          width={80}
          height={50}
        />
      </Link>

      <ul className={`${alegreya.className} flex gap-5 text-2xl font-bold`}>
        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
          <Link href="/">Beranda</Link>
        </li>

        {/* Tentang Kami */}
        <li className="relative mr-16 cursor-pointer hover:text-[#E3CDA2]">
          <span onClick={toggleDropdown} className="pb-1 select-none">
            Tentang Kami
          </span>

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

      {/* Contact Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 md:px-20 mb-27">
        <h2
          className={`${nosifer.className} text-7xl font-extrabold tracking-wide text-[#F8E4BE] mb-10`}
        >
          Kontak
        </h2>
        <p className="text-xl text-[#f5deb3]/80 text-center max-w-3xl mb-12">
          "Punya pertanyaan seputar menu, lokasi, atau cuma mau ngobrol soal
          kopi dan suasana misterius Bloody Espresso? Jangan sungkan! Kirim
          pesan aja—kita nggak gigit, malah bisa jadi teman ngopi kamu
          berikutnya."
        </p>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl bg-[#5a1919]/50 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-[#8b4513]">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 bg-[#8b4513]/20 p-6 rounded-2xl shadow-inner text-[#f5deb3]"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="mb-6">
              We’ll create high-quality linkable content and build at least 40
              high-authority.
            </p>
            <div className="space-y-4 text-sm">
              <p>📞 +8801770171868</p>
              <p>📞 +988876353666</p>
              <p>📧 support@uprankly.com</p>
              <p>📍 New York, USA</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-2/3 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3]"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3]"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3]"
              required
            />
            <textarea
              placeholder="Write here your message"
              rows={5}
              className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3]"
              required
            />
            <button
              type="submit"
              className="bg-[#8b4513] hover:bg-[#a0522d] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

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

      {/* Copyright Section */}
      <div className="bg-[#2A1C1C] text-center py-4 text-lg text-[#E3CDA2]">
        Created by Elinau9 | Copyright 2023 Eliza Coffee. All Rights Reserved.
      </div>
    </main>
  );
}

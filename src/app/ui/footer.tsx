"use client";

import { Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { alegreya } from "@/app/ui/fonts";

export default function Footer() {
  return (
    <>
      <footer
        className="relative bg-cover bg-center text-[#E3CDA2] py-6 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center"
        style={{
          backgroundImage: "url('/bg-kopi-footer.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#4A2C2C] opacity-80 z-0"></div>

        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center md:pl-0">
          <div className="mb-6 md:mb-0">
            <Image
              src="/grinder.png"
              width={200}
              height={200}
              alt="Coffee Grinder Illustration"
              className="filter invert"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left tracking-widest">
            <div>
              <h4 className="text-2xl font-semibold mb-4">Tentang</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/profile/team"
                    className="text-lg hover:text-[#F5D29D]"
                  >
                    Our Story
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-semibold mb-4">
                Customer Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/menu" className="text-lg hover:text-[#F5D29D]">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile/team"
                    className="text-lg hover:text-[#F5D29D]"
                  >
                    Lokasi
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="text-lg hover:text-[#F5D29D]">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/payment"
                    className="text-lg hover:text-[#F5D29D]"
                  >
                    Metode Pembayaran
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-0 text-center md:text-left">
            <p className="mb-3 text-lg">
              <span className="mr-2">📍</span>12 Jhon Avenue #35 - New York
            </p>
            <p className="mb-3 text-lg">
              <span className="mr-2">📧</span>
              <Link
                href="mailto:ElizaCoffee@Coffee.Com"
                className="hover:text-[#F5D29D]"
              >
                ElizaCoffee@Coffee.Com
              </Link>
            </p>
            <p className="mb-3 text-lg">
              <span className="mr-2">📞</span>
              <Link href="tel:+122-34-ELIZA" className="hover:text-[#F5D29D]">
                +1-222-34-ELIZA
              </Link>
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
              <p className={`mb-3 text-lg ${alegreya.className}`}>
                Social Media:
              </p>
              <a
                href="https://www.instagram.com/elizacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </a>
              <a
                href="https://www.facebook.com/elizacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </a>
              <a
                href="https://twitter.com/elizacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter
                  size={32}
                  className="text-[#E3CDA2] hover:text-[#F5D29D]"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-[#2A1C1C] text-center py-4 text-lg text-[#E3CDA2]">
        Created by Elinau9 | Copyright 2023 Eliza Coffee. All Rights Reserved.
      </div>
    </>
  );
}

"use client";

import { alegreya, nosifer } from "@/app/ui/fonts";
import React from "react";

export default function Page() {
  return (
    <main className="bg-gradient-to-r from-red-950 to-black text-white relative overflow-y-auto">
      {/* Profile Store Section */}
      <section className="pt-12 pb-4 px-4 md:px-8 lg:px-20">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className={`${nosifer.className} text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#f5deb3] drop-shadow-md`}>
            PROFIL TOKO
          </h1>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 max-w-8xl mx-auto py-13 mb-40">
          {/* Store Location Map */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-3xl h-[500px] rounded-xl overflow-hidden shadow-2xl border-2 border-[#8b4513]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0986234567!2d110.3691728!3d-7.7955833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a14f4a7b8c3d1%3A0x1234567890abcdef!2sPuri%20Sari%20No.%2010%2C%20Yogyakarta!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Bloody Espresso - Puri Sari No. 10"
                className="rounded-xl shadow-lg pointer-events-auto"
              />
              <div className="absolute inset-0 bg-red-950/20 mix-blend-multiply pointer-events-none rounded-xl"></div>
            </div>
          </div>

          {/* Store Information */}
          <div className={`${alegreya.className} w-full lg:w-1/2`}>
            <div className="bg-[#5a1919]/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 border border-[#8b4513]">
              <div className="mb-8 space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#f5deb3] flex items-center gap-3">
                  <span>📍</span>
                  <span>Lokasi: Puri Sari No. 10</span>
                </h2>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#f5deb3] flex items-center gap-3">
                  <span>🕒</span>
                  <span>Jam Operasional: 16.00 - 00.00 WIB</span>
                </h2>
              </div>

              <div className="text-lg md:text-xl lg:text-2xl text-[#f5deb3]/90 leading-relaxed space-y-4">
                <p>
                  Di sudut kota yang sepi, di mana bayangan lebih pekat dari cahaya,
                  berdiri <strong>Bloody Espresso</strong>—sebuah kedai kopi yang menyajikan
                  lebih dari sekadar kafein.
                </p>
                <br />
                <p>
                  Aroma kopi yang menggoda bercampur dengan kisah-kisah yang tak terungkap,
                  mengundang mereka yang berani untuk duduk dan merasakan rahasia di setiap tegukan.
                </p>
                <br />
                <p className="font-semibold text-[#f5deb3]">
                  Jadi, apakah kamu cukup berani untuk mencicipinya?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { alegreya, nosifer } from "@/app/ui/fonts";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white">
      {/* Contact Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 md:px-20">
        <h2 className={`${nosifer.className} text-7xl font-extrabold tracking-wide text-[#F8E4BE] mb-10`}>
          Kontak
        </h2>

        <p className={`${alegreya.className} text-xl text-[#f5deb3]/80 text-center max-w-3xl mb-12`}>
          "Punya pertanyaan seputar menu, lokasi, atau cuma mau ngobrol soal
          kopi dan suasana misterius Bloody Espresso? Jangan sungkan! Kirim
          pesan aja—kita nggak gigit, malah bisa jadi teman ngopi kamu
          berikutnya."
        </p>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl bg-[#5a1919]/50 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-[#8b4513]">
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 bg-[#8b4513]/20 p-6 rounded-2xl shadow-inner text-[#f5deb3]">
            <h2 className="text-2xl font-bold mb-4">Informasi Kontak</h2>
            <p className="mb-6">
              Hubungi kami kapan saja untuk informasi lebih lanjut tentang 
              Bloody Espresso atau untuk reservasi khusus.
            </p>
            <div className="space-y-4 text-sm">
              <p>📞 +62 274 123456</p>
              <p>📞 +62 812 3456 7890</p>
              <p>📧 info@bloodyespresso.com</p>
              <p>📍 Puri Sari No. 10, Yogyakarta</p>
            </div>
          </div>

          {/* Form */}
          <form 
            className="w-full lg:w-2/3 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                required
              />
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                required
              />
            </div>
            
            <input
              type="text"
              placeholder="Subjek"
              className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
              required
            />
            
            <textarea
              placeholder="Tulis pesan Anda di sini"
              rows={5}
              className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] resize-none focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
              required
            />
            
            <button
              type="submit"
              className="bg-[#8b4513] hover:bg-[#a0522d] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-colors duration-200"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
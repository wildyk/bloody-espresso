"use client";

import { alegreya, nosifer } from "@/app/ui/fonts";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  const [errors, setErrors] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  const validate = () => {
    const newErrors = { nama: "", email: "", subjek: "", pesan: "" };

    if (!form.nama.trim()) {
      newErrors.nama = "Nama wajib diisi.";
    } else if (!/[a-zA-Z]/.test(form.nama)) {
      newErrors.nama = "Nama harus mengandung huruf.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!form.subjek.trim()) {
      newErrors.subjek = "Subjek wajib diisi.";
    }

    if (!form.pesan.trim()) {
      newErrors.pesan = "Pesan wajib diisi.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((val) => val === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Pesan berhasil dikirim!");
      // Reset form setelah submit
      setForm({ nama: "", email: "", subjek: "", pesan: "" });
      setErrors({ nama: "", email: "", subjek: "", pesan: "" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white">
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
            onSubmit={handleSubmit}
          >
            {/* Nama & Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                />
                {errors.nama && <p className="text-red-400 text-sm mt-1">{errors.nama}</p>}
              </div>

              <div className="w-full">
                <input
                  type="email"
                  placeholder="Email Anda"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Subjek */}
            <div>
              <input
                type="text"
                placeholder="Subjek"
                value={form.subjek}
                onChange={(e) => setForm({ ...form, subjek: e.target.value })}
                className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
              />
              {errors.subjek && <p className="text-red-400 text-sm mt-1">{errors.subjek}</p>}
            </div>

            {/* Pesan */}
            <div>
              <textarea
                placeholder="Tulis pesan Anda di sini"
                rows={5}
                value={form.pesan}
                onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] resize-none focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
              />
              {errors.pesan && <p className="text-red-400 text-sm mt-1">{errors.pesan}</p>}
            </div>

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

"use client";

import { alegreya, nosifer } from "@/app/ui/fonts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/app/verif/navbar";
import Image from "next/image";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  qty?: number;
}

export default function ContactPage() {
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = {
      name: form.name ? "" : "Nama wajib diisi",
      email: form.email ? "" : "Email wajib diisi",
      subject: form.subject ? "" : "Subjek wajib diisi",
      message: form.message ? "" : "Pesan wajib diisi",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (!hasError) {
      alert("Pesan berhasil dikirim!");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white">
      <Navbar />

      {/* Contact Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 md:px-20 mb-28">
        <h2 className={`${nosifer.className} text-7xl font-extrabold tracking-wide text-[#F8E4BE] mb-10`}>
          Kontak
        </h2>
        <p className="text-xl text-[#f5deb3]/80 text-center max-w-3xl mb-12">
          "Punya pertanyaan seputar menu, lokasi, atau cuma mau ngobrol soal kopi dan suasana misterius Bloody Espresso? 
          Jangan sungkan! Kirim pesan aja—kita nggak gigit, malah bisa jadi teman ngopi kamu berikutnya."
        </p>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl bg-[#5a1919]/50 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-[#8b4513]">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 bg-[#8b4513]/20 p-6 rounded-2xl shadow-inner text-[#f5deb3]"
          >
            <h2 className="text-2xl font-bold mb-4">Informasi Kontak</h2>
            <p className="mb-6">
              Hubungi kami kapan saja untuk informasi lebih lanjut tentang Bloody Espresso atau untuk reservasi khusus.
            </p>
            <div className="space-y-4 text-sm">
              <p>📞 +62 274 123456</p>
              <p>📞 +62 812 3456 7890</p>
              <p>📧 info@bloodyespresso.com</p>
              <p>📍 Puri Sari No. 10, Yogyakarta</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="w-full lg:w-2/3 space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Nama Anda"
                  className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3]"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="w-full">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Anda"
                  className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3]"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subjek"
                className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3]"
              />
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
            </div>

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tulis pesan Anda di sini"
                rows={5}
                className="w-full p-4 rounded-lg bg-[#f5deb3]/10 border border-[#8b4513] placeholder-[#f5deb3]/70 text-[#f5deb3] resize-none"
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-[#8b4513] hover:bg-[#a0522d] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-colors duration-200"
            >
              Kirim Pesan
            </button>
          </motion.form>
        </div>
      </section>

      {/* Cart Panel */}
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-[500px] h-full bg-[#5c0a0a] text-white z-50 p-6 overflow-y-auto">
          <div className="mb-6 border-b border-white pb-4 relative">
            <h2 className={`${nosifer.className} text-4xl font-bold text-center w-full text-[#f5deb3] drop-shadow-md my-4`}>
              KERANJANG
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-0 right-0 text-white text-2xl font-bold"
            >
              ✕
            </button>
          </div>
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div key={item.name} className={`${alegreya.className} mb-6 border-b border-white pb-4`}>
                  <Image src={item.image} alt={item.name} width={150} height={150} className="rounded" />
                  <h3 className="text-2xl font-bold mt-2">{item.name}</h3>
                  <p className="text-xl">Rp. {item.price.toLocaleString("id-ID")}</p>
                  <span className="text-xl">Jumlah: {item.qty}</span>
                </div>
              ))}
              <div className={`${alegreya.className} text-xl font-bold bg-[#A8715C] text-[#1E1E1E] py-2 mb-4 rounded text-center`}>
                TOTAL ・ RP {cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0).toLocaleString("id-ID")}
              </div>
              <button
                onClick={() => {
                  alert("Pembayaran berhasil! ☕");
                  setCart([]);
                  setIsCartOpen(false);
                }}
                className={`${alegreya.className} w-full py-4 bg-[#A8715C] text-xl text-[#1E1E1E] font-bold rounded shadow-lg hover:bg-yellow-800 transition cursor-pointer`}
              >
                BAYAR
              </button>
            </>
          ) : (
            <p className="text-center text-lg mt-10">Keranjang kosong ☕</p>
          )}
        </div>
      )}
    </main>
  );
}

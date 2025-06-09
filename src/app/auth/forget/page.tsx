"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch('/api/auth/forget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        // Redirect ke login setelah 3 detik
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative overflow-y-auto">
      <div className="relative flex items-center justify-center w-full min-h-[80vh] p-10 mb-5">
        <div className="relative flex w-full max-w-7xl items-center gap-20 bg-transparent">
          <div className="absolute w-[1102px] h-[1102px] left-[-584px] top-[-571px] bg-[#3F2F2A] blur-[210px]" />
          
          {/* Left Side - Branding */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <Image src="/orang.png" width={500} height={500} alt="Bloody Espresso" className="mx-auto md:mx-0 mt-6" />
            <h2 className={`${nosifer.className} text-[60px] text-[#F8E4BE] font-extrabold tracking-wider mt-6`}>BLOODY ESPRESSO</h2>
            <p className={`${alegreya.className} text-[24px] text-[#DABB9E] tracking-wide font-light mt-4 leading-[1.9]`}>
              Lupa Password? Jangan Khawatir, Kami Akan Membantu Anda Kembali.
            </p>
          </div>

          {/* Right Side - Forget Password Form */}
          <div className="relative z-10 flex-1 max-w-xl p-14 bg-white shadow-2xl rounded-2xl border border-red-700">
            <h1 className={`${frijole.className} text-[50px] font-bold text-[#550014] text-center mb-6`}>LUPA PASSWORD</h1>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Masukkan email Anda untuk mendapatkan link reset password
            </p>
            
            <form onSubmit={handleForgetPassword} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center font-bold">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
                  <p className="font-bold">{success}</p>
                  <small>Anda akan dialihkan ke halaman login...</small>
                </div>
              )}
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-3 text-base text-gray-900 bg-white shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors placeholder:text-gray-500"
                  style={{ 
                    fontSize: '16px',
                    fontFamily: 'alegreya',
                    color: '#111827'
                  }}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading || success !== ''}
                className="w-full py-4 px-6 font-bold text-white bg-[#550014] rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Mengirim...' : 'Kirim Link Reset'}
              </button>
            </form>
            
            <div className="mt-10 text-center space-y-4">
              <Link href="/auth/login" className="block font-extrabold text-[#550014] hover:underline transition">
                ← Kembali ke Login
              </Link>
              <p className="text-lg text-[#550014]/70">
                Belum punya akun?{' '}
                <button 
                  onClick={() => router.push('/auth/register')} 
                  className="font-extrabold text-[#550014] hover:underline transition cursor-pointer"
                >
                  Daftar di sini
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
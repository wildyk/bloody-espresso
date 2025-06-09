"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registrasi berhasil! Silakan login.');
        router.push('/auth/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registrasi gagal. Silakan coba lagi.');
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
              Bergabunglah dengan Komunitas Pecinta Kopi yang Menghantui.
            </p>
          </div>

          {/* Right Side - Register Form */}
          <div className="relative z-10 flex-1 max-w-xl p-14 bg-white shadow-2xl rounded-2xl border border-red-700">
            <h1 className={`${frijole.className} text-[64px] font-bold text-[#550014] text-center mb-10`}>DAFTAR</h1>
            <form onSubmit={handleRegister} className="space-y-6">
              {error && <p className="text-red-600 text-center font-bold">{error}</p>}
              
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-3 text-base text-gray-900 bg-white shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors placeholder:text-gray-500"
                  style={{ 
                    fontSize: '16px',
                    fontFamily: 'alegreya',
                    color: '#111827'
                  }}
                />
              </div>
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Masukkan email"
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
              
              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-3 text-base text-gray-900 bg-white shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors placeholder:text-gray-500"
                  style={{ 
                    fontSize: '16px',
                    fontFamily: 'alegreya',
                    color: '#111827'
                  }}
                />
              </div>
              
              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Konfirmasi Password</label>
                <input
                  type="password"
                  placeholder="Ketik ulang password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                disabled={loading}
                className="w-full py-4 px-6 font-bold text-white bg-[#550014] rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sedang Daftar...' : 'Daftar Sekarang'}
              </button>
            </form>
            
            <p className="mt-10 text-lg text-center text-[#550014]/70">
              Sudah punya akun?{' '}
              <button 
                onClick={() => router.push('/auth/login')} 
                className="font-extrabold text-[#550014] hover:underline transition cursor-pointer"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
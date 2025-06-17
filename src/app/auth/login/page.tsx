"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = "Format email tidak valid (misal: nama@gmail.com)";
    }

    if (!password.trim()) {
      newErrors.password = "Password wajib diisi";
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setLoading(false);
      return;
    }

    if (email === "admin123@gmail.com" && password === "12345") {
      router.push("/admin/dashboard/analitik");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push("/verif/home");
      } else {
        setError(data.message || "Email atau password salah");
      }
    } catch (err) {
      setError("Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-950 to-black text-white relative overflow-y-auto">
      <div className="relative flex items-center justify-center w-full min-h-[80vh] p-10 mb-5">
        <div className="relative flex w-full max-w-7xl items-center gap-20 bg-transparent">
          <div className="absolute w-[1102px] h-[1102px] left-[-584px] top-[-571px] bg-[#3F2F2A] blur-[210px]" />

          {/* Left Side */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <Image src="/orang.png" width={500} height={500} alt="Bloody Espresso" className="mx-auto md:mx-0 mt-6" />
            <h2 className={`${nosifer.className} text-[60px] text-[#F8E4BE] font-extrabold tracking-wider mt-6`}>BLOODY ESPRESSO</h2>
            <p className={`${alegreya.className} text-[24px] text-[#DABB9E] tracking-wide font-light mt-4 leading-[1.9]`}>
              Bloody Espresso - Rasa yang Menghantui, Aroma yang Membangunkan Jiwa.
            </p>
          </div>

          {/* Right Side - Login Form */}
          <div className="relative z-10 flex-1 max-w-xl p-14 bg-white shadow-2xl rounded-2xl border border-red-700">
            <h1 className={`${frijole.className} text-[64px] font-bold text-[#550014] text-center mb-10`}>LOGIN</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && <p className="text-red-600 text-center font-bold">{error}</p>}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-3 text-base text-gray-900 bg-white shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors placeholder:text-gray-500"
                  style={{ fontSize: '16px', fontFamily: 'alegreya', color: '#111827' }}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 rounded-md border border-gray-400 px-3 py-3 text-base text-gray-900 bg-white shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors placeholder:text-gray-500"
                  style={{ fontSize: '16px', fontFamily: 'alegreya', color: '#111827' }}
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                )}
              </div>

              <div className="text-right">
                <Link href="/auth/forget" className="font-extrabold text-[#550014] underline hover:text-red-800 transition">
                  Lupa Password?
                </Link>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 px-6 font-bold text-white bg-[#550014] rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sedang Login...' : 'Log in'}
              </button>
            </form>

            <p className="mt-10 text-lg text-center text-[#550014]/70">
              Belum punya akun?{" "}
              <button 
                onClick={() => router.push('/auth/register')} 
                className="font-extrabold text-[#550014] hover:underline transition cursor-pointer"
              >
                Daftar
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FaUtensils, FaExchangeAlt, FaHome } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { alegreya, nosifer, frijole } from "@/app/ui/fonts";

const data = [
  { name: "5k", value: 20 },
  { name: "10k", value: 40 },
  { name: "15k", value: 60 },
  { name: "20k", value: 100 },
  { name: "25k", value: 50 },
  { name: "30k", value: 75 },
  { name: "35k", value: 30 },
  { name: "40k", value: 70 },
  { name: "45k", value: 60 },
  { name: "50k", value: 65 },
];

export default function AdminDashboard() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/admin/dashboard", label: "Beranda", icon: <FaHome className={`${alegreya.className} w-6 h-6`} /> },
    { href: "/admin/dashboard/menu", label: "Menu", icon: <FaUtensils className={`${alegreya.className} w-6 h-6`} /> },
    { href: "/admin/dashboard/transaksi", label: "Transaksi", icon: <FaExchangeAlt className={`${alegreya.className} w-6 h-6`} /> },
  ];

  const handleSignOut = () => {
    // Hapus token / session jika ada
    // localStorage.removeItem("token"); // contoh
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0 flex flex-col bg-red-950 text-white shadow-md">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-32 border-b border-red-900">
            <Link href="/">
              <Image src="/logo.png" alt="Bloody Espresso Logo" width={140} height={140} />
            </Link>
          </div>
          <nav className="flex flex-col px-5 py-6 space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-4 rounded-md px-5 py-3 hover:bg-red-800 transition-all duration-200 ${
                    isActive ? "bg-red-800 font-bold shadow-inner" : "bg-red-900"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex-grow border-t border-red-900"></div>
          <form className="p-5">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center space-x-4 rounded-md bg-red-800 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
            >
              <PowerIcon className="w-6 h-6" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-h-screen text-white bg-gradient-to-br from-[#4A0D0D] to-[#750E0E] font-serif overflow-y-auto">
        {/* Navbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-red-900/50 border-b border-red-700">
          <div className="flex-1 flex justify-center ml-20">
            <h1 className={`${nosifer.className} text-4xl font-extrabold tracking-wide text-[#E5C1A5] drop-shadow-md text-center`}>
              BLOODY ESPRESSO
            </h1>
          </div>
          <div className="flex items-center space-x-3 mr-20">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="text-left">
              <p className="text-xl font-semibold">Elsa Dwita</p>
              <p className="text-lg text-gray-100">Admin</p>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center my-12">
          <h2 className={`${frijole.className} text-5xl font-extrabold text-[#E5C1A5] drop-shadow-md`}>Beranda</h2>
        </div>

        {/* Cards */}
        <div className={`${alegreya.className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 mb-8`}>
          <div className="bg-white text-black p-4 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold">Total User</h3>
            <p className="text-2xl font-bold">10</p>
            <p className="text-lg text-green-500">↑ 8.5% Up from yesterday</p>
          </div>
          <div className="bg-white text-black p-4 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold">Total Order</h3>
            <p className="text-2xl font-bold">15</p>
            <p className="text-lg text-green-500">↑ 1.3% Up from past week</p>
          </div>
          <div className="bg-white text-black p-4 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold">Rp. 30,000,000</p>
            <p className="text-lg text-red-500">↓ 4.3% Down from yesterday</p>
          </div>
          <div className="bg-white text-black p-4 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold">Total Pending</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-lg text-green-500">↑ 1.8% Up from yesterday</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white text-black rounded-2xl p-6 mx-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Laporan Penjualan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#B91C1C" strokeWidth={3} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

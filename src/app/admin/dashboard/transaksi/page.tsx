"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/outline";
import { FaExchangeAlt, FaHome, FaUtensils, FaFileExport } from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import { frijole, nosifer } from "@/app/ui/fonts";

interface Transaction {
  id: number;
  menuName: string;
  menuPrice: number;
  quantity: number;
  date: string;
  total: number;
}

export default function TransaksiPage() {
  const pathname = usePathname();
  const router = useRouter();
  
  const navItems = [
    { href: "/admin/dashboard", label: "Beranda", icon: <FaHome className="w-6 h-6" /> },
    { href: "/admin/dashboard/menu", label: "Menu", icon: <FaUtensils className="w-6 h-6" /> },
    { href: "/admin/dashboard/transaksi", label: "Transaksi", icon: <FaExchangeAlt className="w-6 h-6" /> },
  ];

  const handleSignOut = () => {
    router.push("/auth/login");
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transaksi");
        const data = await res.json();
        console.log("Data transaksi dari API:", data);
        setTransactions(
          data.map((tx: any) => ({
            id: tx.id,
            menuName: tx.product_name,
            menuPrice: tx.total_price / tx.quantity,
            quantity: tx.quantity,
            date: new Date(tx.created_at).toLocaleDateString(),
            total: tx.total_price,
          }))
        );
      } catch (error) {
        console.error("Gagal fetch transaksi:", error);
      }
    };
    fetchTransactions();
  }, []);

  const exportToExcel = () => {
    const data = transactions.map(tx => ({
      ID: tx.id,
      Menu: tx.menuName,
      Harga: tx.menuPrice,
      Jumlah: tx.quantity,
      Tanggal: tx.date,
      "Total Harga": tx.total,
    }));
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Transaksi");
    writeFile(workbook, "Data_Transaksi.xlsx");
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

        <div className="text-center my-12">
          <h2 className={`${frijole.className} text-5xl font-extrabold text-[#E5C1A5] drop-shadow-md`}>Riwayat Transaksi</h2>
        </div>

        {/* Export Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={exportToExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all flex items-center gap-2"
          >
            <FaFileExport /> Export Excel
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-white rounded w-full max-w-7xl mx-auto mb-8">
          <table className="min-w-full table-auto text-white border-collapse">
            <thead className="bg-[#3B0A0A]">
              <tr>
                <th className="px-4 py-3 border border-white">#</th>
                <th className="px-4 py-3 border border-white">Menu</th>
                <th className="px-4 py-3 border border-white">Harga</th>
                <th className="px-4 py-3 border border-white">Jumlah</th>
                <th className="px-4 py-3 border border-white">Tanggal</th>
                <th className="px-4 py-3 border border-white">Total</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={tx.id} className="text-xl text-center hover:bg-[#5A1E1E]">
                  <td className="px-4 py-2 border border-white">{index + 1}</td>
                  <td className="px-4 py-2 border border-white">{tx.menuName}</td>
                  <td className="px-4 py-2 border border-white">Rp {tx.menuPrice.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-2 border border-white">{tx.quantity}</td>
                  <td className="px-4 py-2 border border-white">{tx.date}</td>
                  <td className="px-4 py-2 border border-white">Rp {tx.total.toLocaleString("id-ID")}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-300">
                    Belum ada transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

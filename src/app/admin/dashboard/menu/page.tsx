"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FaUtensils, FaExchangeAlt, FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { nosifer, frijole } from "@/app/ui/fonts";

export default function AdminDashboard() {
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

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenuItems(data); // Data langsung dari DB
      } catch (error) {
        console.error("Gagal fetch menu:", error);
      }
    };
    fetchMenu();
  }, []);
  
  const [menuItems, setMenuItems] = useState<{ id: number; name: string; price: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState({ name: "", price: 0 });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState({ name: "", price: 0 });

  const addMenuItem = async () => {
    if (!newItem.name || newItem.price <= 0) return;
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      setMenuItems([...menuItems, data]); // Update state
      setNewItem({ name: "", price: 0 });
      setShowModal(false);
    } catch (error) {
      console.error("Gagal tambah menu:", error);
    }
  };
  
  const deleteMenuItem = async (id: number) => {
    try {
      await fetch(`/api/menu/${id}`, { method: "DELETE" });
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal hapus menu:", error);
    }
  };
  
  const saveEdit = async () => {
    if (!editedItem.name || editedItem.price <= 0 || editingId === null) return;
    try {
      await fetch(`/api/menu/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedItem),
      });
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingId ? { ...item, ...editedItem } : item
        )
      );
      setEditingId(null);
      setEditedItem({ name: "", price: 0 });
    } catch (error) {
      console.error("Gagal edit menu:", error);
    }
  };
  

  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2 className={`${frijole.className} text-5xl font-extrabold text-[#E5C1A5] drop-shadow-md`}>Menu</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6 px-6">
          <input
            type="text"
            placeholder="Cari Menu"
            className="px-4 py-2 rounded-full border border-black text-black bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#7B2D26] hover:bg-[#9e3c36] text-white px-6 py-2 rounded-full transition-all"
            disabled={editingId !== null}
          >
            Tambah Menu
          </button>
          <button
            onClick={() => setSearchTerm("")}
            className="bg-[#7B2D26] hover:bg-[#9e3c36] text-white px-6 py-2 rounded-full transition-all"
          >
            Tampil Semua
          </button>
        </div>

        {/* Modal Tambah Menu */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white rounded-lg p-8 shadow-xl max-w-md w-full text-black relative">
              <h3 className="text-2xl font-bold mb-4">Tambah Menu</h3>
              <input
                type="text"
                placeholder="Nama Menu"
                className="w-full mb-4 px-4 py-2 rounded border border-gray-400"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Harga Menu"
                className="w-full mb-4 px-4 py-2 rounded border border-gray-400"
                value={newItem.price === 0 ? "" : newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={addMenuItem}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto border border-white rounded w-full max-w-7xl mx-auto mb-8">
          <table className="min-w-full table-auto text-white border-collapse">
            <thead>
              <tr className="bg-[#3B0A0A]">
                <th className="px-4 py-3 border border-white">ID</th>
                <th className="px-4 py-3 border border-white">Nama Menu</th>
                <th className="px-4 py-3 border border-white">Harga Menu</th>
                <th className="px-4 py-3 border border-white">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.map((item, index) => (
                <tr key={item.id} className="text-xl text-center hover:bg-[#5A1E1E]">
                  <td className="px-4 py-2 border border-white">{index + 1}</td>
                  <td className="px-4 py-2 border border-white">
                    {editingId === item.id ? (
                      <input
                        type="text"
                        className="px-2 py-1 rounded bg-white text-black"
                        value={editedItem.name}
                        onChange={(e) =>
                          setEditedItem({ ...editedItem, name: e.target.value })
                        }
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="px-4 py-2 border border-white">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        className="px-2 py-1 rounded bg-white text-black"
                        value={editedItem.price === 0 ? "" : editedItem.price}
                        onChange={(e) =>
                          setEditedItem({
                            ...editedItem,
                            price: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    ) : (
                      item.price.toLocaleString("id-ID")
                    )}
                  </td>
                  <td className="px-4 py-2 border border-white">
                    <div className="flex items-center justify-center gap-2">
                      {editingId === item.id ? (
                        <>
                          <button onClick={saveEdit} className="hover:text-green-400">
                            ✅
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditedItem({ name: "", price: 0 });
                            }}
                            className="hover:text-red-400"
                          >
                            ❌
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(item.id);
                              setEditedItem({ name: item.name, price: item.price });
                            }}
                            className="hover:text-yellow-400"
                            disabled={editingId !== null}
                          >
                            <Pencil size={30} />
                          </button>
                          <button
                            onClick={() => deleteMenuItem(item.id)}
                            className="hover:text-red-500"
                            disabled={editingId !== null}
                          >
                            <Trash2 size={30} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMenu.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-300">
                    Tidak ada menu ditemukan.
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

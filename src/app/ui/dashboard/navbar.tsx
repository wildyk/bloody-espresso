"use client";
import { useRef, useState } from "react";
import { BellIcon, XMarkIcon, UserIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface UserProfile {
  name: string;
  role: string;
  email: string;
  profileImage: string;
}

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  
  // State untuk profile user
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Elsa Dwita",
    role: "Administrator",
    email: "elsa.dwita@example.com",
    profileImage: "/customers/evil-rabbit.png"
  });

  // State untuk form edit profile
  const [editForm, setEditForm] = useState<UserProfile>({
    name: userProfile.name,
    role: userProfile.role,
    email: userProfile.email,
    profileImage: userProfile.profileImage
  });

  const toggleNotifications = () => setShowNotifications((prev) => !prev);
  const toggleEditProfile = () => {
    setShowEditProfile((prev) => !prev);
    // Reset form ketika membuka modal
    if (!showEditProfile) {
      setEditForm(userProfile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(editForm);
    setShowEditProfile(false);
    // Di sini Anda bisa menambahkan logic untuk menyimpan ke database
    console.log("Profile saved:", editForm);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="relative z-50 flex items-center justify-end bg-red-900 px-4 py-3 text-white shadow-md pr-10">
        {/* Kontainer kanan */}
        <div className="flex items-center gap-10">
          {/* Notifikasi */}
          <div className="relative">
            <button onClick={toggleNotifications} className="relative">
              <BellIcon className="w-10 h-10 hover:text-gray-300" />
              <span className="absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white">
                3
              </span>
            </button>
          </div>

          {/* Akun */}
          <div className="flex items-center gap-2 relative group">
            <div className="relative">
              <Image
                src={userProfile.profileImage}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover cursor-pointer"
                onClick={toggleEditProfile}
              />
              <button
                onClick={toggleEditProfile}
                className="absolute -bottom-1 -right-1 bg-white text-red-900 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <PencilIcon className="w-3 h-3" />
              </button>
            </div>
            <div className="hidden md:block leading-tight cursor-pointer" onClick={toggleEditProfile}>
              <p className="text-xl font-semibold">{userProfile.name}</p>
              <p className="text-lg text-gray-300">{userProfile.role}</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Panel Notifikasi */}
      {showNotifications && (
        <div
          ref={panelRef}
          className="fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-lg p-4 text-black transition-transform duration-300 ease-in-out"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Notifikasi</h2>
            <button onClick={toggleNotifications}>
              <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-black" />
            </button>
          </div>
          <ul className="space-y-3">
            <li className="p-2 rounded-md bg-red-50">Pesanan baru masuk</li>
            <li className="p-2 rounded-md bg-red-50">Stok kopi hampir habis</li>
            <li className="p-2 rounded-md bg-red-50">Transaksi berhasil</li>
          </ul>
        </div>
      )}

      {/* Modal Edit Profile */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 ">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
              <button onClick={toggleEditProfile}>
                <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-black" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              {/* Profile Image */}
              <div className="text-center">
                <div className="relative inline-block">
                  <Image
                    src={editForm.profileImage}
                    alt="Profile Preview"
                    width={80}
                    height={80}
                    className="rounded-full object-cover mx-auto"
                  />
                  <label className="absolute bottom-0 right-0 bg-red-900 text-white rounded-full p-2 cursor-pointer hover:bg-red-800">
                    <PencilIcon className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">Klik ikon pensil untuk mengubah foto</p>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Role Field */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Jabatan
                </label>
                <select
                  id="role"
                  name="role"
                  value={editForm.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                  <option value="Kasir">Kasir</option>
                </select>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={toggleEditProfile}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
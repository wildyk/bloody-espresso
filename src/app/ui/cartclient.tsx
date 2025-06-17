"use client";

import { useCart } from "@/app/ui/cartcontext";
import Image from "next/image";

export default function CartClient() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (cartItems.length === 0) {
    return <p className="text-gray-400">Keranjang Anda kosong.</p>;
  }

  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        alert("Keranjang kosong");
        return;
      }

      const item = cartItems[0]; 

      const response = await fetch("/api/transaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_produk: item.id,
          quantity: item.quantity,
          total_harga: item.price * item.quantity,
        }),
      });

      const result = await response.json();
      console.log("Checkout result:", result);

      if (response.ok) {
        alert("Checkout berhasil!");
        clearCart();
      } else {
        throw new Error(result.error || "Checkout gagal");
      }
    } catch (error) {
      console.error("Error saat checkout:", error);
      alert("Terjadi kesalahan saat checkout.");
    }
  };

  return (
    <div className="space-y-6">
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-800 p-4 rounded shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-400">
                {item.quantity} x Rp{item.price.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-400 hover:text-red-600"
          >
            Hapus
          </button>
        </div>
      ))}

      <div className="pt-4 border-t border-gray-600">
        <h3 className="text-xl font-bold text-right">
          Total: Rp{getTotal().toLocaleString()}
        </h3>
      </div>
      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700 transition mt-4"
      >
        Checkout Sekarang
      </button>
    </div>
  );
}

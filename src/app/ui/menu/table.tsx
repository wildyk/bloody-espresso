'use client';

import React from 'react';

interface Produk {
  id_produk: number;
  nama_produk: string;
  harga: number;
}

const dummyProduk: Produk[] = [
  { id_produk: 1, nama_produk: 'Espresso', harga: 20000 },
  { id_produk: 2, nama_produk: 'Cappuccino', harga: 25000 },
  { id_produk: 3, nama_produk: 'Latte', harga: 24000 },
  { id_produk: 4, nama_produk: 'Americano', harga: 22000 },
  { id_produk: 5, nama_produk: 'Mocha', harga: 26000 },
];

export default function ProdukTable() {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-300">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-red-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">ID Produk</th>
            <th className="px-4 py-2 text-left font-semibold">Nama Produk</th>
            <th className="px-4 py-2 text-left font-semibold">Harga</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white text-gray-800">
          {dummyProduk.map((produk) => (
            <tr key={produk.id_produk}>
              <td className="px-4 py-2">{produk.id_produk}</td>
              <td className="px-4 py-2">{produk.nama_produk}</td>
              <td className="px-4 py-2">Rp {produk.harga.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

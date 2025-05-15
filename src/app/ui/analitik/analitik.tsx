'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

export default function GrafikPenjualan({ data }: { data: { nama_produk: string; jumlah_terjual: number }[] }) {
  return (
    <div className="w-full h-80 mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Grafik Produk Terjual</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="nama_produk" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jumlah_terjual" fill="#991b1b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

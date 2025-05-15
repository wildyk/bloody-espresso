'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function GrafikPenjualan({
  data,
}: {
  data: { nama_produk: string; jumlah_terjual: number }[];
}) {
  return (
    <div className="w-full h-[400px] mt-10">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Grafik Produk Terjual
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nama_produk" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jumlah_terjual" fill="#dc2626" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

import { fetchTransaksi } from '@/app/lib/data';

export default async function TransaksiTable() {
  const transaksiList = await fetchTransaksi();

  return (
    <div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-red-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">ID Transaksi</th>
            <th className="px-4 py-3 text-left font-semibold">ID Produk</th>
            <th className="px-4 py-3 text-left font-semibold">Nama Pembeli</th>
            <th className="px-4 py-3 text-left font-semibold">Tanggal</th>
            <th className="px-4 py-3 text-left font-semibold">Total Harga</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white text-gray-800">
          {transaksiList.map((t) => (
            <tr key={t.id_transaksi}>
              <td className="px-4 py-2">{t.id_transaksi}</td>
              <td className="px-4 py-2">{t.id_produk}</td>
              <td className="px-4 py-2">{t.nama_pembeli}</td>
              <td className="px-4 py-2">{new Date(t.tanggal_transaksi).toLocaleDateString()}</td>
              <td className="px-4 py-2">Rp {t.total_harga.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AnalitikSection({
  data,
}: {
  data: {
    totalProduk: number;
    totalRevenue: number;
    mostSold: string;
    jumlahTerjual: number;
  };
}) {
  const { totalProduk, totalRevenue, mostSold, jumlahTerjual } = data;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg border bg-white p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-700">Total Produk</h2>
        <p className="text-2xl font-bold text-red-800 mt-2">{totalProduk}</p>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
        <p className="text-2xl font-bold text-red-800 mt-2">Rp {totalRevenue.toLocaleString()}</p>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-700">Produk Terlaris</h2>
        <p className="text-lg text-gray-800 mt-2">{mostSold}</p>
        <p className="text-sm text-gray-500">Terjual {jumlahTerjual}x</p>
      </div>
    </div>
  );
}

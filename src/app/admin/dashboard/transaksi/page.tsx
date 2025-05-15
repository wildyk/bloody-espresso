import TransaksiTable from '@/app/ui/transaksi/table';

export default function TransaksiPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Riwayat Transaksi</h1>
      <TransaksiTable />
    </section>
  );
}

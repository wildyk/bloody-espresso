import { fetchProduk } from '@/app/lib/data';

export default async function ProdukTable() {
  const produkList = await fetchProduk();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Harga</th>
        </tr>
      </thead>
      <tbody>
        {produkList.map((produk) => (
          <tr key={produk.id}>
            <td>{produk.id}</td>
            <td>{produk.nama_produk}</td>
            <td>Rp {produk.harga_produk.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProduk(id: string) {
  try {
    const result = await sql<{
      id_produk: number;
      nama_produk: string;
      harga_produk: number;
    }[]>`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      WHERE id_produk = ${id}
      LIMIT 1
    `;

    return result[0]; 
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk by ID.');
  }
  
}
export async function fetchAllProduk() {
  try {
    const result = await sql`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      ORDER BY id_produk ASC
    `;
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all produk.');
  }
}

export async function fetchTransaksi() {
  await new Promise((r) => setTimeout(r, 1500));
  try {
const transaksi = await sql<{
  id_transaksi: number;
  id_produk: number;
  nama_pembeli: string;
  tanggal_transaksi: string;
  total_harga: number;
  quantity: number;
}[]>`
  SELECT id_transaksi, id_produk, nama_pembeli, tanggal_transaksi, total_harga, quantity
  FROM transaksi
  ORDER BY tanggal_transaksi ASC
`;
    return transaksi;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaksi.');
  }
}

export async function fetchAnalytics() {
  await new Promise((resolve) => setTimeout(resolve, 1500)); 
  try {
    // Query 1: total produk
    const totalProdukRes = await sql`SELECT COUNT(*) FROM produk`;
    const totalProduk = Number(totalProdukRes[0].count);

    // Query 2: total revenue (jumlah total_harga dari transaksi)
    const totalRevenueRes = await sql`SELECT SUM(total_harga) FROM transaksi`;
    const totalRevenue = Number(totalRevenueRes[0].sum || 0);

    // Query 3: produk paling sering muncul di transaksi
    const mostSoldRes = await sql`
      SELECT p.nama_produk, COUNT(t.id_produk) AS jumlah_terjual
      FROM transaksi t
      JOIN produk p ON t.id_produk = p.id_produk
      GROUP BY p.nama_produk
      ORDER BY jumlah_terjual DESC
      LIMIT 1;
    `;
    const mostSold = mostSoldRes[0];

    return {
      totalProduk,
      totalRevenue,
      mostSold: mostSold?.nama_produk || '-',
      jumlahTerjual: mostSold?.jumlah_terjual || 0,
    };
  } catch (err) {
    console.error('DB Error (analytics):', err);
    throw new Error('Failed to fetch analytics data.');
  }
}

export async function fetchPenjualanProduk() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); 
  try {
    const data = await sql<{ nama_produk: string; jumlah_terjual: number }[]>`
      SELECT p.nama_produk, COUNT(t.id_produk) AS jumlah_terjual
      FROM transaksi t
      JOIN produk p ON t.id_produk = p.id_produk
      GROUP BY p.nama_produk
      ORDER BY jumlah_terjual DESC
    `;
    return data;
  } catch (err) {
    console.error('DB Error (grafik):', err);
    throw new Error('Gagal ambil data grafik penjualan.');
  }
}

export async function fetchProdukWithFoto() {
  const produk = await sql<{
    id_produk: number;
    nama_produk: string;
    harga_produk: number;
    foto: string;
  }[]>`SELECT * FROM menu ORDER BY id_produk ASC`;
  return produk;
}


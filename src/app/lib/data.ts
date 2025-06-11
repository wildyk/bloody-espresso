import postgres from 'postgres';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProduk(id: string) {
  try {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format.');
    }

    const result = await sql<{
      id_produk: number;
      nama_produk: string;
      harga_produk: number;
    }[]>`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      WHERE id_produk = ${numericId}
      LIMIT 1
    `;

    return result[0] || null; // Kembalikan null jika tidak ada data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk by ID.');
  }
}
  
export async function fetchAllProduk() {
  try {
    const result = await sql<{
      id_produk: number;
      nama_produk: string;
      harga_produk: number;
    }[]>`
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
  try {
    // Query 1: total produk
    const totalProdukRes = await sql<{ count: number }[]>`SELECT COUNT(*) AS count FROM produk`;
    const totalProduk = Number(totalProdukRes[0].count);

    // Query 2: total revenue
    const totalRevenueRes = await sql<{ sum: number | null }[]>`SELECT SUM(total_harga) AS sum FROM transaksi`;
    const totalRevenue = Number(totalRevenueRes[0].sum || 0);

    // Query 3: produk paling sering muncul
    const mostSoldRes = await sql<{
      nama_produk: string;
      jumlah_terjual: number;
    }[]>`
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
  try {
    const produk = await sql<{
      id_produk: number;
      nama_produk: string;
      harga_produk: number;
      foto: string;
    }[]>`SELECT * FROM produk ORDER BY id_produk ASC`; // Ganti 'menu' dengan 'produk' jika sesuai
    return produk;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk with foto.');
  }
}

export async function addToCart(cartData: {
  id_produk: number;
  nama_produk: string;
  quantity: number;
  harga_produk: number;
  total_harga: number;
}) {
  try {
    const result = await sql`
      INSERT INTO cart (id_produk, nama_produk, quantity, harga_produk, total_harga, created_at)
      VALUES (${cartData.id_produk}, ${cartData.nama_produk}, ${cartData.quantity}, ${cartData.harga_produk}, ${cartData.total_harga}, NOW())
      RETURNING *
    `;
    return result[0] || null; // Kembalikan null jika tidak ada hasil
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add to cart');
  }
}

export async function createTransaksi(transaksiData: {
  id_produk: number;
  nama_pembeli: string;
  quantity: number;
  total_harga: number;
}) {
  try {
    const result = await sql`
      INSERT INTO transaksi (id_produk, nama_pembeli, tanggal_transaksi, total_harga, quantity)
      VALUES (${transaksiData.id_produk}, ${transaksiData.nama_pembeli}, NOW(), ${transaksiData.total_harga}, ${transaksiData.quantity})
      RETURNING *
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create transaction');
  }
}

export async function fetchCartItems() {
  try {
    const result = await sql<{
      id_produk: number;
      nama_produk: string;
      quantity: number;
      harga_produk: number;
      total_harga: number;
      created_at: string;
      foto: string;
    }[]>`
      SELECT c.*, m.nama_produk, m.foto 
      FROM cart c
      JOIN menu m ON c.id_produk = m.id_produk
      ORDER BY c.created_at DESC
    `;
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cart items');
  }
}


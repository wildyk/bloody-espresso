import postgres from 'postgres';
import { Produk } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Perbaikan 1: Tambahkan explicit return type dengan Produk | null
export async function fetchProduk(id: string): Promise<Produk | null> {
  try {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format.');
    }
    const result = await sql<Produk[]>`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      WHERE id_produk = ${numericId}
      LIMIT 1
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk by ID.');
  }
}

// Perbaikan 2: Tambahkan explicit return type
export async function fetchAllProduk(): Promise<Produk[]> {
  try {
    const result = await sql<Produk[]>`
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

// Definisikan type untuk Transaksi
export type Transaksi = {
  id_transaksi: number;
  id_produk: number;
  nama_pembeli: string;
  tanggal_transaksi: string;
  total_harga: number;
  quantity: number;
};

export async function fetchTransaksi(): Promise<Transaksi[]> {
  try {
    const transaksi = await sql<Transaksi[]>`
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

// Definisikan type untuk Analytics
export type Analytics = {
  totalProduk: number;
  totalRevenue: number;
  mostSold: string;
  jumlahTerjual: number;
};

export async function fetchAnalytics(): Promise<Analytics> {
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

// Definisikan type untuk PenjualanProduk
export type PenjualanProduk = {
  nama_produk: string;
  jumlah_terjual: number;
};

export async function fetchPenjualanProduk(): Promise<PenjualanProduk[]> {
  try {
    const data = await sql<PenjualanProduk[]>`
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

// Definisikan type untuk ProdukWithFoto
export type ProdukWithFoto = {
  id_produk: number;
  nama_produk: string;
  harga_produk: number;
  foto: string;
};

export async function fetchProdukWithFoto(): Promise<ProdukWithFoto[]> {
  try {
    const produk = await sql<ProdukWithFoto[]>`SELECT * FROM produk ORDER BY id_produk ASC`;
    return produk;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produk with foto.');
  }
}

// Definisikan type untuk CartData
export type CartData = {
  id_produk: number;
  nama_produk: string;
  quantity: number;
  harga_produk: number;
  total_harga: number;
};

export async function addToCart(cartData: CartData): Promise<any> {
  try {
    const result = await sql`
      INSERT INTO cart (id_produk, nama_produk, quantity, harga_produk, total_harga, created_at)
      VALUES (${cartData.id_produk}, ${cartData.nama_produk}, ${cartData.quantity}, ${cartData.harga_produk}, ${cartData.total_harga}, NOW())
      RETURNING *
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add to cart');
  }
}

// Definisikan type untuk TransaksiData
export type TransaksiData = {
  id_produk: number;
  nama_pembeli: string;
  quantity: number;
  total_harga: number;
};

export async function createTransaksi(transaksiData: TransaksiData): Promise<any> {
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

// Definisikan type untuk CartItem
export type CartItem = {
  id_produk: number;
  nama_produk: string;
  quantity: number;
  harga_produk: number;
  total_harga: number;
  created_at: string;
  foto: string;
};

// Perbaikan 3: Fix query - gunakan konsisten antara 'menu' atau 'produk'
export async function fetchCartItems(): Promise<CartItem[]> {
  try {
    const result = await sql<CartItem[]>`
      SELECT c.*, p.nama_produk, p.foto 
      FROM cart c
      JOIN produk p ON c.id_produk = p.id_produk
      ORDER BY c.created_at DESC
    `;
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cart items');
  }
}
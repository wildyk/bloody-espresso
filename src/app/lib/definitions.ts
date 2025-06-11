export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Produk = {
  id_produk: number;
  nama_produk: string;
  harga_produk: number;
};

export type Transaksi = {
  id_transaksi: number;
  id_produk: number;
  nama_pembeli: string;
  tanggal_transaksi: string;
  total_harga: number;
  quantity: number;
};

export type Analytics = {
  totalProduk: number;
  totalRevenue: number;
  mostSold: string;
  jumlahTerjual: number;
};

export type PenjualanProduk = {
  nama_produk: string;
  jumlah_terjual: number;
};

export type ProdukWithFoto = {
  id_produk: number;
  nama_produk: string;
  harga_produk: number;
  foto: string;
};

export type CartData = {
  id_produk: number;
  nama_produk: string;
  quantity: number;
  harga_produk: number;
  total_harga: number;
};

export type TransaksiData = {
  id_produk: number;
  nama_pembeli: string;
  quantity: number;
  total_harga: number;
};

export type CartItem = {
  id_produk: number;
  nama_produk: string;
  quantity: number;
  harga_produk: number;
  total_harga: number;
  created_at: string;
  foto: string;
};

export type Cart = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
};
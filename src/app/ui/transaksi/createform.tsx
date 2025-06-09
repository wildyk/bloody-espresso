'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon, CalendarIcon, CurrencyDollarIcon, ShoppingCartIcon, TagIcon } from '@heroicons/react/24/outline';
import { createTransaksi, getProductById } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { alegreya } from '@/app/ui/fonts';

interface Product {
  id_produk: number;
  nama_produk: string;
  harga_produk: number;
}

export default function TransactionForm() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalHarga, setTotalHarga] = useState(0);
  const [error, setError] = useState('');

  const handleProductIdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const productId = e.target.value;
    
    if (!productId) {
      setProduct(null);
      setTotalHarga(0);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const productData = await getProductById(parseInt(productId));
      if (productData) {
        setProduct(productData);
        setTotalHarga(productData.harga_produk * quantity);
      } else {
        setProduct(null);
        setTotalHarga(0);
        setError('Produk tidak ditemukan');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
      setTotalHarga(0);
      setError('Gagal mengambil data produk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      setTotalHarga(product.harga_produk * quantity);
    }
  }, [product, quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
  };

  return (
    <form action={createTransaksi} className={alegreya.className}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="id_produk" className="mb-2 block text-xl font-medium">
            ID Produk
          </label>
          <div className="relative">
            <input
              id="id_produk"
              name="id_produk"
              type="number"
              required
              placeholder="Masukkan ID produk"
              onChange={handleProductIdChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
            />
            <ShoppingCartIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {loading && (
            <p className="mt-1 text-sm text-blue-600">Mencari produk...</p>
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>

        {product && (
          <div className="mb-4 rounded-md bg-blue-50 p-4 border border-blue-200">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Informasi Produk</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Nama Produk
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={product.nama_produk}
                    readOnly
                    className="block w-full rounded-md border border-blue-200 bg-blue-50 py-2 pl-10 text-base text-blue-900"
                  />
                  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Harga Satuan
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={`Rp ${product.harga_produk.toLocaleString('id-ID')}`}
                    readOnly
                    className="block w-full rounded-md border border-blue-200 bg-blue-50 py-2 pl-10 text-base text-blue-900"
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {product && (
          <div className="mb-4">
            <label htmlFor="quantity" className="mb-2 block text-xl font-medium">
              Jumlah
            </label>
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
              />
              <ShoppingCartIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="nama_pembeli" className="mb-2 block text-xl font-medium">
            Nama Pembeli
          </label>
          <div className="relative">
            <input
              id="nama_pembeli"
              name="nama_pembeli"
              type="text"
              required
              placeholder="Masukkan nama pembeli"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tanggal_transaksi" className="mb-2 block text-xl font-medium">
            Tanggal Transaksi
          </label>
          <div className="relative">
            <input
              id="tanggal_transaksi"
              name="tanggal_transaksi"
              type="date"
              required
              defaultValue={new Date().toISOString().split('T')[0]}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="total_harga" className="mb-2 block text-xl font-medium">
            Total Harga
          </label>
          <div className="relative">
            <input
              id="total_harga"
              name="total_harga"
              type="number"
              value={totalHarga}
              readOnly
              className="peer block w-full rounded-md border border-gray-200 bg-gray-100 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {product && (
            <p className="mt-1 text-sm text-gray-600">
              {quantity} × Rp {product.harga_produk.toLocaleString('id-ID')} = Rp {totalHarga.toLocaleString('id-ID')}
            </p>
          )}
        </div>
      </div>

      <div className={`${alegreya.className} mt-6 flex justify-end gap-4`}>
        <Link
          href="/admin/dashboard/transaksi"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-lg font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Batal
        </Link>
        <Button type="submit" disabled={!product}>
          Simpan Transaksi
        </Button>
      </div>
    </form>
  );
}
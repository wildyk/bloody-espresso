"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  TagIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { createTransaksi, getAllProducts } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import { alegreya } from "@/app/ui/fonts";

interface Product {
  id_produk: number;
  nama_produk: string;
  harga_produk: number;
}

export default function TransactionForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalHarga, setTotalHarga] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getAllProducts();
        const sortedProducts = (productsData || []).sort((a, b) => a.id_produk - b.id_produk);
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setServerError("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    if (!productId) {
      setSelectedProduct(null);
      setTotalHarga(0);
      return;
    }
    const product = products.find((p) => p.id_produk === parseInt(productId));
    if (product) {
      setSelectedProduct(product);
      setTotalHarga(product.harga_produk);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const namaPembeli = formData.get("nama_pembeli") as string;

    const newErrors: { nama_pembeli?: string; id_produk?: string } = {};

    if (!namaPembeli?.trim()) {
      newErrors.nama_pembeli = "Nama pembeli wajib diisi";
    } else if (!/^[A-Za-z\s]+$/.test(namaPembeli)) {
      newErrors.nama_pembeli = "Nama hanya boleh huruf dan spasi, tanpa angka atau simbol";
    }

    if (!selectedProduct) {
      newErrors.id_produk = "Produk wajib dipilih";
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    if (selectedProduct) {
      formData.set("id_produk", selectedProduct.id_produk.toString());
      formData.set("total_harga", totalHarga.toString());
    }

    const result = await createTransaksi(formData);

    if (result?.errors) {
      setFieldErrors(result.errors);
    } else if ("message" in (result || {})) {
      setServerError((result as unknown as { message: string }).message);
    } else {
      setFieldErrors({});
      setServerError("");
      form.reset();
      setSelectedProduct(null);
      setTotalHarga(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={alegreya.className}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Select Produk */}
        <div className="mb-4">
          <label htmlFor="id_produk" className="mb-2 block text-xl font-medium">
            Pilih Produk
          </label>
          <div className="relative">
            <select
              id="id_produk"
              name="id_produk"
              onChange={handleProductChange}
              disabled={loading}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-10 text-base outline-2 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
            >
              <option value="">
                {loading ? "Memuat produk..." : "Pilih produk"}
              </option>
              {products.map((product) => (
                <option key={product.id_produk} value={product.id_produk}>
                  ID: {product.id_produk} - {product.nama_produk} - Rp{" "}
                  {product.harga_produk.toLocaleString("id-ID")}
                </option>
              ))}
            </select>
            <ShoppingCartIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {fieldErrors.id_produk && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.id_produk}</p>
          )}
        </div>

        {/* Info Produk */}
        {selectedProduct && (
          <div className="mb-4 rounded-md bg-blue-50 p-4 border border-blue-200">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Informasi Produk</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">ID Produk</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={selectedProduct.id_produk}
                    readOnly
                    className="block w-full rounded-md border border-blue-200 bg-blue-50 py-2 pl-10 text-base text-blue-900"
                  />
                  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Nama Produk</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={selectedProduct.nama_produk}
                    readOnly
                    className="block w-full rounded-md border border-blue-200 bg-blue-50 py-2 pl-10 text-base text-blue-900"
                  />
                  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Harga Satuan</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={`Rp ${selectedProduct.harga_produk.toLocaleString("id-ID")}`}
                    readOnly
                    className="block w-full rounded-md border border-blue-200 bg-blue-50 py-2 pl-10 text-base text-blue-900"
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nama Pembeli */}
        <div className="mb-4">
          <label htmlFor="nama_pembeli" className="mb-2 block text-xl font-medium">
            Nama Pembeli
          </label>
          <div className="relative">
            <input
              id="nama_pembeli"
              name="nama_pembeli"
              type="text"
              placeholder="Masukkan nama pembeli"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {fieldErrors.nama_pembeli && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.nama_pembeli}</p>
          )}
        </div>

        {/* Tanggal Transaksi */}
        <div className="mb-4">
          <label htmlFor="tanggal_transaksi" className="mb-2 block text-xl font-medium">
            Tanggal Transaksi
          </label>
          <div className="relative">
            <input
              id="tanggal_transaksi"
              name="tanggal_transaksi"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Total Harga */}
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
              className="peer block w-full rounded-md border border-gray-200 bg-gray-100 py-2 pl-10 text-base outline-2"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Error Umum */}
        {serverError && (
          <p className="text-sm text-red-600 mt-2">{serverError}</p>
        )}
      </div>

      {/* Tombol Aksi */}
      <div className={`${alegreya.className} mt-6 flex justify-end gap-4`}>
        <Link
          href="/admin/dashboard/transaksi"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-lg font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Batal
        </Link>
        <Button type="submit" disabled={!selectedProduct}>
          Simpan Transaksi
        </Button>
      </div>
    </form>
  );
}

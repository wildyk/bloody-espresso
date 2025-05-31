'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const MenuSchema = z.object({
  id: z.string(),
  nama_produk: z.string(),
  harga_produk: z.number(),
});

const CreateMenu = MenuSchema.omit({ id: true });
const UpdateMenu = MenuSchema.omit({ id: true });

export async function createMenu(formData: FormData) {
  const { nama_produk, harga_produk } = CreateMenu.parse({
    nama_produk: formData.get('nama_produk'),
    harga_produk: Number(formData.get('harga_produk')),
  });

  await sql`
    INSERT INTO menu (nama_produk, harga_produk)
    VALUES (${nama_produk}, ${harga_produk})
  `;

  revalidatePath('/admin/dashboard/menu');
  redirect('/admin/dashboard/menu');
}

export async function updateMenu(id: string, formData: FormData) {
  const { nama_produk, harga_produk } = UpdateMenu.parse({
    nama_produk: formData.get('nama_produk'),
    harga_produk: Number(formData.get('harga_produk')),
  });

  await sql`
    UPDATE menu
    SET nama_produk = ${nama_produk}, harga_produk = ${harga_produk}
    WHERE id_produk = ${id}
  `;

  revalidatePath('/admin/dashboard/menu');
  redirect('/admin/dashboard/menu');
}

export async function deleteMenu(id: string) {
  await sql`DELETE FROM menu WHERE id_produk = ${id}`;
  revalidatePath('/admin/dashboard/menu');
}

const TransaksiSchema = z.object({
  id: z.string(),
  id_produk: z.string(),
  nama_pembeli: z.string(),
  total_harga: z.number(),
  tanggal_transaksi: z.string(),
});

const CreateTransaksi = TransaksiSchema.omit({ id: true, tanggal_transaksi: true });
const UpdateTransaksi = TransaksiSchema.omit({ id: true, tanggal_transaksi: true });

export async function createTransaksi(formData: FormData) {
  const { id_produk, nama_pembeli, total_harga } = CreateTransaksi.parse({
    id_produk: formData.get('id_produk'),
    nama_pembeli: formData.get('nama_pembeli'),
    total_harga: Number(formData.get('total_harga')),
  });

  const tanggal_transaksi = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO transaksi (id_produk, nama_pembeli, total_harga, tanggal_transaksi)
    VALUES (${id_produk}, ${nama_pembeli}, ${total_harga}, ${tanggal_transaksi})
  `;

  revalidatePath('/admin/dashboard/transaksi');
  redirect('/admin/dashboard/transaksi');
}

export async function updateTransaksi(id: string, formData: FormData) {
  const { id_produk, nama_pembeli, total_harga } = UpdateTransaksi.parse({
    id_produk: formData.get('id_produk'),
    nama_pembeli: formData.get('nama_pembeli'),
    total_harga: Number(formData.get('total_harga')),
  });

  await sql`
    UPDATE transaksi
    SET id_produk = ${id_produk}, nama_pembeli = ${nama_pembeli}, total_harga = ${total_harga}
    WHERE id_transaksi = ${id}
  `;

  revalidatePath('/admin/dashboard/transaksi');
  redirect('/admin/dashboard/transaksi');
}

export async function deleteTransaksi(id: string) {
  await sql`DELETE FROM transaksi WHERE id_transaksi = ${id}`;
  revalidatePath('/admin/dashboard/transaksi');
}

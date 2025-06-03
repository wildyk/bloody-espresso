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

const TransaksiSchema = z.object({
  id: z.string(),
  id_produk: z.string(),
  nama_pembeli: z.string(),
  total_harga: z.number(),
  tanggal_transaksi: z.string(),
});

const CreateMenu = MenuSchema.omit({ id: true });
const UpdateMenu = MenuSchema.omit({ id: true });
const CreateTransaksi = TransaksiSchema.omit({ id: true, tanggal_transaksi: true });

export async function createMenu(formData: FormData) {
  const { nama_produk, harga_produk } = CreateMenu.parse({
    nama_produk: formData.get('nama_produk'),
    harga_produk: Number(formData.get('harga_produk')),
  });

  await sql`
    INSERT INTO produk (nama_produk, harga_produk)
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
    UPDATE produk
    SET nama_produk = ${nama_produk}, harga_produk = ${harga_produk}
    WHERE id_produk = ${id}
  `;

  revalidatePath('/admin/dashboard/menu');
  redirect('/admin/dashboard/menu');
}

export async function deleteMenu(id: string) {
  await sql`DELETE FROM produk WHERE id_produk = ${id}`;
  revalidatePath('/admin/dashboard/menu');
}

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


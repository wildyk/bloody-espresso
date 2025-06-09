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
  quantity: z.number().optional(),
});

const CreateMenu = MenuSchema.omit({ id: true });
const UpdateMenu = MenuSchema.omit({ id: true });

// MENU FUNCTIONS
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

export async function getProductById(id: number) {
  try {
    const result = await sql`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      WHERE id_produk = ${id}
    `;

    if (result.length === 0) {
      return null;
    }

    return {
      id_produk: result[0].id_produk,
      nama_produk: result[0].nama_produk,
      harga_produk: Number(result[0].harga_produk)
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product data.');
  }
}

// NEW FUNCTION: Get all products for dropdown
export async function getAllProducts() {
  try {
    const result = await sql`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      ORDER BY nama_produk ASC
    `;

    return result.map(row => ({
      id_produk: row.id_produk,
      nama_produk: row.nama_produk,
      harga_produk: Number(row.harga_produk)
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function createTransaksi(formData: FormData) {
  const id_produk = formData.get('id_produk');
  const nama_pembeli = formData.get('nama_pembeli');
  const total_harga = Number(formData.get('total_harga'));
  const quantity = Number(formData.get('quantity')) || 1;
  const tanggal_transaksi = formData.get('tanggal_transaksi') || new Date().toISOString().split('T')[0];

  const CreateTransaksiWithQuantity = z.object({
    id_produk: z.string(),
    nama_pembeli: z.string(),
    total_harga: z.number(),
    quantity: z.number().min(1),
    tanggal_transaksi: z.string(),
  });

  const validatedData = CreateTransaksiWithQuantity.parse({
    id_produk,
    nama_pembeli,
    total_harga,
    quantity,
    tanggal_transaksi,
  });

  try {
    await sql`
      INSERT INTO transaksi (id_produk, nama_pembeli, total_harga, tanggal_transaksi, quantity)
      VALUES (${validatedData.id_produk}, ${validatedData.nama_pembeli}, ${validatedData.total_harga}, ${validatedData.tanggal_transaksi}, ${validatedData.quantity})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create transaksi.');
  }

  revalidatePath('/admin/dashboard/transaksi');
  redirect('/admin/dashboard/transaksi');
}
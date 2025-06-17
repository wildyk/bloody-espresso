"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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

// MENU FUNCTIONS
export async function createMenu(formData: FormData) {
  "use server";

  const nama_produk = formData.get("nama_produk");
  const harga_produk = Number(formData.get("harga_produk"));

  const errors: { nama_produk?: string; harga_produk?: string } = {};

  if (!nama_produk || typeof nama_produk !== "string") {
    errors.nama_produk = "Nama produk wajib diisi";
  }

  if (isNaN(harga_produk) || harga_produk <= 0) {
    errors.harga_produk = "Harga produk harus lebih dari 0";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Insert ke database
  await sql`
    INSERT INTO produk (nama_produk, harga_produk)
    VALUES (${nama_produk as string}, ${harga_produk})
  `;

  revalidatePath("/admin/dashboard/menu");
  redirect("/admin/dashboard/menu");
}

export async function updateMenu(id: string, formData: FormData) {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("ID produk tidak valid");
    }

    const { nama_produk, harga_produk } = UpdateMenu.parse({
      nama_produk: formData.get("nama_produk"),
      harga_produk: Number(formData.get("harga_produk")),
    });

    await sql`
      UPDATE produk
      SET nama_produk = ${nama_produk}, harga_produk = ${harga_produk}
      WHERE id_produk = ${id}
    `;

    revalidatePath("/admin/dashboard/menu");
    redirect("/admin/dashboard/menu");
  } catch (error) {
    console.error("Gagal memperbarui menu:", error);
    throw error;
  }
}

export async function deleteMenu(id: string) {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("ID produk tidak valid");
    }

    await sql`DELETE FROM produk WHERE id_produk = ${id}`;
    revalidatePath("/admin/dashboard/menu");
  } catch (error) {
    console.error("Gagal menghapus menu:", error);
    throw error;
  }
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
      harga_produk: Number(result[0].harga_produk),
    };
  } catch (error) {
    console.error("Gagal mendapatkan produk:", error);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const result = await sql`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      ORDER BY nama_produk ASC
    `;

    return result.map((row) => ({
      id_produk: row.id_produk,
      nama_produk: row.nama_produk,
      harga_produk: Number(row.harga_produk),
    }));
  } catch (error) {
    console.error("Gagal mendapatkan semua produk:", error);
    throw error;
  }
}

export async function createTransaksi(formData: FormData) {
  try {
    const id_produk = formData.get("id_produk");
    const nama_pembeli = formData.get("nama_pembeli");
    const total_harga = Number(formData.get("total_harga"));
    const tanggal_transaksi_raw = formData.get("tanggal_transaksi");
    const tanggal_transaksi =
      (typeof tanggal_transaksi_raw === "string" ? tanggal_transaksi_raw : undefined) ||
      new Date().toISOString().split("T")[0];

    const errors: { nama_pembeli?: string } = {};

    if (!nama_pembeli || typeof nama_pembeli !== "string" || nama_pembeli.trim() === "") {
      errors.nama_pembeli = "Nama pembeli wajib diisi";
      return { errors };
    }
    await sql`
      INSERT INTO transaksi (id_produk, nama_pembeli, total_harga, tanggal_transaksi)
      VALUES (${typeof id_produk === "string" ? id_produk : null}, ${typeof nama_pembeli === "string" ? nama_pembeli : null}, ${total_harga}, ${tanggal_transaksi})
    `;

    revalidatePath("/admin/dashboard/transaksi");
    redirect("/admin/dashboard/transaksi");
  } catch (error) {
    console.error("Gagal membuat transaksi:", error);
    throw error;
  }
}

export async function deleteTransaksi(id: string) {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("ID transaksi tidak valid");
    }

    await sql`DELETE FROM transaksi WHERE id_transaksi = ${id}`;
    revalidatePath("/admin/dashboard/transaksi");
  } catch (error) {
    console.error("Gagal menghapus transaksi:", error);
    throw error;
  }
}

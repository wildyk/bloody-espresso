import Form from '@/app/ui/menu/editform';
import Breadcrumbs from '@/app/ui/menu/breadcrumbs';
import { fetchProduk } from '@/app/lib/data';
import { notFound } from 'next/navigation';

// Definisikan tipe untuk produk
type Produk = {
  id_produk: number;
  nama_produk: string;
  harga_produk: number;
} | null;

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const produk: Produk = await fetchProduk(id);

  if (!produk) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menu', href: '/admin/dashboard/menu' },
          {
            label: 'Edit Menu',
            href: `/admin/dashboard/menu/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form produk={produk} />
    </main>
  );
}
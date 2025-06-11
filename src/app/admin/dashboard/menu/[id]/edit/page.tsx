import Form from '@/app/ui/menu/editform';
import Breadcrumbs from '@/app/ui/menu/breadcrumbs';
import { fetchProduk } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Produk } from '@/app/lib/definitions';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
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

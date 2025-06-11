export const dynamic = "force-dynamic";

import { notFound } from 'next/navigation';
import Form from '@/app/ui/menu/editform';
import Breadcrumbs from '@/app/ui/menu/breadcrumbs';
import { fetchProduk } from '@/app/lib/data';
import { Produk } from '@/app/lib/definitions';

export default async function Page({ params }: { params: { id: string } }) {
  const produk = await fetchProduk(params.id);
  if (!produk) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menu', href: '/admin/dashboard/menu' },
          {
            label: 'Edit Menu',
            href: `/admin/dashboard/menu/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form produk={produk} />
    </main>
  );
}


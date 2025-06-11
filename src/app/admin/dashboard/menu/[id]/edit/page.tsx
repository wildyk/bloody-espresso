export const dynamic = "force-dynamic";

import { notFound } from 'next/navigation';
import Form from '@/app/ui/menu/editform';
import Breadcrumbs from '@/app/ui/menu/breadcrumbs';
import { fetchProduk } from '@/app/lib/data';
import { Produk } from '@/app/lib/definitions';

type PageProps = {
  params: {
    id: string;
  };
};

// LANGSUNG jadikan Page async function
export default async function Page({ params }: PageProps) {
  const produk: Produk | null = await fetchProduk(params.id);

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
            href: `/admin/dashboard/menu/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form produk={produk} />
    </main>
  );
}

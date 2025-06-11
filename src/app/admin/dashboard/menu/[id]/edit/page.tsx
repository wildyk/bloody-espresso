import { notFound } from 'next/navigation';
import Form from '@/app/ui/menu/editform';
import Breadcrumbs from '@/app/ui/menu/breadcrumbs';
import { fetchProduk } from '@/app/lib/data';
import { Produk } from '@/app/lib/definitions';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const produk: Produk | null = await fetchProduk(id);

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
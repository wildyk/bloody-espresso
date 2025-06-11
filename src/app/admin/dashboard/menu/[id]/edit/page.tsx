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

// ⛔ HINDARI: async function Page({ params }: PageProps)
// ✅ GUNAKAN: function Page lalu panggil komponen async di dalamnya
export default function Page({ params }: PageProps) {
  return <Content id={params.id} />;
}

// Pisahkan komponen async ke luar
async function Content({ id }: { id: string }) {
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

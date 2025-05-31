import Breadcrumbs from '@/app/ui/menu/breadcrumbs';
import EditMenuForm from '@/app/ui/menu/editform';
import { fetchProduk } from '@/app/lib/data';

interface EditMenuPageProps {
  params: { id: string };
}

export default async function EditMenuPage({ params }: EditMenuPageProps) {
  const menu = await fetchProduk(params.id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menu', href: '/admin/dashboard/menu' },
          { label: 'Edit Produk', href: `/admin/dashboard/menu/${params.id}/edit`, active: true },
        ]}
      />
      <EditMenuForm menu={menu} />
    </main>
  );
}

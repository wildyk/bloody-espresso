import Form from '@/app/ui/menu/createform';
import Breadcrumbs from '@/app/ui/menu/breadcrumbs';

export default function CreateMenuPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menu', href: '/admin/dashboard/menu' },
          { label: 'Tambah Menu', href: '/admin/dashboard/menu/create', active: true },
        ]}
      />
      <Form />
    </main>
  );
}

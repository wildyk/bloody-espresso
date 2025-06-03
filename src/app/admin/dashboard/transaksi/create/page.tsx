import Form from '@/app/ui/transaksi/createform';
import Breadcrumbs from '@/app/ui/transaksi/breadcrumbs';

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transaksi', href: '/admin/dashboard/transaksi' },
          {
            label: 'Tambah Transaksi',
            href: '/admin/dashboard/transaksi/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
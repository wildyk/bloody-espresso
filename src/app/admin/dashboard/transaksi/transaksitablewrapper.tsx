import TransaksiTable from '@/app/ui/transaksi/table';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function TransaksiTableWrapper({ searchParams }: Props) {
  return (
    <>
      <TransaksiTable searchParams={searchParams || {}} />
    </>
  );
}
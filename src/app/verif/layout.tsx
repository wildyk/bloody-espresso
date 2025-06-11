import { alegreya } from '@/app/ui/fonts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={alegreya.className}>
      <main className="min-h-screen text-[#2c0a0a]">
        {children}
      </main>
    </div>
  );
}

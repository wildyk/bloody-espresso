import { alegreya } from '@/app/ui/fonts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${alegreya.className}`}>
      <main className="min-h-screen bg-[#fffaf5] text-[#2c0a0a] px-4 md:px-12 py-6">
        {children}
      </main>
    </div>
  );
}

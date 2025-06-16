import { alegreya } from '@/app/ui/fonts';
import { CartProvider } from '@/app/ui/cartcontext';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className={alegreya.className}>
        <main className="min-h-screen text-[#2c0a0a]">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}


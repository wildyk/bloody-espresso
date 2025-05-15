import SideNav from '@/app/ui/dashboard/sidenav';
import Navbar from '@/app/ui/dashboard/navbar'; // <-- import baru

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-72">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto">
        <Navbar />
        <main className="p-6 md:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}

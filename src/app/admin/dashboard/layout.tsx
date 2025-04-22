export const metadata = {
  title: "Bloody Espresso",
  description: "Dashboard Admin",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-red-950 text-white">
      {children}
    </div>
  );
}


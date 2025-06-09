'use client';

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function ConditionalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Halaman yang tidak menggunakan navbar
  const noNavbarPaths = ['/admin'];
  const showNavbar = !noNavbarPaths.some(path => pathname.startsWith(path));

  if (showNavbar) {
    return (
      <>
        <Navbar />
        <main className="pt-28">{children}</main>
        <Footer />
      </>
    );
  }

  return <main>{children}</main>;
}
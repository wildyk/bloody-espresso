import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div className="flex h-screen w-72 flex-col justify-between px-3 py-4 md:px-4 bg-red-950 text-white">
      {/* Logo dan Navigasi */}
      <div>
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Bloody Espresso Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="border-t border-red-700 my-4"></div>

        <div className="space-y-2">
          <NavLinks />
        </div>
      </div>

      {/* Tombol Logout di bawah */}
      <form className="mt-auto">
        <div className="border-t border-red-700 my-4"></div>
        <Link
          href="/auth/login"
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-red-800 p-3 text-sm font-medium hover:bg-red-700 hover:text-white md:justify-start md:px-3"
        >
          <PowerIcon className="w-6" />
          <span className="hidden md:block">Sign Out</span>
        </Link>
      </form>
    </div>
  );
}

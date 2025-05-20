"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useMemo } from "react";

export default function NavLinks() {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { name: "Home", href: "/admin/dashboard/analitik", icon: HomeIcon },
      {
        name: "Menu",
        href: "/admin/dashboard/menu",
        icon: DocumentDuplicateIcon,
      },
      { name: "Transaksi", href: "/admin/dashboard/transaksi", icon: UserGroupIcon },
    ],
    []
  );

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-12 w-full items-center justify-start gap-2 rounded-md bg-red-800 px-3 text-sm font-medium hover:bg-red-700 hover:text-white",
              {
                "bg-red-700 text-white": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useMemo } from 'react';

export default function NavLinks() {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { name: 'Home', href: '/admin/dashboard', icon: HomeIcon },
      { name: 'Menu', href: '/admin/dashboard/menu', icon: DocumentDuplicateIcon },
      { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
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
              'flex h-12 grow items-center justify-center gap-2 rounded-md bg-red-950 text-sm font-medium hover:bg-red-900 md:flex-none md:justify-start md:p-2 md:px-3',
              { 'bg-red-950 text-white': pathname === link.href }
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

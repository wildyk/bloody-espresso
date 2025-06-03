import { clsx } from 'clsx';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { alegreya } from '@/app/ui/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(alegreya.className, 'flex text-xl md:text-2xl')}>
        {/* Home Icon + Dashboard */}
        <li className="flex items-center">
          <Link
            href="/admin/dashboard"
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            <span className="hidden md:block">Dashboard</span>
          </Link>
          <ChevronRightIcon className="mx-3 h-4 w-4 text-gray-400" />
        </li>

        {/* Breadcrumbs Dynamic */}
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? 'page' : undefined}
            className={clsx(
              'flex items-center',
              breadcrumb.active ? 'text-gray-900 font-semibold' : 'text-gray-500'
            )}
          >
            {breadcrumb.active ? (
              <span>{breadcrumb.label}</span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="hover:text-gray-700 transition-colors"
              >
                {breadcrumb.label}
              </Link>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronRightIcon className="mx-3 h-4 w-4 text-gray-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

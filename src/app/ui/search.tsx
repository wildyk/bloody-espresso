'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchProps {
  placeholder?: string;
}

export default function Search({ placeholder = 'Cari sesuatu...' }: SearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="text"
        placeholder={placeholder}
        className="peer block w-full rounded-md border border-gray-300 bg-white/90 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-red-500" />
    </div>
  );
}

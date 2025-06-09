import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  // Redirect ke login jika belum login tapi akses dashboard
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect ke dashboard jika sudah login tapi akses auth page
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/verif/:path*']
};
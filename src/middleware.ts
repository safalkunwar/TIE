import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')?.value;

  // Protect /admin/destinations
  if (request.nextUrl.pathname.startsWith('/admin/destinations')) {
    if (!adminToken || adminToken !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // If already logged in, redirect /admin to /admin/destinations
  if (request.nextUrl.pathname === '/admin') {
    if (adminToken && adminToken === process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/admin/destinations', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

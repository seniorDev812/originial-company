import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to the sign-in page
    if (pathname === '/admin') {
      return NextResponse.next();
    }

    // Check for admin token in cookies
    const adminToken = request.cookies.get('adminToken');

    // If no token is found, redirect to admin sign-in
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // For now, we'll allow access if token exists
    // In production, you should validate the token here
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isHttps = request.headers.get('x-forwarded-proto') === 'https';
  const origin = request.headers.get('origin') || '';
  const allowedOrigins = [
    'https://ezyrent-web.vercel.app',
    'https://www.ezyrent.org'
  ];

  const allowedOrigin = (origin: string) => {
    return allowedOrigins.includes(origin) ? origin : 'http://localhost:3000';
  };
  // Get auth token and password status from cookies......
  const authToken = request.cookies.get('ezyrent_auth_token')?.value;

  if (!isHttps && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(`https://${url.host}${url.pathname}`);
  }

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin(origin));
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }

  // Protect admin routes
  if (url.pathname.startsWith('/admin')) {
    // If no auth token, redirect to login page
    if (!authToken) {
      const callbackUrl = encodeURIComponent(url.href);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
      );
    }
  }

  // Add CORS headers to all responses
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin(origin));
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  return response;
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*']
};

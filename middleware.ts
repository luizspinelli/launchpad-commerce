/**
 * LaunchPad Commerce - Middleware
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Route protection for admin pages
 */

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Get admin token from cookie or header
    const adminToken = request.cookies.get('admin-token')?.value || 
                       request.headers.get('x-admin-token');

    // Compare with env var (should be set in Vercel)
    const validToken = process.env.ADMIN_PASSWORD ? 
      Buffer.from(`admin:${process.env.ADMIN_PASSWORD}`).toString('base64') : 
      null;

    // If no valid token, redirect to login
    if (!adminToken || adminToken !== validToken) {
      if (!pathname.startsWith('/admin/login')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

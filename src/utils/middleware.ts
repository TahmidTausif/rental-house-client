// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = {
  '/dashboard/admin': 'admin',
  '/dashboard/tenant': 'tenant',
  '/dashboard/landlord': 'landlord',
  '/listing/:id/requestBooking': 'tenant',
  '/dashboard/landlord/add-listing': 'landlord',
} as const;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = req.nextUrl

  // Public routes like login, register
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return NextResponse.next()
  }

  // Redirect unauthenticated users
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Role-based protection
  for (const path in protectedRoutes) {
    if (pathname.startsWith(path)) {
      const requiredRole = protectedRoutes[path as keyof typeof protectedRoutes]
      if (token.user?.role !== requiredRole) {
        return NextResponse.redirect(new URL('/unauthorized', req.url)) // Create this page
      }
    }
  }

  return NextResponse.next()
}

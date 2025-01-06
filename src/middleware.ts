import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('Middleware running for path:', request.nextUrl.pathname)
  
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('Session in middleware:', {
    exists: !!session,
    userId: session?.user?.id,
    metadata: session?.user?.user_metadata
  })

  // If accessing admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      console.log('No session, redirecting to signin')
      const redirectUrl = new URL('/auth/signin', request.url)
      redirectUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    const isAdmin = session.user.user_metadata?.is_admin === true
    console.log('Admin check:', {
      isAdmin,
      metadata: session.user.user_metadata
    })

    if (!isAdmin) {
      console.log('User is not admin, redirecting to home')
      return NextResponse.redirect(new URL('/', request.url))
    }

    console.log('Admin access granted')
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/auth/:path*'
  ]
} 
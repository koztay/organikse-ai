import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip middleware for non-protected routes
  if (!request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/settings')) {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/admin') && 
        !user.user_metadata?.is_admin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return res
}

// Only protect specific routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/settings/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|test|companies).)*'
  ]
} 
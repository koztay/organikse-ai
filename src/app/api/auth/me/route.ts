import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return NextResponse.json({
      authenticated: !!session,
      user: session?.user,
      metadata: session?.user?.user_metadata,
      isAdmin: session?.user?.user_metadata?.is_admin === true
    })
  } catch (error) {
    console.error('Error checking user status:', error)
    return NextResponse.json({ error: 'Failed to check user status' }, { status: 500 })
  }
} 
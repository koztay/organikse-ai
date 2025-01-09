import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ isAdmin: false }, { status: 401 })
    }

    const isAdmin = session.user.user_metadata.is_admin === true
    return NextResponse.json({ isAdmin })
  } catch (error) {
    console.error('Error checking admin status:', error)
    return NextResponse.json({ isAdmin: false }, { status: 500 })
  }
} 
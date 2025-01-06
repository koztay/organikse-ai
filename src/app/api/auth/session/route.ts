import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  const { data: { session } } = await supabase.auth.getSession()

  return NextResponse.json({
    session,
    user: session?.user,
    metadata: session?.user?.user_metadata,
    isAdmin: session?.user?.user_metadata?.is_admin
  })
} 
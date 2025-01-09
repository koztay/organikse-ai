import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function PATCH(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name } = await request.json()

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    session.user.id,
    {
      user_metadata: { full_name: name }
    }
  )

  if (error) throw error

  return NextResponse.json(data)
} 
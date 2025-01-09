import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.user?.user_metadata?.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()
    
    if (error) throw error

    // Format the users data before sending
    const formattedUsers = data.users.map(user => ({
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata,
      role: user.role
    }))

    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.user?.user_metadata?.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { email, password, name } = await request.json()

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name }
    })

    if (error) {
      // Check for Supabase's specific email exists error
      if (error.code === 'email_exists' || error.status === 422) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user.user_metadata.is_admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, isAdmin } = await request.json()

    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      { user_metadata: { is_admin: isAdmin } }
    )

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    )
  }
} 
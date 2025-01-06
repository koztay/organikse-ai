import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // First check if user exists
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (usersError) {
      console.error('Error listing users:', usersError)
      throw usersError
    }

    const userExists = users.some(user => user.email?.toLowerCase() === email.toLowerCase())

    if (userExists) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      )
    }

    // Check if this is the first user (will be admin)
    const isFirstUser = users.length === 0
    console.log('Is first user:', isFirstUser, 'Total users:', users.length)

    // Create the user with admin status
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: name,
        is_admin: isFirstUser
      }
    })

    if (error) {
      console.error('Error creating user:', error)
      throw error
    }

    console.log('Created user:', {
      id: data.user.id,
      email: data.user.email,
      metadata: data.user.user_metadata
    })

    // If this is the first user, explicitly update their admin status
    if (isFirstUser) {
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ is_admin: true })
        .eq('id', data.user.id)

      if (updateError) {
        console.error('Error setting admin status:', updateError)
      }
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in signup route:', error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
} 
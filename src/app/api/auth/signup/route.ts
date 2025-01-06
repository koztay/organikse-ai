import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    console.log('Signup attempt for:', email)

    // First check if user exists
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
    const userExists = users.some(user => user.email?.toLowerCase() === email.toLowerCase())
    console.log('User exists:', userExists)

    if (userExists) {
      console.log('Returning 409 - User exists')
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      )
    }

    // If user doesn't exist, try to create
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name }
    })

    if (error) {
      console.error('Supabase create user error:', error)
      return NextResponse.json(
        { error: "Failed to create account. Please try again." },
        { status: 500 }
      )
    }

    console.log('User created successfully')
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in signup route:', error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
} 
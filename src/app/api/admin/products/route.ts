import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user.user_metadata.is_admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("product_tags")
      .select("*")
      .order("name")

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching product tags:", error)
    return NextResponse.json(
      { error: "Failed to fetch product tags" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user.user_metadata.is_admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    const { data: existing } = await supabase
      .from("product_tags")
      .select()
      .ilike("name", name)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "Tag already exists" },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from("product_tags")
      .insert([{ name }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating product tag:", error)
    return NextResponse.json(
      { error: "Failed to create product tag" },
      { status: 500 }
    )
  }
} 
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: company, error } = await supabase
      .from("companies")
      .select(`
        id,
        name,
        email,
        phone,
        location,
        featured,
        company_products (
          product_tag: product_tags (
            id,
            name
          )
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) throw error

    return NextResponse.json(company)
  } catch (error) {
    console.error("Error fetching company:", error)
    return NextResponse.json(
      { error: "Failed to fetch company" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const body = await request.json()

    const { error } = await supabase
      .from("companies")
      .update({
        name: body.name,
        email: body.email,
        phone: body.phone,
        location: body.location,
      })
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating company:", error)
    return NextResponse.json(
      { error: "Failed to update company" },
      { status: 500 }
    )
  }
} 
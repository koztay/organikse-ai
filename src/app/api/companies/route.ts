import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: companies, error } = await supabase
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
      .order('name')

    if (error) throw error

    return NextResponse.json(companies)
  } catch (error) {
    console.error("Error fetching companies:", error)
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    )
  }
} 
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase
      .from("companies")
      .select(`
        *,
        company_products (
          product_tag: product_tags (
            id,
            name
          )
        )
      `)
      .order("name")

    if (error) {
      console.error("Error fetching companies:", error)
      throw error
    }

    // Debug log
    console.log("Companies data:", data)

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error in companies API:", error)
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    )
  }
} 
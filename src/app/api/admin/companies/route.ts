import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user?.user_metadata.is_admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user?.user_metadata.is_admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { product_tags, ...companyData } = body

    // First create the company
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .insert([companyData])
      .select()
      .single()

    if (companyError) throw companyError

    // Then create the product tag relationships
    if (product_tags?.length > 0) {
      const { error: tagsError } = await supabase
        .from("company_products")
        .insert(
          product_tags.map((tagId: string) => ({
            company_id: company.id,
            product_tag_id: tagId
          }))
        )

      if (tagsError) throw tagsError
    }

    return NextResponse.json(company)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    )
  }
} 
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user.user_metadata.is_admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { product_tags, ...companyData } = await request.json()

    // First update company data
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .update(companyData)
      .eq("id", params.id)
      .select()
      .single()

    if (companyError) throw companyError

    // Delete existing product tag relationships
    const { error: deleteError } = await supabase
      .from("company_products")
      .delete()
      .eq("company_id", params.id)

    if (deleteError) throw deleteError

    // Insert new product tag relationships
    if (product_tags?.length > 0) {
      const { error: tagsError } = await supabase
        .from("company_products")
        .insert(
          product_tags.map((tagId: string) => ({
            company_id: params.id,
            product_tag_id: tagId
          }))
        )

      if (tagsError) throw tagsError
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error updating company:', error)
    return NextResponse.json(
      { error: "Failed to update company" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user.user_metadata.is_admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase
      .from("companies")
      .delete()
      .eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    )
  }
} 
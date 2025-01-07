import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { rating, text } = await request.json()

    // Insert the review
    const { data: review, error: reviewError } = await supabase
      .from("reviews")
      .insert([
        {
          company_id: params.id,
          user_id: session.user.id,
          rating,
          text
        }
      ])
      .select(`
        id,
        rating,
        text,
        created_at,
        user_id
      `)
      .single()

    if (reviewError) {
      console.error("Error creating review:", reviewError)
      throw reviewError
    }

    // Get user data
    const { data: userData } = await supabase
      .rpc('get_user_by_id', { user_id: session.user.id })
      .single()

    // Combine review and user data
    const reviewWithUser = {
      ...review,
      users: userData || {
        email: session.user.email,
        user_metadata: session.user.user_metadata
      }
    }

    return NextResponse.json(reviewWithUser)
  } catch (error) {
    console.error("Error in review creation:", error)
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    )
  }
} 
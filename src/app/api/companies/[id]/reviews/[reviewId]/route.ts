import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT(
  request: Request,
  { params }: { params: { id: string, reviewId: string } }
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

    // Update the review
    const { data: review, error: reviewError } = await supabase
      .from("reviews")
      .update({
        rating,
        text,
      })
      .eq('id', params.reviewId)
      .eq('user_id', session.user.id) // Ensure user owns the review
      .select(`
        id,
        rating,
        text,
        created_at,
        user_id
      `)
      .single()

    if (reviewError) {
      console.error("Error updating review:", reviewError)
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
    console.error("Error in review update:", error)
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string, reviewId: string } }
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

    // Delete the review
    const { error: deleteError } = await supabase
      .from("reviews")
      .delete()
      .eq('id', params.reviewId)
      .eq('user_id', session.user.id) // Ensure user owns the review

    if (deleteError) {
      console.error("Error deleting review:", deleteError)
      throw deleteError
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in review deletion:", error)
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    )
  }
} 
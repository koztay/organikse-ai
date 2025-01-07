import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { featured } = await request.json()

    const { error } = await supabase
      .from("companies")
      .update({ featured })
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
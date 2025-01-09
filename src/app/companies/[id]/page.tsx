import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { CompanyDetails } from "@/components/companies/company-details"
import { CompanyReviews } from "@/components/companies/company-reviews"

async function getCompany(id: string) {
  const supabase = createServerComponentClient({ cookies })
  
  try {
    // First get the company details
    const { data: company, error: companyError } = await supabase
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
      .eq("id", id)
      .single()

    if (companyError) {
      console.error("Error fetching company:", companyError)
      return null
    }

    // Then get the reviews
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select(`
        id,
        rating,
        text,
        created_at,
        user_id
      `)
      .eq("company_id", id)
      .order('created_at', { ascending: false })

    if (reviewsError) {
      console.error("Error fetching reviews:", reviewsError)
      return { ...company, reviews: [] }
    }

    // Fetch user data for each review
    const reviewsWithUsers = await Promise.all(
      reviews.map(async (review) => {
        const { data: userData, error: userError } = await supabase
          .rpc('get_user_by_id', { user_id: review.user_id })
          .single()

        if (userError) {
          console.error('Error fetching user data:', userError)
        }
        
        console.log('User data for review:', {
          reviewId: review.id,
          userId: review.user_id,
          userData
        })

        return {
          ...review,
          users: userData || { 
            email: 'Anonymous',
            user_metadata: {}
          }
        }
      })
    )

    return { ...company, reviews: reviewsWithUsers }
  } catch (error) {
    console.error("Error in getCompany:", error)
    return null
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CompanyPage({ params }: { params: { id: string } }) {
  const company = await getCompany(params.id)

  if (!company) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-8">
        <CompanyDetails company={company} />
        <CompanyReviews companyId={company.id} reviews={company.reviews || []} />
      </div>
    </div>
  )
} 
import { FeaturedCompanies } from "@/components/companies/featured-companies"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Company } from "@/types"

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getFeaturedCompanies() {
  const supabase = createServerComponentClient({ cookies })
  
  try {
    const { data: companies, error } = await supabase
      .from("companies")
      .select(`
        id,
        name,
        location,
        featured,
        company_products (
          product_tag: product_tags (
            id,
            name
          )
        )
      `)
      .eq('featured', true)
      .order('name')

    if (error) throw error
    return companies
  } catch (error) {
    console.error("Error fetching featured companies:", error)
    return []
  }
}

export default async function Home() {
  const featuredCompanies = await getFeaturedCompanies()

  return (
    <main className="flex-1">
      <div className="container max-w-7xl py-6">
        {featuredCompanies && featuredCompanies.length > 0 && (
          <FeaturedCompanies companies={featuredCompanies as Company[]} />
        )}
      </div>
    </main>
  )
}
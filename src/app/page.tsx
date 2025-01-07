import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { FeaturedCompanies } from "@/components/companies/featured-companies"
import { Company } from "@/types"

async function getFeaturedCompanies() {
  const supabase = createServerComponentClient({ cookies })
  
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
    .eq('featured', true)
    .order('name')

  if (error) {
    console.error("Error fetching featured companies:", error)
    return []
  }

  return companies
}

export default async function Home() {
  const featuredCompanies = await getFeaturedCompanies()

  return (
    <main className="container max-w-7xl py-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to OrganikSE
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover organic product companies in Sweden
          </p>
        </div>
        
        {featuredCompanies.length > 0 && (
          <FeaturedCompanies companies={featuredCompanies as unknown as Company[]} />
        )}
      </div>
    </main>
  )
}
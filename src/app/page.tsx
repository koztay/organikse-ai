import { FeaturedCompanies } from "@/components/companies/featured-companies"

export default function Home() {
  return (
    <div className="container py-8 space-y-8">
      <section>
        <FeaturedCompanies />
      </section>
    </div>
  )
}
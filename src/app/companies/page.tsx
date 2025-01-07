import { CompanyList } from "@/components/companies/company-list"

export default function CompaniesPage() {
  return (
    <div className="container max-w-7xl py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-base text-muted-foreground mt-1">
            Browse organic product companies in Sweden
          </p>
        </div>
        <CompanyList />
      </div>
    </div>
  )
} 
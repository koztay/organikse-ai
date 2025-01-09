"use client"

import { Badge } from "@/components/ui/badge"

interface CompanyDetailsProps {
  company: {
    id: string
    name: string
    email?: string
    phone?: string
    location: string
    company_products: {
      product_tag: {
        id: string
        name: string
      } | null
    }[]
  }
}

export function CompanyDetails({ company }: CompanyDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{company.name}</h1>
        <p className="text-lg text-muted-foreground mt-2">{company.location}</p>
      </div>

      <div className="space-y-2">
        {company.email && (
          <p className="text-sm">
            <span className="font-medium">Email:</span> {company.email}
          </p>
        )}
        {company.phone && (
          <p className="text-sm">
            <span className="font-medium">Phone:</span> {company.phone}
          </p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <div className="flex flex-wrap gap-2">
          {company.company_products
            .filter(cp => cp.product_tag !== null)
            .map(cp => (
              <Badge
                key={cp.product_tag?.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {cp.product_tag?.name}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  )
} 
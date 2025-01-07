"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { StarIcon } from "lucide-react"

interface Company {
  id: string
  name: string
  location: string
  company_products: {
    product_tag: {
      id: string
      name: string
    }
  }[]
}

interface FeaturedCompaniesProps {
  companies: Company[]
}

export function FeaturedCompanies({ companies }: FeaturedCompaniesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <StarIcon className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Featured Companies</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <Link key={company.id} href={`/companies/${company.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {company.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  {company.company_products.map(({ product_tag }) => (
                    <Badge key={product_tag.id} variant="secondary">
                      {product_tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Company {
  id: string
  name: string
  location: string
  featured: boolean
  company_products: {
    product_tag: {
      id: string
      name: string
    } | null
  }[]
}

export function FeaturedCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    async function fetchCompanies() {
      const response = await fetch('/api/companies')
      const data = await response.json()
      setCompanies(data.filter((company: Company) => company.featured))
    }
    fetchCompanies()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <Card key={company.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/companies/${company.id}`}>{company.name}</Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{company.location}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {company.company_products
                .filter(cp => cp.product_tag !== null)
                .map(cp => (
                  <Badge key={cp.product_tag?.id} variant="secondary">
                    {cp.product_tag?.name}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 
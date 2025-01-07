import Link from "next/link"
import { Company } from "@/types/database.types"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Building2, Mail, Phone } from "lucide-react"

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <Link href={`/companies/${company.id}`}>
        <CardHeader>
          <h3 className="text-xl font-semibold tracking-tight">{company.name}</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Building2 className="h-4 w-4 shrink-0" />
              <span className="text-sm">{company.address}</span>
            </div>
            {company.phone && (
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span className="text-sm">{company.phone}</span>
              </div>
            )}
            {company.email && (
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="text-sm truncate">{company.email}</span>
              </div>
            )}
          </div>
          {company.company_products && company.company_products.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-wrap gap-2">
                {company.company_products.map((cp) => (
                  <span
                    key={cp.product_tag.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {cp.product_tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  )
} 
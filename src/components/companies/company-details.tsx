import { Company } from "@/types/database.types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Building2, Mail, Phone, Globe, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CompanyDetailsProps {
  company: Company
}

export function CompanyDetails({ company }: CompanyDetailsProps) {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{company.address}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {company.social_links?.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={company.social_links.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
          </div>
        </div>

        {company.company_products && company.company_products.length > 0 && (
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
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {company.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href={`tel:${company.phone}`} className="hover:text-foreground">
                {company.phone}
              </a>
            </div>
          )}
          {company.email && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${company.email}`} className="hover:text-foreground">
                {company.email}
              </a>
            </div>
          )}
        </div>

        {company.description && (
          <div className="pt-4 border-t">
            <h2 className="font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">{company.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 
"use client"

import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Star, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Company } from "@/types"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function AdminCompaniesPage() {
  const { toast } = useToast()
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch('/api/companies')
      const data = await response.json()
      setCompanies(data)
    }
    fetchCompanies()
  }, [])

  const handleToggleFeatured = async (company: Company) => {
    try {
      const response = await fetch(`/api/companies/${company.id}/featured`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !company.featured })
      })

      if (!response.ok) throw new Error()

      toast({
        title: "Success",
        description: `${company.name} is ${!company.featured ? 'now' : 'no longer'} featured`,
      })

      window.location.reload()
    } catch {
      toast({
        title: "Error",
        description: "Could not update featured status",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCompany = async (id: string) => {
    try {
      const response = await fetch(`/api/companies/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error()

      toast({
        title: "Success",
        description: "Company deleted successfully",
      })

      window.location.reload()
    } catch {
      toast({
        title: "Error",
        description: "Could not delete company",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Button asChild>
          <Link href="/admin/companies/new">Add Company</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies?.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {company.company_products?.map(({ product_tag }) => (
                      <Badge 
                        key={product_tag.id} 
                        variant="secondary"
                        className="text-xs"
                      >
                        {product_tag.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFeatured(company)}
                    >
                      <Star 
                        className={`h-4 w-4 ${company.featured ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={`/admin/companies/${company.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCompany(company.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 
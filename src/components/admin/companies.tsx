"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Company } from "@/types/database.types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CompanyProductTags } from "./company-product-tags"

export function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    social_links: {
      instagram: "",
      twitter: "",
      facebook: "",
    },
    product_tags: [] as string[]
  })
  const { toast } = useToast()

  const loadCompanies = async () => {
    try {
      const response = await fetch("/api/admin/companies")
      if (!response.ok) throw new Error("Failed to load companies")
      const data = await response.json()
      setCompanies(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load companies"
      })
    }
  }

  useEffect(() => {
    loadCompanies()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/companies" + (editingCompany ? `/${editingCompany.id}` : ""), {
        method: editingCompany ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save company")
      }

      setIsOpen(false)
      loadCompanies()
      toast({
        title: "Success",
        description: `Company ${editingCompany ? "updated" : "created"} successfully`
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save company"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (company: Company) => {
    setEditingCompany(company)
    setFormData({
      name: company.name,
      address: company.address,
      phone: company.phone,
      email: company.email,
      social_links: {
        instagram: company.social_links?.instagram ?? "",
        twitter: company.social_links?.twitter ?? "",
        facebook: company.social_links?.facebook ?? "",
      },
      product_tags: company.company_products?.map(cp => cp.product_tag.id) || []
    })
    setSelectedTags(company.company_products?.map(cp => cp.product_tag.id) || [])
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return

    try {
      const response = await fetch(`/api/admin/companies/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete company")

      loadCompanies()
      toast({
        title: "Success",
        description: "Company deleted successfully"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete company"
      })
    }
  }

  const handleDialogOpen = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setEditingCompany(null)
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        social_links: {
          instagram: "",
          twitter: "",
          facebook: "",
        },
        product_tags: []
      })
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingCompany ? "Edit Company" : "Add New Company"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Company name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Instagram URL"
                  value={formData.social_links.instagram}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    social_links: { ...prev.social_links, instagram: e.target.value }
                  }))}
                />
                <Input
                  placeholder="Twitter URL"
                  value={formData.social_links.twitter}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    social_links: { ...prev.social_links, twitter: e.target.value }
                  }))}
                />
                <Input
                  placeholder="Facebook URL"
                  value={formData.social_links.facebook}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    social_links: { ...prev.social_links, facebook: e.target.value }
                  }))}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Tags</label>
                  <div className="border rounded-lg p-4 bg-background">
                    <CompanyProductTags
                      selectedTags={selectedTags}
                      onChange={(tags) => {
                        setSelectedTags(tags)
                        setFormData(prev => ({ ...prev, product_tags: tags }))
                      }}
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : (editingCompany ? "Update" : "Create")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

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
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.email}</TableCell>
              <TableCell>{company.phone}</TableCell>
              <TableCell>{company.address}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {company.company_products?.map((cp: any) => (
                    <span
                      key={cp.product_tag.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary"
                    >
                      {cp.product_tag.name}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(company)}
                >
                  <Pencil className="h-4 w-4 text-blue-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(company.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 
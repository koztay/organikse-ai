"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { CompanyForm } from "@/components/companies/company-form"
import { Company } from "@/types"

export default function EditCompanyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [company, setCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await fetch(`/api/companies/${params.id}`)
      const data = await response.json()
      setCompany(data)
    }
    fetchCompany()
  }, [params.id])

  const handleSubmit = async (data: Partial<Company>) => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/companies/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error()

      toast({
        title: "Success",
        description: "Company updated successfully",
      })

      router.push('/admin/companies')
    } catch {
      toast({
        title: "Error",
        description: "Could not update company",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!company) return <div>Loading...</div>

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Company</h1>
      <CompanyForm 
        company={company} 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
      />
    </div>
  )
} 
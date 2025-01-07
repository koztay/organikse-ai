"use client"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { CompanyForm } from "@/components/companies/company-form"
import { Company } from "@/types"
import { useState } from "react"

export default function NewCompanyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: Partial<Company>) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error()

      toast({
        title: "Success",
        description: "Company created successfully",
      })

      router.push('/admin/companies')
    } catch {
      toast({
        title: "Error",
        description: "Could not create company",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Add Company</h1>
      <CompanyForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
} 
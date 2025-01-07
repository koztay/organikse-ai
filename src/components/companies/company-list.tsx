"use client"

import { useEffect, useState } from "react"
import { Company } from "@/types/database.types"
import { CompanyCard } from "./company-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCompanies() {
      try {
        const response = await fetch("/api/companies")
        if (!response.ok) throw new Error("Failed to load companies")
        const data = await response.json()
        console.log("Loaded companies:", data) // Debug log
        setCompanies(data)
      } catch (error) {
        console.error("Error loading companies:", error)
        setError("Failed to load companies")
      } finally {
        setIsLoading(false)
      }
    }

    loadCompanies()
  }, [])

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            className="pl-10 h-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="h-[200px] rounded-lg bg-muted/60 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  )
} 
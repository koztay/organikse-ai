import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Company } from "@/types"
import { useRouter } from "next/navigation"

interface CompanyFormProps {
  company?: Partial<Company>
  onSubmit: (data: Partial<Company>) => Promise<void>
  isLoading: boolean
}

export function CompanyForm({ company, onSubmit, isLoading }: CompanyFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Company>>({
    name: company?.name || "",
    email: company?.email || "",
    phone: company?.phone || "",
    location: company?.location || "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Phone</label>
        <Input
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Location</label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : company ? "Save Changes" : "Add Company"}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push('/admin/companies')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
} 
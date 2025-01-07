import { Companies } from "@components/admin/companies"

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Companies</h1>
      </div>
      <div className="border rounded-lg bg-card">
        <Companies />
      </div>
    </div>
  )
} 
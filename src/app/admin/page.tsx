import { ProductTags } from "@/components/admin/product-tags"

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Tags</h1>
      </div>
      <div className="border rounded-lg bg-card">
        <ProductTags />
      </div>
    </div>
  )
} 
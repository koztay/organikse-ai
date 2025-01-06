import { ProductTags } from "@/components/admin/product-tags"

export default function ProductTagsPage() {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Tags</h1>
      </div>
      <ProductTags />
    </div>
  )
} 
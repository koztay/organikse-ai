"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductTag {
  id: string
  name: string
}

interface CompanyProductTagsProps {
  selectedTags: string[]
  onChange: (tags: string[]) => void
}

export function CompanyProductTags({ selectedTags, onChange }: CompanyProductTagsProps) {
  const [tags, setTags] = useState<ProductTag[]>([])

  useEffect(() => {
    const loadTags = async () => {
      try {
        const response = await fetch("/api/admin/products/tags")
        if (!response.ok) throw new Error("Failed to load tags")
        const data = await response.json()
        setTags(data)
      } catch (error) {
        console.error("Failed to load product tags:", error)
      }
    }
    loadTags()
  }, [])

  const toggleTag = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId]
    onChange(newTags)
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background/50 min-h-[80px]">
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggleTag(tag.id)}
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
              selectedTags.includes(tag.id)
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            {tag.name}
            {selectedTags.includes(tag.id) && (
              <Check className="ml-2 h-4 w-4" />
            )}
          </button>
        ))}
        {tags.length === 0 && (
          <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
            Loading product tags...
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground">
        Click tags to select/deselect them
      </div>
    </div>
  )
} 
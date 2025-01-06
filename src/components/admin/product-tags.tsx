"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProductTag {
  id: string
  name: string
}

export function ProductTags() {
  const [tags, setTags] = useState<ProductTag[]>([])
  const [newTag, setNewTag] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loadTags = async () => {
    try {
      const response = await fetch("/api/admin/products")
      if (!response.ok) {
        throw new Error("Failed to load tags")
      }
      const data = await response.json()
      setTags(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load product tags"
      })
    }
  }

  useEffect(() => {
    loadTags()
  }, []) // Load tags when component mounts

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTag.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create tag")
      }

      setNewTag("")
      setIsOpen(false)
      loadTags()
      toast({
        title: "Success",
        description: "Product tag created successfully"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create product tag"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete tag")
      }

      loadTags()
      toast({
        title: "Success",
        description: "Product tag deleted successfully"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product tag"
      })
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product Tag</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Tag"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <span>{tag.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(tag.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
} 
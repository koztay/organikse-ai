"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
}

export function StarRating({ value, onChange, readonly }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={cn(
            "text-muted-foreground hover:text-primary transition-colors",
            star <= value && "text-primary",
            readonly && "cursor-default hover:text-primary"
          )}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
        >
          <Star className="h-5 w-5 fill-current" />
        </button>
      ))}
    </div>
  )
} 
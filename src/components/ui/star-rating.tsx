"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
}

export function StarRating({ value, onChange, readonly }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className={cn(
            "rounded-md p-1 hover:scale-110 transition-transform",
            readonly && "cursor-default hover:scale-100"
          )}
          onClick={() => !readonly && onChange?.(rating)}
        >
          <Star
            className={cn(
              "h-5 w-5",
              rating <= value
                ? "fill-primary text-primary"
                : "fill-muted stroke-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  )
} 
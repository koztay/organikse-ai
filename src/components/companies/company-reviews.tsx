"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@components/ui/star-rating"
import { Textarea } from "@components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"


interface Review {
  id: string
  rating: number
  text?: string
  created_at: string
  users: {
    id: string
    email: string
    user_metadata: {
      name?: string
    }
  }
}

interface CompanyReviewsProps {
  companyId: string
  reviews: Review[]
}

export function CompanyReviews({ companyId, reviews }: CompanyReviewsProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [newReview, setNewReview] = useState({ rating: 0, text: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitReview = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to leave a review",
        variant: "destructive",
      })
      return
    }

    if (newReview.rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/companies/${companyId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      })

      if (!response.ok) throw new Error("Failed to submit review")

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      })

      // Reset form and reload page to show new review
      setNewReview({ rating: 0, text: "" })
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {session && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Rating</label>
              <StarRating
                value={newReview.rating}
                onChange={(rating) => setNewReview({ ...newReview, rating })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Review</label>
              <Textarea
                placeholder="Write your review here..."
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              />
            </div>
            <Button 
              onClick={handleSubmitReview} 
              disabled={isSubmitting}
            >
              Submit Review
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <StarRating value={review.rating} readonly />
                  <p className="text-sm font-medium mt-1">
                    {review.users.user_metadata.name || review.users.email}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                </p>
              </div>
              {review.text && (
                <p className="mt-2 text-muted-foreground">{review.text}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
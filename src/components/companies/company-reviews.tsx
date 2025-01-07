"use client"

import { useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@components/ui/star-rating"
import { Textarea } from "@components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"
import { maskEmail } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Pencil, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
  const [editingReview, setEditingReview] = useState<Review | null>(null)

  // Find user's review if it exists
  const userReview = useMemo(() => {
    if (!session?.user?.email) return null
    return reviews.find(review => review.users.email === session.user.email)
  }, [reviews, session?.user?.email])

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
      const response = await fetch(`/api/companies/${companyId}/reviews${editingReview ? `/${editingReview.id}` : ''}`, {
        method: editingReview ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      })

      if (!response.ok) throw new Error("Failed to submit review")

      toast({
        title: editingReview ? "Review updated" : "Review submitted",
        description: "Thank you for your feedback!",
      })

      setEditingReview(null)
      setNewReview({ rating: 0, text: "" })
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingReview ? 'update' : 'submit'} review. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditReview = (review: Review) => {
    setEditingReview(review)
    setNewReview({
      rating: review.rating,
      text: review.text || ""
    })
  }

  const handleCancelEdit = () => {
    setEditingReview(null)
    setNewReview({ rating: 0, text: "" })
  }

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/companies/${companyId}/reviews/${reviewId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete review")

      toast({
        title: "Review deleted",
        description: "Your review has been deleted successfully.",
      })

      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {session && (editingReview || !userReview) && (
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
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmitReview} 
                disabled={isSubmitting}
              >
                {editingReview ? 'Update Review' : 'Submit Review'}
              </Button>
              {editingReview && (
                <Button 
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <StarRating value={review.rating} readonly />
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-medium">
                      {review.users.user_metadata?.name || maskEmail(review.users.email)}
                    </p>
                    {session?.user?.email === review.users.email && !editingReview && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditReview(review)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Review</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete your review? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteReview(review.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>
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
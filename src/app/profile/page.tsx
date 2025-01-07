"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    created_at: "",
    last_sign_in_at: ""
  })

  // Load user data
  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
        return
      }
      setFormData({
        full_name: user.user_metadata.full_name || "",
        email: user.email || "",
        created_at: user.created_at ?? "",
        last_sign_in_at: user.last_sign_in_at ?? ""
      })
    }
    loadUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { user }, error } = await supabase.auth.updateUser({
        data: { full_name: formData.full_name }
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      })
      
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-2xl py-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="p-4 bg-card rounded-lg border space-y-4">
          <h2 className="font-medium mb-2">Personal Information</h2>
          
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              value={formData.email}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>

          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="font-medium mb-2">Account Details</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Account created:</span>{' '}
              {new Date(formData.created_at || '').toLocaleDateString()}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Last sign in:</span>{' '}
              {new Date(formData.last_sign_in_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
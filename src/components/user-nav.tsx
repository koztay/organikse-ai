"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function UserNav({ session }: { session: any }) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <UserCircle className="h-5 w-5 text-green-600" />
          <span className="hidden sm:inline-block">
            {session?.user?.user_metadata?.full_name || 'Account'}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session ? (
          <>
            {session.user.user_metadata.is_admin && (
              <DropdownMenuItem onClick={() => router.push('/admin')}>
                Admin Dashboard
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => router.push('/auth/signin')}>
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export function UserNav() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          type="button"
          variant="outline" 
          className="relative h-9 px-4 flex items-center gap-2"
        >
          <UserCircle className="h-5 w-5 text-green-600" />
          <span className="hidden sm:inline-block">
            {session ? (session.user.name || 'Account') : 'Sign In'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {session ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user.name || session.user.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
            >
              <span className="text-red-600">Sign out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href="/auth/signin" className="w-full text-green-600">
                Sign in
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth/signup" className="w-full text-gray-600">
                Create account
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
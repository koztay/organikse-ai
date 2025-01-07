"use client"

import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { Session } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User } from "@supabase/auth-helpers-nextjs"

interface NavbarProps {
  user: User | null
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="font-bold">
          OrganikSE
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  Account
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                {user.user_metadata?.is_admin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <form action="/auth/signout" method="post">
                    <button className="w-full text-left">Sign Out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
} 
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
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <UserCircle className="h-6 w-6 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {session ? (
              <p className="text-sm font-medium leading-none">{session.user.name || session.user.email}</p>
            ) : (
              <p className="text-sm font-medium leading-none">Account</p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session ? (
          <DropdownMenuItem
            className="text-red-600 cursor-pointer"
            onClick={() => signOut()}
          >
            Sign out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/auth/signin" className="text-green-600 cursor-pointer">
              Sign in
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
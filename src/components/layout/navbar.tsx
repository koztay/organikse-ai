"use client"

import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { Session } from "@supabase/auth-helpers-nextjs"

export function Navbar({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="font-bold">
          OrganikSE
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <UserNav session={session} />
          </nav>
        </div>
      </div>
    </header>
  )
} 
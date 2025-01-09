"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"

export function Navbar() {
  const [session, setSession] = useState<Session | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
    }
    getSession()
  }, [supabase.auth])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="font-bold">
            OrganikSE
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/companies"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Companies
            </Link>
            <UserNav session={session} />
          </nav>
        </div>
      </div>
    </header>
  )
} 
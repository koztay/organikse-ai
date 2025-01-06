"use client"

import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { cn } from "@/lib/utils"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="hidden font-bold text-foreground sm:inline-block"
            >
              OrganikSE
            </Link>
            <Link 
              href="/products" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Products
            </Link>
            <Link 
              href="/companies"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Companies
            </Link>
          </nav>
          <UserNav />
        </div>
      </div>
    </header>
  )
} 
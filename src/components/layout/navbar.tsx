import Link from "next/link"
import { UserNav } from "@/components/user-nav"

export function Navbar() {
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 container mx-auto max-w-7xl">
        <Link href="/" className="font-bold text-2xl text-green-600 mr-6">
          OrganikSE
        </Link>
        <nav className="flex items-center space-x-6 mx-6">
          <Link
            href="/companies"
            className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
          >
            Companies
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
          >
            Products
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  )
} 
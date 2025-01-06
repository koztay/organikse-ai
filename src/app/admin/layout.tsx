"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  // Check for both authentication and admin status
  if (!session?.user || !session.user.isAdmin) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-green-600">Admin Panel</h2>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            <li>
              <a href="/admin" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/companies" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Companies
              </a>
            </li>
            <li>
              <a href="/admin/products" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Products
              </a>
            </li>
            <li>
              <a href="/admin/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Users
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  )
} 
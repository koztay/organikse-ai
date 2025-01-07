import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Package2, Users, Building2 } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      redirect('/auth/signin')
    }

    const isAdmin = user.user_metadata?.is_admin === true
    if (!isAdmin) {
      redirect('/')
    }

    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-muted/40 border-r">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>
          <nav className="px-4 py-2 space-y-2">
            <Link 
              href="/admin/products" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted"
            >
              <Package2 className="h-4 w-4" />
              Products
            </Link>
            <Link 
              href="/admin/companies" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted"
            >
              <Building2 className="h-4 w-4" />
              Companies
            </Link>
            <Link 
              href="/admin/users" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Admin layout error:', error)
    redirect('/auth/signin')
  }
} 
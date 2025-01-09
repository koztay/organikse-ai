import { Inter } from "next/font/google"
import "./globals.css"
import { NavbarWrapper } from "@/components/layout/navbar-wrapper"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import SupabaseProvider from "@/components/providers/supabase-provider"

const inter = Inter({ subsets: ["latin"] })

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <div className="relative flex min-h-screen flex-col">
              <NavbarWrapper />
              {children}
              <Footer />
            </div>
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
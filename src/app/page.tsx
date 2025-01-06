import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to OrganikSE
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Your trusted directory for organic products in Sweden
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/products">
                <Button className="gap-2">
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Organic Products
              </h3>
              <p className="text-sm text-muted-foreground">
                Discover certified organic products from trusted Swedish producers.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Local Companies
              </h3>
              <p className="text-sm text-muted-foreground">
                Support local businesses committed to organic production.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Quality Assurance
              </h3>
              <p className="text-sm text-muted-foreground">
                All listed products meet strict organic certification standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Ready to explore?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                Join our growing community of organic enthusiasts and producers.
              </p>
            </div>
            <Link href="/auth/signup">
              <Button variant="outline" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
} 
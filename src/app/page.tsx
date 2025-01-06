import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Leaf, Shield, Store } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const benefits = [
    {
      title: "Eco-Friendly",
      description: "Support sustainable and environmentally conscious businesses",
      icon: Leaf,
    },
    {
      title: "Quality Assured",
      description: "All listed companies meet strict organic standards",
      icon: Shield,
    },
    {
      title: "Local Business",
      description: "Connect with organic producers in your area",
      icon: Store,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Discover Organic Products in Sweden
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect with local organic producers and sellers. Support sustainable businesses
            while making healthier choices.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/companies">
                Browse Companies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Organic?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-2 border-green-100">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
                    <benefit.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-24 bg-green-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Companies
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Featured companies will be displayed here
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
} 
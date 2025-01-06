"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Leaf, Search, Shield } from "lucide-react"

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Find Organic Products in{" "}
          <span className="text-green-600 dark:text-green-500">Sweden</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Discover and connect with trusted organic product companies. Your gateway to sustainable and healthy choices.
        </p>
        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/products">
              Browse Products <Search className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/companies">
              View Companies <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        <div className="flex flex-col items-center space-y-2 p-6 border rounded-lg">
          <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
            <Leaf className="h-6 w-6 text-green-600 dark:text-green-500" />
          </div>
          <h2 className="text-xl font-bold">Certified Organic</h2>
          <p className="text-center text-gray-500 dark:text-gray-400">
            All listed products meet strict organic certification standards
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 p-6 border rounded-lg">
          <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
            <Search className="h-6 w-6 text-green-600 dark:text-green-500" />
          </div>
          <h2 className="text-xl font-bold">Easy Discovery</h2>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Find the organic products you need with our intuitive search
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 p-6 border rounded-lg">
          <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-500" />
          </div>
          <h2 className="text-xl font-bold">Trusted Sources</h2>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Connect with verified organic product companies in Sweden
          </p>
        </div>
      </div>
    </div>
  )
} 
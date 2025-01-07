import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CatchAll() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/" replace>
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 
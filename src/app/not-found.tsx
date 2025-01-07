export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="text-3xl font-semibold">
          Page Not Found
        </h2>
        <div>
          <a 
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
} 
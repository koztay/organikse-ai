import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600">OrganikSE</h3>
            <p className="text-sm text-gray-600">
              Connecting you with organic products and sustainable businesses in Sweden.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/companies" className="text-sm text-gray-600 hover:text-green-600">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-green-600">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-green-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-green-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email: contact@organikse.com
              </li>
              <li className="text-sm text-gray-600">
                Stockholm, Sweden
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} OrganikSE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 
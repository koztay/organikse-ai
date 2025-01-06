import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">OrganikSE</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Connecting you with organic products and sustainable businesses in Sweden. 
              Making healthier choices easier for everyone.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/companies" 
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-green-600" />
                contact@organikse.com
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-green-600" />
                Stockholm, Sweden
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} OrganikSE. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="/sitemap" 
                className="text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                Sitemap
              </Link>
              <Link 
                href="/accessibility" 
                className="text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 
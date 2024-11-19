import { Keyboard } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-6">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center sm:items-start">
            <p className="mt-1 max-w-sm text-center text-sm text-gray-600 dark:text-gray-400 sm:text-left">
              Empowering developers to code faster and more efficiently.
            </p>
          </div>

          <div className="flex flex-col justify-center sm:items-end">
            <nav className="flex gap-8">
              <Link
                to="/features"
                className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                Features
              </Link>
              <Link
                to="/#about"
                className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                About
              </Link>
              <Link
                to="/demo"
                className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                Demo
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-2 border-t border-gray-200 pt-4 dark:border-gray-800">
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            © 2024 Swift Key. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

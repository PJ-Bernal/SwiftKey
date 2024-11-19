import { useState } from 'react'
import { Keyboard, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Keyboard className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
            Swift Key
          </span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/#about">About</NavLink>
        </nav>
        <div className="hidden md:block">
          <Link to="/mode">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700">
              Get Started
            </Button>
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/#about">About</NavLink>
            <Link to="/mode">
              <Button className="w-full max-w-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
    >
      {children}
    </Link>
  )
}

export default NavBar

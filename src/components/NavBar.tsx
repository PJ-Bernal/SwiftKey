import { Keyboard } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NavBar() {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <div className="flex items-center justify-center">
        <Keyboard className="h-6 w-6 text-primary" />
        <Link to="/">
          <span className="ml-2 text-lg font-bold">Swift Key</span>
        </Link>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link to="/features">
          <div className="text-sm font-medium underline-offset-4 hover:underline">
            Features
          </div>
        </Link>
        <Link to="/contact">
          <div className="text-sm font-medium underline-offset-4 hover:underline">
            Contact
          </div>
        </Link>
      </nav>
    </header>
  )
}

export default NavBar

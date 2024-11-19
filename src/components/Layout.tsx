import { ReactNode } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 transition-colors duration-500 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <NavBar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout

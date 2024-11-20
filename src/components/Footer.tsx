export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-6">
        <div className="grid gap-8 sm:grid-cols-2">
          <p className="mt-1 max-w-sm text-center text-sm text-gray-600 dark:text-gray-400 sm:text-left">
            Empowering developers to code faster and more efficiently.
          </p>

          <p className="my-1 ml-auto text-center text-xs text-gray-600 dark:text-gray-400">
            © 2024 Swift Key. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

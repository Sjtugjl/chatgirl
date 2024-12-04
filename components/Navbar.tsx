import Link from 'next/link'

export default function Navbar({ showLogin = true }) {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text cursor-pointer">
              AI Chat
            </span>
          </Link>
        </div>
        {showLogin && (
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              登录
            </button>
          </div>
        )}
      </div>
    </nav>
  )
} 
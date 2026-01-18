import Link from 'next/link'
import { Code2, Download } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-anthropic-600" />
              <span className="text-xl font-bold text-gray-900">
                Awesome <span className="text-anthropic-600">Resume</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-anthropic-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                首页
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-anthropic-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                关于
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="purple-button flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">下载模板</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

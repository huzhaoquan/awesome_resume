import Link from 'next/link'
import { headers } from 'next/headers'
import { Code2, Download, LogIn } from 'lucide-react'
import { auth } from '@/lib/auth/server'
import { UserMenu } from '@/components/user-menu'

export default async function Navbar() {
  // 读取会话：未登录显示"登录"入口，已登录显示头像菜单
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <nav className="sticky top-0 z-50 bg-anthropic-50/80 backdrop-blur-md border-b border-anthropic-200 shadow-sm">
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
            {session?.user ? (
              <UserMenu
                user={{
                  name: session.user.name,
                  email: session.user.email,
                  image: session.user.image,
                }}
              />
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-1.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-anthropic-600"
              >
                <LogIn className="h-4 w-4" />
                <span>登录</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

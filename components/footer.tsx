import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-gray-900">
                Awesome <span className="text-anthropic-600">Resume</span>
              </span>
            </div>
            <p className="text-gray-600 max-w-md mb-4">
              为技术从业者精心设计的简历模板网站，帮助您快速创建专业的技术简历，展现最佳的职业形象。
            </p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>&copy; 2025 Awesome Resume</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              简历模板
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?category=software" className="text-gray-600 hover:text-anthropic-600 text-sm transition-colors">
                  软件工程师
                </Link>
              </li>
              <li>
                <Link href="/?category=frontend" className="text-gray-600 hover:text-anthropic-600 text-sm transition-colors">
                  前端工程师
                </Link>
              </li>
              <li>
                <Link href="/?category=backend" className="text-gray-600 hover:text-anthropic-600 text-sm transition-colors">
                  后端工程师
                </Link>
              </li>
              <li>
                <Link href="/?category=fullstack" className="text-gray-600 hover:text-anthropic-600 text-sm transition-colors">
                  全栈工程师
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              产品
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-anthropic-600 text-sm transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-anthropic-600 text-sm transition-colors">
                  使用指南
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-anthropic-600 text-sm transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              由技术社区驱动构建
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-anthropic-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-anthropic-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-anthropic-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

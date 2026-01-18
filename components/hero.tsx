import Link from 'next/link'
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-anthropic-100 text-anthropic-700 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                专为技术人员打造
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              用
              <span className="gradient-text block lg:inline ml-2">
                专业
              </span>
              <span className="block mt-2">
                简历打开职业之门
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              专为软件工程师、产品经理、数据科学家等技术岗位设计的高质量简历模板，
              让您的技术实力一目了然，在众多候选人中脱颖而出。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="#templates"
                className="purple-button inline-flex items-center justify-center"
              >
                <span>浏览模板</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <Users className="w-5 h-5 mr-2" />
                了解更多
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-anthropic-600">8+</div>
                <div className="text-sm text-gray-600">专业模板</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-anthropic-600">500+</div>
                <div className="text-sm text-gray-600">成功案例</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-anthropic-600">10+</div>
                <div className="text-sm text-gray-600">覆盖岗位</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-anthropic-400 to-anthropic-600 rounded-2xl transform rotate-3 scale-105 opacity-10"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="absolute top-4 right-4">
                <Zap className="w-8 h-8 text-anthropic-500 opacity-60" />
              </div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-anthropic-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">技术栈</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-anthropic-100 text-anthropic-700 text-xs font-medium rounded-full">React</span>
                  <span className="px-3 py-1 bg-anthropic-100 text-anthropic-700 text-xs font-medium rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-anthropic-100 text-anthropic-700 text-xs font-medium rounded-full">Node.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

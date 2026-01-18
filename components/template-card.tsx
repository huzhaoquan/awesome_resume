'use client'

import Link from 'next/link'
import { ExternalLink, Star, Download, Heart } from 'lucide-react'
import { ResumeTemplate } from '@/types/resume'

interface TemplateCardProps {
  template: ResumeTemplate
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-anthropic-300">
      <div className="relative">
        <div className="bg-gray-100 h-64 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="bg-gradient-to-br from-anthropic-100 to-anthropic-200 rounded-lg p-8 mb-4">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-lg font-bold text-anthropic-700">{template.name}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-anthropic-700 transition-colors duration-200">
              {template.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{template.targetRole}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {template.description}
        </p>

        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">技术亮点</div>
          <div className="flex flex-wrap gap-2">
            {template.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-anthropic-50 text-anthropic-700 text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {template.features.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{template.features.length - 2}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Download className="w-3 h-3 mr-1" />
            <span>856</span>
          </div>
          <Link
            href={`/templates/${template.id}`}
            className="inline-flex items-center text-anthropic-600 hover:text-anthropic-700 text-sm font-medium"
          >
            <span>查看详情</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import TemplateCard from './template-card'
import { ResumeTemplate, TemplateCategory } from '@/types/resume'

interface TemplateGridProps {
  templates: ResumeTemplate[]
  categories: TemplateCategory[]
  selectedCategory?: string
}

export default function TemplateGrid({ templates, categories, selectedCategory = 'all' }: TemplateGridProps) {
  const [category, setCategory] = useState(selectedCategory)

  const filteredTemplates = category === 'all'
    ? templates
    : templates.filter(t => t.category === category)

  if (!filteredTemplates || filteredTemplates.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无匹配模板</h3>
          <p className="text-gray-600">该分类下暂无简历模板，请尝试其他分类。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-anthropic-900 mb-4 font-serif">
          精选简历模板
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          每个模板都经过精心设计，为您的专业背景提供最佳的展示方式
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={[
              'px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 transform',
              category === cat.id
                ? 'bg-anthropic-600 text-white shadow-luxury scale-105'
                : 'bg-anthropic-100 text-anthropic-800 hover:bg-anthropic-200 hover:scale-105'
            ].join(' ')}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { ArrowLeft, Download, Star, Calendar, Heart, Share2, Edit, Eye } from 'lucide-react'
import Link from 'next/link'
import { ResumeEditorProvider } from '@/contexts/resume-editor-context'
import { ResumeEditor } from '@/components/editor/resume-editor'
import { ResumeData } from '@/types/resume'
import { sampleAnthropicResume } from '@/components/templates/anthropic'
import { AnthropicTemplate } from '@/components/templates/anthropic'

interface TemplateDetailContentProps {
  template: {
    id: string
    name: string
    targetRole: string
    description: string
    features: string[]
    techStack: string[]
  }
}

export function TemplateDetailContent({ template }: TemplateDetailContentProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>(sampleAnthropicResume)

  const handleExportPDF = useCallback(async () => {
    // TODO: Implement PDF export using html2canvas + jsPDF
    console.log('Exporting to PDF...')
  }, [])

  const handleDownload = useCallback(() => {
    // For now, just show an alert
    alert('下载功能即将推出！')
  }, [])

  return (
    <ResumeEditorProvider initialResumeData={resumeData}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-anthropic-600 hover:text-anthropic-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {isEditMode ? (
                  <div className="h-full">
                    <ResumeEditor
                      templateId={template.id}
                      onExportPDF={handleExportPDF}
                    />
                  </div>
                ) : (
                  <div className="max-h-[800px] overflow-y-auto">
                    {template.id === 'anthropic-style' ? (
                      <AnthropicTemplate data={resumeData} />
                    ) : (
                      <div className="h-96 bg-gray-100 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="bg-gradient-to-br from-anthropic-100 to-anthropic-200 rounded-xl p-12 mb-4">
                            <div className="text-6xl mb-4">📝</div>
                            <div className="text-2xl font-bold text-anthropic-700">
                              {template.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sticky top-24">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {template.name}
                  </h1>
                  <p className="text-gray-600">{template.targetRole}</p>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">1.86</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="w-4 h-4 mr-1" />
                    <span>854 次下载</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{template.description}</p>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">模板亮点</h3>
                  <ul className="space-y-2">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-anthropic-600 mr-2">✓</span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">适用技术栈</h3>
                  <div className="flex flex-wrap gap-2">
                    {template.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-anthropic-100 text-anthropic-700 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="w-full purple-button flex items-center justify-center"
                  >
                    {isEditMode ? (
                      <>
                        <Eye className="w-5 h-5 mr-2" />
                        退出编辑
                      </>
                    ) : (
                      <>
                        <Edit className="w-5 h-5 mr-2" />
                        在线编辑
                      </>
                    )}
                  </button>

                  {!isEditMode && (
                    <button
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      下载模板
                    </button>
                  )}

                  <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <Heart className="w-4 h-4 mr-2" />
                      收藏
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <Share2 className="w-4 h-4 mr-2" />
                      分享
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    最后更新：2025年1月
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResumeEditorProvider>
  )
}

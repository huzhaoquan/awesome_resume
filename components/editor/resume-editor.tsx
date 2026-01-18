'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Download, Save } from 'lucide-react'
import { useResumeEditor } from '@/contexts/resume-editor-context'
import { useAutoSave } from '@/hooks/use-auto-save'
import { BasicInfoEditor } from './basic-info-editor'
import { ExperienceEditor } from './experience-editor'
import { EducationEditor } from './education-editor'
import { SkillsEditor } from './skills-editor'
import { ProjectsEditor } from './projects-editor'
import { CertificationsEditor } from './certifications-editor'

interface ResumeEditorProps {
  templateId: string
  onExportPDF?: () => Promise<void>
}

export function ResumeEditor({ templateId, onExportPDF }: ResumeEditorProps) {
  const { data, saveResume, isDirty, isEditing, setEditing } = useResumeEditor()
  const { saveNow, lastSaved } = useAutoSave(data, templateId, {
    enabled: true,
    interval: 30000
  })
  const [isExporting, setIsExporting] = useState(false)

  const handleManualSave = async () => {
    try {
      await saveResume()
      saveNow()
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  const handleExportPDF = async () => {
    if (onExportPDF) {
      setIsExporting(true)
      try {
        await onExportPDF()
      } finally {
        setIsExporting(false)
      }
    }
  }

  const formatLastSaved = (timestamp: string | null) => {
    if (!timestamp) return '未保存'
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return '刚刚保存'
    if (diffMins < 60) return `${diffMins}分钟前保存`
    if (diffHours < 24) return `${diffHours}小时前保存`
    if (diffDays < 7) return `${diffDays}天前保存`
    return date.toLocaleDateString('zh-CN')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 p-4 bg-white border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">编辑简历</h2>
          <div className="flex items-center space-x-2">
            {isDirty && (
              <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                有未保存的更改
              </span>
            )}
            {lastSaved && (
              <span className="text-sm text-gray-500">
                {formatLastSaved(lastSaved)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditing(!isEditing)}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            {isEditing ? (
              <><EyeOff className="h-4 w-4 mr-2" />隐藏预览</>
            ) : (
              <><Eye className="h-4 w-4 mr-2" />显示预览</>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualSave}
            disabled={!isDirty}
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Save className="h-4 w-4 mr-2" />
            保存
          </Button>
          <Button
            size="sm"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? '正在导出...' : '导出PDF'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Card className="h-full border-0 shadow-none">
          <CardContent className="p-0 h-full">
            <Tabs defaultValue="basic" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto bg-gray-50 p-1">
                <TabsTrigger
                  value="basic"
                  className="text-sm py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  基本信息
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="text-sm py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  工作经历
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="text-sm py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  教育背景
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="text-sm py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  技能
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="text-sm py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  项目经验
                </TabsTrigger>
                <TabsTrigger
                  value="certifications"
                  className="text-sm py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  认证证书
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent value="basic" className="mt-0">
                  <BasicInfoEditor />
                </TabsContent>
                <TabsContent value="experience" className="mt-0">
                  <ExperienceEditor />
                </TabsContent>
                <TabsContent value="education" className="mt-0">
                  <EducationEditor />
                </TabsContent>
                <TabsContent value="skills" className="mt-0">
                  <SkillsEditor />
                </TabsContent>
                <TabsContent value="projects" className="mt-0">
                  <ProjectsEditor />
                </TabsContent>
                <TabsContent value="certifications" className="mt-0">
                  <CertificationsEditor />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

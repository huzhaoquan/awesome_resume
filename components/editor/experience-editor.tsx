'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useResumeEditor } from '@/contexts/resume-editor-context'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

export function ExperienceEditor() {
  const { data, addExperience, updateExperience, deleteExperience } = useResumeEditor()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleAddExperience = () => {
    addExperience()
    // Auto-expand the newly added item
    setTimeout(() => {
      const newId = Date.now().toString()
      setExpandedId(newId)
    }, 100)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">工作经历</h3>
        <Button
          onClick={handleAddExperience}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加经历
        </Button>
      </div>

      <div className="space-y-4">
        {data.experience.map((exp, index) => (
          <Card key={exp.id} className="border-gray-200">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  <span className="text-gray-500 mr-2">#{index + 1}</span>
                  <span className={exp.company ? '' : 'text-gray-400'}>
                    {exp.company || '未命名公司'}
                  </span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(exp.id)}
                    className="h-8 w-8 p-0"
                  >
                    {expandedId === exp.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteExperience(exp.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedId === exp.id && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`company-${exp.id}`}>公司名称</Label>
                      <Input
                        id={`company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="例如：Anthropic"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`position-${exp.id}`}>职位</Label>
                      <Input
                        id={`position-${exp.id}`}
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        placeholder="例如：高级全栈工程师"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`location-${exp.id}`}>工作地点</Label>
                      <Input
                        id={`location-${exp.id}`}
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        placeholder="例如：旧金山，CA"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`startDate-${exp.id}`}>开始日期</Label>
                      <Input
                        id={`startDate-${exp.id}`}
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`endDate-${exp.id}`}>结束日期（或预计结束）</Label>
                      <Input
                        id={`endDate-${exp.id}`}
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="留空表示当前在职"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`techStack-${exp.id}`}>技术栈（用逗号分隔）</Label>
                      <Input
                        id={`techStack-${exp.id}`}
                        value={exp.techStack?.join(', ') || ''}
                        onChange={(e) => updateExperience(exp.id, {
                          techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        placeholder="例如：TypeScript, React, Node.js"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`description-${exp.id}`}>工作描述</Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      placeholder="描述你的主要职责和工作内容..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`achievements-${exp.id}`}>主要成就（每行一项）</Label>
                    <Textarea
                      id={`achievements-${exp.id}`}
                      value={exp.achievements?.join('\n') || ''}
                      onChange={(e) => updateExperience(exp.id, {
                        achievements: e.target.value.split('\n').map(a => a.trim()).filter(Boolean)
                      })}
                      placeholder={"例如：\n• 带领团队完成核心产品重构，性能提升40%\n• 设计并实现新的API架构，减少50%的响应时间"}
                      rows={4}
                      className="resize-none font-mono"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {data.experience.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p>还没有添加任何工作经历</p>
            <Button
              onClick={handleAddExperience}
              size="sm"
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加第一份工作经历
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

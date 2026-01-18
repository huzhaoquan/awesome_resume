'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useResumeEditor } from '@/contexts/resume-editor-context'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

export function EducationEditor() {
  const { data, addEducation, updateEducation, deleteEducation } = useResumeEditor()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleAddEducation = () => {
    addEducation()
    // Auto-expand the newly added item
    setTimeout(() => {
      const newId = Date.now().toString()
      setExpandedId(newId)
    }, 100)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">教育背景</h3>
        <Button
          onClick={handleAddEducation}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加学历
        </Button>
      </div>

      <div className="space-y-4">
        {data.education.map((edu, index) => (
          <Card key={edu.id} className="border-gray-200">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  <span className="text-gray-500 mr-2">#{index + 1}</span>
                  <span className={edu.school ? '' : 'text-gray-400'}>
                    {edu.school || '未命名学校'}
                  </span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(edu.id)}
                    className="h-8 w-8 p-0"
                  >
                    {expandedId === edu.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteEducation(edu.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedId === edu.id && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`school-${edu.id}`}>学校名称</Label>
                      <Input
                        id={`school-${edu.id}`}
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                        placeholder="例如：斯坦福大学"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`degree-${edu.id}`}>学位</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="例如：硕士"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`major-${edu.id}`}>专业</Label>
                      <Input
                        id={`major-${edu.id}`}
                        value={edu.major}
                        onChange={(e) => updateEducation(edu.id, { major: e.target.value })}
                        placeholder="例如：计算机科学"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`location-${edu.id}`}>学校地点</Label>
                      <Input
                        id={`location-${edu.id}`}
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                        placeholder="例如：加州，美国"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`startDate-${edu.id}`}>开始日期</Label>
                      <Input
                        id={`startDate-${edu.id}`}
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`endDate-${edu.id}`}>毕业日期</Label>
                      <Input
                        id={`endDate-${edu.id}`}
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`gpa-${edu.id}`}>GPA（可选）</Label>
                      <Input
                        id={`gpa-${edu.id}`}
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                        placeholder="例如：3.8/4.0"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`honors-${edu.id}`}>荣誉奖项（可选）</Label>
                      <Input
                        id={`honors-${edu.id}`}
                        value={edu.honors?.join(', ') || ''}
                        onChange={(e) =>
                          updateEducation(edu.id, {
                            honors: e.target.value.split(',').map(h => h.trim()).filter(Boolean)
                          })
                        }
                        placeholder="例如：优秀毕业生，院长奖学金"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {data.education.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p>还没有添加任何教育背景</p>
            <Button
              onClick={handleAddEducation}
              size="sm"
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加第一个学历
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

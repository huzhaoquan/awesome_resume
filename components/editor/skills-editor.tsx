'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useResumeEditor } from '@/contexts/resume-editor-context'

export function SkillsEditor() {
  const {
    data,
    updateSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory
  } = useResumeEditor()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [newSkillInputs, setNewSkillInputs] = useState<Record<number, string>>({})

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const handleAddSkill = (categoryIndex: number) => {
    const skill = newSkillInputs[categoryIndex]?.trim()
    if (skill) {
      addSkillToCategory(categoryIndex, skill)
      setNewSkillInputs({ ...newSkillInputs, [categoryIndex]: '' })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, categoryIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill(categoryIndex)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">技能</h3>
      </div>

      <div className="space-y-4">
        {data.skills.map((category, index) => (
          <Card key={index} className="border-gray-200">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  <span className="text-gray-500 mr-2">#{index + 1}</span>
                  <span className={category.name ? '' : 'text-gray-400'}>
                    {category.name || '未命名分类'}
                  </span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(index)}
                  className="h-8 w-8 p-0"
                >
                  {expandedIndex === index ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedIndex === index && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`category-${index}`}>分类名称</Label>
                    <Input
                      id={`category-${index}`}
                      value={category.name}
                      onChange={(e) =>
                        updateSkillCategory(index, { name: e.target.value })
                      }
                      placeholder="例如：编程语言"
                    />
                  </div>

                  <div>
                    <Label>技能列表</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1"
                        >
                          {skill}
                          <button
                            onClick={() =>
                              removeSkillFromCategory(index, skillIndex)
                            }
                            className="ml-2 text-blue-500 hover:text-blue-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {category.skills.length === 0 && (
                        <span className="text-gray-400 text-sm">
                          还没有添加任何技能
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        value={newSkillInputs[index] || ''}
                        onChange={(e) =>
                          setNewSkillInputs({
                            ...newSkillInputs,
                            [index]: e.target.value
                          })
                        }
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        placeholder="输入技能后按回车添加"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => handleAddSkill(index)}
                        disabled={!newSkillInputs[index]?.trim()}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

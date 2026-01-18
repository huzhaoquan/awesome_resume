'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useResumeEditor } from '@/contexts/resume-editor-context'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

export function ProjectsEditor() {
  const { data, addProject, updateProject, deleteProject } = useResumeEditor()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleAddProject = () => {
    addProject()
    setTimeout(() => {
      const newId = Date.now().toString()
      setExpandedId(newId)
    }, 100)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">项目经验</h3>
        <Button
          onClick={handleAddProject}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加项目
        </Button>
      </div>

      <div className="space-y-4">
        {(data.projects || []).map((project, index) => (
          <Card key={project.id} className="border-gray-200">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  <span className="text-gray-500 mr-2">#{index + 1}</span>
                  <span className={project.name ? '' : 'text-gray-400'}>
                    {project.name || '未命名项目'}
                  </span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(project.id)}
                    className="h-8 w-8 p-0"
                  >
                    {expandedId === project.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProject(project.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedId === project.id && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`project-name-${project.id}`}>项目名称</Label>
                      <Input
                        id={`project-name-${project.id}`}
                        value={project.name}
                        onChange={(e) => updateProject(project.id, { name: e.target.value })}
                        placeholder="例如：智能简历生成系统"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`project-link-${project.id}`}>项目链接（可选）</Label>
                      <Input
                        id={`project-link-${project.id}`}
                        value={project.link || ''}
                        onChange={(e) => updateProject(project.id, { link: e.target.value })}
                        placeholder="例如：https://github.com/username/project"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`techStack-${project.id}`}>技术栈（用逗号分隔）</Label>
                    <Input
                      id={`techStack-${project.id}`}
                      value={project.techStack.join(', ')}
                      onChange={(e) =>
                        updateProject(project.id, {
                          techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })
                      }
                      placeholder="例如：Next.js, TypeScript, Tailwind CSS"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`description-${project.id}`}>项目描述</Label>
                    <Textarea
                      id={`description-${project.id}`}
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      placeholder="简要描述项目的目标和主要功能..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`achievements-${project.id}`}>主要成就（每行一项）</Label>
                    <Textarea
                      id={`achievements-${project.id}`}
                      value={project.achievements?.join('\n') || ''}
                      onChange={(e) =>
                        updateProject(project.id, {
                          achievements: e.target.value.split('\n').map(a => a.trim()).filter(Boolean)
                        })
                      }
                      placeholder={"例如：\n• 实现AI驱动的简历优化算法，提升通过率30%\n• 支持实时预览和多模板切换"}
                      rows={4}
                      className="resize-none font-mono"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {(!data.projects || data.projects.length === 0) && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p>还没有添加任何项目经验</p>
            <Button
              onClick={handleAddProject}
              size="sm"
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加第一个项目
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useResumeEditor } from '@/contexts/resume-editor-context'

export function BasicInfoEditor() {
  const { data, updateHeader, updateSummary } = useResumeEditor()
  const { header, summary } = data

  const handleChange = (field: keyof typeof header, value: string) => {
    updateHeader({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              value={header.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="请输入姓名"
            />
          </div>

          <div>
            <Label htmlFor="title">职位</Label>
            <Input
              id="title"
              value={header.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="例如：高级全栈工程师"
            />
          </div>

          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={header.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">电话</Label>
            <Input
              id="phone"
              value={header.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+86 138 0000 0000"
            />
          </div>

          <div>
            <Label htmlFor="location">地点</Label>
            <Input
              id="location"
              value={header.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="例如：北京市"
            />
          </div>

          <div>
            <Label htmlFor="website">个人网站</Label>
            <Input
              id="website"
              value={header.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="例如：github.com/username"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">职业概述</h3>
        <Textarea
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="简要描述你的职业背景和技能重点..."
          rows={4}
          className="resize-none"
        />
      </div>
    </div>
  )
}

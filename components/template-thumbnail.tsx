import { ResumeRenderer } from '@/components/resume/resume-renderer'
import { getThemeIdForTemplate } from '@/lib/resume-themes'
import { sampleAnthropicResume } from '@/components/templates/anthropic'

interface TemplateThumbnailProps {
  templateId: string
}

/**
 * 模板卡片缩略图。
 *
 * 复用 ResumeRenderer + 主题系统，用同一份样例简历实时渲染该模板的真实视觉风格。
 * 固定高度 + overflow-hidden 只露出简历顶部（姓名 / 职位 / 联系方式 + 概述开头），
 * 下半部分被裁掉，使所有卡片缩略区高度统一、风格一目了然。
 * Server Component：简历本体在服务端渲染，零水合成本。
 */
export function TemplateThumbnail({ templateId }: TemplateThumbnailProps) {
  const themeId = getThemeIdForTemplate(templateId)

  return (
    <div className="h-56 overflow-hidden pointer-events-none select-none">
      <ResumeRenderer themeId={themeId} data={sampleAnthropicResume} />
    </div>
  )
}

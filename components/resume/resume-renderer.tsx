import type { ResumeData } from '@/types/resume'
import { getResumeTheme, themeToCssVars } from '@/lib/resume-themes'
import { SingleColumnLayout } from './layouts/single-column'

interface ResumeRendererProps {
  /** 主题 id，对应 lib/resume-themes.ts 中的 theme.id；未匹配回退 mono */
  themeId: string
  data: ResumeData
}

/**
 * 简历渲染入口。
 *
 * 设计要点：
 * - 外层 div 设置 data-resume-theme，触发 globals.css 中对应主题的 CSS 变量覆盖块；
 *   同时内联一份 themeToCssVars() 作为兜底（服务端 / Tailwind 未编译到 :root 时仍生效）。
 * - 根据 theme.layout 分发到具体布局变体组件。
 * - 简历本体只用 var(--resume-*) token，与网站外壳的 anthropic-* 色板完全解耦。
 */
export function ResumeRenderer({ themeId, data }: ResumeRendererProps) {
  const theme = getResumeTheme(themeId)
  const cssVars = themeToCssVars(theme) as React.CSSProperties

  return (
    <div
      data-resume-theme={theme.id}
      style={{
        background: 'var(--resume-background)',
        color: 'var(--resume-foreground)',
        fontFamily: 'var(--font-body)',
        ...cssVars,
      }}
    >
      {theme.layout === 'single-column' && <SingleColumnLayout data={data} />}
      {/* sidebar / header-band / card 布局在后续主题加入时补充 */}
    </div>
  )
}

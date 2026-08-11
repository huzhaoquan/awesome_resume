import type { ResumeData } from '@/types/resume'

/**
 * 简历主题定义
 *
 * 每个 theme 对应一个 tweakcn 预设主题。tokens 是从 tweakcn 主题 JSON 的
 * cssVars.light 解析出来的原始值（oklch/hsl 字符串或纯数字），渲染端和
 * 服务端 HTML 生成端都从这里读取，作为单一事实源。
 *
 * 新增主题时：
 *   1. 从 https://tweakcn.com/r/themes/<name>.json 抓取 JSON
 *   2. 把 cssVars.light / cssVars.theme 的关键字段填到下面
 *   3. 在 globals.css 增加 [data-resume-theme="<id>"] 覆盖块（或由 ThemeStyle 注入）
 *   4. 在 templates.ts 注册一条
 */

export type ResumeLayout = 'single-column' | 'sidebar' | 'header-band' | 'card'

export interface ResumeThemeTokens {
  /** 简历背景 */
  background: string
  /** 正文文字 */
  foreground: string
  /** 卡片 / 次级区块背景 */
  card: string
  /** 卡片上的文字 */
  cardForeground: string
  /** 主强调色（标题、点缀） */
  primary: string
  /** 主强调色上的文字 */
  primaryForeground: string
  /** 次要背景（tag、时间轴） */
  secondary: string
  /** 次要背景上的文字 */
  secondaryForeground: string
  /** 弱化文字（日期、地点） */
  muted: string
  mutedForeground: string
  /** 强调背景（hover、高亮块） */
  accent: string
  accentForeground: string
  /** 边框 / 分隔线 */
  border: string
  /** 圆角，如 "0rem" / "0.5rem" / "1rem" */
  radius: string
}

export interface ResumeTheme {
  id: string
  /** 展示名 */
  name: string
  /** 一句话描述 */
  description: string
  /** 布局变体 */
  layout: ResumeLayout
  /** 字体栈，作用于 --font-display / --font-body */
  fontDisplay: string
  fontBody: string
  /** tweakcn 原始 token */
  tokens: ResumeThemeTokens
}

/**
 * 把主题 tokens 转成可直接塞进 style 属性 / <style> 的 CSS 变量键值对象。
 * 键名与 globals.css 中 [data-resume-theme] 块保持一致。
 */
export function themeToCssVars(theme: ResumeTheme): Record<string, string> {
  const t = theme.tokens
  return {
    '--resume-background': t.background,
    '--resume-foreground': t.foreground,
    '--resume-card': t.card,
    '--resume-card-foreground': t.cardForeground,
    '--resume-primary': t.primary,
    '--resume-primary-foreground': t.primaryForeground,
    '--resume-secondary': t.secondary,
    '--resume-secondary-foreground': t.secondaryForeground,
    '--resume-muted': t.muted,
    '--resume-muted-foreground': t.mutedForeground,
    '--resume-accent': t.accent,
    '--resume-accent-foreground': t.accentForeground,
    '--resume-border': t.border,
    '--resume-radius': t.radius,
    '--font-display': theme.fontDisplay,
    '--font-body': theme.fontBody,
  }
}

// ---- tweakcn 预设主题 ----

// 来源: https://tweakcn.com/r/themes/mono.json (cssVars.light + theme)
const mono: ResumeTheme = {
  id: 'mono',
  name: '极简单色',
  description: 'tweakcn mono 主题：纯黑白灰、等宽字体、零圆角，工程师气质拉满',
  layout: 'single-column',
  // tweakcn mono 把 sans/serif 全设为 Geist Mono；这里用项目已加载的 mono 字体回退
  fontDisplay: 'JetBrains Mono, ui-monospace, monospace',
  fontBody: 'JetBrains Mono, ui-monospace, monospace',
  tokens: {
    background: 'oklch(1.0000 0 0)',
    foreground: 'oklch(0.1448 0 0)',
    card: 'oklch(1.0000 0 0)',
    cardForeground: 'oklch(0.1448 0 0)',
    primary: 'oklch(0.1448 0 0)',
    primaryForeground: 'oklch(0.9851 0 0)',
    secondary: 'oklch(0.9702 0 0)',
    secondaryForeground: 'oklch(0.2046 0 0)',
    muted: 'oklch(0.9702 0 0)',
    mutedForeground: 'oklch(0.5486 0 0)',
    accent: 'oklch(0.9702 0 0)',
    accentForeground: 'oklch(0.2046 0 0)',
    border: 'oklch(0.9219 0 0)',
    radius: '0rem',
  },
}

// 来源: https://tweakcn.com/r/themes/amber-minimal.json (cssVars.light + theme)
// 纯白底 + 琥珀主色，柔和的中性灰，小圆角。Inter 字体。
const amberMinimal: ResumeTheme = {
  id: 'amber-minimal',
  name: '琥珀极简',
  description: 'tweakcn amber-minimal：纯白底 + 琥珀主色，中性灰衬托，小圆角，干净温暖',
  layout: 'single-column',
  // tweakcn 原设 Inter / Source Serif 4；项目仅加载 Inter，统一用 Inter 保证预览=PDF
  fontDisplay: 'Inter, ui-sans-serif, system-ui, sans-serif',
  fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
  tokens: {
    background: 'oklch(1.0000 0 0)',
    foreground: 'oklch(0.2686 0 0)',
    card: 'oklch(1.0000 0 0)',
    cardForeground: 'oklch(0.2686 0 0)',
    primary: 'oklch(0.7686 0.1647 70.0804)',
    primaryForeground: 'oklch(0 0 0)',
    secondary: 'oklch(0.9670 0.0029 264.5419)',
    secondaryForeground: 'oklch(0.4461 0.0263 256.8018)',
    muted: 'oklch(0.9846 0.0017 247.8389)',
    mutedForeground: 'oklch(0.5510 0.0234 264.3637)',
    accent: 'oklch(0.9869 0.0214 95.2774)',
    accentForeground: 'oklch(0.4732 0.1247 46.2007)',
    border: 'oklch(0.9276 0.0058 264.5313)',
    radius: '0.375rem',
  },
}

// 来源: https://tweakcn.com/r/themes/claude.json (cssVars.light + theme)
// 暖米黄底 + 陶土橙主色，米色调中性背景，中等圆角。原设 system-ui 无衬线。
const claude: ResumeTheme = {
  id: 'claude',
  name: 'Claude 陶土',
  description: 'tweakcn claude：暖米黄底 + 陶土橙主色，温润中性，中等圆角，亲和力强',
  layout: 'single-column',
  // tweakcn 原设 system-ui 栈；统一回退到项目加载的 Inter
  fontDisplay: 'Inter, ui-sans-serif, system-ui, sans-serif',
  fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
  tokens: {
    background: 'oklch(0.9818 0.0054 95.0986)',
    foreground: 'oklch(0.3438 0.0269 95.7226)',
    card: 'oklch(0.9818 0.0054 95.0986)',
    cardForeground: 'oklch(0.1908 0.0020 106.5859)',
    primary: 'oklch(0.6171 0.1375 39.0427)',
    primaryForeground: 'oklch(1.0000 0 0)',
    secondary: 'oklch(0.9245 0.0138 92.9892)',
    secondaryForeground: 'oklch(0.4334 0.0177 98.6048)',
    muted: 'oklch(0.9341 0.0153 90.2390)',
    mutedForeground: 'oklch(0.6059 0.0075 97.4233)',
    accent: 'oklch(0.9245 0.0138 92.9892)',
    accentForeground: 'oklch(0.2671 0.0196 98.9390)',
    border: 'oklch(0.8847 0.0069 97.3627)',
    radius: '0.5rem',
  },
}

// 来源: https://tweakcn.com/r/themes/elegant-luxury.json (cssVars.light + theme)
// 暖米底 + 酒红主色，金色辅助点缀，小圆角。原设 Poppins / Libre Baskerville。
const elegantLuxury: ResumeTheme = {
  id: 'elegant-luxury',
  name: '奢华酒红',
  description: 'tweakcn elegant-luxury：暖米底 + 酒红主色 + 金色点缀，小圆角，沉稳奢华',
  layout: 'single-column',
  // tweakcn 原设 Poppins / Libre Baskerville；项目未加载，统一回退 Inter 保一致
  fontDisplay: 'Inter, ui-sans-serif, system-ui, sans-serif',
  fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
  tokens: {
    background: 'oklch(0.9779 0.0042 56.3756)',
    foreground: 'oklch(0.2178 0 0)',
    card: 'oklch(0.9779 0.0042 56.3756)',
    cardForeground: 'oklch(0.2178 0 0)',
    primary: 'oklch(0.4650 0.1470 24.9381)',
    primaryForeground: 'oklch(1.0000 0 0)',
    secondary: 'oklch(0.9625 0.0385 89.0943)',
    secondaryForeground: 'oklch(0.4847 0.1022 75.1153)',
    muted: 'oklch(0.9431 0.0068 53.4442)',
    mutedForeground: 'oklch(0.4444 0.0096 73.6390)',
    accent: 'oklch(0.9619 0.0580 95.6174)',
    accentForeground: 'oklch(0.3958 0.1331 25.7230)',
    border: 'oklch(0.9355 0.0324 80.9937)',
    radius: '0.375rem',
  },
}

export const resumeThemes: ResumeTheme[] = [mono, amberMinimal, claude, elegantLuxury]

export const defaultResumeTheme = mono

export function getResumeTheme(id: string): ResumeTheme {
  return resumeThemes.find((t) => t.id === id) ?? defaultResumeTheme
}

/**
 * 网站模板 id（lib/templates.ts）→ 简历渲染主题 id 的映射。
 * 首页缩略图与详情页预览共用此单一事实源，未命中统一回退 mono。
 */
export function getThemeIdForTemplate(templateId: string): string {
  const map: Record<string, string> = {
    mono: 'mono',
    'amber-minimal': 'amber-minimal',
    claude: 'claude',
    'elegant-luxury': 'elegant-luxury',
  }
  return map[templateId] ?? 'mono'
}

/** 占位导出，保证未使用变量不报错（ResumeData 后续主题切换器会用到） */
export type { ResumeData }

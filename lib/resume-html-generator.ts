import { ResumeData } from '@/types/resume'

/**
 * 生成Anthropic风格简历的HTML内容
 * 用于服务器端PDF生成
 */
export function generateAnthropicResumeHTML(data: ResumeData): string {
  const { header, summary, experience, education, skills, projects, certifications } = data

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${header.name} - 简历</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            anthropic: {
              50: '#faf5ff',
              100: '#f3e8ff',
              200: '#e9d5ff',
              300: '#d8b4fe',
              400: '#c084fc',
              500: '#a855f7',
              600: '#9333ea',
              700: '#7c3aed',
              800: '#6b21a8',
              950: '#3b0764',
              orange: '#f97316',
              blue: '#3b82f6',
              green: '#10b981',
              light: '#fafafa',
            }
          }
        }
      }
    }
  </script>
  <style>
    @media print {
      .page-break { page-break-before: always; }
      .avoid-break { page-break-inside: avoid; }
    }
    @page {
      size: A4;
      margin: 10mm;
    }
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body class="bg-white">
  <div class="max-w-4xl mx-auto bg-anthropic-light p-12 shadow-lg relative font-sans">
    <!-- 装饰条 -->
    <div class="absolute top-0 left-0 w-1 h-24 bg-anthropic-orange"></div>
    <div class="absolute top-0 right-0 w-1 h-24 bg-anthropic-blue"></div>

    <!-- 头部信息 -->
    <header class="mb-12 border-b border-anthropic-200 pb-8">
      <h1 class="text-4xl font-bold text-anthropic-950 mb-2 tracking-tight">
        ${escapeHtml(header.name)}
      </h1>
      <h2 class="text-xl text-anthropic-orange font-medium mb-4">
        ${escapeHtml(header.title)}
      </h2>
      <div class="flex flex-wrap gap-4 text-sm text-anthropic-600">
        <span class="flex items-center gap-1">
          <div class="w-2 h-2 bg-anthropic-orange rounded-full"></div>
          ${escapeHtml(header.email)}
        </span>
        <span class="flex items-center gap-1">
          <div class="w-2 h-2 bg-anthropic-orange rounded-full"></div>
          ${escapeHtml(header.phone)}
        </span>
        <span class="flex items-center gap-1">
          <div class="w-2 h-2 bg-anthropic-orange rounded-full"></div>
          ${escapeHtml(header.location)}
        </span>
        ${header.website ? `
        <span class="flex items-center gap-1">
          <div class="w-2 h-2 bg-anthropic-orange rounded-full"></div>
          ${escapeHtml(header.website)}
        </span>
        ` : ''}
      </div>
    </header>

    <!-- 职业概述 -->
    <section class="mb-10 avoid-break">
      <h3 class="text-lg font-semibold text-anthropic-950 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-anthropic-orange rounded-full mr-3"></span>
        职业概述
      </h3>
      <p class="text-anthropic-800 leading-relaxed text-base">
        ${escapeHtml(summary)}
      </p>
    </section>

    <!-- 工作经历 -->
    <section class="mb-10">
      <h3 class="text-lg font-semibold text-anthropic-950 mb-6 flex items-center">
        <span class="inline-block w-2 h-2 bg-anthropic-orange rounded-full mr-3"></span>
        工作经历
      </h3>
      <div class="space-y-8">
        ${experience.map(exp => `
        <div class="relative avoid-break">
          <div class="absolute left-0 top-2 w-4 h-4 bg-anthropic-100 rounded-full border-2 border-anthropic-orange"></div>
          <div class="pl-8">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="text-lg font-medium text-anthropic-950">
                  ${escapeHtml(exp.position)}
                </h4>
                <p class="text-anthropic-blue font-medium">
                  ${escapeHtml(exp.company)}
                </p>
              </div>
              <span class="text-sm text-anthropic-600 bg-anthropic-100 px-3 py-1 rounded-full">
                ${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}
              </span>
            </div>
            <p class="text-sm text-anthropic-600 mb-3">${escapeHtml(exp.location)}</p>
            <p class="text-anthropic-800 leading-relaxed mb-3">
              ${escapeHtml(exp.description)}
            </p>
            ${exp.achievements && exp.achievements.length > 0 ? `
            <ul class="space-y-2">
              ${exp.achievements.map(achievement => `
              <li class="flex items-start">
                <span class="text-anthropic-orange mr-2 mt-1">▹</span>
                <span class="text-anthropic-700 text-sm">${escapeHtml(achievement)}</span>
              </li>
              `).join('')}
            </ul>
            ` : ''}
            ${exp.techStack && exp.techStack.length > 0 ? `
            <div class="mt-4 flex flex-wrap gap-2">
              ${exp.techStack.map(tech => `
              <span class="text-xs px-3 py-1 bg-anthropic-50 text-anthropic-800 rounded-md font-medium border border-anthropic-200">
                ${escapeHtml(tech)}
              </span>
              `).join('')}
            </div>
            ` : ''}
          </div>
        </div>
        `).join('')}
      </div>
    </section>

    <!-- 教育背景 -->
    <section class="mb-10 avoid-break">
      <h3 class="text-lg font-semibold text-anthropic-950 mb-6 flex items-center">
        <span class="inline-block w-2 h-2 bg-anthropic-green rounded-full mr-3"></span>
        教育背景
      </h3>
      <div class="space-y-6">
        ${education.map(edu => `
        <div class="flex justify-between">
          <div>
            <h4 class="text-lg font-medium text-anthropic-950">
              ${escapeHtml(edu.school)}
            </h4>
            <p class="text-anthropic-green">
              ${escapeHtml(edu.degree)} - ${escapeHtml(edu.major)}
            </p>
            ${edu.gpa ? `
            <p class="text-sm text-anthropic-600 mt-1">GPA: ${escapeHtml(edu.gpa)}</p>
            ` : ''}
            ${edu.honors && edu.honors.length > 0 ? `
            <p class="text-sm text-anthropic-600 mt-1">
              荣誉：${edu.honors.map(h => escapeHtml(h)).join(', ')}
            </p>
            ` : ''}
          </div>
          <span class="text-sm text-anthropic-600 bg-anthropic-100 px-3 py-1 rounded-full h-fit">
            ${escapeHtml(edu.startDate)} - ${escapeHtml(edu.endDate)}
          </span>
        </div>
        `).join('')}
      </div>
    </section>

    <!-- 技能专长 -->
    <section class="mb-10 avoid-break">
      <h3 class="text-lg font-semibold text-anthropic-950 mb-6 flex items-center">
        <span class="inline-block w-2 h-2 bg-anthropic-blue rounded-full mr-3"></span>
        技能专长
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${skills.map(category => `
        <div class="pb-6 border-b border-anthropic-200 last:border-b-0 last:pb-0">
          <h4 class="text-base font-medium text-anthropic-blue mb-3">
            ${escapeHtml(category.name)}
          </h4>
          <div class="flex flex-wrap gap-2">
            ${category.skills.map(skill => `
            <span class="text-sm px-3 py-1.5 bg-anthropic-50 text-anthropic-800 rounded-md border border-anthropic-300">
              ${escapeHtml(skill)}
            </span>
            `).join('')}
          </div>
        </div>
        `).join('')}
      </div>
    </section>

    ${projects && projects.length > 0 ? `
    <!-- 项目经验 -->
    <section class="mb-10">
      <h3 class="text-lg font-semibold text-anthropic-950 mb-6 flex items-center">
        <span class="inline-block w-2 h-2 bg-anthropic-orange rounded-full mr-3"></span>
        项目经验
      </h3>
      <div class="grid grid-cols-1 gap-6">
        ${projects.map(project => `
        <div class="relative pl-8 avoid-break">
          <div class="absolute left-0 top-2 w-3 h-3 bg-anthropic-orange rounded-full"></div>
          <div class="bg-anthropic-50 rounded-lg p-5 border border-anthropic-200">
            <div class="flex justify-between items-start mb-3">
              <h4 class="text-lg font-medium text-anthropic-950">
                ${escapeHtml(project.name)}
              </h4>
              ${project.link ? `
              <span class="text-sm text-anthropic-blue">
                查看项目 →
              </span>
              ` : ''}
            </div>
            <p class="text-anthropic-800 leading-relaxed mb-3">
              ${escapeHtml(project.description)}
            </p>
            ${project.achievements && project.achievements.length > 0 ? `
            <ul class="space-y-1 mb-3">
              ${project.achievements.map(achievement => `
              <li class="flex items-start">
                <span class="text-anthropic-orange mr-2 mt-1 text-sm">▹</span>
                <span class="text-anthropic-700 text-sm">${escapeHtml(achievement)}</span>
              </li>
              `).join('')}
            </ul>
            ` : ''}
            <div class="flex flex-wrap gap-2">
              ${project.techStack.map(tech => `
              <span class="text-xs px-2.5 py-1 bg-white text-anthropic-800 rounded-md border border-anthropic-300 font-medium">
                ${escapeHtml(tech)}
              </span>
              `).join('')}
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${certifications && certifications.length > 0 ? `
    <!-- 认证证书 -->
    <section class="mb-10 avoid-break">
      <h3 class="text-lg font-semibold text-anthropic-950 mb-6 flex items-center">
        <span class="inline-block w-2 h-2 bg-anthropic-green rounded-full mr-3"></span>
        认证证书
      </h3>
      <div class="space-y-4">
        ${certifications.map(cert => `
        <div class="flex justify-between items-center bg-anthropic-100 rounded-lg p-4 border border-anthropic-200">
          <div>
            <h4 class="text-base font-medium text-anthropic-950">
              ${escapeHtml(cert.name)}
            </h4>
            <p class="text-sm text-anthropic-green">
              ${escapeHtml(cert.issuer)}
            </p>
          </div>
          <span class="text-sm text-anthropic-600">
            ${escapeHtml(cert.date)}
          </span>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}
  </div>
</body>
</html>
`
}

/**
 * 转义HTML特殊字符
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

// =====================================================================
// 多主题 HTML 生成器（tweakcn 主题驱动）
// 与 components/resume/layouts/single-column.tsx 的结构对齐，
// 保证「预览什么样，PDF 就什么样」。不依赖 Tailwind CDN，用纯 CSS + 变量。
// =====================================================================

import { getResumeTheme, themeToCssVars } from './resume-themes'
/**
 * 中文字体策略（根治导出 PDF 中文方格/乱码）：
 *
 * 服务端用 @sparticuz/chromium，它打包的字体里没有任何 CJK 字形。
 * 早期方案是把 Noto Sans SC 子集 WOFF2 用 base64 内联成 @font-face（web 字体）。
 * 实测发现：Chromium 的 page.pdf() 嵌入器对「base64 data URI 的 web 字体」不可靠——
 * 屏幕渲染正常（document.fonts.status === 'loaded'），但 PDF 里这个字体被丢弃，
 * 中文全部回退到 DejaVuSans（无 CJK 字形）→ 豆腐块/小方格。
 *
 * 正解：把完整的 Noto Sans SC 作为「真正的系统字体」装进 Chromium 的 fontconfig
 * 目录（见 app/api/export-pdf/route.ts 的 ensureCjkSystemFont()），CSS 字体栈里
 * 直接写 'Noto Sans SC'。系统字体会被 PDF 嵌入器 100% 嵌入，根治丢字。
 *
 * 这里不再返回任何 @font-face（web 字体在 PDF 里不可靠），
 * 只在字体栈里把 'Noto Sans SC' 拼到 --font-display / --font-body 末尾。
 * Latin 字符由前面的主题字体命中，CJK 字符由 Noto Sans SC 命中，
 * 由 fontconfig 的 fallback 统一调度，互不抢占。
 */
const CJK_SYSTEM_FONT = "'Noto Sans SC'"

function renderTag(text: string): string {
  return `<span class="tag">${escapeHtml(text)}</span>`
}

function sectionTitle(title: string): string {
  return `<h3 class="section-title">${escapeHtml(title)}</h3>`
}

function buildSingleColumnHtml(data: ResumeData, themeId: string): string {
  const { header, summary, experience, education, skills, projects, certifications } = data
  const theme = getResumeTheme(themeId)
  const vars = themeToCssVars(theme)
  // 字体策略：把系统级 CJK 字体 'Noto Sans SC' 拼到字体栈末尾。
  // 它在导出时由 route.ts 安装进 Chromium 的 fontconfig 目录，作为系统字体存在。
  // Latin 字符先命中主题字体（Inter / JetBrains Mono），CJK 字符由 fontconfig
  // 自动 fallback 到 Noto Sans SC。系统字体才会被 PDF 嵌入器可靠嵌入。
  const cssVarDecls = Object.entries(vars)
    .map(([k, v]) => {
      if (k === '--font-display' || k === '--font-body') {
        return `${k}: ${v}, ${CJK_SYSTEM_FONT};`
      }
      return `${k}: ${v};`
    })
    .join('\n    ')

  const contact = [
    header.email,
    header.phone,
    header.location,
    header.website,
  ].filter(Boolean).map((c) => `<span>${escapeHtml(c!)}</span>`).join('\n      ')

  const summaryHtml = summary
    ? `<section class="block">
        ${sectionTitle('职业概述')}
        <p class="text">${escapeHtml(summary)}</p>
      </section>`
    : ''

  const experienceHtml = experience?.length
    ? `<section class="block">
        ${sectionTitle('工作经历')}
        ${experience.map((exp) => `
        <div class="item">
          <div class="item-head">
            <div>
              <h4 class="item-title">${escapeHtml(exp.position)}</h4>
              <p class="item-sub">${escapeHtml(exp.company)}${exp.location ? ` · ${escapeHtml(exp.location)}` : ''}</p>
            </div>
            <span class="date">${escapeHtml(exp.startDate)} — ${escapeHtml(exp.endDate)}</span>
          </div>
          ${exp.description ? `<p class="text">${escapeHtml(exp.description)}</p>` : ''}
          ${exp.achievements?.length ? `<ul class="bullets">${exp.achievements.map((a) => `<li><span class="dash">—</span><span>${escapeHtml(a)}</span></li>`).join('')}</ul>` : ''}
          ${exp.techStack?.length ? `<div class="tags">${exp.techStack.map(renderTag).join('')}</div>` : ''}
        </div>`).join('')}
      </section>`
    : ''

  const projectsHtml = projects?.length
    ? `<section class="block">
        ${sectionTitle('项目经验')}
        ${projects.map((p) => `
        <div class="item">
          <div class="item-head">
            <h4 class="item-title">${escapeHtml(p.name)}</h4>
            ${p.link ? `<span class="date">${escapeHtml(p.link)}</span>` : ''}
          </div>
          ${p.description ? `<p class="text">${escapeHtml(p.description)}</p>` : ''}
          ${p.achievements?.length ? `<ul class="bullets">${p.achievements.map((a) => `<li><span class="dash">—</span><span>${escapeHtml(a)}</span></li>`).join('')}</ul>` : ''}
          ${p.techStack?.length ? `<div class="tags">${p.techStack.map(renderTag).join('')}</div>` : ''}
        </div>`).join('')}
      </section>`
    : ''

  const educationHtml = education?.length
    ? `<section class="block">
        ${sectionTitle('教育背景')}
        ${education.map((edu) => `
        <div class="item item-row">
          <div>
            <h4 class="item-title">${escapeHtml(edu.school)}</h4>
            <p class="item-sub">${escapeHtml(edu.degree)} · ${escapeHtml(edu.major)}${edu.gpa ? ` · GPA ${escapeHtml(edu.gpa)}` : ''}</p>
            ${edu.honors?.length ? `<p class="item-sub">${edu.honors.map((h) => escapeHtml(h)).join('、')}</p>` : ''}
          </div>
          <span class="date">${escapeHtml(edu.startDate)} — ${escapeHtml(edu.endDate)}</span>
        </div>`).join('')}
      </section>`
    : ''

  const skillsHtml = skills?.length
    ? `<section class="block">
        ${sectionTitle('技能专长')}
        ${skills.map((cat) => `
        <div class="skill-cat">
          <h4 class="skill-cat-title">${escapeHtml(cat.name)}</h4>
          <div class="tags">${cat.skills.map(renderTag).join('')}</div>
        </div>`).join('')}
      </section>`
    : ''

  const certsHtml = certifications?.length
    ? `<section class="block">
        ${sectionTitle('认证证书')}
        ${certifications.map((cert) => `
        <div class="item item-row">
          <div>
            <h4 class="item-title">${escapeHtml(cert.name)}</h4>
            <p class="item-sub">${escapeHtml(cert.issuer)}${cert.credentialId ? ` · ${escapeHtml(cert.credentialId)}` : ''}</p>
          </div>
          <span class="date">${escapeHtml(cert.date)}</span>
        </div>`).join('')}
      </section>`
    : ''

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(header.name)} - 简历</title>
  <style>
    @page { size: A4; margin: 12mm; }
    :root {
      ${cssVarDecls}
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--resume-background);
      color: var(--resume-foreground);
      font-family: var(--font-body);
      font-size: 13px;
      line-height: 1.6;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .resume {
      max-width: 780px;
      margin: 0 auto;
      padding: 8px 4px;
    }
    header.resume-header {
      margin-bottom: 28px;
      padding-bottom: 20px;
      border-bottom: 2px solid var(--resume-foreground);
    }
    header.resume-header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.01em;
      font-family: var(--font-display);
      color: var(--resume-foreground);
    }
    header.resume-header .title {
      margin: 4px 0 0;
      font-size: 16px;
      color: var(--resume-primary);
    }
    header.resume-header .contact {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px 16px;
      font-size: 11px;
      color: var(--resume-muted-foreground);
    }
    .block { margin-bottom: 26px; }
    .section-title {
      margin: 0 0 14px;
      padding-bottom: 6px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-family: var(--font-display);
      color: var(--resume-foreground);
      border-bottom: 1px solid var(--resume-border);
    }
    .item { margin-bottom: 18px; page-break-inside: avoid; }
    .item:last-child { margin-bottom: 0; }
    .item-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .item-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
    .item-title {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      font-family: var(--font-display);
      color: var(--resume-foreground);
    }
    .item-sub {
      margin: 2px 0 0;
      font-size: 12px;
      color: var(--resume-primary);
    }
    .date {
      font-size: 11px;
      white-space: nowrap;
      padding: 1px 6px;
      background: var(--resume-muted);
      color: var(--resume-muted-foreground);
      border-radius: var(--resume-radius);
    }
    .text { margin: 8px 0 0; font-size: 13px; color: var(--resume-foreground); }
    .bullets { margin: 8px 0 0; padding: 0; list-style: none; }
    .bullets li { display: flex; gap: 8px; margin-bottom: 4px; font-size: 13px; color: var(--resume-foreground); }
    .dash { color: var(--resume-primary); }
    .tags { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 6px; }
    .tag {
      font-size: 11px;
      padding: 1px 7px;
      background: var(--resume-secondary);
      color: var(--resume-secondary-foreground);
      border: 1px solid var(--resume-border);
      border-radius: var(--resume-radius);
    }
    .skill-cat { margin-bottom: 12px; }
    .skill-cat:last-child { margin-bottom: 0; }
    .skill-cat-title {
      margin: 0 0 6px;
      font-size: 13px;
      font-weight: 700;
      font-family: var(--font-display);
      color: var(--resume-primary);
    }
  </style>
</head>
<body>
  <div class="resume">
    <header class="resume-header">
      <h1>${escapeHtml(header.name)}</h1>
      ${header.title ? `<p class="title">${escapeHtml(header.title)}</p>` : ''}
      <div class="contact">
      ${contact}
      </div>
    </header>
    ${summaryHtml}
    ${experienceHtml}
    ${projectsHtml}
    ${educationHtml}
    ${skillsHtml}
    ${certsHtml}
  </div>
</body>
</html>`
}

/**
 * 生成指定主题的简历 HTML（用于服务端 PDF 导出）。
 * 目前支持 single-column 布局（mono 等主题）；后续主题按 layout 分支扩展。
 */
export function generateResumeHTML(data: ResumeData, themeId: string = 'mono'): string {
  const theme = getResumeTheme(themeId)
  if (theme.layout === 'single-column') {
    return buildSingleColumnHtml(data, themeId)
  }
  // 其余布局变体接入前的兜底
  return buildSingleColumnHtml(data, 'mono')
}

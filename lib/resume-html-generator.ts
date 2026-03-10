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

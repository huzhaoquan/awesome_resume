import { ResumeTemplate, TemplateCategory } from '@/types/resume'

export const templates: ResumeTemplate[] = [
  {
    id: 'mono',
    name: '极简单色 Mono',
    description: '纯黑白灰 + 等宽字体，干净硬核的工程师气质。',
    category: 'software',
    techStack: ['全栈开发', '系统设计', '基础设施'],
    previewImage: '/templates/mono.svg',
    features: [
      'JetBrains Mono 等宽排版',
      '零圆角极简分隔线',
      '技术栈标签清晰可读',
      '段落式成就清单',
      '服务端高质量 PDF 导出',
      '所见即所得（预览即导出）'
    ],
    targetRole: '软件工程师 / 基础设施 / 全栈开发',
    downloadLink: '#'
  },
  {
    id: 'amber-minimal',
    name: '琥珀极简 Amber Minimal',
    description: '白底 + 琥珀主色，干净温暖，适用面广。',
    category: 'software',
    techStack: ['全栈开发', '系统设计', '产品经理'],
    previewImage: '/templates/amber-minimal.svg',
    features: [
      '琥珀强调色点缀',
      '中性灰分层清晰',
      '小圆角柔和排版',
      '技能标签可视化',
      '服务端高质量 PDF 导出',
      '所见即所得（预览即导出）'
    ],
    targetRole: '软件工程师 / 产品经理 / 全栈开发',
    downloadLink: '#'
  },
  {
    id: 'claude',
    name: 'Claude 陶土 Claude',
    description: '暖米底 + 陶土橙，亲和温润，适合产品/沟通岗。',
    category: 'fullstack',
    techStack: ['产品规划', '全栈开发', '数据分析'],
    previewImage: '/templates/claude.svg',
    features: [
      '陶土橙温暖强调',
      '米黄底护眼耐读',
      '中圆角圆润观感',
      '模块化卡片布局',
      '服务端高质量 PDF 导出',
      '所见即所得（预览即导出）'
    ],
    targetRole: '产品经理 / 全栈工程师 / 运营',
    downloadLink: '#'
  },
  {
    id: 'elegant-luxury',
    name: '奢华酒红 Elegant Luxury',
    description: '暖米底 + 酒红 + 金色，沉稳奢华，适合管理岗。',
    category: 'product',
    techStack: ['团队管理', '商业分析', '战略规划'],
    previewImage: '/templates/elegant-luxury.svg',
    features: [
      '酒红主色沉稳大气',
      '金色辅助精致点缀',
      '暖米底高级质感',
      '经典商务版式',
      '服务端高质量 PDF 导出',
      '所见即所得（预览即导出）'
    ],
    targetRole: '管理岗 / 商务 / 高级专家',
    downloadLink: '#'
  },
  {
    id: 'anthropic-style',
    name: 'Anthropic 现代风格',
    description: 'Anthropic官方品牌风格，简约优雅，适合技术岗位申请',
    category: 'fullstack',
    techStack: ['全栈开发', '系统设计', '产品经理'],
    previewImage: '/templates/anthropic-style.svg',
    features: [
      'Anthropic品牌紫色主题',
      '模块化卡片设计',
      '优雅的时间轴布局',
      '响应式设计',
      '技能等级可视化',
      '项目管理展示'
    ],
    targetRole: '全栈工程师 / 技术专家 / 产品经理',
    downloadLink: '#'
  },
  {
    id: 'software-engineer',
    name: '软件工程师简历',
    description: '适合初中级软件工程师，突出项目经验和技术能力',
    category: 'software',
    techStack: ['全栈开发', '算法', '系统设计'],
    previewImage: '/templates/software-engineer.jpg',
    features: ['清晰的技术栈展示', '项目经验重点突出', '技能评分可视化'],
    targetRole: '软件工程师 / 开发工程师',
    downloadLink: '#'
  },
  {
    id: 'senior-engineer',
    name: '高级软件工程师',
    description: '专为资深工程师设计，强调架构设计和团队领导力',
    category: 'software',
    techStack: ['架构设计', '团队管理', '技术规划'],
    previewImage: '/templates/senior-engineer.jpg',
    features: ['架构项目展示', '技术影响力说明', '团队规模显示'],
    targetRole: '高级工程师 / 技术专家',
    downloadLink: '#'
  },
  {
    id: 'frontend-developer',
    name: '前端开发简历',
    description: '专注前端技术栈，展示UI/UX能力和框架经验',
    category: 'frontend',
    techStack: ['React', 'Vue', 'TypeScript', '性能优化'],
    previewImage: '/templates/frontend-developer.jpg',
    features: ['前端项目展示', '性能优化案例', 'UI组件开发经验'],
    targetRole: '前端工程师 / 前端开发',
    downloadLink: '#'
  },
  {
    id: 'backend-developer',
    name: '后端开发简历',
    description: '突出后端开发能力，包括API设计、数据库和系统性能',
    category: 'backend',
    techStack: ['微服务', '数据库', '高并发', '分布式'],
    previewImage: '/templates/backend-developer.jpg',
    features: ['系统架构图', '性能指标展示', '数据库优化案例'],
    targetRole: '后端工程师 / 服务端开发',
    downloadLink: '#'
  },
  {
    id: 'fullstack-developer',
    name: '全栈工程师简历',
    description: '展示前后端通吃能力，适合全栈岗位申请',
    category: 'fullstack',
    techStack: ['前端框架', '后端服务', 'DevOps', '数据库'],
    previewImage: '/templates/fullstack-developer.jpg',
    features: ['端到端项目', '技术广度展示', '独立完成能力'],
    targetRole: '全栈工程师',
    downloadLink: '#'
  },
  {
    id: 'product-manager',
    name: '产品经理简历',
    description: '专为产品经理打造，强调产品思维和项目成果',
    category: 'product',
    techStack: ['产品规划', '用户研究', '数据分析', '敏捷开发'],
    previewImage: '/templates/product-manager.jpg',
    features: ['产品指标展示', '用户增长数据', '跨部门协作经验'],
    targetRole: '产品经理 / 产品负责人',
    downloadLink: '#'
  },
  {
    id: 'data-scientist',
    name: '数据科学家简历',
    description: '突出数据分析和机器学习能力，展示算法和建模经验',
    category: 'data',
    techStack: ['机器学习', '统计分析', 'Python', '数据可视化'],
    previewImage: '/templates/data-scientist.jpg',
    features: ['算法模型展示', '数据洞察案例', '业务影响量化'],
    targetRole: '数据科学家 / 算法工程师',
    downloadLink: '#'
  },
  {
    id: 'devops-engineer',
    name: 'DevOps工程师',
    description: '专注运维和持续集成，展示自动化和系统优化能力',
    category: 'devops',
    techStack: ['CI/CD', '容器化', '云平台', '监控预警'],
    previewImage: '/templates/devops-engineer.jpg',
    features: ['系统稳定性指标', '成本优化成果', '自动化提升数据'],
    targetRole: 'DevOps工程师 / SRE',
    downloadLink: '#'
  }
]

export const categories: TemplateCategory[] = [
  { id: 'all', name: '全部模板', description: '查看所有简历模板' },
  { id: 'software', name: '软件工程', description: '软件开发相关职位' },
  { id: 'frontend', name: '前端开发', description: 'Web前端开发职位' },
  { id: 'backend', name: '后端开发', description: '服务端开发职位' },
  { id: 'fullstack', name: '全栈开发', description: '全栈工程师职位' },
  { id: 'product', name: '产品经理', description: '产品管理职位' },
  { id: 'data', name: '数据科学', description: '数据科学职位' },
  { id: 'devops', name: 'DevOps', description: '运维和DevOps职位' }
]

export const getTemplateById = (id: string): ResumeTemplate | undefined => {
  return templates.find(t => t.id === id)
}

export const getTemplatesByCategory = (category: string): ResumeTemplate[] => {
  if (category === 'all') return templates
  return templates.filter(t => t.category === category)
}

/**
 * 拥有真实渲染主题、可在首页展示真实缩略图的模板 id。
 * 其余模板（anthropic-style 及职位占位模板）保留在 templates 里供详情页深链接，
 * 但不在首页卡片网格中展示。
 */
const RENDERABLE_TEMPLATE_IDS = ['mono', 'amber-minimal', 'claude', 'elegant-luxury']

/** 首页卡片网格使用的模板子集 */
export const homepageTemplates: ResumeTemplate[] = templates.filter(t =>
  RENDERABLE_TEMPLATE_IDS.includes(t.id)
)

/** 首页分类筛选按钮，仅保留 homepageTemplates 覆盖到的分类 */
export const homepageCategories: TemplateCategory[] = [
  { id: 'all', name: '全部模板', description: '查看所有简历模板' },
  { id: 'software', name: '软件工程', description: '软件开发相关职位' },
  { id: 'fullstack', name: '全栈开发', description: '全栈工程师职位' },
  { id: 'product', name: '产品经理', description: '产品管理职位' },
]

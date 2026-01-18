# Awesome Resume

专业技术简历模板网站，采用 Anthropic 品牌风格设计，为技术从业者提供高质量的简历模板展示。

## 项目特性

### 设计系统
- **品牌色**: Anthropic 深紫色 (#5E5DFF) 主题
- **字体**: Inter + JetBrains Mono
- **风格**: 简洁专业、现代科技、卡片化布局

### 核心功能
- 8个精选简历模板（软件工程师、前端、后端、全栈、产品经理、数据科学等）
- 模板分类筛选
- 响应式设计
- 专业模板详情页

### 技术栈
- Next.js 16 + TypeScript
- React 19
- Tailwind CSS 3.4
- Turbopack (默认 bundler)
- Lucide React 图标库

## 快速开始

### 安装依赖
```bash
npm install --legacy-peer-deps
```

### 启动开发服务器
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
app/
├── layout.tsx          # 全局布局 (Navbar + Footer)
├── page.tsx           # 首页 (Hero + 模板网格)
├── about/
│   └── page.tsx       # 关于页面
└── templates/
    └── [id]/
        └── page.tsx   # 模板详情页

components/
├── navbar.tsx         # 导航栏组件
├── footer.tsx         # 页脚组件
├── hero.tsx          # Hero 区域
├── template-card.tsx  # 模板卡片
└── template-grid.tsx  # 模板网格 + 筛选

lib/
└── templates.ts      # 模板数据

types/
└── resume.ts         # TypeScript 类型定义
```

## 网站结构

### 首页 (/) 功能
- Hero 区域：品牌价值展示 + CTA 按钮
- 模板网格：8个专业简历模板
- 分类筛选：按技术岗位筛选模板
- 统计展示：模板数量、成功案例

### 模板详情页 (/templates/[id])
- 模板预览
- 详细介绍
- 技术亮点
- 下载/收藏/分享功能

### 关于页面 (/about)
- 项目使命
- 设计理念
- 核心特性展示

## Next.js 16 配置

遵循 CLAUDE.md 规范：
- ✅ Turbopack 作为默认 bundler (`next dev`)
- ✅ 不使用 experimental.* 配置
- ✅ React Compiler 支持
- ✅ 所有页面使用 Server Component
- ✅ 类型安全的动态路由 (async/await params)

## 模板类型

1. **软件工程师简历** - 适合初中级工程师
2. **高级软件工程师** - 强调架构设计和领导力
3. **前端开发简历** - 专注前端技术栈
4. **后端开发简历** - 突出后端能力
5. **全栈工程师简历** - 展示端到端能力
6. **产品经理简历** - 强调产品思维
7. **数据科学家简历** - 突出数据分析和 ML 能力
8. **DevOps工程师** - 专注运维和自动化

## 开发说明

### 添加新模板
在 `lib/templates.ts` 中添加新模板对象：

```typescript
{
  id: 'your-template-id',
  name: '模板名称',
  description: '描述',
  category: '分类',
  techStack: ['技术1', '技术2'],
  previewImage: '/path/to/image',
  features: ['亮点1', '亮点2'],
  targetRole: '目标职位'
}
```

### 修改样式
- 全局样式：`app/globals.css`
- Tailwind 主题：`tailwind.config.ts`
- 颜色：`anthropic-*` 系列

## 浏览器支持

- Chrome / Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

## 许可证

MIT License - 可自由使用和修改

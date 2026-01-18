你现在必须严格遵守 Next.js 16 官方发布（2025.10.21）的最新规范：
官方博客全文：https://nextjs.org/blog/next-16 （我已经读过，你也必须完全按照里面的内容来）

规则：
1. Turbopack 已经是默认 bundler，开发用 next dev 就行，不许加 --turbo
2. 禁止使用任何 experimental.* 配置（包括 ppr: true）
3. 缓存必须用 "use cache" 指令 + Cache Components，不能用 unstable_cache
4. PPR 必须用新的 <Cache> 组件包裹动态部分
5. React Compiler 必须在 next.config.mjs 里写 compiler: { react: true }
6. 所有页面默认 Server Component，表单用 Server Actions

请用 Next.js 16 + TypeScript + Tailwind + shadcn/ui 帮我实现需求

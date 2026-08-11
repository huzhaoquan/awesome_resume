import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // elegant-luxury 主题色板：酒红主色 + 金点缀 + 暖米中性
        // 语义：50/100 底色 · 200/300 浅金/边框 · 400/500 中调 · 600/700 酒红主色 · 800/900/950 深文本
        anthropic: {
          // 保留的具名兼容键（极少用）
          dark: 'oklch(0.15 0.02 25)',     // 最深文本/暗背景
          light: 'oklch(0.9779 0.0042 56)', // 暖米亮背景
          'mid-gray': 'oklch(0.5553 0.1455 49)',
          'light-gray': 'oklch(0.9355 0.0324 80)',
          orange: '#d97757',    // 保留（极少用）
          blue: '#6a9bcc',      // 保留（极少用）
          green: '#788c5d',     // 保留（极少用）

          // oklch 酒红+暖金阶梯
          50: 'oklch(0.9779 0.0042 56.3756)',   // 暖米页面底
          100: 'oklch(0.9625 0.0385 89.0943)',  // 米黄徽章底
          200: 'oklch(0.9619 0.0580 95.6174)',  // 金浅强调底
          300: 'oklch(0.9355 0.0324 80.9937)',  // 暖边框
          400: 'oklch(0.5553 0.1455 48.9975)',  // 中调
          500: 'oklch(0.5054 0.1905 27.5181)',  // hover 中
          600: 'oklch(0.4650 0.1470 24.9381)',  // 酒红主色
          700: 'oklch(0.3958 0.1331 25.7230)',  // 深酒红 hover
          800: 'oklch(0.3000 0.1000 25)',       // 深文本
          900: 'oklch(0.2178 0 0)',             // 标题深
          950: 'oklch(0.1500 0.0200 25)',       // 最深
        }
      },
      fontFamily: {
        // elegant-luxury 字体：Poppins 正文 / Libre Baskerville 衬线展示 / IBM Plex Mono 等宽
        heading: ['var(--font-libre)', 'Georgia', 'serif'],
        serif: ['var(--font-libre)', 'Georgia', 'serif'],
        body: ['var(--font-poppins)', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['var(--font-poppins)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      borderRadius: {
        // elegant-luxury radius=0.375rem，更克制精致
        lg: '0.375rem',
        xl: '0.5rem',
        '2xl': '0.625rem',
      },
      boxShadow: {
        // 酒红色调晕染阴影（elegant-luxury shadow-color: hsl(0 63% 18%)）
        luxury: '1px 1px 16px -2px hsl(0 63% 18% / 0.12), 1px 1px 2px -3px hsl(0 63% 18% / 0.12)',
        'luxury-lg': '1px 1px 16px -2px hsl(0 63% 18% / 0.12), 1px 8px 10px -3px hsl(0 63% 18% / 0.12)',
        'luxury-xl': '1px 1px 16px -2px hsl(0 63% 18% / 0.30)',
      },
      letterSpacing: {
        tighter: 'calc(var(--tracking-normal, 0em) - 0.05em)',
        tight: 'calc(var(--tracking-normal, 0em) - 0.025em)',
        wide: 'calc(var(--tracking-normal, 0em) + 0.025em)',
        wider: 'calc(var(--tracking-normal, 0em) + 0.05em)',
        widest: 'calc(var(--tracking-normal, 0em) + 0.1em)',
      },
    },
  },
  plugins: [],
}
export default config

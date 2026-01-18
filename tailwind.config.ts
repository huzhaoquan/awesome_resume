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
        // Anthropic official brand colors
        anthropic: {
          // Main colors from brand guidelines
          dark: '#141413',     // Primary text and dark backgrounds
          light: '#faf9f5',     // Light backgrounds and text on dark
          'mid-gray': '#b0aea5', // Secondary elements
          'light-gray': '#e8e6dc', // Subtle backgrounds

          // Accent colors from brand guidelines
          orange: '#d97757',    // Primary accent
          blue: '#6a9bcc',      // Secondary accent
          green: '#788c5d',     // Tertiary accent

          // Extended palette for UI elements
          50: '#faf9f5',       // Light background
          100: '#f1f0ea',     // Light gray background
          200: '#e8e6dc',     // Subtle backgrounds
          300: '#d9d4c5',     // Light borders
          400: '#c1b9a7',     // Medium borders
          500: '#b0aea5',     // Secondary elements
          600: '#9a9584',     // Muted text
          700: '#7d7a6b',     // Secondary text
          800: '#5c5a4f',     // Primary secondary text
          900: '#3a3830',     // Dark secondary text
          950: '#141413',     // Primary text/dark backgrounds
        }
      },
      fontFamily: {
        // Anthropic brand fonts
        heading: ['Poppins', 'Arial', 'sans-serif'],
        body: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'], // fallback for existing code
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      }
    },
  },
  plugins: [],
}
export default config

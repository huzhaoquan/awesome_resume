/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler（Next.js 16 稳定配置项，启用方式为顶层 reactCompiler）
  reactCompiler: true,
  // Puppeteer配置 - 用于服务器端PDF生成
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
};

export default nextConfig;

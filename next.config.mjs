/** @type {import('next').NextConfig} */
const nextConfig = {
  // Puppeteer配置 - 用于服务器端PDF生成
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
};

export default nextConfig;

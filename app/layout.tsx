import type { Metadata } from 'next'
import { Poppins, Libre_Baskerville, IBM_Plex_Mono, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

// elegant-luxury 字体体系：Poppins 正文 / Libre Baskerville 衬线展示 / IBM Plex Mono 等宽
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' })
const libre = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-libre' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono' })
// Inter 保留作 body 回退，避免大段中文/拉丁正文重排失真
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Awesome Resume - 专业技术简历模板',
  description: '为技术从业者精心设计的简历模板网站，帮助您快速创建专业的技术简历',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="zh-CN"
      className={`${poppins.variable} ${libre.variable} ${plexMono.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

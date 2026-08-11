'use server'

import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { ResumeData } from '@/types/resume'
import { generateResumeHTML } from '@/lib/resume-html-generator'

interface ExportPDFResult {
  success: boolean
  pdfBase64?: string
  error?: string
}

/**
 * 服务器端PDF导出Server Action
 * 使用Puppeteer + Chromium生成高质量PDF
 */
export async function exportResumeToPDF(
  resumeData: ResumeData,
  templateId: string
): Promise<ExportPDFResult> {
  let browser

  try {
    console.log('[PDF Export] Starting PDF generation...')

    // 1. 启动浏览器
    const isDev = process.env.NODE_ENV === 'development'

    if (isDev) {
      // 本地开发环境 - 尝试多种方式获取可执行路径
      let executablePath: string | undefined

      // 尝试使用 @sparticuz/chromium 的路径（如果可用）
      try {
        executablePath = await chromium.executablePath()
      } catch {
        // 忽略错误，尝试其他方式
      }

      // 如果 @sparticuz/chromium 不可用，尝试常见的 Chrome 路径
      if (!executablePath) {
        const possiblePaths = [
          // Linux
          '/usr/bin/google-chrome',
          '/usr/bin/google-chrome-stable',
          '/usr/bin/chromium',
          '/usr/bin/chromium-browser',
          // macOS
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Chromium.app/Contents/MacOS/Chromium',
          // Windows (通过WSL或类似环境)
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        ]

        const fs = await import('fs')
        for (const path of possiblePaths) {
          try {
            if (fs.existsSync(path)) {
              executablePath = path
              console.log('[PDF Export] Found Chrome at:', path)
              break
            }
          } catch {
            // 忽略错误
          }
        }
      }

      if (!executablePath) {
        throw new Error('未找到Chrome/Chromium浏览器。请安装Chrome或将使用客户端导出。')
      }

      browser = await puppeteer.launch({
        headless: true,
        executablePath,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
        ],
      })
    } else {
      // 生产环境 - 使用@sparticuz/chromium (Vercel兼容)
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      })
    }

    const page = await browser.newPage()

    // 2. 生成HTML内容（按主题渲染，内部按 templateId 路由 + 兜底 mono）
    const htmlContent = generateResumeHTML(resumeData, templateId)

    // 3. 设置HTML内容
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // 4. 生成PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    })

    await browser.close()
    browser = undefined

    console.log('[PDF Export] PDF generated successfully')

    // 5. 返回Base64编码的PDF
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')
    return {
      success: true,
      pdfBase64,
    }
  } catch (error) {
    console.error('[PDF Export] Generation failed:', error)

    // 确保浏览器关闭
    if (browser) {
      try {
        await browser.close()
      } catch (e) {
        console.error('[PDF Export] Failed to close browser:', e)
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'PDF生成失败，请稍后重试',
    }
  }
}

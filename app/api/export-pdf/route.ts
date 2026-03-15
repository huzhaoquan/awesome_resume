import { NextRequest, NextResponse } from 'next/server'
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { ResumeData } from '@/types/resume'
import { generateAnthropicResumeHTML } from '@/lib/resume-html-generator'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ExportPDFRequest {
  resumeData: ResumeData
  templateId: string
}

export async function POST(request: NextRequest) {
  let browser

  try {
    console.log('[PDF API] Starting PDF generation...')

    const body: ExportPDFRequest = await request.json()
    const { resumeData, templateId } = body

    // 启动浏览器
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
    })

    const page = await browser.newPage()

    // 生成HTML内容
    let htmlContent: string
    if (templateId === 'anthropic-style') {
      htmlContent = generateAnthropicResumeHTML(resumeData)
    } else {
      htmlContent = generateAnthropicResumeHTML(resumeData)
    }

    // 设置HTML内容
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // 生成PDF
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

    console.log('[PDF API] PDF generated successfully')

    // 返回Base64编码的PDF
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')
    return NextResponse.json({
      success: true,
      pdfBase64,
    })
  } catch (error) {
    console.error('[PDF API] Generation failed:', error)

    // 确保浏览器关闭
    if (browser) {
      try {
        await browser.close()
      } catch (e) {
        console.error('[PDF API] Failed to close browser:', e)
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'PDF生成失败，请稍后重试',
      },
      { status: 500 }
    )
  }
}

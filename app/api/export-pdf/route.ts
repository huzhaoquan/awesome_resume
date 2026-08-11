import { NextRequest, NextResponse } from 'next/server'
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { PDFDocument } from 'pdf-lib'
import { ResumeData } from '@/types/resume'
import { generateResumeHTML } from '@/lib/resume-html-generator'
import { existsSync, copyFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

// A4 尺寸常量（位图分页方案用）
// 96dpi 下：210mm×297mm → 794×1123 CSS 像素；pt 下 → 595.28×841.89
const PAGE_W_PX = 794
const PAGE_H_PX = 1123
const PAGE_W_PT = 595.28
const PAGE_H_PT = 841.89
const MARGIN_MM = 10
// mm → px(96dpi) / pt(72dpi)
const MM_TO_PX = 96 / 25.4
const MM_TO_PT = 72 / 25.4
const BITMAP_SCALE = 2 // deviceScaleFactor，提高截图清晰度

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ExportPDFRequest {
  resumeData: ResumeData
  templateId: string
}

/**
 * @sparticuz/chromium 不携带任何 CJK 字形。它把 fonts.tar.br 解压到 /tmp/fonts（lambdafs
 * 取 basename 去后缀 → 'fonts'），并通过自带 fonts.conf 的 <dir>/tmp/fonts</dir> 扫描该目录。
 *
 * 关键结论：Chromium 的 page.pdf() 嵌入器对「base64 data URI 的 web 字体」不可靠
 * （屏幕渲染正常，但 PDF 里字体被丢弃 → 中文回退到 DejaVuSans → 豆腐块）。
 * 唯一可靠的办法是把 CJK 字体作为「真正的系统字体」放进 Chromium 扫描的 fontconfig 目录。
 *
 * 而且这一步**不需要 fc-cache**：Chromium 自带的 fontconfig 启动时会自行扫描 <dir> 列出的目录，
 * 只要 NotoSansSC-Regular.otf 与 Latin 字体并列躺在 /tmp/fonts/ 根目录，就能被发现。
 * （Vercel Lambda 没有 fontconfig/fc-cache，调 fc-cache 必然 status 127。）
 *
 * 本函数：把随项目打包的 NotoSansSC-Regular.otf 复制到 /tmp/fonts/ 根。
 * 模块级 flag 保证每个进程只装一次。
 */
const FONTCONFIG_DIR = join(tmpdir(), 'fonts') // /tmp/fonts（Chromium fonts.conf 所在目录 + fonts.tar 解压目标）
const FONT_INSTALL_DIR = FONTCONFIG_DIR // /tmp/fonts 根：CJK OTF 与 Latin 字体并列放这里
const BUNDLED_FONT = join(process.cwd(), 'public', 'fonts', 'NotoSansSC-Regular.otf')
let cjkFontInstalled = false

function ensureCjkSystemFont(): void {
  if (cjkFontInstalled) return
  try {
    if (!existsSync(BUNDLED_FONT)) {
      console.warn('[PDF API] Bundled NotoSansSC-Regular.otf not found at', BUNDLED_FONT)
      return
    }
    // 首次冷启动时 /tmp/fonts 可能还没被 chromium 解压出来，先建目录；
    // 之后 executablePath() 解压 fonts.tar.br 到同一目录，CJK OTF 与 Latin 并存。
    if (!existsSync(FONT_INSTALL_DIR)) {
      mkdirSync(FONT_INSTALL_DIR, { recursive: true })
    }
    const target = join(FONT_INSTALL_DIR, 'NotoSansSC-Regular.otf')
    if (!existsSync(target)) {
      copyFileSync(BUNDLED_FONT, target)
    }
    cjkFontInstalled = true
    console.log('[PDF API] CJK font placed at', target)
  } catch (e) {
    // 复制失败不致命：降级为无 CJK 系统字体（PDF 中文可能方格，auto 模式会回退位图）
    console.warn('[PDF API] Failed to place CJK font:', e)
  }
}

/**
 * 启发式判断 page.pdf() 产物是否真的嵌入了 CJK 字形。
 *
 * PDFium 在不嵌入 CJK 时，PDF 的 ToUnicode CMap / 字体流里不会出现
 * CJK 区段（U+4E00–U+9FFF 等）的码点。这里把 PDF 当二进制扫一遍，
 * 检查是否出现 CJK 字符的 UTF-16BE 字节序列（PDF 文本编码常用 UTF-16BE）。
 *
 * 注意：这是「足够实用」的启发式，不是严格的 PDF 解析。
 * 返回 true = 检测到 CJK 被嵌入（矢量 PDF 可用）；false = 大概率方格，需回退位图。
 */
function pdfHasEmbeddedCjk(pdfBytes: Uint8Array): boolean {
  // 仅扫描前 2MB，避免大文件全量扫描；CJK ToUnicode 通常在文档前部
  const sample = pdfBytes.length > 2 * 1024 * 1024 ? pdfBytes.subarray(0, 2 * 1024 * 1024) : pdfBytes
  const buf = Buffer.from(sample)
  // CJK 统一表意文字 UTF-16BE：0x4E00–0x9FFF → 高字节 0x4E..0x9F，低字节任意
  // 找连续的「高字节落在 CJK 区段」的对，至少命中若干次才算真嵌入
  let hits = 0
  for (let i = 0; i + 1 < buf.length; i += 2) {
    const hi = buf[i]
    if (hi >= 0x4e && hi <= 0x9f) {
      hits++
      if (hits >= 8) return true // 命中够多，认定嵌入成功
    }
  }
  return false
}

/**
 * 位图方案：page.screenshot() 逐页截图 → pdf-lib 组装多页 A4 PDF。
 * 用于 page.pdf() 的 PDFium 后端不嵌入 CJK 字体时的降级。
 * 位图天然携带字形像素，中文 100% 不方格；代价是文字不可选、按像素分页。
 */
async function generateBitmapPdf(page: import('puppeteer-core').Page): Promise<Uint8Array> {
  const marginPx = Math.round(MARGIN_MM * MM_TO_PX)
  const marginPt = MARGIN_MM * MM_TO_PT

  // 读取正文实际高度，按可用页高算页数
  const totalHeight = await page.evaluate(() =>
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
  )
  const availH = PAGE_H_PX - marginPx * 2
  const pageCount = Math.max(1, Math.ceil((totalHeight - marginPx) / availH))

  const pdfDoc = await PDFDocument.create()
  const contentW = PAGE_W_PX - marginPx * 2

  for (let i = 0; i < pageCount; i++) {
    const y = marginPx + i * availH
    const sliceH = Math.min(availH, totalHeight - y)
    if (sliceH <= 0) break

    const png = await page.screenshot({
      type: 'png',
      clip: { x: marginPx, y, width: contentW, height: sliceH },
      omitBackground: false,
    })

    const img = await pdfDoc.embedPng(png as unknown as Uint8Array)
    const pdfPage = pdfDoc.addPage([PAGE_W_PT, PAGE_H_PT])
    const drawW = PAGE_W_PT - marginPt * 2
    const drawH = (sliceH * drawW) / contentW
    pdfPage.drawImage(img, {
      x: marginPt,
      y: PAGE_H_PT - marginPt - drawH, // 贴顶部，下方自然留白
      width: drawW,
      height: drawH,
    })
  }

  return pdfDoc.save()
}

export async function POST(request: NextRequest) {
  let browser

  try {
    console.log('[PDF API] Starting PDF generation...')

    const body: ExportPDFRequest = await request.json()
    const { resumeData, templateId } = body
    // 导出模式：
    //   - 'vector'（默认）：page.pdf() 矢量，文字可选/可搜索、ATS 友好、天然分页。
    //   - 'bitmap'：screenshot 位图降级，用于 PDFium 不嵌入 CJK 的环境。
    //   - 'auto'：先矢量，再用启发式自检；检测到 CJK 方格则回退位图。
    const mode = (new URL(request.url).searchParams.get('mode') ?? 'vector') as
      | 'vector'
      | 'bitmap'
      | 'auto'

    // 关键前置：先把 Noto Sans SC 装进 Chromium 的 fontconfig 目录。
    // 必须在 puppeteer.launch 之前完成，否则 Chromium 启动时读不到新字体。
    // 两种模式都需要：矢量模式靠它让 PDFium 嵌入 CJK，位图模式靠它让屏幕渲染 CJK。
    ensureCjkSystemFont()

    // 启动浏览器
    // 关键：把 FONTCONFIG_PATH 注入 Chromium 子进程环境。
    // ensureCjkSystemFont() 把字体装进了 /tmp/fonts（由 @sparticuz/chromium 的
    // fonts.conf 声明 <dir>/tmp/fonts</dir>），但只在 fc-cache 子进程里设过该 env。
    // Chromium 启动时若没有 FONTCONFIG_PATH，会回退到系统默认 fontconfig（查不到 CJK），
    // 导致 page.pdf() 和 page.screenshot() 都渲染成方格。这里显式传入即可命中。
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      env: {
        ...process.env,
        FONTCONFIG_PATH: FONTCONFIG_DIR, // /tmp/fonts —— 让 Chromium 用自带 fonts.conf
        FONTCONFIG_FILE: join(FONTCONFIG_DIR, 'fonts.conf'), // 双保险：显式指向 conf
      },
    })

    const page = await browser.newPage()

    // 设定 A4 宽度视口 + 2x 缩放，保证矢量与位图两种路径都基于 A4 渲染尺寸
    await page.setViewport({
      width: PAGE_W_PX,
      height: PAGE_H_PX,
      deviceScaleFactor: BITMAP_SCALE,
    })

    // 生成HTML内容（按主题渲染，内部按 templateId 路由 + 兜底 mono）
    const htmlContent = generateResumeHTML(resumeData, templateId)

    // 设置HTML内容
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // 等待字体就绪。系统字体加载很快，这里主要是兜底，保证 PDF 嵌入完整。
    await page.evaluate(async () => {
      const doc = document as Document & { fonts?: { ready: Promise<unknown> } }
      if (doc.fonts?.ready) {
        try {
          await doc.fonts.ready
        } catch {
          /* 个别字体加载失败不阻塞 */
        }
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 500))

    let pdfBuffer: Uint8Array
    let usedMode: 'vector' | 'bitmap'

    if (mode === 'bitmap') {
      pdfBuffer = await generateBitmapPdf(page)
      usedMode = 'bitmap'
    } else {
      // 矢量模式（含 auto 的首选）
      const vectorPdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: `${MARGIN_MM}mm`,
          right: `${MARGIN_MM}mm`,
          bottom: `${MARGIN_MM}mm`,
          left: `${MARGIN_MM}mm`,
        },
      })

      if (mode === 'auto') {
        // 启发式自检：统计矢量 PDF 文本流里的 CJK 字形引用是否被嵌入。
        // PDFium 不嵌 CJK 时，PDF 里找不到 CJK 的 ToUnicode 条目。
        const looksCjkBroken = !pdfHasEmbeddedCjk(vectorPdf)
        if (looksCjkBroken) {
          console.warn(
            '[PDF API] vector PDF 似乎未嵌入 CJK（自检失败），回退到 bitmap 模式'
          )
          pdfBuffer = await generateBitmapPdf(page)
          usedMode = 'bitmap'
        } else {
          pdfBuffer = vectorPdf
          usedMode = 'vector'
        }
      } else {
        pdfBuffer = vectorPdf
        usedMode = 'vector'
      }
    }

    await browser.close()
    browser = undefined

    console.log(`[PDF API] PDF generated successfully (mode=${usedMode})`)

    // 返回Base64编码的PDF（带实际使用的模式，便于前端/调试识别）
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')
    return NextResponse.json({
      success: true,
      pdfBase64,
      mode: usedMode,
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

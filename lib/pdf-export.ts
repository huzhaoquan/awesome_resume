import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * PDF导出配置
 */
interface PDFExportOptions {
  /** PDF文件名 */
  filename?: string
  /** 页边距（毫米） */
  margin?: number
  /** 纸张方向 */
  orientation?: 'portrait' | 'landscape'
}

/**
 * 将HTML元素导出为PDF文件
 * 支持自动分页
 */
export async function exportElementToPDF(
  element: HTMLElement,
  options: PDFExportOptions = {}
): Promise<void> {
  const {
    filename = 'resume.pdf',
    margin = 10,
    orientation = 'portrait'
  } = options

  try {
    // 1. 使用html2canvas将DOM转换为Canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 提高清晰度
      useCORS: true, // 允许跨域图片
      logging: false, // 关闭日志
      backgroundColor: '#ffffff', // 背景色
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    })

    // 2. 创建PDF文档（A4纸张）
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4'
    })

    // A4纸张尺寸（毫米）
    const pageWidth = 210
    const pageHeight = 297
    const contentWidth = pageWidth - margin * 2
    const contentHeight = pageHeight - margin * 2

    // 计算Canvas在PDF中的尺寸
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const imgWidth = contentWidth
    const imgHeight = (canvasHeight * imgWidth) / canvasWidth

    // 将Canvas转换为图片数据
    const imgData = canvas.toDataURL('image/png')

    // 3. 处理分页
    let heightLeft = imgHeight
    let position = margin
    let pageNumber = 1

    // 添加第一页
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight)
    heightLeft -= contentHeight

    // 如果内容超过一页，添加更多页面
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight)
      heightLeft -= contentHeight
      pageNumber++
    }

    // 4. 保存PDF文件
    pdf.save(filename)

    console.log(`PDF exported successfully: ${filename} (${pageNumber} pages)`)
  } catch (error) {
    console.error('Failed to export PDF:', error)
    throw new Error('PDF导出失败，请重试')
  }
}

/**
 * 从DOM元素ID导出PDF
 */
export async function exportById(
  elementId: string,
  options?: PDFExportOptions
): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`)
  }
  return exportElementToPDF(element, options)
}

/**
 * 从ref导出PDF（用于React）
 */
export async function exportFromRef<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options?: PDFExportOptions
): Promise<void> {
  const element = ref.current
  if (!element) {
    throw new Error('Element ref is null')
  }
  return exportElementToPDF(element, options)
}

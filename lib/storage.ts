import { ResumeData } from '@/types/resume'

// 草稿数据结构
export interface ResumeDraft {
  data: ResumeData
  templateId: string
  timestamp: string
  version: string
}

// 存储键名
const DRAFT_KEY = 'resume-draft'
const SAVED_RESUMES_KEY = 'saved-resumes'
const DRAFT_VERSION = '1.0'

// 本地存储工具类
export class ResumeStorage {
  // 保存草稿
  static saveDraft(data: ResumeData, templateId: string): void {
    try {
      const draft: ResumeDraft = {
        data,
        templateId,
        timestamp: new Date().toISOString(),
        version: DRAFT_VERSION
      }
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch (error) {
      console.error('Failed to save draft:', error)
      throw new Error('草稿保存失败')
    }
  }

  // 加载草稿
  static loadDraft(templateId?: string): ResumeDraft | null {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return null

      const draft: ResumeDraft = JSON.parse(raw)

      // 如果提供了templateId，需要匹配
      if (templateId && draft.templateId !== templateId) {
        return null
      }

      return draft
    } catch (error) {
      console.error('Failed to load draft:', error)
      return null
    }
  }

  // 清除草稿
  static clearDraft(): void {
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch (error) {
      console.error('Failed to clear draft:', error)
    }
  }

  // 获取所有保存的简历（本地版本）
  static getSavedResumes(): Array<{ id: string; name: string; templateId: string; savedAt: string }> {
    try {
      const raw = localStorage.getItem(SAVED_RESUMES_KEY)
      if (!raw) return []

      return JSON.parse(raw)
    } catch (error) {
      console.error('Failed to load saved resumes:', error)
      return []
    }
  }

  // 保存简历元数据（本地版本）
  static saveResumeMetadata(resume: { id: string; name: string; templateId: string }): void {
    try {
      const resumes = this.getSavedResumes()
      const existingIndex = resumes.findIndex(r => r.id === resume.id)

      const metadata = {
        ...resume,
        savedAt: new Date().toISOString()
      }

      if (existingIndex >= 0) {
        resumes[existingIndex] = metadata
      } else {
        resumes.push(metadata)
      }

      localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(resumes))
    } catch (error) {
      console.error('Failed to save resume metadata:', error)
    }
  }

  // 删除简历元数据（本地版本）
  static deleteResumeMetadata(resumeId: string): void {
    try {
      const resumes = this.getSavedResumes()
      const filtered = resumes.filter(r => r.id !== resumeId)
      localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error('Failed to delete resume metadata:', error)
    }
  }

  // 导出数据（用于备份）
  static exportData(data: ResumeData, templateId: string): Blob {
    const exportData = {
      data,
      templateId,
      exportedAt: new Date().toISOString(),
      version: DRAFT_VERSION
    }

    return new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    })
  }

  // 导入数据（用于恢复）
  static importData(file: File): Promise<ResumeDraft> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const imported = JSON.parse(content)

          // 验证数据结构
          if (!imported.data || !imported.templateId) {
            throw new Error('无效的数据格式')
          }

          resolve(imported as ResumeDraft)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => {
        reject(new Error('文件读取失败'))
      }

      reader.readAsText(file)
    })
  }

  // 检查存储空间
  static getStorageInfo() {
    try {
      const total = 1024 * 1024 * 5 // 5MB typical limit
      let used = 0

      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length
        }
      }

      return {
        used,
        total,
        available: total - used,
        percentUsed: (used / total) * 100
      }
    } catch (error) {
      console.error('Failed to get storage info:', error)
      return null
    }
  }

  // 清理旧数据（保留最近3份草稿）
  static cleanup(): void {
    try {
      const resumes = this.getSavedResumes()
      if (resumes.length > 3) {
        // 按时间排序，保留最新的3份
        const sorted = resumes
          .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
          .slice(0, 3)

        localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(sorted))
      }

      // 清理超过7天的草稿
      const draft = this.loadDraft()
      if (draft) {
        const daysSince = (Date.now() - new Date(draft.timestamp).getTime()) / (1000 * 60 * 60 * 24)
        if (daysSince > 7) {
          this.clearDraft()
        }
      }
    } catch (error) {
      console.error('Failed to cleanup storage:', error)
    }
  }
}

// 导出单例
export default ResumeStorage

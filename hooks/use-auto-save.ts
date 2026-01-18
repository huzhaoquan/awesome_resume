import { useEffect, useRef, useState, useCallback } from 'react'
import { ResumeData } from '@/types/resume'
import { ResumeStorage, ResumeDraft } from '@/lib/storage'

interface UseAutoSaveOptions {
  enabled?: boolean
  interval?: number // 毫秒
  onSave?: () => void
  onError?: (error: Error) => void
}

interface UseAutoSaveReturn {
  saveNow: () => void
  isSupported: boolean
  lastSaved: string | null
}

export function useAutoSave(
  data: ResumeData,
  templateId: string,
  options: UseAutoSaveOptions = {}
): UseAutoSaveReturn {
  const {
    enabled = true,
    interval = 30000, // 默认30秒
    onSave,
    onError
  } = options

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isSupported = typeof window !== 'undefined' && !!window.localStorage
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  // 手动保存函数
  const saveNow = useCallback(() => {
    if (!isSupported || !enabled) return

    try {
      ResumeStorage.saveDraft(data, templateId)
      const now = new Date().toISOString()
      setLastSaved(now)
      onSave?.()
    } catch (error) {
      console.error('Auto-save failed:', error)
      onError?.(error as Error)
    }
  }, [data, templateId, isSupported, enabled, onSave, onError])

  // 自动保存effect
  useEffect(() => {
    if (!isSupported || !enabled) return

    // 立即保存一次
    saveNow()

    // 设置定时器
    intervalRef.current = setInterval(() => {
      saveNow()
    }, interval)

    // 清理函数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [interval, enabled, isSupported, saveNow])

  // 页面卸载前保存
  useEffect(() => {
    if (!isSupported || !enabled) return

    const handleBeforeUnload = () => {
      saveNow()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isSupported, enabled, saveNow])

  // 可见性变化时保存（切换标签页）
  useEffect(() => {
    if (!isSupported || !enabled) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveNow()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isSupported, enabled, saveNow])

  return {
    saveNow,
    isSupported,
    lastSaved
  }
}

// Hook: 恢复草稿
export function useDraftResume(templateId?: string): {
  draft: ResumeDraft | null
  loadDraft: () => ResumeDraft | null
  clearDraft: () => void
} {
  const isSupported = typeof window !== 'undefined' && !!window.localStorage

  const [draft, setDraft] = useState<ResumeDraft | null>(null)

  // 加载草稿
  const loadDraft = useCallback(() => {
    if (!isSupported) return null

    const loaded = ResumeStorage.loadDraft(templateId)
    setDraft(loaded)
    return loaded
  }, [isSupported, templateId])

  // 清除草稿
  const clearDraft = useCallback(() => {
    if (!isSupported) return

    ResumeStorage.clearDraft()
    setDraft(null)
  }, [isSupported])

  // 组件挂载时自动加载
  useEffect(() => {
    loadDraft()
  }, [loadDraft])

  return {
    draft,
    loadDraft,
    clearDraft
  }
}

// Hook: 清理旧数据
export function useStorageCleanup(): void {
  const isSupported = typeof window !== 'undefined' && !!window.localStorage

  useEffect(() => {
    if (!isSupported) return

    // 组件挂载时执行一次清理
    ResumeStorage.cleanup()

    // 每24小时清理一次
    const interval = setInterval(() => {
      ResumeStorage.cleanup()
    }, 24 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [isSupported])
}

export default useAutoSave

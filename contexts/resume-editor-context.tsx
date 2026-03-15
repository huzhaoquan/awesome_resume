'use client'

import { createContext, useContext, useCallback, useReducer, ReactNode, useEffect } from 'react'
import { ResumeData } from '@/types/resume'
import { sampleAnthropicResume } from '@/components/templates/anthropic'
import { exportElementToPDF } from '@/lib/pdf-export'

// 编辑器状态接口
interface EditorState {
  data: ResumeData
  isEditing: boolean
  isDirty: boolean
  lastSaved: Date | null
  selectedSection: string | null
  isExporting: boolean
}

// Action类型
export type EditorAction =
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'SET_DATA'; payload: ResumeData }
  | { type: 'UPDATE_DATA'; payload: (data: ResumeData) => ResumeData }
  | { type: 'SET_DIRTY'; payload: boolean }
  | { type: 'SET_SAVED'; payload: Date }
  | { type: 'SELECT_SECTION'; payload: string | null }
  | { type: 'SET_EXPORTING'; payload: boolean }

// Context值接口
interface ResumeEditorContextType extends EditorState {
  // 编辑控制
  setEditing: (editing: boolean) => void
  setData: (data: ResumeData) => void
  updateData: (updater: (data: ResumeData) => ResumeData) => void

  // 分块更新方法
  updateHeader: (updates: Partial<ResumeData['header']>) => void
  updateSummary: (summary: string) => void

  // 工作经历
  addExperience: () => void
  updateExperience: (id: string, updates: Partial<ResumeData['experience'][0]>) => void
  deleteExperience: (id: string) => void

  // 教育背景
  addEducation: () => void
  updateEducation: (id: string, updates: Partial<ResumeData['education'][0]>) => void
  deleteEducation: (id: string) => void

  // 技能
  updateSkillCategory: (index: number, updates: Partial<ResumeData['skills'][0]>) => void
  addSkillToCategory: (categoryIndex: number, skill: string) => void
  removeSkillFromCategory: (categoryIndex: number, skillIndex: number) => void

  // 项目经验
  addProject: () => void
  updateProject: (id: string, updates: Partial<NonNullable<ResumeData['projects']>[0]>) => void
  deleteProject: (id: string) => void

  // 认证证书
  addCertification: () => void
  updateCertification: (id: string, updates: Partial<NonNullable<ResumeData['certifications']>[0]>) => void
  deleteCertification: (id: string) => void

  // 保存与导出
  saveResume: () => Promise<string>
  exportToPDF: (previewElement: HTMLElement | null) => Promise<void>
  exportToPDFServer: () => Promise<void>
  resetChanges: () => void
}

// Reducer实现
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_EDITING':
      return { ...state, isEditing: action.payload }

    case 'SET_DATA':
      return { ...state, data: action.payload, isDirty: true }

    case 'UPDATE_DATA':
      return { ...state, data: action.payload(state.data), isDirty: true }

    case 'SET_DIRTY':
      return { ...state, isDirty: action.payload }

    case 'SET_SAVED':
      return { ...state, lastSaved: action.payload, isDirty: false }

    case 'SELECT_SECTION':
      return { ...state, selectedSection: action.payload }

    case 'SET_EXPORTING':
      return { ...state, isExporting: action.payload }

    default:
      return state
  }
}

// 初始状态
const initialState: EditorState = {
  data: sampleAnthropicResume,
  isEditing: false,
  isDirty: false,
  lastSaved: null,
  selectedSection: null,
  isExporting: false
}

// Context创建
const ResumeEditorContext = createContext<ResumeEditorContextType | undefined>(undefined)

// Provider组件
interface ResumeEditorProviderProps {
  children: ReactNode
  initialResumeData?: ResumeData
}

export function ResumeEditorProvider({
  children,
  initialResumeData
}: ResumeEditorProviderProps) {
  const [state, dispatch] = useReducer(editorReducer, {
    ...initialState,
    data: initialResumeData || initialState.data
  })

  // 编辑控制
  const setEditing = useCallback((editing: boolean) => {
    dispatch({ type: 'SET_EDITING', payload: editing })
  }, [])

  const setData = useCallback((data: ResumeData) => {
    dispatch({ type: 'SET_DATA', payload: data })
  }, [])

  const updateData = useCallback((updater: (data: ResumeData) => ResumeData) => {
    dispatch({ type: 'UPDATE_DATA', payload: updater })
  }, [])

  // 头部信息更新
  const updateHeader = useCallback((updates: Partial<ResumeData['header']>) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        header: { ...data.header, ...updates }
      })
    })
  }, [])

  // 职业概述更新
  const updateSummary = useCallback((summary: string) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({ ...data, summary })
    })
  }, [])

  // 工作经历操作
  const addExperience = useCallback(() => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        experience: [
          ...data.experience,
          {
            id: Date.now().toString(),
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
            achievements: [],
            techStack: []
          }
        ]
      })
    })
  }, [])

  const updateExperience = useCallback((id: string, updates: Partial<ResumeData['experience'][0]>) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        experience: data.experience.map(exp =>
          exp.id === id ? { ...exp, ...updates } : exp
        )
      })
    })
  }, [])

  const deleteExperience = useCallback((id: string) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        experience: data.experience.filter(exp => exp.id !== id)
      })
    })
  }, [])

  // 教育背景操作
  const addEducation = useCallback(() => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        education: [
          ...data.education,
          {
            id: Date.now().toString(),
            school: '',
            degree: '',
            major: '',
            location: '',
            startDate: '',
            endDate: '',
            gpa: '',
            honors: []
          }
        ]
      })
    })
  }, [])

  const updateEducation = useCallback((id: string, updates: Partial<ResumeData['education'][0]>) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        education: data.education.map(edu =>
          edu.id === id ? { ...edu, ...updates } : edu
        )
      })
    })
  }, [])

  const deleteEducation = useCallback((id: string) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        education: data.education.filter(edu => edu.id !== id)
      })
    })
  }, [])

  // 技能操作
  const updateSkillCategory = useCallback((index: number, updates: Partial<ResumeData['skills'][0]>) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        skills: data.skills.map((category, i) =>
          i === index ? { ...category, ...updates } : category
        )
      })
    })
  }, [])

  const addSkillToCategory = useCallback((categoryIndex: number, skill: string) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        skills: data.skills.map((category, i) =>
          i === categoryIndex
            ? { ...category, skills: [...category.skills, skill] }
            : category
        )
      })
    })
  }, [])

  const removeSkillFromCategory = useCallback((categoryIndex: number, skillIndex: number) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        skills: data.skills.map((category, i) =>
          i === categoryIndex
            ? {
                ...category,
                skills: category.skills.filter((_, j) => j !== skillIndex)
              }
            : category
        )
      })
    })
  }, [])

  // 项目经验操作
  const addProject = useCallback(() => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        projects: [
          ...(data.projects || []),
          {
            id: Date.now().toString(),
            name: '',
            description: '',
            techStack: [],
            achievements: [],
            link: ''
          }
        ]
      })
    })
  }, [])

  const updateProject = useCallback((id: string, updates: Partial<NonNullable<ResumeData['projects']>[0]>) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        projects: (data.projects || []).map(project =>
          project.id === id ? { ...project, ...updates } : project
        )
      })
    })
  }, [])

  const deleteProject = useCallback((id: string) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        projects: (data.projects || []).filter(project => project.id !== id)
      })
    })
  }, [])

  // 认证证书操作
  const addCertification = useCallback(() => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        certifications: [
          ...(data.certifications || []),
          {
            id: Date.now().toString(),
            name: '',
            issuer: '',
            date: '',
            credentialId: ''
          }
        ]
      })
    })
  }, [])

  const updateCertification = useCallback((id: string, updates: Partial<NonNullable<ResumeData['certifications']>[0]>) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        certifications: (data.certifications || []).map(cert =>
          cert.id === id ? { ...cert, ...updates } : cert
        )
      })
    })
  }, [])

  const deleteCertification = useCallback((id: string) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: (data) => ({
        ...data,
        certifications: (data.certifications || []).filter(cert => cert.id !== id)
      })
    })
  }, [])

  // 保存与导出
  const saveResume = useCallback(async (): Promise<string> => {
    // TODO: 实现保存到SQLite
    dispatch({ type: 'SET_SAVED', payload: new Date() })
    return Promise.resolve(Date.now().toString())
  }, [])

  const exportToPDF = useCallback(async (previewElement: HTMLElement | null): Promise<void> => {
    if (!previewElement) {
      console.error('Preview element not found')
      throw new Error('预览区域未找到，无法导出PDF')
    }

    dispatch({ type: 'SET_EXPORTING', payload: true })

    try {
      // 生成文件名：姓名_简历_日期.pdf
      const filename = `${state.data.header.name || '简历'}_简历_${new Date().toISOString().split('T')[0]}.pdf`

      await exportElementToPDF(previewElement, {
        filename,
        margin: 10,
        orientation: 'portrait'
      })

      console.log('PDF exported successfully (client-side)')
    } catch (error) {
      console.error('Failed to export PDF:', error)
      throw error
    } finally {
      dispatch({ type: 'SET_EXPORTING', payload: false })
    }
  }, [state.data.header.name])

  // 服务器端PDF导出（高质量）- 通过API Route
  const exportToPDFServer = useCallback(async (): Promise<void> => {
    dispatch({ type: 'SET_EXPORTING', payload: true })

    try {
      console.log('Starting server-side PDF export via API...')

      // 调用API Route
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData: state.data,
          templateId: 'anthropic-style',
        }),
      })

      const result = await response.json()

      if (!result.success || !result.pdfBase64) {
        throw new Error(result.error || 'PDF生成失败')
      }

      // 下载PDF
      const filename = `${state.data.header.name || '简历'}_简历_${new Date().toISOString().split('T')[0]}.pdf`
      const link = document.createElement('a')
      link.href = `data:application/pdf;base64,${result.pdfBase64}`
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      console.log('PDF exported successfully (server-side via API)')
    } catch (error) {
      console.error('Server-side PDF export failed:', error)
      throw error
    } finally {
      dispatch({ type: 'SET_EXPORTING', payload: false })
    }
  }, [state.data])

  const resetChanges = useCallback(() => {
    dispatch({ type: 'SET_DATA', payload: initialResumeData || sampleAnthropicResume })
    dispatch({ type: 'SET_DIRTY', payload: false })
  }, [initialResumeData])

  const value: ResumeEditorContextType = {
    ...state,
    setEditing,
    setData,
    updateData,
    updateHeader,
    updateSummary,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    updateSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    saveResume,
    exportToPDF,
    exportToPDFServer,
    resetChanges
  }

  return (
    <ResumeEditorContext.Provider value={value}>
      {children}
    </ResumeEditorContext.Provider>
  )
}

// Hook使用
export function useResumeEditor() {
  const context = useContext(ResumeEditorContext)
  if (!context) {
    throw new Error('useResumeEditor must be used within a ResumeEditorProvider')
  }
  return context
}

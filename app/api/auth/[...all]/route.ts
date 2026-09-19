import { auth } from '@/lib/auth/server'
import { toNextJsHandler } from 'better-auth/next-js'

// 承接全部 /api/auth/* 请求（含 Google OAuth 回调）
export const { GET, POST } = toNextJsHandler(auth)

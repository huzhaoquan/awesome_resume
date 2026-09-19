import { createAuthClient } from 'better-auth/react'

// 无参创建：默认请求当前域名的 /api/auth
export const authClient = createAuthClient()

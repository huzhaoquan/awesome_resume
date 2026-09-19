import { betterAuth } from 'better-auth'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { nextCookies } from 'better-auth/next-js'
// 使用相对路径：Better Auth CLI（jiti 加载）不解析 @/ 别名
import { db } from '../db'
import * as schema from '../db/schema'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    // MVP：注册即登录，不发验证邮件；后续可开启邮箱验证
    requireEmailVerification: false,
  },
  socialProviders: {
    // 凭证未配置时 Better Auth 自动忽略该 provider，登录页同步隐藏按钮
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    // 微信等后续 Provider 在此追加，无需改动其他层
  },
  plugins: [
    // 必须放在最后一位：让 Server Action 中 auth.api.* 的 Set-Cookie 自动写入
    nextCookies(),
  ],
})

// 供页面/组件推断会话类型
export type Session = typeof auth.$Infer.Session

'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/server'
import { isAPIError } from 'better-auth/api'

export interface AuthFormState {
  error?: string
}

// Better Auth 错误码 → 中文提示
const ERROR_MESSAGES: Record<string, string> = {
  USER_ALREADY_EXISTS: '该邮箱已被注册，请直接登录',
  INVALID_EMAIL_OR_PASSWORD: '邮箱或密码错误',
  INVALID_PASSWORD: '密码至少 8 位，请重新设置',
  INVALID_EMAIL: '邮箱格式不正确',
  PASSWORD_TOO_SHORT: '密码至少 8 位，请重新设置',
  PASSWORD_TOO_LONG: '密码过长，请更换较短的密码',
  USER_DISABLED: '该账号已被禁用',
  FAILED_TO_CREATE_USER: '创建用户失败，请稍后重试',
  FAILED_TO_CREATE_SESSION: '创建会话失败，请稍后重试',
}

function toMessage(error: unknown, fallback: string): string {
  if (isAPIError(error)) {
    // Better Auth 错误码位于 error.body.code
    const body = error.body as { code?: string; message?: string } | undefined
    const code = body?.code ?? ''
    return ERROR_MESSAGES[code] ?? body?.message ?? error.message ?? fallback
  }
  return fallback
}

export async function registerAction(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!name || !email || !password) return { error: '请填写完整信息' }
  if (password.length < 8) return { error: '密码至少 8 位' }

  try {
    // autoSignIn 默认开启：注册即登录，Cookie 由 nextCookies() 插件写入
    await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await headers(),
    })
  } catch (error) {
    return { error: toMessage(error, '注册失败，请稍后重试') }
  }
  // redirect() 以抛异常实现，必须放在 try/catch 之外
  redirect('/account')
}

export async function loginAction(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) return { error: '请填写邮箱和密码' }

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    })
  } catch (error) {
    return { error: toMessage(error, '邮箱或密码错误') }
  }
  redirect('/account')
}

export async function loginWithGoogleAction(): Promise<void> {
  let url: string | undefined
  try {
    const result = await auth.api.signInSocial({
      body: { provider: 'google', callbackURL: '/account' },
      headers: await headers(),
    })
    url = result?.url
  } catch {
    redirect('/login?error=google_unavailable')
  }
  if (!url) redirect('/login?error=google_unavailable')
  // 跳转 Google 授权页，回调由 /api/auth/callback/google 承接
  redirect(url)
}

export async function signOutAction(): Promise<void> {
  await auth.api.signOut({ headers: await headers() })
  redirect('/')
}

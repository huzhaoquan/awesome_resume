'use client'

import { useActionState, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  loginAction,
  registerAction,
  loginWithGoogleAction,
  type AuthFormState,
} from '@/app/actions/auth'

const initial: AuthFormState = {}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export function LoginForm({ googleEnabled }: { googleEnabled: boolean }) {
  const [loginState, loginSubmit, loginPending] = useActionState(loginAction, initial)
  const [registerState, registerSubmit, registerPending] = useActionState(registerAction, initial)
  // 注册表单的两次密码一致性提示（纯客户端校验）
  const [confirmError, setConfirmError] = useState('')

  function handleRegisterSubmit(formData: FormData) {
    const password = String(formData.get('password') ?? '')
    const confirm = String(formData.get('confirmPassword') ?? '')
    if (password !== confirm) {
      setConfirmError('两次输入的密码不一致')
      return
    }
    setConfirmError('')
    registerSubmit(formData)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">登录</TabsTrigger>
          <TabsTrigger value="register">注册</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-4">
          <form action={loginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">邮箱</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">密码</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                placeholder="请输入密码"
                autoComplete="current-password"
                required
              />
            </div>
            {loginState.error && (
              <p className="text-sm text-destructive">{loginState.error}</p>
            )}
            <Button type="submit" disabled={loginPending} className="purple-button w-full">
              {loginPending ? '登录中…' : '登录'}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="register" className="mt-4">
          <form action={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">姓名</Label>
              <Input
                id="register-name"
                name="name"
                type="text"
                placeholder="你的名字"
                autoComplete="name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">邮箱</Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">密码</Label>
              <Input
                id="register-password"
                name="password"
                type="password"
                placeholder="至少 8 位"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirm">确认密码</Label>
              <Input
                id="register-confirm"
                name="confirmPassword"
                type="password"
                placeholder="再输入一次密码"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            {confirmError && <p className="text-sm text-destructive">{confirmError}</p>}
            {registerState.error && (
              <p className="text-sm text-destructive">{registerState.error}</p>
            )}
            <Button type="submit" disabled={registerPending} className="purple-button w-full">
              {registerPending ? '创建中…' : '创建账号'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      {googleEnabled && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-anthropic-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">或</span>
            </div>
          </div>
          <form action={loginWithGoogleAction}>
            <Button variant="outline" type="submit" className="w-full border-anthropic-200">
              <GoogleIcon className="mr-2 h-4 w-4 text-[#4285F4]" />
              使用 Google 账号继续
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

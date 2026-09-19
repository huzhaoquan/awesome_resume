import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: '登录 - Awesome Resume',
  description: '登录 Awesome Resume，保存和同步你的简历',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-anthropic-50/40 px-4 py-16">
      <div className="w-full max-w-md">
        <Card className="border-anthropic-200/60 shadow-luxury">
          <CardHeader className="text-center">
            <CardTitle className="font-serif">欢迎回来</CardTitle>
            <CardDescription>登录以保存和同步你的简历</CardDescription>
          </CardHeader>
          <CardContent>
            {error === 'google_unavailable' && (
              <p className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                Google 登录暂不可用，请稍后重试或使用邮箱登录
              </p>
            )}
            <LoginForm googleEnabled={googleEnabled} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

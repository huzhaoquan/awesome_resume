import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { LogOut, Mail, ShieldCheck } from 'lucide-react'
import { auth } from '@/lib/auth/server'
import { db } from '@/lib/db'
import { account } from '@/lib/db/schema'
import { signOutAction } from '@/app/actions/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '个人中心 - Awesome Resume',
}

// 登录方式显示名映射（credential 为 Better Auth 邮箱密码的 providerId）
const PROVIDER_LABELS: Record<string, string> = {
  credential: '邮箱密码',
  google: 'Google',
}

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  // 页面级保护：未登录跳转登录页
  if (!session) redirect('/login')

  const { user } = session
  const accounts = await db
    .select({ providerId: account.providerId })
    .from(account)
    .where(eq(account.userId, user.id))
  const providerLabel = accounts
    .map((a) => PROVIDER_LABELS[a.providerId] ?? a.providerId)
    .join('、')
  const fallback = user.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-anthropic-50/40 px-4 py-16">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="mb-8 font-serif text-3xl font-bold text-gray-900">个人中心</h1>

        <Card className="border-anthropic-200/60 shadow-luxury">
          <CardContent className="p-8">
            <div className="flex items-center gap-5">
              <Avatar className="h-16 w-16 border border-anthropic-200">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : null}
                <AvatarFallback className="bg-anthropic-100 text-xl text-anthropic-700">
                  {fallback}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-serif text-2xl font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {user.email}
                </p>
              </div>
            </div>

            <dl className="mt-8 grid gap-4 border-t border-anthropic-200/60 pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">登录方式</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-medium text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-anthropic-600" />
                  {providerLabel || '未知'}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">账号创建时间</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                </dd>
              </div>
            </dl>

            <div className="mt-8 border-t border-anthropic-200/60 pt-6">
              <form action={signOutAction}>
                <Button variant="outline" className="border-anthropic-200">
                  <LogOut className="mr-2 h-4 w-4" />
                  退出登录
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

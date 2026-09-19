import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    // 迁移走 Session pooler（5432），勿用 6543 事务模式
    url: process.env.DIRECT_URL!,
  },
})

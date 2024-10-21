import { router } from '@/trpc'
import { authRouter } from '@/trpc/routers/auth'
import { authorRouter } from '@/trpc/routers/author'
import { blogRouter } from '@/trpc/routers/blog'
import { pageRouter } from '@/trpc/routers/page'
import { searchRouter } from '@/trpc/routers/search'
import { seedRouter } from '@/trpc/routers/seed'
import { siteSettingsRouter } from '@/trpc/routers/site-settings'
import { tagRouter } from '@/trpc/routers/tag'
import { userRouter } from '@/trpc/routers/user'

import { formRouter } from './form'

export const appRouter = router({
  auth: authRouter,
  page: pageRouter,
  blog: blogRouter,
  siteSettings: siteSettingsRouter,
  tag: tagRouter,
  author: authorRouter,
  user: userRouter,
  seed: seedRouter,
  // this is used for global search
  search: searchRouter,
  form: formRouter,
})

export type AppRouter = typeof appRouter

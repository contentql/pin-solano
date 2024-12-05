import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { TRPCError } from '@trpc/server'
import ora from 'ora'

import { seedAuthorDetailsPage } from '@/seed/author-details-page'
import { seedAuthors } from '@/seed/authors'
import { seedAuthorsPage } from '@/seed/authors-page'
import { seedBlogDetailsPage } from '@/seed/blog-details-page'
import { seedBlogs } from '@/seed/blogs'
import { seedBlogsPage } from '@/seed/blogs-page'
import { seedContactPage } from '@/seed/contact-page'
import { seedForm } from '@/seed/forms'
import { seedHomePage } from '@/seed/home-page'
import { seedSiteSetting } from '@/seed/site-settings'
import { seedTagDetailsPage } from '@/seed/tag-details-page'
import { seedTagPage } from '@/seed/tag-tagName-page'
import { seedTags } from '@/seed/tags'
import { seedTagsPage } from '@/seed/tags-page'
import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({ config: configPromise })

export const seedRouter = router({
  runSeed: publicProcedure.mutation(async () => {
    try {
      const spinner = ora({
        text: 'Starting the seeding process...',
        color: 'cyan',
        spinner: 'dots',
      }).start()
      const forms = await seedForm(spinner)
      console.log('starting seed process...')
      const contactPage = await seedContactPage({ spinner, forms })
      await seedAuthors() // Then seed authors
      console.log('completed authors seed')
      await seedTagsPage()
      await seedTagDetailsPage()
      await seedTags() // Seed tags first
      await seedTagPage()

      console.log('completed tags seed')
      await seedAuthorsPage()
      await seedAuthorDetailsPage()
      await seedBlogs() // Finally, seed blogs, which depend on tags and authors
      await seedBlogsPage()
      await seedBlogDetailsPage()
      console.log('completed blogs seed')
      await seedHomePage()
      console.log('completed home page')

      await seedSiteSetting()
      console.log('completed site-settings seed')
      console.log('completed seeding process')

      return { success: true }
    } catch (error: any) {
      console.error('Error seeding:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})

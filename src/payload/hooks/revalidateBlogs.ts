import { Blog } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'
import { CollectionAfterDeleteHook } from 'payload'

export const revalidateBlogsAfterChange: CollectionAfterChangeHook<
  Blog
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-tags-with-blog-count')

    revalidateTag('list-blogs')
    revalidateTag(`details-blogs-${doc?.slug}`)
    console.log(`list-blogs at ${new Date().getTime()}`)
  }
}

export const revalidateBlogsAfterDelete: CollectionAfterDeleteHook<
  Blog
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-tags-with-blog-count')

    revalidateTag('list-blogs')
    revalidateTag(`details-blogs-${doc?.slug}`)
    console.log(`list-blogs at ${new Date().getTime()}`)
  }
}

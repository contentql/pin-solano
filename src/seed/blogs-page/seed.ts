import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'
import { RequiredDataFromCollectionSlug } from 'payload'

import { blogsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const { docs: allBlogs } = await payload.find({
      collection: 'blogs',
    })

    const blogsResult: RequiredDataFromCollectionSlug<'pages'> = {
      ...blogsPageData,
      layout: blogsPageData.layout?.map((block, idx) => {
        if (block?.blockType === 'BlogHero') {
          return {
            ...block,
            blogs: block?.blogs?.map((blog, idx) => ({
              relationTo: 'blogs',
              value: allBlogs?.at(idx)?.id as number,
            })),
          }
        }
        return block
      }),
    }

    const result = await payload.create({
      collection: 'pages',
      data: blogsResult,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed

import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { RequiredDataFromCollectionSlug } from 'payload'

import { homePageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const { docs: allTags, totalDocs: totalTags } = await payload.find({
      collection: 'tags',
    })

    const { docs: allBlogs, totalDocs: totalBlogs } = await payload.find({
      collection: 'blogs',
    })

    const homeResult: RequiredDataFromCollectionSlug<'pages'> = {
      ...homePageData,
      layout: homePageData.layout?.map((block, idx) => {
        if (block?.blockType === 'HomeHero') {
          return {
            ...block,
            tags: block?.tags?.map((tag, idx) => ({
              relationTo: 'tags',
              value: allTags?.at(idx)?.id || '',
            })),
          }
        } else if (block?.blockType === 'PopularBlogs') {
          return {
            ...block,
            popularBlogs: block?.popularBlogs?.map((popularBlog, idx) => ({
              relationTo: 'blogs',
              value: allBlogs?.at(0)?.id || '',
            })),
          }
        } else if (block?.blockType === 'LatestBlogs') {
          return {
            ...block,
            latestBlogs: block?.latestBlogs?.map((latestBlog, idx) => ({
              relationTo: 'blogs',
              value: allBlogs?.at(0)?.id || '',
            })),
          }
        } else if (block?.blockType === 'TopPicks') {
          return {
            ...block,
            topPicks: block?.topPicks?.map((topPick, idx) => ({
              relationTo: 'blogs',
              value: allBlogs?.at(0)?.id || '',
            })),
          }
        } else if (block?.blockType === 'HomeTags') {
          return {
            ...block,
            tags: block?.tags?.map((tag, idx) => ({
              relationTo: 'tags',
              value: allTags?.at(0)?.id || '',
            })),
          }
        }
        return block
      }),
    }

    const result = await payload.create({
      collection: 'pages',
      data: homeResult,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed

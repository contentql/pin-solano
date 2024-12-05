import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'

import { blogDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (): Promise<Page> => {
  const { docs: blogsPage } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'blogs',
      },
    },
  })
  try {
    const result = await payload.create({
      collection: 'pages',
      data: { ...blogDetailsPageData, parent: blogsPage?.at(0)?.id },
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed

import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'

import { authorDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const { docs: authorPageId } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'authors',
        },
      },
    })
    const result = await payload.create({
      collection: 'pages',
      data: { ...authorDetailsPageData, parent: authorPageId?.at(0)?.id },
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed

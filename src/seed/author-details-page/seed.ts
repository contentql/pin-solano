import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { authorDetailsPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

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

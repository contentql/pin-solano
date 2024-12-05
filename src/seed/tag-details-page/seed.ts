import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'

import { tagDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const result = await payload.create({
      collection: 'pages',
      data: tagDetailsPageData,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed

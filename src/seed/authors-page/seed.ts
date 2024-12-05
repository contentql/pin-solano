import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'
import { RequiredDataFromCollectionSlug } from 'payload'

import { authorImageData, authorsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const imageResult = await payload.create({
      collection: 'media',
      data: {
        alt: authorImageData.alt,
      },
      filePath: authorImageData.filePath,
    })

    const formattedAuthorsData: RequiredDataFromCollectionSlug<'pages'> = {
      ...authorsPageData,
      layout: authorsPageData?.layout?.map(block => {
        if (block?.blockType === 'Hero') {
          return {
            ...block,
            image: imageResult?.id!,
          }
        } else return block
      }),
    }
    const result = await payload.create({
      collection: 'pages',
      data: formattedAuthorsData,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed

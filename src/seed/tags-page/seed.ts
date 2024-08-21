import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { RequiredDataFromCollectionSlug } from 'payload'

import { tagImageData, tagsPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const imageResult = await payload.create({
      collection: 'media',
      data: {
        alt: tagImageData.alt,
      },
      filePath: tagImageData.filePath,
    })

    const formattedTagsData: RequiredDataFromCollectionSlug<'pages'> = {
      ...tagsPageData,
      layout: tagsPageData?.layout?.map(block => {
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
      data: formattedTagsData,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed

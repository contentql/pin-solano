import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { getRandomInt } from '@/utils/getRandomInt'

import { authorImageData, authorsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<(string | User)[]> => {
  try {
    const imagesResult = await Promise.allSettled(
      authorImageData.map(authorImage =>
        payload.create({
          collection: 'media',
          data: {
            alt: authorImage.alt,
          },
          filePath: authorImage.filePath,
        }),
      ),
    )

    const formattedImagesResult = imagesResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    const formattedAuthorsData = authorsData.map(authorData => {
      const authorImageId = formattedImagesResult.at(
        getRandomInt(0, formattedImagesResult.length - 1),
      )?.id

      return {
        ...authorData,
        imageUrl: authorImageId!,
      }
    })

    // console.log('author', formattedAuthorsData)
    const results = await Promise.allSettled(
      formattedAuthorsData.map(authorData =>
        payload.create({
          collection: 'users',
          data: authorData,

          locale: undefined,
          fallbackLocale: undefined,
          overrideAccess: true,
          disableVerificationEmail: true,
          context: {
            preventRoleOverride: true,
          },
        }),
      ),
    )

    const formattedResults = results.map(result =>
      result.status === 'fulfilled'
        ? result.value
        : `Failed to seed: ${result.reason}`,
    )

    const errors = formattedResults.filter(result => typeof result === 'string')

    if (errors.length > 0) {
      throw new Error(
        `Seeding failed with the following errors:\n${errors.join('\n')}`,
      )
    }

    return formattedResults
  } catch (error) {
    throw error
  }
}

export default seed

import { env } from '@env'
import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { authorImageData, authorsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<(string | User)[]> => {
  try {
    const formattedAuthorsData = authorsData.map((author, idx) => {
      return {
        ...author,
        imageUrl: `${env.PAYLOAD_URL}${authorImageData?.at(idx)?.filePath}`,
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

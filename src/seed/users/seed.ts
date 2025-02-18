import configPromise from '@payload-config'
import { Ora } from 'ora'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

export const seedUsers = async ({ spinner }: { spinner: Ora }) => {
  spinner.start('Started creating admin...')

  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        username: 'admin',
        password: 'changeme',
        role: ['admin', 'user'],
        _verified: true,
        emailVerified: new Date().toISOString(),
      },
      overrideAccess: true,
      disableVerificationEmail: true,
      // This to override ignore user hook
      context: {
        preventRoleOverride: true,
      },
    })

    spinner.succeed(`Successfully created admin...`)
  } catch (error) {
    spinner.succeed(`Failed creating admin...`)
    throw error
  }
}

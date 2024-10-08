import configPromise from '@payload-config'
import { Media } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'
import { produce } from 'immer'
import { cookies } from 'next/headers'

import { COLLECTION_SLUG_USER } from '@/payload/collections/constants'
import { router, userProcedure } from '@/trpc/'

import { UpdateProfileImageSchema, UpdateUserSchema } from './validator'

const payload = await getPayloadHMR({ config: configPromise })

export const userRouter = router({
  // ! use this route only if you need a user when loading the page
  getUser: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx
    return user
  }),

  updateProfileImage: userProcedure
    .input(UpdateProfileImageSchema)
    .mutation(async ({ input, ctx }) => {
      const { id } = input

      try {
        const updatedData = produce(ctx.user, draft => {
          draft.imageUrl = id
        })
        const user = await payload.update({
          collection: 'users',
          id: ctx.user.id,
          data: updatedData,
        })
        await payload.delete({
          collection: 'media',
          id: (ctx.user.imageUrl as Media).id,
        })
        return { data: user }
      } catch (error: any) {
        console.error('Error updating user image:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Internal server error occurred.',
        })
      }
    }),

  updateUser: userProcedure
    .input(UpdateUserSchema)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx
      const { confirmPassword, ...data } = input

      if (data.password && data.password !== confirmPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Passwords do not match',
        })
      }

      try {
        const updatedUser = await payload.update({
          collection: COLLECTION_SLUG_USER,
          id: user.id,
          data,
        })

        return updatedUser
      } catch (error: any) {
        console.error('Error updating user:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        })
      }
    }),

  deleteUser: userProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx

    try {
      await payload.delete({
        collection: COLLECTION_SLUG_USER,
        id: user.id,
      })
      const cookieStore = cookies()
      cookieStore.delete('payload-token')

      return { success: true }
    } catch (error: any) {
      console.error('Error deleting user:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})

import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrCurrentUser } from '@/payload/access'

import { authorAccessAfterUpdate } from './hooks/authorAccessAfterUpdate'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Auth',
    useAsTitle: 'email',
  },

  auth: {
    cookies: {
      secure: true,
    },
  },
  hooks: {
    beforeChange: [
      authorAccessAfterUpdate,
      async ({ data, req, operation, originalDoc }) => {
        if (operation === 'create') {
          const { payload, context } = req

          // this is an aggregation background

          const { totalDocs: totalUsers } = await payload.count({
            collection: 'users',
            where: {
              role: {
                equals: 'admin',
              },
            },
          })

          if (context.preventRoleOverride) {
            return data
          }

          if (totalUsers === 0) {
            return { ...data, role: 'admin' }
          }

          return data
        }

        return data
      },
    ],
  },
  access: {
    admin: async ({ req }) => {
      return ['admin'].includes(req?.user?.role || 'user')
    },
    read: isAdminOrCurrentUser,
    create: () => true,
    update: isAdmin,
    delete: isAdminOrCurrentUser,
  },
  fields: [
    { name: 'name', type: 'text', saveToJWT: true, unique: true },
    { name: 'imageUrl', type: 'text', saveToJWT: true },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user', 'author'],
      defaultValue: 'user',
      saveToJWT: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
    },
    {
      name: 'socialMedia',
      label: 'Social media',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Social media icon',
          type: 'select',
          options: ['Facebook', 'Instagram', 'Whatsapp', 'Twitter', 'LinkedIn'],
        },
        {
          name: 'url',
          label: 'Social media Url',
          type: 'text',
          required: true,
        },
      ],
      validate: siblingData => {
        if (siblingData?.length) {
          const uniqueIcons = new Set(
            siblingData.map((socialMedia: any) => socialMedia.icon),
          )

          const isUnique = uniqueIcons.size === siblingData.length

          return isUnique ? true : 'Each social media entry must be unique.'
        }

        return true
      },
      admin: {
        condition: data => {
          if (data.role === 'author') {
            return true
          }
          return false
        },
      },
    },
    { name: 'emailVerified', type: 'date' },
  ],
} as const

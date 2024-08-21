import type { CollectionConfig } from 'payload'

import { COLLECTION_SLUG_PAGE } from '@/payload/collections/constants'
import { pathField, pathModeField, slugField } from '@/payload/fields'
import { layoutField } from '@/payload/fields/layout'

export const Pages: CollectionConfig = {
  slug: COLLECTION_SLUG_PAGE,
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'updatedAt', 'createdAt'],
  },
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isHome',
          label: 'Home Page',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'isDynamic',
          label: 'Dynamic Page',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    layoutField(),
    slugField(),
    pathModeField(),
    pathField(),
  ],
}

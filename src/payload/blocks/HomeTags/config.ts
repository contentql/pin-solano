import { Block } from 'payload'

export const HomeTagsConfig: Block = {
  slug: 'HomeTags',
  interfaceName: 'HomeTagsType',
  labels: {
    singular: 'Tags Block',
    plural: 'Tags Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Enter the main title for the tags section.',
      },
    },
    {
      name: 'subTitle',
      label: 'Sub Title',
      type: 'text',
      required: true,
      admin: {
        description:
          'Enter a short subtitle that appears below the main title.',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: ['tags'],
      label: 'Tags',
      hasMany: true,
      admin: {
        description: 'Select multiple tags to display in this section.',
      },
    },
  ],
}

export default HomeTagsConfig

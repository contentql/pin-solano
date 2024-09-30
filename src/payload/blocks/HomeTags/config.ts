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
    },
    {
      name: 'subTitle',
      label: 'Sub Title',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: ['tags'],
      label: 'Tags',
      hasMany: true,
    },
  ],
}
export default HomeTagsConfig

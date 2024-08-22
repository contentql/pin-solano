import { Block } from 'payload'

export const HomeTagsConfig: Block = {
  slug: 'HomeTags',
  interfaceName: 'TagsType',
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
      name: 'sub_title',
      label: 'Sub Title',
      type: 'text',
      required: true,
    },
  ],
}
export default HomeTagsConfig

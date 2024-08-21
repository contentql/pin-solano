import { Block } from 'payload'

const DetailsConfig: Block = {
  slug: 'Details',
  // imageURL: '',
  interfaceName: 'DetailsType',
  labels: {
    singular: 'Details Block',
    plural: 'Details Blocks',
  },
  fields: [
    {
      type: 'select',
      name: 'collection_slug',
      label: 'Collection Slug',
      options: [
        {
          label: 'Blogs',
          value: 'blogs',
        },
        {
          label: 'Tags',
          value: 'tags',
        },
        {
          label: 'Authors',
          value: 'users',
        },
      ],
    },
  ],
}

export default DetailsConfig

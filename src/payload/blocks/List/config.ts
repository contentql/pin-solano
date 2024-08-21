import { Block } from 'payload'

const ListConfig: Block = {
  slug: 'List',
  // imageURL: '',
  interfaceName: 'List_type',
  labels: {
    singular: 'List Block',
    plural: 'List Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
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

export default ListConfig

import { Block } from 'payload'

export const LatestBlogsConfig: Block = {
  slug: 'LatestBlogs',
  interfaceName: 'LatestBlogsTypes',
  labels: {
    singular: 'Latest Blog Block',
    plural: 'Latest Blogs Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Enter the main title for the latest blogs section.',
      },
    },
    {
      name: 'latestBlogs',
      type: 'relationship',
      relationTo: ['blogs'],
      label: 'Latest Blogs',
      hasMany: true,
      required: true,
      minRows: 5,
      maxRows: 7,
      admin: {
        description:
          'Select between 5 to 7 blogs to display in the latest blogs section.',
      },
    },
  ],
}

export default LatestBlogsConfig

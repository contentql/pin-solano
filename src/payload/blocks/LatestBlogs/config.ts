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
    },
    {
      name: 'latest_blogs',
      type: 'relationship',
      relationTo: ['blogs'],
      label: 'Latest Blogs',
      hasMany: true,
      required: true,
      minRows: 5,
      maxRows: 7,
    },
  ],
}
export default LatestBlogsConfig

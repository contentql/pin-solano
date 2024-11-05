import { Block } from 'payload'

export const PopularBlogsConfig: Block = {
  slug: 'PopularBlogs',
  interfaceName: 'PopularBlogsTypes',
  imageURL: '/images//block/popular-blogs.png',
  labels: {
    singular: 'Popular Blogs Block',
    plural: 'Popular Blog Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Enter the main title for the popular blogs section.',
      },
    },
    {
      name: 'subTitle',
      type: 'textarea',
      label: 'Sub Title',
      required: true,
      admin: {
        description: 'Enter a subtitle that appears below the main title.',
      },
    },
    {
      name: 'popularBlogs',
      type: 'relationship',
      relationTo: ['blogs'],
      label: 'Popular Blogs',
      hasMany: true,
      required: true,
      maxRows: 6,
      admin: {
        description:
          'Select up to 6 blogs to display in the popular blogs section.',
      },
    },
  ],
}
export default PopularBlogsConfig

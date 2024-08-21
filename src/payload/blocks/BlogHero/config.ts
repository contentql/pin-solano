import { Block } from 'payload'

export const BlogHeroConfig: Block = {
  slug: 'BlogHero',
  // imageURL: '',
  interfaceName: 'BlogsHeroType',
  labels: {
    singular: 'Blog Hero Block',
    plural: 'Blogs Hero Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Please enter tag title in lowercase',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
    },
    {
      name: 'button',
      type: 'text',
      label: 'Button Name',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Button Link',
    },
    {
      name: 'blogs',
      type: 'relationship',
      relationTo: ['blogs'],
      hasMany: true,
    },
  ],
}
export default BlogHeroConfig

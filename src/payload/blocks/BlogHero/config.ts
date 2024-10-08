import { Block } from 'payload'

export const BlogHeroConfig: Block = {
  slug: 'BlogHero',
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
        description: 'Please enter the title in lowercase letters.',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
      admin: {
        description:
          'Enter a brief description that summarizes the blog hero section.',
      },
    },
    {
      name: 'button',
      type: 'text',
      label: 'Button Name',
      admin: {
        description: 'Enter the text to be displayed on the button.',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Button Link',
      admin: {
        description: 'Enter the URL the button will link to when clicked.',
      },
    },
    {
      name: 'blogs',
      type: 'relationship',
      relationTo: ['blogs'],
      label: 'Related Blogs',
      hasMany: true,
      admin: {
        description: 'Select blogs to feature in this section.',
      },
    },
  ],
}

export default BlogHeroConfig

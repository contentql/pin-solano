import { Block } from 'payload'

export const HeroConfig: Block = {
  slug: 'Hero',
  interfaceName: 'HeroType',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Please enter the title for the hero section.',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
      admin: {
        description:
          'Enter a brief description that summarizes the hero section.',
      },
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload an image to be displayed in the hero section.',
      },
    },
  ],
}

export default HeroConfig

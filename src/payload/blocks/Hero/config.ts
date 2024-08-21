import { Block } from 'payload'

export const HeroConfig: Block = {
  slug: 'Hero',
  // imageURL: '',
  interfaceName: 'HeroType',
  labels: {
    singular: 'Hero Block',
    plural: ' Hero Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Please enter title',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'upload image',
      },
    },
  ],
}
export default HeroConfig

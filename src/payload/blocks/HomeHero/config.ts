import { Block } from 'payload'

const HomeHeroConfig: Block = {
  slug: 'HomeHero',
  interfaceName: 'HomeHeroType',
  labels: {
    singular: 'Home Hero Block',
    plural: 'Home Hero Blocks',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: true,
    },
    {
      name: 'subHeadline',
      type: 'text',
      label: 'Sub-headline',
      required: true,
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Sub Title',
      required: true,
    },
    {
      name: 'buttons',
      label: 'Buttons',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'button',
          label: 'Button Label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tagTitle',
      type: 'text',
      label: 'Tags Title',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: ['tags'],
      hasMany: true,
    },
  ],
}

export default HomeHeroConfig

import { Block } from 'payload'

const HomeHeroConfig: Block = {
  slug: 'HomeHero',
  interfaceName: 'HomeHeroType',
  imageURL: '/images//block/home-page.png',
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
      admin: {
        description:
          'Enter the main headline displayed prominently in the hero section.',
      },
    },
    {
      name: 'subHeadline',
      type: 'text',
      label: 'Sub-headline',
      required: true,
      admin: {
        description:
          'Enter the sub headline displayed prominently in the hero section.',
      },
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Sub Title',
      required: true,
      admin: {
        description:
          'Enter the sub title displayed prominently in the hero section.',
      },
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
          admin: {
            description:
              'Enter the text that will be displayed on the button in the hero section.',
          },
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
          admin: {
            description:
              'Enter the URL the button will navigate to when clicked.',
          },
        },
      ],
    },
    {
      name: 'tagTitle',
      type: 'text',
      label: 'Tags Title',
      admin: {
        description:
          'Enter the title that will be displayed above the tag section.',
      },
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

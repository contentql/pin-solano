import { Block } from 'payload'

export const TopPicksConfig: Block = {
  slug: 'TopPicks',
  interfaceName: 'TopPicksTypes',
  labels: {
    singular: 'Top Picks Block',
    plural: 'Top Picks Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Enter the main title for the top picks section.',
      },
    },
    {
      name: 'topPicks',
      type: 'relationship',
      relationTo: ['blogs'],
      label: 'Top Picked Blogs',
      hasMany: true,
      required: true,
      admin: {
        description:
          'Select blogs to display in the top picks section (multiple selections allowed).',
      },
    },
  ],
}

export default TopPicksConfig

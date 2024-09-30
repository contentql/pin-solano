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
    },
    {
      name: 'topPicks',
      type: 'relationship',
      relationTo: ['blogs'],
      label: 'Top Picked Blogs',
      hasMany: true,
      required: true,
      admin: {
        description: 'select blogs to display in top pick blogs section',
      },
    },
  ],
}
export default TopPicksConfig

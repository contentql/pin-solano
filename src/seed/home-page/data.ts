import { Blog, Tag } from '@payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export const homePageData: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Home Page',
  isHome: true,
  _status: 'published',
  layout: [
    {
      headline: 'Bring Your',
      subHeadline: 'Dream into Reality',
      subTitle:
        'We increase revenue and maintain sustainable growth of your business through powerful website of next js',
      tagTitle: 'Popular Tags',
      buttons: [
        {
          button: 'Book a Meeting',
          link: '#',
        },
      ],
      tags: [
        { relationTo: 'tags', value: '' as unknown as number | Tag },
        { relationTo: 'tags', value: '' as unknown as number | Tag },
        { relationTo: 'tags', value: '' as unknown as number | Tag },
        { relationTo: 'tags', value: '' as unknown as number | Tag },
      ],
      blockType: 'HomeHero',
    },
    {
      title: 'Popular Blogs',
      subTitle:
        'Discover the most influential blogs across various categories like technology, lifestyle, travel, food, fashion, and personal finance. ',
      popularBlogs: [
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
      ],
      blockType: 'PopularBlogs',
    },
    {
      title: 'Latest Blogs',
      latestBlogs: [
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
      ],
      blockType: 'LatestBlogs',
    },
    {
      title: 'Top Picks',
      topPicks: [
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
        {
          relationTo: 'blogs',
          value: '' as unknown as number | Blog,
        },
      ],
      blockType: 'TopPicks',
    },

    {
      title: 'Tags',
      subTitle: 'Bridging Content with Concise Labels',
      tags: [
        {
          relationTo: 'tags',
          value: '' as unknown as number | Tag,
        },
        {
          relationTo: 'tags',
          value: '' as unknown as number | Tag,
        },
        {
          relationTo: 'tags',
          value: '' as unknown as number | Tag,
        },
        {
          relationTo: 'tags',
          value: '' as unknown as number | Tag,
        },
      ],
      blockType: 'HomeTags',
    },
  ],
}

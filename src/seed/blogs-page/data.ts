import { Blog, Page } from 'payload-types'

export type BlogsPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const blogsPageData: BlogsPageDataType = {
  title: 'Blogs',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'BlogHero',
      title: 'Free Blogs Posting Page for startups',
      description:
        'ContentQL is a free Blog Posting page & marketing website template.',
      button: 'Download Now',
      blogs: [
        { relationTo: 'blogs', value: '' as unknown as number | Blog },
        { relationTo: 'blogs', value: '' as unknown as number | Blog },
        { relationTo: 'blogs', value: '' as unknown as number | Blog },
        { relationTo: 'blogs', value: '' as unknown as number | Blog },
      ],
    },
    {
      blockType: 'List',
      title: 'Discover Blogs',
      collectionSlug: 'blogs',
    },
  ],
}

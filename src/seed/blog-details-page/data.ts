import { Page } from 'payload-types'

export type BlogDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const blogDetailsPageData: BlogDetailsPageDataType = {
  title: 'Blog Details',
  isHome: false,
  _status: 'published',
  isDynamic: true,
  parent: null,
  layout: [
    {
      blockType: 'Details',
      collectionSlug: 'blogs',
    },
  ],
}

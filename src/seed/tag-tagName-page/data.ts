import { Page } from '@payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type IndividualTagsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const individualTagPageData: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Tag Page',
  isDynamic: true,
  slug: 'tag/[name]',
  parent: null,
  _status: 'published',
  layout: [
    {
      blockType: 'Details',
      collectionSlug: 'tags',
    },
  ],
}

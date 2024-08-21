import path from 'path'
import { Page } from 'payload-types'

export type AuthorsPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type TagImageType = {
  alt: string
  filePath: string
}

export const authorsPageData: AuthorsPageDataType = {
  title: 'Authors',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'Hero',
      title: 'Discover Authors',
      description:
        'Discover the talented individuals shaping our content. Meet our authors, the creative minds bringing our blog to life.',
      image: '',
    },
    {
      blockType: 'List',
      title: 'Discover Authors',
      collection_slug: 'users',
    },
  ],
}
export const authorImageData: TagImageType = {
  alt: 'Authors Image',
  filePath: path.join(process.cwd(), '/public/images/seed/blog-2.jpg'),
}

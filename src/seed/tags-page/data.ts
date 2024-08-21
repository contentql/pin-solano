import path from 'path'
import { Page } from 'payload-types'

export type TagsPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>
export type TagImageType = {
  alt: string
  filePath: string
}

export const tagsPageData: TagsPageDataType = {
  title: 'Tags',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'Hero',
      title: 'Tag',
      description:
        'On this page, you will find a comprehensive list of tags used across various blogs. Tags serve as a crucial organizational tool, helping to categorize and filter content based on specific topics or themes. Each tag represents a particular subject, making it easier for readers to locate articles of interest.',
      image: '',
    },
    {
      blockType: 'List',
      title: 'Discover Tags',
      collection_slug: 'tags',
    },
  ],
}
export const tagImageData: TagImageType = {
  alt: 'Tags Image',
  filePath: path.join(process.cwd(), '/public/images/seed/blog-2.jpg'),
}

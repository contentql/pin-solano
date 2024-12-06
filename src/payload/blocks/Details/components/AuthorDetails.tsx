import AuthorPostsView from '../../common/components/AuthorPostView'
import { Blog, Media, User } from '@payload-types'

interface PageProps {
  author: User
  blogsData: Blog[]
  totalBlogs: number
  authorTags: (
    | {
        title: string
        description: string
        slug: string | null | undefined
        tagImage: number | Media
      }
    | undefined
  )[]
}

const IndividualAuthorDetails: React.FC<PageProps> = ({
  author,
  blogsData,
  authorTags,
  totalBlogs,
}: PageProps) => {
  return (
    <AuthorPostsView
      author={author}
      blogsData={blogsData}
      totalBlogs={totalBlogs}
      authorTags={authorTags}
    />
  )
}

export default IndividualAuthorDetails

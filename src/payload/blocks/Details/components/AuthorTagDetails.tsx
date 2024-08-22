import { Blog, Tag, User } from '@payload-types'

import BlogsByAuthorAndTagView from '@/components/author/BlogsByAuthorAndTag'
import { trpc } from '@/trpc/client'

interface PageProps {
  params: {
    authorName: string
    tagSlug: string
  }
}

const AuthorTagDetails: React.FC<PageProps> = ({ params }: PageProps) => {
  const { data: tagData } = trpc.tag.getTagBySlug.useQuery({
    slug: params?.tagSlug,
  })

  const { data: authorData } = trpc.author.getAuthorByName.useQuery({
    authorName: params?.authorName,
  })
  const { data: blogsData } = trpc.author.getBlogsByAuthorNameAndTag.useQuery({
    authorName: params?.authorName,
    tagSlug: params?.tagSlug,
  })
  return (
    <BlogsByAuthorAndTagView
      tagDetails={tagData as Tag}
      authorDetails={authorData as User}
      blogsData={blogsData?.blogs as Blog[]}
    />
  )
}

export default AuthorTagDetails

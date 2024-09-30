import AuthorPostsView from '../../common/components/AuthorPostView'
import { Blog, User } from '@payload-types'

import { trpc } from '@/trpc/client'

interface PageProps {
  params: {
    authorName: string
  }
  searchParams: {
    tag: string
  }
}

const IndividualAuthorDetails: React.FC<PageProps> = ({
  params,
  searchParams,
}: PageProps) => {
  try {
    const { data: author, isLoading: isAuthorLoading } =
      trpc.author.getAuthorByName.useQuery({
        authorName: params?.authorName,
      })
    const { data: authorTags, isLoading: isAuthorTagsLoading } =
      trpc.author.getAllTagsByAuthorName.useQuery({
        authorName: params?.authorName,
      })
    const tag = searchParams?.tag ? searchParams?.tag : authorTags?.at(0)?.slug

    const { data: blogs, isLoading: isBlogsLoading } =
      trpc.author.getBlogsByAuthorNameAndTag.useQuery({
        authorName: params?.authorName,
        tagSlug: tag!,
      })
    return (
      <AuthorPostsView
        author={author as User}
        blogsData={blogs?.blogs as Blog[]}
        totalBlogs={blogs?.totalBlogs!}
        authorTags={authorTags as any}
        isAuthorLoading={isAuthorLoading}
        isAuthorTagsLoading={isAuthorTagsLoading}
        isBlogsLoading={isBlogsLoading}
      />
    )
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }
}

export default IndividualAuthorDetails

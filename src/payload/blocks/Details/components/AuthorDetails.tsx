import { Blog, User } from '@payload-types'

import AuthorPostsView from '@/components/author'
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
    const { data: author } = trpc.author.getAuthorByName.useQuery({
      authorName: params?.authorName,
    })
    const { data: authorTags } = trpc.author.getAllTagsByAuthorName.useQuery({
      authorName: params?.authorName,
    })
    const tag = searchParams?.tag ? searchParams?.tag : authorTags?.at(0)?.slug

    const { data: blogs } = trpc.author.getBlogsByAuthorNameAndTag.useQuery({
      authorName: params?.authorName,
      tagSlug: tag!,
    })
    return (
      <AuthorPostsView
        author={author as User}
        blogsData={blogs?.blogs as Blog[]}
        totalBlogs={blogs?.totalBlogs!}
        authorTags={authorTags as any}
      />
    )
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }
}

export default IndividualAuthorDetails

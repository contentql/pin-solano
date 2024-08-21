import AuthorTagDetails from '../AuthorTagDetails'
import { Blog, Tag, User } from '@payload-types'

import BlogListItems from '@/payload/blocks/List/components/BlogListItem'

const BlogsByAuthorAndTagView = ({
  tagDetails,
  authorDetails,
  blogsData,
}: {
  authorDetails: User
  tagDetails: Tag
  blogsData: Blog[]
}) => {
  return (
    <>
      <AuthorTagDetails
        tagDetails={tagDetails as Tag}
        authorDetails={authorDetails as User}
      />
      <BlogListItems blogsData={blogsData} />
    </>
  )
}

export default BlogsByAuthorAndTagView

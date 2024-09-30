import AuthorBlogs from '../../Details/components/AuthorBlogs'
import { Blog, User } from '@payload-types'

import AuthorDetails from './AuthorDetails'

function AuthorPostsView({
  blogsData,
  authorTags,
  totalBlogs,
  author,
  isAuthorLoading,
  isBlogsLoading,
  isAuthorTagsLoading,
}: {
  blogsData: Blog[]
  totalBlogs: number
  authorTags: any
  author: User
  isAuthorLoading: boolean
  isBlogsLoading: boolean
  isAuthorTagsLoading: boolean
}) {
  return (
    <>
      <AuthorDetails
        isAuthorLoading={isAuthorLoading}
        author={author as User}
      />
      <AuthorBlogs
        blogsData={blogsData}
        totalBlogs={totalBlogs}
        authorTags={authorTags as any}
        isAuthorTagsLoading={isAuthorTagsLoading}
        isBlogsLoading={isBlogsLoading}
      />
    </>
  )
}

export default AuthorPostsView

import { Blog, User } from '@payload-types'

import AuthorBlogs from './AuthorBlogs'
import AuthorDetails from './AuthorDetails'

function AuthorPostsView({
  blogsData,
  authorTags,
  totalBlogs,
  author,
}: {
  blogsData: Blog[]
  totalBlogs: number
  authorTags: any
  author: User
}) {
  return (
    <>
      <AuthorDetails author={author as User} />
      <AuthorBlogs
        blogsData={blogsData}
        totalBlogs={totalBlogs}
        authorTags={authorTags as any}
      />
    </>
  )
}

export default AuthorPostsView

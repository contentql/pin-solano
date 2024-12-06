import AuthorBlogs from '../../Details/components/AuthorBlogs'
import { Blog, Media, User } from '@payload-types'

import AuthorDetails from './AuthorDetails'

const AuthorPostsView = ({
  blogsData,
  authorTags,
  totalBlogs,
  author,
}: {
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
  author: User
}) => {
  return (
    <>
      <AuthorDetails author={author} />
      <AuthorBlogs
        blogsData={blogsData}
        totalBlogs={totalBlogs}
        authorTags={authorTags}
      />
    </>
  )
}

export default AuthorPostsView

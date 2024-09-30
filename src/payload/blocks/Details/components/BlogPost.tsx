import { BlogPostContent } from '../../List/components/BlogPostContent'
import { HorizontalScrollCarousel } from '../../common/components/HorizontalScrollCarousel'
import { Blog } from '@payload-types'

interface BlogPostDetailsProp {
  blog: Blog
  blogsData: Blog[]
}

export const BlogPost: React.FC<BlogPostDetailsProp> = ({
  blog,
  blogsData,
}: {
  blog: Blog
  blogsData: Blog[]
}) => {
  return (
    <div className='bg-base-100 px-2'>
      <BlogPostContent blog={blog as Blog} />
      <h1 className='mt-20 text-center text-4xl font-extrabold text-white'>
        Popular Blogs
      </h1>
      <p className='mt-2 text-center text-gray-500'>scroll to see more blogs</p>
      <HorizontalScrollCarousel blogsData={blogsData as Blog[]} />
    </div>
  )
}

export default BlogPost

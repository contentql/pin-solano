import { BlogPostContent } from '../../List/components/BlogPostContent'
import { Blog } from '@payload-types'

import { HorizontalScrollCarousel } from '@/payload/common/HorizontalScrollCarousel'
import { trpc } from '@/trpc/client'

export const BlogPost = ({ blogSlug }: { blogSlug: string }) => {
  const { data: blog } = trpc.blog.getBlogBySlug.useQuery({ slug: blogSlug })
  const { data: blogsData } = trpc.blog.getAllBlogs.useQuery()

  return (
    <div className='bg-base-100 px-2'>
      <BlogPostContent slug={blogSlug} data={blog as Blog} />
      <h1 className='mt-20 text-center text-4xl font-extrabold text-white'>
        Popular Blogs
      </h1>
      <p className='mt-2 text-center text-gray-500'>scroll to see more blogs</p>
      <HorizontalScrollCarousel blogsData={blogsData as Blog[]} />
    </div>
  )
}

export default BlogPost

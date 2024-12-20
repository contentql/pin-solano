import BlogPostCard, {
  DirectionAwareHover,
} from '../../PopularBlogs/components/BlogPostCard'
import { Blog, ListType, Media } from '@payload-types'

import { formatDate } from '@/utils/dateFormatter'

interface BlogsListProps {
  blogs: Blog[]
  title?: ListType['title']
}
const BlogsList: React.FC<BlogsListProps> = ({ blogs, title }) => {
  return (
    <div className='bg-base-100'>
      <section className='container overflow-hidden  px-2 py-20 md:px-10 lg:px-20'>
        <div className='mx-auto grid grid-flow-row-dense grid-cols-1 gap-8 md:auto-rows-[28rem] md:grid-cols-2 xl:grid-cols-3'>
          {blogs?.map((blog, index) => {
            return (
              <BlogPostCard
                key={index}
                blog={blog as Blog}
                blogImg={
                  <DirectionAwareHover
                    imageUrl={(blog?.blogImage as Media)?.url || ''}>
                    {/* <p className='text-md font-semibold'>
                    {readingTime(blog?.description_html)?.text}
                  </p> */}
                    <p className='pt-2 text-sm font-semibold'>
                      Date: {formatDate(blog?.createdAt)}
                    </p>
                  </DirectionAwareHover>
                }
                className={`${blog?.selectBlogSize === '2' ? 'md:col-span-2' : 'md:col-span-1'} group min-h-[100px]`}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default BlogsList

'use client'

import BlogPostCard, {
  DirectionAwareHover,
} from '../PopularBlogs/components/BlogPostCard'
import { Blog, Media, TopPicksTypes } from '@payload-types'
import Link from 'next/link'

import { useResponsive } from '@/hooks/useResponsive'
import AnimatedBlogCard from '@/payload/common/AnimatedBlogCard'
import { formatDate } from '@/utils/dateFormatter'
import { slateHtml } from '@/utils/slateToHtml'

const TopPicks = (TopPicks: TopPicksTypes) => {
  const { isMobile } = useResponsive()
  const readingTime = require('reading-time')
  return (
    <section className='container px-2 py-20 text-white md:px-20'>
      <h1 className='pb-4 text-4xl font-semibold leading-9 text-gray-50'>
        {TopPicks?.title}
      </h1>
      {isMobile ? (
        <div className='grid w-full grid-cols-1 gap-y-8 '>
          {TopPicks?.top_picks?.map((blog, index) => (
            <BlogPostCard
              key={index}
              blog={blog?.value as Blog}
              blogImg={
                <DirectionAwareHover
                  imageUrl={
                    ((blog?.value as Blog)?.blog_image as Media)?.url || ''
                  }>
                  <p className='text-md font-semibold'>
                    {
                      readingTime(slateHtml((blog?.value as Blog)?.content))
                        ?.text
                    }
                  </p>
                  <p className='pt-2 text-sm font-semibold'>
                    Date: {formatDate((blog?.value as Blog)?.createdAt)}
                  </p>
                </DirectionAwareHover>
              }
              className='col-span-1 row-span-1'
            />
          ))}
        </div>
      ) : (
        <div className='grid w-full grid-cols-1  gap-y-8 md:grid-cols-2 md:gap-8  lg:grid-cols-3'>
          {TopPicks?.top_picks?.map((blog, index) => (
            <div
              key={index}
              className={`${(blog?.value as Blog)?.select_blog_size === '2' ? 'col-span-2' : 'col-span-1'}`}>
              <Link href={`/blog/${(blog?.value as Blog)?.slug}`}>
                <AnimatedBlogCard
                  blogData={blog?.value as Blog}
                  index={index}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TopPicks

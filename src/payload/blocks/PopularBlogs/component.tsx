'use client'

import { useResponsive } from '../common/hooks/useResponsive'
import { Blog, Media, PopularBlogsTypes } from '@payload-types'

import { formatDate } from '@/utils/dateFormatter'
import { slateHtml } from '@/utils/slateToHtml'

import BlogPostCard, { DirectionAwareHover } from './components/BlogPostCard'
import PopularBlogCard from './components/PopularBlogCard'

const PopularBlogs: React.FC<PopularBlogsTypes> = ({ ...block }) => {
  const { isMobile } = useResponsive()
  const readingTime = require('reading-time')

  return (
    <section className='container px-2 py-20 text-white md:px-20'>
      <div role='main' className='flex flex-col items-center justify-center'>
        <h1 className='text-center text-4xl font-semibold leading-9 text-gray-50'>
          {block?.title}
        </h1>
        <p className='mt-4 w-11/12 text-center text-base leading-normal text-white md:w-10/12 lg:w-1/2'>
          {block?.subTitle}
        </p>
      </div>
      {isMobile ? (
        <div className='mt-10 grid grid-cols-1 gap-y-8'>
          {block?.popularBlogs?.map((blog, index) => (
            <BlogPostCard
              key={index}
              blog={blog?.value as Blog}
              blogImg={
                <DirectionAwareHover
                  imageUrl={
                    ((blog?.value as Blog)?.blogImage as Media)?.url || ''
                  }>
                  <p className='text-md font-semibold'>
                    {
                      readingTime(slateHtml((blog?.value as Blog)?.content))
                        .text
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
        <div className='mt-10 grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4 '>
          {block?.popularBlogs?.map((blog, idx) => (
            <PopularBlogCard key={idx} index={idx} blog={blog?.value as Blog} />
          ))}
        </div>
      )}
    </section>
  )
}

export default PopularBlogs
